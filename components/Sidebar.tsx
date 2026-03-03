import React from 'react';
import { AMBIENT_SOUNDS, VOICE_DATA } from '../constants';
import VoicePreview from './VoicePreview';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  playSfx: () => void;
  language: string;
  selectedVoice: string;
  onVoiceChange: (id: string) => void;
  theme: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, playSfx, language, selectedVoice, onVoiceChange, theme }) => {
  // Aseguramos que siempre haya datos de voz válidos para mapear
  const currentLangData = VOICE_DATA[language] || VOICE_DATA['ES'];

  return (
    <div className="w-full lg:w-80 flex flex-col gap-6 select-none">
      {/* Console Section */}
      <section className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Console Master</h3>
          <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-[9px] rounded font-bold">v2.1</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          {[
            { id: 'vox', label: 'Estudio de Voz', icon: '🎙️' },
            { id: 'history', label: 'Mi Librería', icon: '📚' },
            { id: 'stats', label: 'Analíticas', icon: '📊' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playSfx(); setActiveTab(tab.id); }}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-white/5 text-slate-400'}`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* DuviPod Pro Button - High Impact */}
        <div className="relative group p-0.5 mt-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <button 
            onClick={() => { playSfx(); setActiveTab('pod'); }}
            className={`relative w-full py-6 px-4 rounded-3xl bg-slate-900 border border-white/10 flex items-center gap-4 transition-all hover:bg-black/40 ${activeTab === 'pod' ? 'ring-2 ring-indigo-500 bg-slate-800' : ''}`}
          >
            <div className="h-12 w-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
            </div>
            <div className="text-left">
              <span className="block text-lg font-black text-white leading-tight tracking-tight">DUVIPOD PRO</span>
              <span className="block text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em]">Crea Podcasts</span>
            </div>
          </button>
        </div>
      </section>

      {/* Banco de Voces */}
      <section className="bg-white/5 border border-white/5 p-6 rounded-[2.5rem] shadow-xl">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Banco de Voces</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 no-scrollbar">
          {currentLangData && currentLangData.voices.map(v => (
            <div
              key={v.id}
              onClick={() => onVoiceChange(v.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selectedVoice === v.id ? 'bg-indigo-600/20 border-indigo-600/50 text-white' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
            >
              <div className="flex flex-col">
                <span className="text-[11px] font-bold">{v.name}</span>
                <span className="text-[9px] opacity-60 uppercase">{v.dialect}</span>
              </div>
              <VoicePreview voiceId={v.id} voiceName={v.name} theme={theme} />
            </div>
          ))}
        </div>
      </section>

      {/* Ambient Mixer */}
      <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-6 shadow-xl">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 flex justify-between">
          <span>Mezcla Ambiental</span>
          <span className="text-indigo-400">ATMOS</span>
        </h4>
        <div className="space-y-4 max-h-40 overflow-y-auto pr-2 no-scrollbar">
          {AMBIENT_SOUNDS.map(sound => (
            <div key={sound.id} className="flex items-center gap-3 group">
              <span className="text-lg group-hover:scale-110 transition-transform">{sound.icon}</span>
              <div className="flex-1">
                <input type="range" className="w-full h-1 bg-slate-800 rounded-lg appearance-none accent-indigo-500 cursor-pointer" defaultValue="0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;