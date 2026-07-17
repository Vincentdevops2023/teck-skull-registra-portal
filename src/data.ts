import { Course, Feature, Testimonial, Stat, WhyChooseItem, FAQItem } from './types';

export const featuresData: Feature[] = [
  {
    id: 'online-learning',
    title: 'On-Demand Online Learning',
    description: 'Learn at your own pace with bite-sized, premium video lessons, hands-on sandboxes, and interactive quizzes.',
    iconName: 'BookOpen'
  },
  {
    id: 'live-coding',
    title: 'Live Interactive Coding Classes',
    description: 'Participate in bi-weekly live coding bootcamps, code reviews, and live Q&A sessions with real senior engineers.',
    iconName: 'Terminal'
  },
  {
    id: 'student-dashboard',
    title: 'Advanced Student Dashboard',
    description: 'Track your grades, upcoming lessons, learning paths, certificates, and calendar schedules in real-time.',
    iconName: 'LayoutDashboard'
  },
  {
    id: 'course-enrollment',
    title: 'Instant Course Enrollment',
    description: 'Unlock immediate, lifetime access to structured curriculum learning paths from fundamentals to expert level.',
    iconName: 'UserPlus'
  },
  {
    id: 'assignment-submission',
    title: 'Automated Code Assignments',
    description: 'Submit your coding solutions directly through our web workspace and receive instant, AI-powered code audits.',
    iconName: 'FileCheck'
  },
  {
    id: 'certificates',
    title: 'Blockchain Verified Certificates',
    description: 'Share authentic, tamper-proof, industry-recognized certificates of completion on LinkedIn to impress recruiters.',
    iconName: 'Award'
  },
  {
    id: 'career-coaching',
    title: '1-on-1 Dedicated Career Coaching',
    description: 'Get custom career action plans, rigorous resume reviews, and extensive mock technical and behavioral interviews.',
    iconName: 'Briefcase'
  },
  {
    id: 'internship-opportunities',
    title: 'Premium Internship Programs',
    description: 'Apply for exclusive, remote work placements with real tech partners to gain direct industry experience.',
    iconName: 'Target'
  },
  {
    id: 'job-placement',
    title: 'Job Placement Guarantee',
    description: 'Gain access to our exclusive job boards and personal intros to tech recruiters at top hiring partners.',
    iconName: 'Building'
  },
  {
    id: 'community-forum',
    title: 'Vibrant Global Student Community',
    description: 'Join a lifetime Slack and Discord ecosystem of peer learners, mentors, and alumni to collaborate on projects.',
    iconName: 'Users'
  }
];

