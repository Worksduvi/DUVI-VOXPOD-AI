
import React from 'react';

const Stats: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/5 group-hover:bg-indigo-500/10 transition-colors" />
          <div className="text-5xl font-black text-indigo-500 mb-2 relative z-10">1.2k</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] relative z-10">Minutos Generados</div>
        </div>
        
        <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
          <div className="text-5xl font-black text-emerald-500 mb-2 relative z-10">52</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] relative z-10">Proyectos Pod</div>
        </div>

        <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-rose-500/5 group-hover:bg-rose-500/10 transition-colors" />
          <div className="text-5xl font-black text-rose-500 mb-2 relative z-10">124k</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] relative z-10">Syllables OK</div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/5 p-10 rounded-[3rem] shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-black text-xl uppercase tracking-tighter">Rendimiento de Procesamiento</h3>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full" />
            <span className="w-3 h-3 bg-indigo-500/50 rounded-full" />
            <span className="w-3 h-3 bg-indigo-500/20 rounded-full" />
          </div>
        </div>
        <div className="flex items-end justify-between h-48 gap-4 px-4">
          {[40, 75, 45, 95, 65, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 group relative">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-600 text-[10px] font-black px-2 py-1 rounded">
                {h}%
              </div>
              <div 
                className="w-full bg-gradient-to-t from-indigo-600 via-indigo-400 to-cyan-300 rounded-2xl transition-all duration-700 hover:brightness-125 cursor-pointer" 
                style={{height: `${h}%`}}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6 text-[11px] font-black text-slate-500 uppercase tracking-widest px-4">
          <span>Lunes</span><span>Martes</span><span>Mié</span><span>Juev</span><span>Vier</span><span>Sáb</span><span>Dom</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
