
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const handleAuth = (type: string) => {
    setIsBusy(true);
    // Simular proceso de autenticación
    setTimeout(() => {
      onLogin();
      setIsBusy(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-vibe-light dark:bg-vibe-dark flex flex-col p-8 transition-all duration-500 relative overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-md mx-auto w-full">
        <header className="pt-12 pb-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-primary-glow mb-6 animate-in zoom-in duration-700">
            <span className="material-symbols-outlined text-white text-3xl fill-icon">bolt</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 animate-in fade-in slide-in-from-bottom-2 duration-700 uppercase">KASH</h1>
          <p className="text-vibe-sub dark:text-gray-400 font-bold text-sm uppercase tracking-widest opacity-60 animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100">Ingresa a tu cuenta KASH</p>
        </header>

        <main className="flex-1 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          {/* Email Form */}
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-xl px-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>
            <div className="relative">
              <input 
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-xl px-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>
            <button 
              onClick={() => handleAuth('email')}
              disabled={isBusy || !email || !password}
              className="w-full h-16 bg-primary text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] shadow-primary-glow active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-30"
            >
              {isBusy ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Entrar en KASH'}
            </button>
          </div>

          <div className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-black/[0.05] dark:bg-white/10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-vibe-sub/40">o continuar con</span>
            <div className="flex-1 h-px bg-black/[0.05] dark:bg-white/10" />
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => handleAuth('google')}
              className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-xl flex items-center px-6 gap-4 shadow-sm active:scale-[0.98] transition-all"
            >
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-6 h-6 object-contain" alt="Google" />
              <span className="flex-1 text-center font-bold text-sm tracking-tight">Google</span>
            </button>

            <button 
              onClick={() => handleAuth('apple')}
              className="w-full h-14 bg-white dark:bg-vibe-card border border-black/[0.04] dark:border-white/10 rounded-xl flex items-center px-6 gap-4 shadow-sm active:scale-[0.98] transition-all"
            >
              <svg className="w-6 h-6 shrink-0 text-black dark:text-white" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span className="flex-1 text-center font-bold text-sm tracking-tight">Apple</span>
            </button>
          </div>
        </main>

        <footer className="pt-10 pb-6 text-center animate-in fade-in duration-1000 delay-500">
           <p className="text-vibe-sub/60 text-[11px] font-medium mb-4">¿No tienes cuenta KASH?</p>
           <button 
            onClick={() => navigate('/signup')}
            className="text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:underline"
           >
            Crear nueva cuenta
           </button>
        </footer>
      </div>
    </div>
  );
};

export default Login;