export const coursesData: Course[] = [
  {
    id: 'fullstack-dev',
    title: 'Full Stack Web Development Masterclass',
    category: 'web-dev',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Chinedu Okafor',
      role: 'Principal Engineer ex-Stripe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    duration: '16 Weeks',
    difficulty: 'Intermediate',
    rating: 4.9,
    studentsCount: 2450,
    lessonsCount: 120,
    price: '$299',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker']
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development & UI Engineering',
    category: 'web-dev',
    image: 'https://images.unsplash.com/photo-1541462608141-2758574e8b4e?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Amina Diop',
      role: 'Senior UI/UX & React Expert',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    duration: '10 Weeks',
    difficulty: 'Beginner',
    rating: 4.8,
    studentsCount: 1920,
    lessonsCount: 75,
    price: '$189',
    skills: ['HTML/CSS', 'Tailwind CSS', 'React', 'Framer Motion', 'Git']
  },
  {
    id: 'backend-dev',
    title: 'Enterprise Backend Engineering & Architecture',
    category: 'web-dev',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Kofi Mensah',
      role: 'Backend Architect, ex-AWS',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    duration: '12 Weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    studentsCount: 1480,
    lessonsCount: 90,
    price: '$249',
    skills: ['Go', 'gRPC', 'PostgreSQL', 'Redis', 'Kubernetes']
  },
  {
    id: 'python-programming',
    title: 'Python Programming from Zero to Hero',
    category: 'programming',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Tunde Bakare',
      role: 'Core Software Developer',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
    },
    duration: '8 Weeks',
    difficulty: 'Beginner',
    rating: 4.7,
    studentsCount: 3120,
    lessonsCount: 64,
    price: '$129',
    skills: ['Python Syntax', 'Algorithms', 'OOP', 'Data Scraping', 'APIs']
  },
  {
    id: 'java-programming',
    title: 'Java Systems Development & OOP Design',
    category: 'programming',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Emeka Nwosu',
      role: 'Enterprise Systems Consultant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    duration: '10 Weeks',
    difficulty: 'Intermediate',
    rating: 4.6,
    studentsCount: 1100,
    lessonsCount: 80,
    price: '$179',
    skills: ['Java Core', 'Spring Boot', 'SQL', 'Hibernate', 'Design Patterns']
  },
  {
    id: 'mobile-app-dev',
    title: 'Cross-Platform Mobile App Development',
    category: 'web-dev',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Zola Maseko',
      role: 'Mobile Lead Engineer',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80'
    },
    duration: '12 Weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    studentsCount: 1530,
    lessonsCount: 85,
    price: '$219',
    skills: ['React Native', 'Expo', 'iOS/Android', 'Redux Toolkit', 'Firebase']
  },
  {
    id: 'ai-engineering',
    title: 'Artificial Intelligence & Large Language Models',
    category: 'ai-data',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Dr. Kwame Boateng',
      role: 'AI Researcher & Ph.D. in CS',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },
    duration: '14 Weeks',
    difficulty: 'Advanced',
    rating: 4.9,
    studentsCount: 1850,
    lessonsCount: 96,
    price: '$349',
    skills: ['Gemini API', 'PyTorch', 'HuggingFace', 'LangChain', 'LLM Tuning']
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Fundamentals & Pipelines',
    category: 'ai-data',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Farida Alabi',
      role: 'Lead ML Engineer, ex-Google',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    duration: '12 Weeks',
    difficulty: 'Intermediate',
    rating: 4.8,
    studentsCount: 1240,
    lessonsCount: 88,
    price: '$279',
    skills: ['Scikit-Learn', 'Pandas', 'Regression', 'Neural Networks', 'MLOps']
  },
  {
    id: 'cybersecurity',
    title: 'Ethical Hacking & Network Cybersecurity',
    category: 'cyber-cloud',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Idris Bello',
      role: 'CISSP, Certified Pentester',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    duration: '14 Weeks',
    difficulty: 'Intermediate',
    rating: 4.9,
    studentsCount: 1670,
    lessonsCount: 105,
    price: '$299',
    skills: ['Metasploit', 'Nmap', 'Penetration Testing', 'Cryptography', 'SIEM']
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Solutions Architecture & Cloud Engineering',
    category: 'cyber-cloud',
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ea29?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Fatou Bensouda',
      role: 'Cloud Architect, Multi-Cloud Expert',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    duration: '10 Weeks',
    difficulty: 'Intermediate',
    rating: 4.7,
    studentsCount: 1420,
    lessonsCount: 70,
    price: '$229',
    skills: ['AWS', 'GCP', 'Terraform', 'Serverless', 'Cloud Security']
  },
  {
    id: 'data-science',
    title: 'Data Science & Statistical Analysis',
    category: 'ai-data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Yusuf Diallo',
      role: 'Chief Data Officer',
      avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?w=150&auto=format&fit=crop&q=80'
    },
    duration: '11 Weeks',
    difficulty: 'Beginner',
    rating: 4.8,
    studentsCount: 2010,
    lessonsCount: 82,
    price: '$199',
    skills: ['SQL', 'R Programming', 'Pandas/NumPy', 'Tableau', 'Data Modeling']
  },
  {
    id: 'uiux-design',
    title: 'Product (UI/UX) Design Masterclass',
    category: 'design-marketing',
    image: 'https://images.unsplash.com/photo-1561070791-26c113006238?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Nneka Anozie',
      role: 'Lead UX Architect',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&auto=format&fit=crop&q=80'
    },
    duration: '8 Weeks',
    difficulty: 'Beginner',
    rating: 4.9,
    studentsCount: 2540,
    lessonsCount: 60,
    price: '$149',
    skills: ['Figma', 'Wireframing', 'User Research', 'Design Systems', 'Prototyping']
  },
  {
    id: 'devops-engineering',
    title: 'DevOps & Site Reliability Engineering',
    category: 'cyber-cloud',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Oluwaseun Ajayi',
      role: 'DevOps Director',
      avatar: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?w=150&auto=format&fit=crop&q=80'
    },
    duration: '12 Weeks',
    difficulty: 'Advanced',
    rating: 4.8,
    studentsCount: 980,
    lessonsCount: 92,
    price: '$289',
    skills: ['CI/CD Pipelines', 'GitHub Actions', 'Kubernetes', 'Ansible', 'Prometheus']
  },
  {
    id: 'blockchain-dev',
    title: 'Blockchain & Smart Contract Engineering',
    category: 'programming',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Abdi Hassan',
      role: 'Smart Contract Auditor',
      avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150&auto=format&fit=crop&q=80'
    },
    duration: '10 Weeks',
    difficulty: 'Advanced',
    rating: 4.7,
    studentsCount: 740,
    lessonsCount: 74,
    price: '$319',
    skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts', 'Hardhat']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth Engineering',
    category: 'design-marketing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    instructor: {
      name: 'Lola Adebayo',
      role: 'Growth Lead, ex-Flutterwave',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    duration: '6 Weeks',
    difficulty: 'Beginner',
    rating: 4.6,
    studentsCount: 1650,
    lessonsCount: 45,
    price: '$99',
    skills: ['SEO', 'Google Analytics', 'AdWords', 'A/B Testing', 'Content Funnels']
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Kemi Adebisi',
    role: 'Software Engineer at Stripe',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'TECHSKULL completely transformed my career trajectory. The structured curriculum, intense assignments, and hands-on coding challenges helped me build a portfolio that got me recruited by Stripe straight out of Lagos.',
    outcome: 'Landed $110k remote Software Engineering Role',
    company: 'Stripe'
  },
  {
    id: 't2',
    name: 'Moussa Toure',
    role: 'Cloud Architect at Microsoft',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'As a university student, my college classes were mostly theoretical. TECHSKULL provided me the cloud engineering experience I was craving. The multi-cloud sandbox assignments are second to none.',
    outcome: 'Hired as Cloud Associate',
    company: 'Microsoft'
  },
  {
    id: 't3',
    name: 'Chioma Obi',
    role: 'Lead UI/UX Designer at Paystack',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    quote: 'The mentor feedback is what makes TECHSKULL stand out. Rather than just watching tutorial videos, my Figma screens were thoroughly audited by lead design industry experts. This 1-on-1 coaching was invaluable.',
    outcome: 'Appointed Lead UX Designer',
    company: 'Paystack'
  },
  {
    id: 't4',
    name: 'Kofi Owusu',
    role: 'Data Scientist at Flutterwave',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    quote: 'The AI and Machine Learning track has an incredible curriculum. It is up-to-date, demanding, and highly practical. The internship placement support provided me a route to land a full-time job right after my final year.',
    outcome: 'Promoted to Data Scientist',
    company: 'Flutterwave'
  }
];

