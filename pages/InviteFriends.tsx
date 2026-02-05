
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const InviteFriends: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const referralCode = "KASH-ALEX-2025";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Únete a KASH',
      text: `¡Ahorra comparando precios con mi código ${referralCode}!`,
      url: 'https://kash.app/join'
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopy();
      }
      
      // Simular ganar puntos
      if (!rewardClaimed) {
        setTimeout(() => setRewardClaimed(true), 1000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="pb-40 min-h-screen bg-vibe-light dark:bg-vibe-dark transition-all duration-500 overflow-x-hidden">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 flex items-center border-b border-black/[0.03] dark:border-white/[0.03]">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="flex-1 text-center pr-11">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 leading-none mb-1">Comunidad</h2>
           <p className="text-sm font-black tracking-tight">Invitar a KASH</p>
        </div>
      </header>

      <main className="p-6">
        <div className="relative py-12 flex flex-col items-center text-center">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />
           
           <div className="w-40 h-40 relative mb-8">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] rotate-12 animate-pulse" />
              <div className="absolute inset-0 bg-primary rounded-[3rem] shadow-primary-glow flex items-center justify-center text-white">
                 <span className="material-symbols-outlined text-7xl fill-icon">groups</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-vibe-dark p-3 rounded-2xl shadow-xl">
                 <span className="material-symbols-outlined text-primary fill-icon text-2xl">card_giftcard</span>
              </div>
           </div>

           <h1 className="text-4xl font-black tracking-tighter leading-none mb-4">Gana 100 PTS<br/>por Invitado</h1>
           <p className="text-vibe-sub/80 dark:text-gray-400 text-sm font-medium max-w-[280px] leading-relaxed">
             Ayuda a tus amigos a ahorrar y obtén puntos KASH para subir de nivel y obtener beneficios exclusivos.
           </p>
        </div>

        <div className="bg-white dark:bg-vibe-card rounded-[2.8rem] p-8 border border-black/[0.03] dark:border-white/[0.03] shadow-vibe mb-8 flex flex-col items-center">
           <p className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/40 mb-6">Tu Código KASH</p>
           
           <div className="w-full flex items-center gap-3 p-2 bg-vibe-light dark:bg-white/5 rounded-2xl border border-black/[0.02]">
              <div className="flex-1 text-center font-black text-xl tracking-tight text-primary font-mono py-2">
                 {referralCode}
              </div>
              <button 
                onClick={handleCopy}
                className="w-12 h-12 bg-white dark:bg-vibe-card rounded-xl flex items-center justify-center shadow-sm active:scale-90 transition-all"
              >
                 <span className={`material-symbols-outlined text-[20px] ${copied ? 'text-green-500' : 'text-vibe-sub/40'}`}>
                    {copied ? 'check_circle' : 'content_copy'}
                 </span>
              </button>
           </div>
        </div>

        <button 
          onClick={handleShare}
          className="w-full h-18 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 shadow-primary-glow active:scale-95 transition-all mb-10"
        >
          <span className="material-symbols-outlined text-xl">share</span>
          Compartir KASH
        </button>

        {rewardClaimed && (
          <div className="animate-in zoom-in slide-in-from-bottom-4 duration-500 mb-10">
            <div className="bg-green-500 text-white p-6 rounded-[2.5rem] flex items-center gap-5 shadow-lg shadow-green-500/20">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined fill-icon text-2xl">stars</span>
               </div>
               <div className="flex-1">
                  <p className="font-black text-sm tracking-tight leading-none mb-1">¡Puntos KASH Obtenidos!</p>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">Has ganado +100 KASH Points</p>
               </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
           <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 px-2">¿Cómo funciona?</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { i: '1', t: 'Comparte tu link', d: 'Envía tu código KASH a tus amigos por WhatsApp o redes.' },
                { i: '2', t: 'Ellos se unen', d: 'Tus amigos crean su cuenta usando tu referido.' },
                { i: '3', t: '¡Ambos ganan!', d: 'Recibes 100 PTS KASH y ellos obtienen un estatus especial.' }
              ].map((step) => (
                <div key={step.i} className="bg-white dark:bg-vibe-card p-5 rounded-3xl flex items-start gap-4 border border-black/[0.02] shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs shrink-0">
                      {step.i}
                   </div>
                   <div>
                      <p className="font-black text-sm tracking-tight mb-0.5">{step.t}</p>
                      <p className="text-[11px] font-medium text-vibe-sub/60 leading-relaxed">{step.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default InviteFriends;
