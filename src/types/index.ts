export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  roles: string[];
  isEmailVerified: boolean;
  googleId?: string;
  points?: number;
  streak?: number;
  totalStudySeconds?: number;
  createdAt?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  totalItems: number;
  completedItems: number;
}

export interface Word {
  id: string;
  word: string;
  translation: string;
  transcription: string;
  audioUrl?: string;
  topicId: string;
}

export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  audioUrl?: string;
  topicId: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  description: string;
  examples: string[];
  topicId: string;
  isCompleted?: boolean;
}

export interface GrammarQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface TopicExercise {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  totalItems: number;
  completedItems: number;
  totalScore: number;
  earnedScore: number;
}

export interface Exercise {
  id: string;
  type: "multiple_choice" | "fill_blank" | "translation";
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  topicId: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "diamond";
  category: "words" | "phrases" | "exercises" | "grammar" | "streak" | "points";
  target: number;
  points: number;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}