export const statsData: Stat[] = [
  { id: 'students', value: '20,000+', label: 'Students Empowered', iconName: 'Users' },
  { id: 'courses', value: '300+', label: 'Technology Courses', iconName: 'BookOpen' },
  { id: 'instructors', value: '100+', label: 'Industry Expert Mentors', iconName: 'Award' },
  { id: 'satisfaction', value: '98%', label: 'Student Satisfaction Rate', iconName: 'Smile' },
  { id: 'certificates', value: '5,000+', label: 'Certificates Issued', iconName: 'CheckCircle' },
  { id: 'partners', value: '250+', label: 'Global Hiring Partners', iconName: 'Briefcase' }
];

export const whyChooseData: WhyChooseItem[] = [
  {
    id: 'experts',
    title: 'Industry Experts',
    description: 'Learn directly from senior software engineers, principal designers, and cyber architects who work at top tier technology companies like Stripe, Google, and AWS.',
    iconName: 'Award',
    badge: 'Elite Mentors'
  },
  {
    id: 'projects',
    title: 'Real-World Production Projects',
    description: 'Ditch the simple theoretical homework. You will build and deploy full stack, industrial-grade projects that run in production containers and databases.',
    iconName: 'Code',
    badge: 'Portfolio Ready'
  },
  {
    id: 'flexible',
    title: 'Highly Flexible Learning',
    description: 'Whether you are a full-time student, a part-time worker, or a complete beginner, our self-paced modules and recorded live-bootcamps adapt to your calendar.',
    iconName: 'Clock'
  },
  {
    id: 'curriculum',
    title: 'Modern, Cutting-Edge Curriculum',
    description: 'Our teaching materials are updated bi-monthly. Master modern tech stacks like AI integration with Gemini API, Go microservices, and Docker infrastructure.',
    iconName: 'Cpu',
    badge: 'Always Fresh'
  },
  {
    id: 'internship',
    title: 'Exclusive Internships',
    description: 'Gain real workplace credentials. Eligible graduates are immediately funnelled into 3-month remote paid tech internships with our vetted partner startups.',
    iconName: 'TrendingUp'
  },
  {
    id: 'career-support',
    title: 'Unrivaled Career Support',
    description: 'Get your resume optimized, participate in mock coding assessments, and receive customized, personal hiring outreach to active technical recruiters.',
    iconName: 'Briefcase',
    badge: 'Job Ready'
  },
  {
    id: 'affordable',
    title: 'Flexible & Affordable Pricing',
    description: 'Education should be accessible. Pay in regional custom installments, access full-ride student scholarships, or enroll in register-free basic tracks.',
    iconName: 'CreditCard'
  },
  {
    id: 'community',
    title: 'Lifetime Exclusive Community',
    description: 'Access our private high-vibe networking circles, study groups, regional meetups, and channels populated by 20,000+ alumni working worldwide.',
    iconName: 'MessageSquare'
  }
];

