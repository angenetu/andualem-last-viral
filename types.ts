
// Global declaration for process.env
declare var process: {
  env: {
    API_KEY: string;
  }
};

export interface ScriptData {
  title: string;
  hook: string;
  body: string;
  cta: string;
  visualCues: string[];
  hashtags: string[];
}

export interface TrendData {
  topic: string;
  volume: number;
  growth: number; // Percentage
  difficulty: 'Low' | 'Medium' | 'High';
  snippet?: string; // For search grounding results
  sourceUrl?: string; // For search grounding results
}

export interface VideoProject {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  status: 'Draft' | 'Rendering' | 'Published';
  platform: 'TikTok' | 'YouTube' | 'Shorts';
  lastModified: string;
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  SCRIPT_GENERATOR = 'SCRIPT_GENERATOR',
  EDITOR = 'EDITOR',
  GROWTH_ENGINE = 'GROWTH_ENGINE',
  AI_VIDEO_GEN = 'AI_VIDEO_GEN',
  THUMBNAIL_MAKER = 'THUMBNAIL_MAKER',
  LIVE_ASSISTANT = 'LIVE_ASSISTANT',
  STRATEGY_AGENT = 'STRATEGY_AGENT',
  TEMPLATE_MARKETPLACE = 'TEMPLATE_MARKETPLACE',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN',
  SETTINGS = 'SETTINGS',
  AUTO_PILOT = 'AUTO_PILOT'
}

export interface GeneratedVideo {
  uri: string;
  prompt: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  author: string;
  downloads: string;
  isPro: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Unlimited';
  role?: 'Admin' | 'Creator';
  credits: number;
  avatar: string;
}

export interface AutoPilotSlot {
  time: string;
  title: string;
  concept: string;
  hook: string;
  platforms: string[];
  status: 'Pending' | 'Scripting' | 'Rendering' | 'Posted';
  progress: number;
  language?: 'Amharic' | 'English';
}
