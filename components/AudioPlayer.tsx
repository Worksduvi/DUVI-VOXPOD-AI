
import React from 'react';

interface AudioPlayerProps {
  base64Data: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ base64Data }) => {
  if (!base64Data) return null;

  return (
    <div className="mt-8 p-8 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/20 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-8">
        <div className="relative">
          <div className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-md animate-pulse" />
          <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Master Output</p>
              <h4 className="text-lg font-bold text-white">Audio Final Generado</h4>
            </div>
            <span className="text-xs font-mono text-slate-400">00:00 / --:--</span>
          </div>
          
          {/* Visual Timeline / Waveform Sim */}
          <div className="h-12 flex items-center gap-1 overflow-hidden px-2 bg-black/20 rounded-2xl">
            {Array.from({length: 40}).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-indigo-500/40 rounded-full" 
                style={{ height: `${Math.random() * 80 + 20}%` }} 
              />
            ))}
          </div>
        </div>

        <button className="h-12 px-8 rounded-2xl bg-white text-indigo-950 font-black text-xs uppercase shadow-lg hover:scale-105 transition-all active:scale-95">
          Descargar .WAV
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