export const faqsData: FAQItem[] = [
  {
    id: 'faq1',
    question: 'How do the student assignments and automated grading work?',
    answer: 'Once you enroll in a course, you can complete and submit code files through our online workspace. Our back-end system executes isolated container-based tests to give you automated, instant feedback on logic, performance, and formatting, accompanied by personalized hints.'
  },
  {
    id: 'faq2',
    question: 'Do I get real 1-on-1 access to the expert tech instructors?',
    answer: 'Yes! Along with self-paced content, we run weekly live office hours, bi-weekly coding bootcamps, and have dedicated Slack and Discord channels where instructors review code and answer questions directly.'
  },
  {
    id: 'faq3',
    question: 'What are the requirements for the internship placement program?',
    answer: 'To qualify for our exclusive remote internships with partner companies, students must complete their core course, maintain a dashboard assignment score of 80% or above, and pass our mock technical review.'
  },
  {
    id: 'faq4',
    question: 'Are there scholarship opportunities for university students?',
    answer: 'Absolutely. TECHSKULL is committed to expanding technology opportunities across the globe. We offer merit-based and financial-need-based full-ride scholarships for students in diverse regional communities. Check our Student Portal for applications.'
  },
  {
    id: 'faq5',
    question: 'What happens when I earn a TECHSKULL certificate?',
    answer: 'All certificates are cryptographically signed on-chain, proving their authenticity. They include an embeddable link, a direct QR-code verification, and are optimized for sharing on LinkedIn or inclusion in technical resume portfolios.'
  }
];
