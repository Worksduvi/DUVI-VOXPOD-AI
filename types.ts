
export type Language = 'ES' | 'EN' | 'ZH' | 'HK';

export interface VoiceOption {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  dialect: string;
}

export interface VoiceArchitecture {
  [key: string]: {
    dialects: string[];
    voices: VoiceOption[];
  };
}

export type EmotionalState = 'Neutral' | 'Triste' | 'Alegre' | 'Enfadado' | 'Feliz' | 'Emocionado' | 'Susurro' | 'Profesional' | 'Narrativo';

export interface HistoryItem {
  id: string;
  text: string;
  timestamp: number;
  audioData: string;
  voice: string;
  lang: string;
}

export interface UsageData {
  date: string;
  count: number;
}

export interface AppState {
  language: Language;
  theme: string;
  activeTab: 'vox' | 'pod' | 'history' | 'stats';
  history: HistoryItem[];
  showOnboarding: boolean;
}
