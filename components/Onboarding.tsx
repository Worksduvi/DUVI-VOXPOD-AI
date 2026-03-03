
import React, { useState, useEffect } from 'react';

interface OnboardingProps {
  onClose: () => void;
  theme: string;
}

const Onboarding: React.FC<OnboardingProps> = ({ onClose, theme }) => {
  const [step, setStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  
  const screens = [
    {
      title: "DUVIVOX STUDIO PRO",
      text: "Bienvenido a la plataforma definitiva de síntesis de voz. Convierte tus textos en experiencias auditivas cinematográficas con IA de última generación.",
      quote: "Donde la tecnología encuentra su alma."
    },
    {
      title: "DUVIPOD INTELLIGENCE",
      text: "Nuestra herramienta insignia para podcasters. Pega un link de YouTube o un documento denso; la IA investigará los datos y creará un guion profesional de hasta 90 minutos."
    },
    {
      title: "MIXER ATMOSFÉRICO",
      text: "No es solo voz. Mezcla ruidos de ambiente de alta calidad para que tus oyentes se sumerjan en la historia. Controla el ambiente en tiempo real."
    }
  ];

  useEffect(() => {
    let i = 0;
    const fullText = screens[step].text;
    setDisplayText('');
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-700">
      <div className="max-w-3xl w-full bg-slate-900 rounded-[4rem] p-12 shadow-[0_0_100px_rgba(99,102,241,0.15)] border border-white/10 relative overflow-hidden">
        <div className={`absolute -top-24 -left-24 w-80 h-80 bg-gradient-to-br ${theme} opacity-10 blur-3xl rounded-full`} />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className={`h-24 w-24 rounded-3xl bg-gradient-to-br ${theme} flex items-center justify-center shadow-2xl mb-10 transform -rotate-6`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>

          <h2 className="text-5xl font-black tracking-tighter mb-6 shimmer-text italic">{screens[step].title}</h2>
          <p className="text-xl text-slate-300 font-light leading-relaxed min-h-[120px] max-w-xl">
            {displayText}
          </p>
          
          {screens[step].quote && (
            <p className="mt-4 text-indigo-400 font-bold tracking-widest italic">{screens[step].quote}</p>
          )}

          <div className="flex gap-3 mt-12">
            {screens.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === step ? 'w-12 bg-indigo-500' : 'w-3 bg-white/10'}`} />
            ))}
          </div>

          <div className="flex gap-4 mt-12 w-full max-w-md">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 py-4 rounded-2xl bg-white/5 font-bold hover:bg-white/10 border border-white/5 transition-all uppercase text-xs tracking-widest">Atrás</button>
            )}
            {step < screens.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className={`flex-[2] py-4 rounded-2xl bg-gradient-to-r ${theme} text-white font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all`}>Siguiente</button>
            ) : (
              <button onClick={onClose} className={`flex-[2] py-4 rounded-2xl bg-gradient-to-r ${theme} text-white font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all animate-pulse`}>Entrar al Estudio</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
