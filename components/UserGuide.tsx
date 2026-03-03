
import React from 'react';

const UserGuide: React.FC<{ onClose: () => void; theme: string }> = ({ onClose, theme }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500 overflow-y-auto">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-white/10 relative my-auto">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-black mb-8 shimmer-text">Guía de Usuario: DuviVox Studio</h2>

        <div className="space-y-10">
          {/* Section 1 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-sm">1</span>
                Configuración de Voz
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Usa el <strong>Centro de Control</strong> para saltar entre 19 dialectos. Ajusta <strong>Pitch</strong> y <strong>Velocidad</strong> en tiempo real. 
                Tip: Alterna voces usando <code>[Voz: ID]</code> en el editor.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-black/20 rounded-3xl border border-dashed border-indigo-500/30">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-full bg-indigo-500/20 rounded-full" />
                <div className="h-4 w-3/4 bg-indigo-500/10 rounded-full" />
                <div className="flex gap-2">
                  <div className="h-8 w-1/2 bg-white dark:bg-white/5 rounded-xl border border-indigo-500/50 flex items-center px-2 text-[8px] font-bold">Pitch: +2</div>
                  <div className="h-8 w-1/2 bg-white dark:bg-white/5 rounded-xl border border-indigo-500/50 flex items-center px-2 text-[8px] font-bold">Speed: 1.2x</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Parsing Tags */}
          <section className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-800">
             <h3 className="text-xl font-bold mb-6">Etiquetas Dinámicas (Editor Pro)</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { tag: '[Voz: Sofia]', desc: 'Cambia motor de voz al instante' },
                  { tag: '[stress]Palabra[/stress]', desc: 'Énfasis: +volumen, -5% velocidad' },
                  { tag: '[BG: Lluvia]', desc: 'Activa ambiente automáticamente' },
                  { tag: '[Fact-Check]', desc: 'Llamada a API de búsqueda' }
                ].map(item => (
                  <div key={item.tag} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-indigo-200/50">
                    <code className="text-indigo-600 dark:text-indigo-400 font-bold">{item.tag}</code>
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Site Map Diagram */}
          <section>
             <h3 className="text-xl font-bold mb-6">Mapa del Sitio (Estructura)</h3>
             <div className="relative p-6 border-2 border-slate-100 dark:border-white/5 rounded-3xl">
                <div className="flex flex-col items-center gap-4">
                   <div className="w-48 p-2 bg-slate-800 text-white rounded-lg text-center text-xs font-bold">Top Bar (Banderas / Dark Mode)</div>
                   <div className="w-px h-6 bg-slate-300" />
                   <div className="flex gap-8">
                      <div className="flex flex-col items-center">
                        <div className="w-40 p-2 bg-indigo-500 text-white rounded-lg text-center text-xs font-bold">Editor (Texto / Tags)</div>
                        <div className="w-px h-4 bg-slate-300" />
                        <div className="w-32 p-1 bg-indigo-100 text-indigo-700 rounded text-[10px] text-center">Fact-Checker</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-40 p-2 bg-emerald-500 text-white rounded-lg text-center text-xs font-bold">Control (Voz / Mixer)</div>
                        <div className="w-px h-4 bg-slate-300" />
                        <div className="w-32 p-1 bg-emerald-100 text-emerald-700 rounded text-[10px] text-center">Ambiente Mixer</div>
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={onClose} className={`px-12 py-4 rounded-2xl bg-gradient-to-r ${theme} text-white font-black uppercase tracking-wider shadow-xl hover:scale-105 transition-all`}>
            Entendido, ¡A Producir!
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
