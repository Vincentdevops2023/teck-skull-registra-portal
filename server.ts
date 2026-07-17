import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Define Mongoose Schema & Model
interface IUser {
  email: string;
  name: string;
  role: 'student' | 'admin';
  googleId?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  googleId: { type: String, unique: true, sparse: true },
});

// Avoid recompiling model if hot reloaded
const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', userSchema);


async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  app.use(cookieParser());

  // Connect to MongoDB
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.warn('MONGODB_URI not found in environment variables. Database features will fail.');
  }

  // --- API Routes ---

  // Standard Login (Dummy Implementation for UI demonstration)
  app.post('/api/auth/login', async (req, res) => {
    const { email, password, role } = req.body;
    // In a real app, you would verify the password here.
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      if (user.role !== role) {
        return res.status(401).json({ error: 'Role mismatch' });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
      );

      res.cookie('auth_token', token, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
      });

      res.json({ message: 'Login successful', user: { email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Standard Registration (Dummy Implementation)
  app.post('/api/auth/register', async (req, res) => {
    const { email, name, role } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      user = new User({ email, name, role });
      await user.save();

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
      );

      res.cookie('auth_token', token, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
      });

      res.json({ message: 'Registration successful', user: { email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Check Session
  app.get('/api/auth/me', async (req, res) => {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as { userId: string, role: string };
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      res.json({ user: { email: user.email, name: user.name, role: user.role } });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  });

  // Logout
  app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('auth_token', {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
    });
    res.json({ message: 'Logged out' });
  });

  // --- Google OAuth Routes ---

  app.get('/api/auth/google/url', (req, res) => {
    // Determine the state (e.g. role) from query params, default to student
    const role = req.query.role || 'student';
    
    // Construct the OAuth provider's authorization URL
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || '',
      redirect_uri: `${process.env.APP_URL}/api/auth/google/callback`,
      response_type: 'code',
      scope: 'email profile',
      state: role as string,
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    res.json({ url: authUrl });
  });

  app.get(['/api/auth/google/callback', '/api/auth/google/callback/'], async (req, res) => {
    const { code, state: role } = req.query;

    if (!code) {
      return res.status(400).send('Authorization code missing');
    }

    try {
      // 1. Exchange code for token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: code as string,
          client_id: process.env.GOOGLE_CLIENT_ID || '',
          client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
          redirect_uri: `${process.env.APP_URL}/api/auth/google/callback`,
          grant_type: 'authorization_code',
        }),
      });

      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok) {
        throw new Error(tokenData.error_description || 'Failed to exchange token');
      }

      // 2. Fetch user profile
      const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      // 3. Upsert User in MongoDB
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = new User({
          email: userData.email,
          name: userData.name || 'Google User',
          role: role === 'admin' ? 'admin' : 'student',
          googleId: userData.id,
        });
        await user.save();
      } else if (!user.googleId) {
        // Link google account to existing user
        user.googleId = userData.id;
        await user.save();
      }

      // 4. Create JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '1d' }
      );

      res.cookie('auth_token', token, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
      });

      // 5. Send success message to parent window and close popup
      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', role: '${user.role}' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. This window should close automatically.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Google OAuth Error:', error);
      res.status(500).send('Authentication failed');
    }
  });


  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
