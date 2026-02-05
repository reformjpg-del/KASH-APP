
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

const Signup: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isBusy, setIsBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    setIsBusy(true);
    // Simular creación de cuenta
    setTimeout(() => {
      onLogin();
      setIsBusy(false);
    }, 1500);
  };

  const isFormValid = 
    formData.fullName && 
    formData.email && 
    formData.password && 
    formData.password === formData.confirmPassword &&
    agreed;

  return (
    <div className="min-h-screen bg-vibe-light dark:bg-vibe-dark flex flex-col p-8 transition-all duration-500 relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-40 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[60%] h-[60%] bg-primary rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-md mx-auto w-full">
        <header className="pt-10 pb-12 flex flex-col items-center text-center">
          <button 
            onClick={() => navigate('/login')}
            className="absolute left-0 top-10 w-10 h-10 rounded-xl bg-white/50 dark:bg-vibe-card/50 backdrop-blur-md flex items-center justify-center border border-black/[0.03] dark:border-white/10 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-primary-glow mb-5 animate-in zoom-in duration-500">
            <span className="material-symbols-outlined text-white text-2xl fill-icon">person_add</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter mb-1 animate-in fade-in slide-in-from-bottom-2 duration-700">Crea tu cuenta</h1>
          <p className="text-vibe-sub dark:text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] opacity-60 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100 uppercase">Comunidad KASH</p>
        </header>

        <form onSubmit={handleSignup} className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="space-y-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-vibe-sub/40 text-[20px]">person</span>
              <input 
                type="text"
                placeholder="Nombre completo"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-2xl pl-14 pr-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-vibe-sub/40 text-[20px]">mail</span>
              <input 
                type="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-2xl pl-14 pr-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-vibe-sub/40 text-[20px]">lock</span>
              <input 
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-2xl pl-14 pr-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 px-1 mt-2">
            <button 
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${agreed ? 'bg-primary border-primary text-white shadow-primary-glow' : 'border-black/20 dark:border-white/20 bg-transparent'}`}
            >
              {agreed && <span className="material-symbols-outlined text-[14px] font-bold">check</span>}
            </button>
            <p className="text-[10px] font-medium text-vibe-sub leading-relaxed">
              Acepto los <span className="text-primary font-bold">Términos</span> y la <span className="text-primary font-bold">Privacidad</span> de KASH.
            </p>
          </div>

          <button 
            type="submit"
            disabled={!isFormValid || isBusy}
            className="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-primary-glow active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30 mt-4"
          >
            {isBusy ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Registrarme en KASH'}
          </button>
        </form>

        <footer className="pt-8 pb-6 text-center animate-in fade-in duration-1000 delay-500">
           <p className="text-vibe-sub/60 text-[11px] font-medium mb-3">¿Ya tienes cuenta KASH?</p>
           <button 
            onClick={() => navigate('/login')}
            className="text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:underline"
           >
             Inicia sesión aquí
           </button>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
