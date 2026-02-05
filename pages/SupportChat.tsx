
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: 'user' | 'model' | 'system_alert';
  text: string;
  timestamp: Date;
}

const SupportChat: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      role: 'model',
      text: '¡Hola! Soy KASH AI, tu asistente virtual. Estoy aquí para resolver tus dudas sobre el uso de la app, precios y puntos. Si necesitas hablar con una persona, dímelo en cualquier momento.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHumanSupport, setIsHumanSupport] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleHumanTransfer = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'transfer',
        role: 'system_alert',
        text: '🔄 Transfiriendo a un agente humano... Espere un momento.',
        timestamp: new Date()
      }]);
      
      setTimeout(() => {
        setIsHumanSupport(true);
        setIsLoading(false);
        setMessages(prev => [...prev, {
          id: 'human_welcome',
          role: 'model',
          text: 'Hola, soy Carlos de Soporte KASH. He revisado tu conversación con la IA. ¿En qué puedo ayudarte personalmente?',
          timestamp: new Date()
        }]);
      }, 1500);
    }, 500);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');

    if (isHumanSupport) {
      // Simulación de respuesta humana
      setIsLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          text: 'Entiendo perfectamente. Déjame revisar tu cuenta para darte una solución exacta.',
          timestamp: new Date()
        }]);
        setIsLoading(false);
      }, 2000);
      return;
    }

    // Lógica para detectar petición de humano
    const humanKeywords = ['humano', 'persona', 'agente', 'soporte real', 'hablar con alguien', 'no me ayudas'];
    if (humanKeywords.some(key => currentInput.toLowerCase().includes(key))) {
      handleHumanTransfer();
      return;
    }

    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Eres KASH AI, el asistente virtual oficial de KASH.
TU REGLA DE ORO: Solo hablas sobre la aplicación KASH. 
Temas permitidos: Comparación de precios, reportar precios, ganar KASH Points, niveles (Cazador, Observador), alertas de precio, ahorro en Venezuela (Bs/USD), y uso general de la interfaz.
Temas prohibidos: Recetas de cocina, política, deportes ajenos a la app, consejos médicos, programación, etc.
Si te preguntan algo fuera de KASH, responde: "Lo siento, como asistente de KASH solo puedo ayudarte con temas relacionados a nuestra plataforma de ahorro. ¿Tienes alguna duda sobre precios o puntos?"
Si el usuario parece frustrado o pide específicamente un humano, dile: "Entiendo que necesitas atención personalizada. Por favor, pulsa el botón 'Hablar con humano' o dímelo para transferirte."`,
        },
      });

      const response = await chat.sendMessage({ message: currentInput });
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || 'No pude procesar eso. ¿Podrías reformular tu duda sobre KASH?',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: 'Error de conexión. Inténtalo de nuevo o solicita un agente humano.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = isHumanSupport ? [] : [
    "¿Cómo gano puntos?",
    "¿Qué es un Cazador?",
    "Hablar con humano 👤",
    "Problema con reporte"
  ];

  return (
    <div className="flex flex-col h-screen bg-vibe-light dark:bg-vibe-dark">
      <header className="px-6 pt-12 pb-6 sticky top-0 bg-white/80 dark:bg-vibe-dark/80 backdrop-blur-xl z-50 border-b border-black/[0.03] flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
        </button>
        <div className="text-center">
           <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-1">
             {isHumanSupport ? 'Soporte Directo' : 'Soporte Inteligente'}
           </h2>
           <div className="flex items-center gap-1.5 justify-center">
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHumanSupport ? 'bg-blue-500' : 'bg-green-500'}`} />
              <p className="text-sm font-black tracking-tight">{isHumanSupport ? 'Agente Carlos' : 'KASH AI'}</p>
           </div>
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${isHumanSupport ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'}`}>
           <span className="material-symbols-outlined fill-icon">{isHumanSupport ? 'support_agent' : 'smart_toy'}</span>
        </div>
      </header>

      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : msg.role === 'system_alert' ? 'justify-center' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {msg.role === 'system_alert' ? (
              <div className="bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-vibe-sub">
                {msg.text}
              </div>
            ) : (
              <div 
                className={`max-w-[85%] px-5 py-4 rounded-[1.8rem] shadow-sm text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-vibe-card text-vibe-text dark:text-white rounded-tl-none border border-black/[0.02] dark:border-white/[0.02]'
                }`}
              >
                {msg.text}
                <p className={`text-[8px] mt-2 font-black uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-white' : 'text-vibe-sub'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white dark:bg-vibe-card px-5 py-4 rounded-[1.8rem] rounded-tl-none border border-black/[0.02] flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 bg-white/80 dark:bg-vibe-dark/80 backdrop-blur-md border-t border-black/[0.03] z-50">
        {!isHumanSupport && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 mb-2">
             {quickQuestions.map((q) => (
               <button 
                 key={q}
                 onClick={() => { 
                   if (q.includes('humano')) handleHumanTransfer();
                   else setInput(q); 
                 }}
                 className="px-4 py-2 bg-vibe-light dark:bg-white/5 border border-black/[0.04] dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap active:scale-95 transition-all text-vibe-sub hover:border-primary/40 hover:text-primary"
               >
                 {q}
               </button>
             ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input 
              type="text"
              placeholder={isHumanSupport ? "Escribe al soporte humano..." : "Pregunta sobre KASH..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full h-14 bg-vibe-light dark:bg-white/5 border-none rounded-2xl px-6 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-vibe-sub/30"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-primary-glow active:scale-90 transition-all disabled:opacity-20 ${isHumanSupport ? 'bg-blue-500' : 'bg-primary'} text-white`}
          >
            <span className="material-symbols-outlined fill-icon text-2xl">send</span>
          </button>
        </div>
        {isHumanSupport && (
          <p className="text-center mt-4 text-[9px] font-black uppercase tracking-[0.2em] text-vibe-sub/40 animate-pulse">
            Soporte Humano Conectado
          </p>
        )}
      </footer>
    </div>
  );
};

export default SupportChat;
