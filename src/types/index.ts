// export interface Topic {
//   id: string;
//   title: string;
//   description: string;
//   imageUrl?: string;
//   difficulty: "beginner" | "intermediate" | "advanced";
//   totalItems: number;
//   completedItems: number;
// }

// export interface Word {
//   id: string;
//   word: string;
//   translation: string;
//   transcription: string;
//   audioUrl?: string;
//   topicId: string;
// }

// export interface Phrase {
//   id: string;
//   phrase: string;
//   translation: string;
//   audioUrl?: string;
//   topicId: string;
// }

// export interface Exercise {
//   id: string;
//   type: "multiple_choice" | "fill_blank" | "translation";
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   points: number;
//   topicId: string;
// }

// export interface Achievement {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   type: "bronze" | "silver" | "gold" | "diamond";
//   category: "words" | "phrases" | "exercises" | "grammar" | "streak" | "points";
//   target: number;
//   points: number;
//   isActive: boolean;
// }

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

// Topic types
export interface Topic {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  totalItems: number;
  completedItems: number;
}

// Word types
export interface Word {
  id: string;
  word: string;
  translation: string;
  transcription: string;
  audioUrl?: string;
  topicId: string;
}

// Phrase types
export interface Phrase {
  id: string;
  phrase: string;
  translation: string;
  audioUrl?: string;
  topicId: string;
}

// Exercise types
export interface Exercise {
  id: string;
  type: "multiple_choice" | "fill_blank" | "translation";
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
  topicId: string;
}

// Achievement types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "diamond";
  category: "words" | "phrases" | "exercises" | "grammar" | "streak" | "points";
  target: number;
  points: number;
  isActive: boolean;
}
