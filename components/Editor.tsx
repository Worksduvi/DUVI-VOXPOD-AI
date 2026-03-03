import React, { useState } from 'react';
import { translateText, runFactCheck, analyzeSocialUrl, generatePodcastFromSource } from '../services/gemini';
import { GESTURES } from '../constants';

interface EditorProps {
  text: string;
  setText: (text: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  theme: string;
  mode: 'vox' | 'pod';
}

const Editor: React.FC<EditorProps> = ({ text, setText, onGenerate, isGenerating, theme, mode }) => {
  const [loading, setLoading] = useState(false);
  const [socialUrl, setSocialUrl] = useState('');
  const [podcastDuration, setPodcastDuration] = useState(120);

  const insertTag = (tag: string) => {
    setText(text + ` [${tag}] `);
  };

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const translated = await translateText(text, 'English');
      if (translated) setText(translated);
    } finally {
      setLoading(false);
    }
  };

  const handleFactCheck = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const refined = await runFactCheck(text);
      if (refined) setText(refined);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialImport = async () => {
    if (!socialUrl) return;
    setLoading(true);
    try {
      const script = await analyzeSocialUrl(socialUrl, podcastDuration);
      if (script) {
        setText(script);
        setSocialUrl('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const script = await generatePodcastFromSource(content, 'text', podcastDuration);
        if (script) setText(script);
      };
      reader.readAsText(file);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col gap-6 backdrop-blur-xl animate-slide-up">
      {/* DuviPod Pro Intelligence Panel */}
      {mode === 'pod' && (
        <div className="flex flex-col gap-4 p-5 bg-indigo-500/5 rounded-[2rem] border border-indigo-500/20">
          <div className="flex justify-between items-center mb-1">
            <h5 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
              DuviPod Intelligence Tools
            </h5>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Pega link de Video o Artículo..."
                value={socialUrl}
                onChange={(e) => setSocialUrl(e.target.value)}
                className="flex-1 bg-black/40 border border-white/5 p-4 rounded-2xl text-sm font-medium focus:ring-1 ring-indigo-500 outline-none placeholder:text-slate-600"
              />
              <button 
                onClick={handleSocialImport} 
                disabled={loading || !socialUrl} 
                className="px-6 py-4 bg-indigo-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50"
              >
                {loading ? '...' : 'Procesar'}
              </button>
            </div>
            <label className="flex items-center justify-center gap-2 px-6 py-4 bg-white/5 rounded-2xl border border-dashed border-white/10 text-xs font-bold cursor-pointer hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              PDF / TXT
              <input type="file" className="hidden" accept=".pdf,.txt" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="mt-2 px-2">
            <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase mb-3">
              <span className="flex items-center gap-2">
                Duración Estimada: <span className="text-white">{formatDuration(podcastDuration)}</span>
              </span>
              {podcastDuration > 120 ? (
                <span className="text-indigo-400 flex items-center gap-1">
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" strokeWidth="2" strokeLinecap="round"/></svg>
                  Búsqueda Enriquecida Activa
                </span>
              ) : <span className="text-slate-600 italic">Modo Rápido</span>}
            </div>
            <input 
              type="range" 
              min="30" 
              max="5400" 
              step="30" 
              value={podcastDuration} 
              onChange={(e) => setPodcastDuration(parseInt(e.target.value))} 
              className="w-full custom-range" 
            />
          </div>
        </div>
      )}

      {/* Editor Annotations */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-white/5">
          <span className="text-[10px] font-black text-slate-500 uppercase flex items-center pr-2">Anotaciones</span>
          {GESTURES.map(g => (
            <button key={g.tag} onClick={() => insertTag(g.tag)} className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] font-bold hover:bg-indigo-600 transition-all border border-white/5 whitespace-nowrap">
              {g.label}
            </button>
          ))}
          <button onClick={() => insertTag('stress')} className="px-3 py-1.5 rounded-xl bg-indigo-600/30 text-indigo-400 text-[10px] font-black border border-indigo-500/30">ÉNFASIS</button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comienza a escribir o importa contenido para procesar..."
          className="w-full h-80 bg-transparent resize-none text-lg leading-relaxed focus:outline-none placeholder-slate-700 font-medium"
        />
        {loading && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Procesando Inteligencia...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/5 gap-4">
        <div className="flex gap-2">
          <button 
            onClick={handleTranslate} 
            disabled={loading || !text}
            className="px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase hover:bg-white/10 tracking-widest disabled:opacity-50"
          >
            Traducir EN
          </button>
          <button 
            onClick={handleFactCheck} 
            disabled={loading || !text}
            className="px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase hover:bg-emerald-500/20 tracking-widest disabled:opacity-50"
          >
            Fact-Check
          </button>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating || !text || loading}
          className={`px-10 py-5 rounded-[2rem] bg-gradient-to-r ${theme} text-white font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all disabled:opacity-50 btn-glow`}
        >
          {isGenerating ? 'Generando Master...' : 'Generar Audio'}
        </button>
      </div>
    </div>
  );
};

export default Editor;