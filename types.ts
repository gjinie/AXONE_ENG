import React from 'react';

export type View = 'home' | 'diagnosis' | 'dashboard' | 'solution' | 'mypage' | 'promptlab' | 'agent';

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Course {
  name: string;
  progress: number;
  color: string;
}

export interface Certification {
  title: string;
  date: string;
  id: string;
}

export type AXLevel = 'AX Planet' | 'AX Star' | 'AX Cluster' | 'AX Galaxy' | 'AX Universe';

export interface UserInfo {
  industry: string;
  job: string;
  years: string;
  gender: string;
  birthYear: string;
}

export interface ChatMessage {
  id?: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface AXMindsetScores {
  aiAttitude: number;
  aiFear: number;
  aiValue: number;
  easeOfUse: number;
  perceivedUtility: number;
  selfEfficacy: number;
  aiAcceptance: number;
  axParticipation: number;
}

export interface AXDiagnosisResult {
  literacy_score: number;
  literacy_level: string;
  ax_one_level: 'AX Planet' | 'AX Star' | 'AX Cluster' | 'AX Galaxy' | 'AX Universe';
  mindset_scores: {
    aiAttitude: number;
    aiFear: number;
    aiValue: number;
    easeOfUse: number;
    perceivedUtility: number;
    selfEfficacy: number;
    aiAcceptance: number;
    axParticipation: number;
  };
  feedback: string; // Markdown 형식의 리포트
}

// Added missing AppView export to resolve error in DiagnosisView.tsx
export type AppView = 'setup' | 'chat' | 'quiz' | 'result';

export interface QuizQuestion {
  id: number;
  type: 'multiple-choice' | 'subjective';
  question: string;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswer?: string;
  explanation: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
}

export type SlideLayout = 'title' | 'toc' | 'sectionTitle' | 'bullet' | 'two-column' | 'chart' | 'table';

export interface ChartItem {
  type: 'bar' | 'pie' | 'line' | 'doughnut';
  title: string;
  data: { label: string; value: number }[];
}

export interface TableItem {
  headers: string[];
  rows: string[][];
}

export interface SlideContent {
  type: 'text' | 'image' | 'table' | 'chart';
  value?: string; // For text (bullet point) or image (description)
  table?: TableItem;
  chart?: ChartItem;
}

export interface Slide {
  id: number;
  title: string;
  layout: SlideLayout;
  content: SlideContent[]; 
  speakerNotes: string;
}

export interface GeneratedSlides {
  subject: string;
  slides: Slide[];
}

export enum AppState {
  IDLE = 'IDLE',
  MODE_SELECTION = 'MODE_SELECTION',
  INPUT = 'INPUT',
  GENERATING = 'GENERATING',
  PLAYING_QUIZ = 'PLAYING_QUIZ',
  VIEWING_SLIDES = 'VIEWING_SLIDES',
  FINISHED_QUIZ = 'FINISHED_QUIZ',
  ERROR = 'ERROR'
}

export interface FileData {
  mimeType: string;
  data: string; // base64 encoded string
  name: string;
}

export interface ContentInput {
  text: string;
  files: FileData[];
  url?: string;
  userPrompt?: string;
  multipleChoiceCount?: number;
  subjectiveCount?: number;
  difficulty?: 'High' | 'Medium' | 'Low';
  slideCount?: number;
  includeToc?: boolean;
}