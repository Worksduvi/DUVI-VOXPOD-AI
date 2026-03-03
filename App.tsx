import React, { useState, useEffect } from 'react';
import { AppState, HistoryItem } from './types';
import { VOICE_DATA } from './constants';
import TopBar from './components/TopBar';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Stats from './components/Stats';
import AudioPlayer from './components/AudioPlayer';
import Onboarding from './components/Onboarding';
import { generateTTS, decode, decodeAudioData } from './services/gemini';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('duvivox_pro_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic sanitization of history to ensure strings
        if (parsed.history) {
          parsed.history = parsed.history.map((item: any) => ({
            ...item,
            text: String(item.text || ""),
            voice: String(item.voice || ""),
            lang: String(item.lang || "")
          }));
        }
        return parsed;
      }
    } catch (e) {
      console.error("Error cargando almacenamiento:", e);
    }
    return {
      language: 'ES',
      theme: 'from-indigo-600 to-purple-700',
      activeTab: 'vox',
      history: [],
      showOnboarding: true
    };
  });

  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(() => {
    const langData = VOICE_DATA[state.language] || VOICE_DATA['ES'];
    return langData.voices[0]?.id || 'Zephyr';
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [lastAudio, setLastAudio] = useState<string | null>(null);

  // Pomodoro State
  const [pomodoro, setPomodoro] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem('duvivox_pro_v2', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    let timer: any;
    if (isTimerRunning && pomodoro > 0) {
      timer = setInterval(() => setPomodoro(p => p - 1), 1000);
    } else if (pomodoro === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      playSfx();
      alert('¡Sessión completada!');
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, pomodoro]);

  const playSfx = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {
      console.debug('SFX disabled');
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    try {
      const base64 = await generateTTS(text, selectedVoice, 'Profesional');
      if (base64) {
        setLastAudio(base64);
        const newItem: HistoryItem = {
          id: Math.random().toString(36).substr(2, 9),
          text: String(text.slice(0, 60).trim() + (text.length > 60 ? '...' : '')),
          timestamp: Date.now(),
          audioData: base64,
          voice: String(selectedVoice),
          lang: String(state.language)
        };
        setState(prev => ({...prev, history: [newItem, ...prev.history]}));
        
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass({ sampleRate: 24000 });
        const buffer = await decodeAudioData(decode(base64), audioContext, 24000, 1);
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      }
    } catch (e) {
      console.error("Error en generación:", e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-indigo-500/40">
      <TopBar 
        state={state} 
        setState={setState} 
        pomodoro={pomodoro} 
        setPomodoro={setPomodoro}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
      />
      
      {state.showOnboarding && (
        <Onboarding 
          theme={state.theme} 
          onClose={() => setState(s => ({...s, showOnboarding: false}))} 
        />
      )}

      <main className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          <div className="flex-1 order-2 lg:order-1 space-y-8 min-w-0">
            {state.activeTab === 'stats' ? (
              <div className="space-y-6">
                <h2 className="text-3xl font-black tracking-tight uppercase italic text-slate-100">Analíticas de Usuario</h2>
                <Stats />
              </div>
            ) : state.activeTab === 'history' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black tracking-tight uppercase italic text-slate-100">Librería de Audios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.history && state.history.length > 0 ? state.history.map(item => (
                    <div key={item.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 hover:border-white/20 transition-all group flex items-center justify-between">
                       <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-indigo-400">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168l4.2 2.8a1 1 0 010 1.664l-4.2 2.8A1 1 0 018 13.604V7.996a1 1 0 011.555-.832z"></path></svg>
                          </div>
                          <div className="truncate">
                            <div className="font-bold truncate text-slate-200">{String(item.text)}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{String(item.voice)} • {new Date(item.timestamp).toLocaleDateString()}</div>
                          </div>
                       </div>
                    </div>
                  )) : (
                    <div className="col-span-full py-24 text-center text-slate-600 font-bold uppercase tracking-widest italic border-2 border-dashed border-white/5 rounded-[3rem]">
                      No hay registros en la base de datos
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-700">
                <div className="flex items-center justify-between mb-4">
                   <h2 className="text-3xl font-black tracking-tight uppercase italic text-slate-100">
                    {state.activeTab === 'pod' ? 'Podcasting Studio' : 'Vocal AI Interface'}
                   </h2>
                   <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                   </div>
                </div>
                <Editor
                  text={text}
                  setText={setText}
                  onGenerate={handleGenerate}
                  isGenerating={isGenerating}
                  theme={state.theme}
                  mode={state.activeTab === 'pod' ? 'pod' : 'vox'}
                />
                <AudioPlayer base64Data={lastAudio} />
              </div>
            )}
          </div>

          <aside className="w-full lg:w-96 order-1 lg:order-2 flex-shrink-0">
             <Sidebar 
                activeTab={state.activeTab} 
                setActiveTab={(t) => setState(prev => ({...prev, activeTab: t}))} 
                playSfx={playSfx}
                language={state.language}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                theme={state.theme}
             />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;