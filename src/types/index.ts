export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface Simulation {
  id: string;
  title: string;
  category: 'cybersecurity' | 'ai' | 'cloud' | 'web3' | 'data-science';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  imageUrl?: string;
  enrolledCount: number;
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  simulationId: string;
  status: 'enrolled' | 'in-progress' | 'completed';
  progress: number;
  enrolledAt: Date;
  completedAt?: Date;
}