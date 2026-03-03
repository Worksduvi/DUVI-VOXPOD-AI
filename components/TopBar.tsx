
import React, { useState } from 'react';
import { Language, AppState } from '../types';

interface TopBarProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  pomodoro: number;
  setPomodoro: (val: number) => void;
  isTimerRunning: boolean;
  setIsTimerRunning: (val: boolean) => void;
}

const TopBar: React.FC<TopBarProps> = ({ 
  state, 
  setState, 
  pomodoro, 
  setPomodoro, 
  isTimerRunning, 
  setIsTimerRunning 
}) => {
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const setLang = (lang: Language) => setState(prev => ({ ...prev, language: lang }));

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timerOptions = [
    { label: '25 min', val: 25 * 60 },
    { label: '50 min', val: 50 * 60 },
    { label: '5 min', val: 5 * 60 },
    { label: '15 min', val: 15 * 60 },
  ];

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10 px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${state.theme} flex items-center justify-center shadow-lg transform rotate-3`}>
            <span className="font-black text-white text-lg">D</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tighter text-white">DUVIVOX <span className="text-indigo-500">PRO</span></h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-bold">The Creative AI Audio Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          {/* Pomodoro Timer Pill */}
          <div className="relative">
            <div className="flex items-center bg-black/40 border border-white/5 rounded-2xl p-1 overflow-hidden">
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all ${isTimerRunning ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <div className="relative">
                   {isTimerRunning && (
                     <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-40 animate-pulse" />
                   )}
                   <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 relative z-10 ${isTimerRunning ? 'animate-spin-slow' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <span className="font-mono font-black text-sm tracking-tight">{formatTime(pomodoro)}</span>
              </button>
              
              <div className="w-px h-6 bg-white/10 mx-1"></div>
              
              <button 
                onClick={() => setShowTimerSettings(!showTimerSettings)}
                className="p-1.5 text-slate-500 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Timer Settings Popover */}
            {showTimerSettings && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowTimerSettings(false)} />
                <div className="absolute top-full mt-2 right-0 w-48 glass rounded-2xl border border-white/10 p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-3 px-2">Configuración</h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {timerOptions.map(opt => (
                      <button 
                        key={opt.label}
                        onClick={() => {
                          setPomodoro(opt.val);
                          setIsTimerRunning(false);
                          setShowTimerSettings(false);
                        }}
                        className="py-2 text-[10px] font-bold bg-white/5 hover:bg-indigo-600 rounded-xl transition-all"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => {
                      setPomodoro(25 * 60);
                      setIsTimerRunning(false);
                      setShowTimerSettings(false);
                    }}
                    className="w-full py-2 bg-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500/20 transition-all"
                  >
                    Resetear
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block"></div>

          <div className="hidden md:flex bg-black/40 p-1 rounded-xl border border-white/5">
            {[
              {id: 'ES', flag: '🇪🇸', label: 'ESP'},
              {id: 'EN', flag: '🇺🇸', label: 'ENG'}
            ].map(l => (
              <button
                key={l.id}
                onClick={() => setLang(l.id as Language)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${state.language === l.id ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <span className="text-sm">{l.flag}</span>
                <span className="text-xs font-bold">{l.label}</span>
              </button>
            ))}
          </div>
          
          <button className="h-10 w-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition-colors">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
