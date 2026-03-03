
import { VoiceArchitecture, EmotionalState } from './types';

export const THEMES = [
  { name: 'Indigo', classes: 'from-indigo-600 to-purple-700' },
  { name: 'Midnight', classes: 'from-slate-800 to-black' },
  { name: 'Ocean', classes: 'from-blue-600 to-cyan-500' }
];

export const VOICE_DATA: VoiceArchitecture = {
  ES: {
    dialects: ['España', 'México'],
    voices: [
      { id: 'Zephyr', name: 'Sofía', gender: 'Female', dialect: 'ES' },
      { id: 'Kore', name: 'Valeria', gender: 'Female', dialect: 'MX' },
      { id: 'Puck', name: 'Javier', gender: 'Male', dialect: 'ES' }
    ]
  },
  EN: {
    dialects: ['USA', 'UK'],
    voices: [
      { id: 'Kore', name: 'Emma', gender: 'Female', dialect: 'USA' },
      { id: 'Zephyr', name: 'Charlotte', gender: 'Female', dialect: 'UK' },
      { id: 'Puck', name: 'James', gender: 'Male', dialect: 'USA' }
    ]
  }
};

export const EMOTIONAL_STATES: EmotionalState[] = [
  'Neutral', 'Alegre', 'Triste', 'Enfadado', 'Emocionado', 'Susurro', 'Profesional', 'Narrativo'
];

export const AMBIENT_SOUNDS = [
  { id: 'rain', name: 'Lluvia', icon: '🌧️' },
  { id: 'cafe', name: 'Café', icon: '☕' },
  { id: 'forest', name: 'Bosque', icon: '🌲' },
  { id: 'waves', name: 'Mar', icon: '🌊' },
  { id: 'fire', name: 'Fuego', icon: '🔥' },
  { id: 'lofi', name: 'Lofi', icon: '🎵' }
];

export const GESTURES = [
  { label: 'Risa', tag: 'Risa' },
  { label: 'Suspiro', tag: 'Suspiro' },
  { label: 'Tos', tag: 'Tos' },
  { label: 'Asombro', tag: 'Sorprenderse' },
  { label: 'Énfasis', tag: 'stress' }
];
