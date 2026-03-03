
import React, { useState } from 'react';
import { generateTTS, decode, decodeAudioData } from '../services/gemini';

interface VoicePreviewProps {
  voiceId: string;
  voiceName: string;
  theme: string;
}

const VoicePreview: React.FC<VoicePreviewProps> = ({ voiceId, voiceName, theme }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePreview = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      // Usamos el voiceId directamente que corresponde a los nombres de voz requeridos por la API
      const base64 = await generateTTS(`Hola, soy la voz ${voiceName}. ¿Qué vamos a crear hoy?`, voiceId, 'Alegre');
      if (base64) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const buffer = await decodeAudioData(decode(base64), audioContext, 24000, 1);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
      } else {
        setIsPlaying(false);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <button
      onClick={handlePreview}
      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isPlaying ? `bg-gradient-to-r ${theme} scale-110 shadow-lg` : 'bg-white/5 hover:bg-white/10'}`}
    >
      {isPlaying ? (
        <div className="flex gap-1 items-end h-4">
          <div className="w-1 h-full bg-white animate-[pulse_0.8s_infinite]" />
          <div className="w-1 h-1/2 bg-white animate-[pulse_1.1s_infinite]" />
          <div className="w-1 h-3/4 bg-white animate-[pulse_0.9s_infinite]" />
        </div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
};

export default VoicePreview;
