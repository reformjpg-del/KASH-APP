
import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "El radar de ahorro más potente",
      desc: "Compara precios de medicinas y víveres en tiempo real. KASH escanea tu ciudad por ti.",
      icon: "radar",
      accent: "from-primary/20 to-orange-500/10",
      badge: "VELOCIDAD"
    },
    {
      title: "Tus reportes valen oro",
      desc: "Ayuda a la comunidad reportando precios y gana KASH Points para desbloquear beneficios exclusivos.",
      icon: "military_tech",
      accent: "from-blue-500/20 to-indigo-500/10",
      badge: "COMUNIDAD"
    },
    {
      title: "Inteligencia a tu servicio",
      desc: "Activa monitores de precio y deja que nuestra IA te avise el momento exacto para comprar.",
      icon: "psychology",
      accent: "from-green-500/20 to-emerald-500/10",
      badge: "SMART"
    }
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-vibe-light dark:bg-vibe-dark transition-colors duration-700">
      {/* Dynamic Background Mesh - More subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[120%] h-[60%] rounded-full blur-[140px] transition-all duration-1000 bg-gradient-to-br ${steps[step].accent} opacity-60`} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[40%] rounded-full blur-[100px] opacity-10 bg-primary" />
      </div>

      <header className="relative z-10 px-8 pt-14 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-primary-glow">
            <span className="material-symbols-outlined text-white text-sm fill-icon">bolt</span>
          </div>
          <span className="font-black tracking-tighter text-sm uppercase">KASH</span>
        </div>
        <button 
          onClick={onComplete}
          className="px-5 py-2 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 hover:text-primary transition-all active:scale-95"
        >
          Saltar
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Adjusted Hero Area - More compact (44x44) */}
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-primary/10 rounded-[2.2rem] rotate-3 scale-90 blur-md group-hover:rotate-6 transition-transform duration-700" />
          <div className="relative w-44 h-44 bg-white/50 dark:bg-vibe-card/50 backdrop-blur-2xl rounded-[2rem] border border-white/60 dark:border-white/10 shadow-lg flex items-center justify-center overflow-hidden">
             {/* Abstract animated shapes */}
             <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full border-[1px] border-dashed border-primary/40 rounded-full animate-[spin_30s_linear_infinite]" />
             </div>
             
             <div key={step} className="animate-in zoom-in-90 fade-in duration-500 flex flex-col items-center">
                <span className="material-symbols-outlined text-6xl text-primary fill-icon drop-shadow-sm">
                  {steps[step].icon}
                </span>
             </div>
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white dark:bg-vibe-dark rounded-xl shadow-md border border-black/[0.03] dark:border-white/10">
             <span className="text-[7px] font-black uppercase tracking-[0.4em] text-primary">{steps[step].badge}</span>
          </div>
        </div>

        {/* Text Content */}
        <div key={`text-${step}`} className="max-w-xs animate-in slide-in-from-bottom-2 fade-in duration-500">
          <h1 className="text-2xl font-black tracking-tighter leading-tight mb-4 px-2">
            {steps[step].title}
          </h1>
          <p className="text-vibe-sub dark:text-gray-400 text-xs font-medium leading-relaxed opacity-70 px-6">
            {steps[step].desc}
          </p>
        </div>
      </main>

      <footer className="relative z-10 px-8 pb-16 flex flex-col gap-10">
        {/* Progress Dots */}
        <div className="flex justify-center gap-3">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-primary shadow-primary-glow' : 'w-1 bg-vibe-sub/20 dark:bg-white/10'
              }`} 
            />
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <button 
            onClick={next}
            className="group relative w-full h-16 bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_auto] hover:bg-right text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-primary-glow overflow-hidden active:scale-[0.96] transition-all flex items-center justify-center gap-4"
          >
            {/* Liquid mirror overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            
            <span className="relative z-10">
              {step === steps.length - 1 ? 'Empezar ahora' : 'Siguiente paso'}
            </span>
            <div className="relative z-10 w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </button>
          
          <button 
            onClick={onComplete}
            className="w-full py-1 text-[9px] font-black uppercase tracking-[0.25em] text-vibe-sub/40 hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            ¿Ya tienes cuenta? <span className="text-primary/80">Entrar</span>
          </button>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
