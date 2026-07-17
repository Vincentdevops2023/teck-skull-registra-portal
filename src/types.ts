export interface Course {
  id: string;
  title: string;
  category: 'web-dev' | 'programming' | 'ai-data' | 'cyber-cloud' | 'design-marketing';
  image: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  price: string;
  skills: string[];
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
  outcome: string;
  company?: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  iconName: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
