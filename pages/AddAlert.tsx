
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS, MOCK_PRICES } from '../constants';
import { Product, PriceAlert } from '../types';

const AddAlert: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetPrice, setTargetPrice] = useState('');
  const [currency, setCurrency] = useState('Bs.');
  const [isSaving, setIsSaving] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!search) return [];
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const bestCurrentPrice = useMemo(() => {
    if (!selectedProduct) return null;
    const prices = MOCK_PRICES.filter(p => p.productId === selectedProduct.id);
    return prices.length > 0 ? prices.sort((a, b) => a.priceBs - b.priceBs)[0] : null;
  }, [selectedProduct]);

  const handleSaveAlert = () => {
    if (!selectedProduct || !targetPrice) return;
    
    setIsSaving(true);

    const newAlert: PriceAlert = {
      id: `user-alert-${Date.now()}`,
      productName: selectedProduct.name,
      category: selectedProduct.category,
      presentation: selectedProduct.presentation,
      targetPrice: parseFloat(targetPrice),
      isActive: true,
      imageUrl: selectedProduct.imageUrl
    };

    // Pequeño delay para simular proceso y mostrar estado de carga
    setTimeout(() => {
      const existingAlerts = JSON.parse(localStorage.getItem('vibe_user_alerts') || '[]');
      localStorage.setItem('vibe_user_alerts', JSON.stringify([newAlert, ...existingAlerts]));
      setIsSaving(false);
      navigate('/alerts');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-vibe-light dark:bg-vibe-dark flex flex-col transition-all duration-500">
      <header className="px-6 pt-10 pb-6 sticky top-0 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl z-50 flex items-center border-b border-black/[0.03] dark:border-white/[0.03]">
        <button 
          onClick={() => navigate(-1)} 
          className="w-11 h-11 flex items-center justify-center rounded-lg bg-white dark:bg-vibe-card border border-black/[0.04] active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
        <h2 className="flex-1 text-sm font-black uppercase tracking-[0.2em] text-center pr-11 opacity-40">Configurar Alerta</h2>
      </header>

      <main className="flex-1 p-6 space-y-10">
        {/* Buscador de Producto */}
        {!selectedProduct ? (
          <section className="animate-in fade-in slide-in-from-bottom-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 mb-5 px-1">¿Qué quieres vigilar?</h3>
            <div className="relative mb-6">
              <input 
                type="text"
                placeholder="Busca un producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 bg-white dark:bg-vibe-card rounded-2xl border-none shadow-vibe px-12 font-bold text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary fill-icon">search</span>
            </div>

            <div className="flex flex-col gap-3">
              {filteredProducts.map((p) => (
                <button 
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="bg-white dark:bg-vibe-card p-4 rounded-xl flex items-center gap-4 border border-black/[0.03] dark:border-white/[0.03] shadow-sm active:scale-[0.98] transition-all text-left"
                >
                  <div className="w-12 h-12 rounded-lg bg-vibe-light dark:bg-vibe-dark border border-black/[0.05] overflow-hidden shrink-0">
                    <img src={p.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm tracking-tight truncate">{p.name}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40">{p.presentation}</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-xl">add_circle</span>
                </button>
              ))}
              
              {search && filteredProducts.length === 0 && (
                <div className="py-10 text-center opacity-40">
                  <p className="text-xs font-bold uppercase tracking-widest leading-loose">No encontramos ese producto.<br/>Prueba con otro nombre.</p>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
            {/* Producto Seleccionado */}
            <div className="bg-white dark:bg-vibe-card rounded-xl p-6 border border-black/[0.03] dark:border-white/[0.03] shadow-vibe flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-20 h-20 rounded-lg overflow-hidden bg-vibe-light dark:bg-vibe-dark relative border border-black/[0.05]">
                    <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" alt="" />
                 </div>
                 <div>
                    <h4 className="text-xl font-black tracking-tighter leading-tight">{selectedProduct.name}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-vibe-sub/60 mt-1">{selectedProduct.presentation}</p>
                 </div>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-10 h-10 rounded-lg bg-vibe-light dark:bg-white/5 flex items-center justify-center text-vibe-sub active:scale-90 transition-transform"
              >
                 <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
            </div>

            {/* Referencia de Precio */}
            <div className="px-1 flex justify-between items-center bg-primary/5 dark:bg-primary/10 p-5 rounded-xl border border-primary/10">
               <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">Mejor precio hoy</p>
                  <p className="text-2xl font-black tracking-tighter text-vibe-text dark:text-white">
                    {bestCurrentPrice ? `Bs. ${bestCurrentPrice.priceBs.toLocaleString('es-VE', { minimumFractionDigits: 2 })}` : 'S/P'}
                  </p>
               </div>
               <div className="text-right">
                  <p className="text-[9px] font-black uppercase tracking-widest text-vibe-sub mb-1">Tienda</p>
                  <p className="text-xs font-bold tracking-tight opacity-70">{bestCurrentPrice?.storeName || 'Desconocido'}</p>
               </div>
            </div>

            {/* Configurar Precio Objetivo */}
            <div className="bg-white dark:bg-vibe-card rounded-xl p-8 border border-black/[0.04] dark:border-white/[0.04] shadow-vibe">
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-vibe-sub/60 mb-6 text-center">Notificarme si baja de...</h3>
               
               <div className="flex flex-col gap-8">
                  <div className="flex items-baseline justify-center gap-3 border-b-2 border-black/[0.03] dark:border-white/[0.08] pb-6 focus-within:border-primary transition-all">
                     <span className="text-2xl font-black text-primary uppercase opacity-60 leading-none">{currency}</span>
                     <input 
                        type="number"
                        placeholder="0.00"
                        value={targetPrice}
                        onChange={(e) => setTargetPrice(e.target.value)}
                        autoFocus
                        className="bg-transparent border-none focus:ring-0 text-6xl font-black tracking-tighter p-0 w-44 text-center placeholder:opacity-5"
                     />
                  </div>

                  <div className="flex gap-3">
                     {['Bs.', 'USD'].map((curr) => (
                        <button
                           key={curr}
                           onClick={() => setCurrency(curr)}
                           className={`flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${currency === curr ? 'bg-primary text-white shadow-primary-glow border-transparent' : 'bg-vibe-light dark:bg-white/[0.03] text-vibe-sub opacity-40 border-black/[0.04]'}`}
                        >
                           {curr === 'Bs.' ? 'Bolívares' : 'Dólares'}
                        </button>
                     ))}
                  </div>
               </div>
            </div>

            {/* Hint */}
            <div className="flex items-start gap-4 px-4 py-2">
               <span className="material-symbols-outlined text-primary text-[20px] fill-icon">info</span>
               <p className="text-[11px] font-medium text-vibe-sub/80 leading-relaxed">
                  Recibirás una notificación push y un correo electrónico en cuanto detectemos un precio menor o igual a tu objetivo.
               </p>
            </div>
          </section>
        )}
      </main>

      {selectedProduct && (
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-6 bg-vibe-light/95 dark:bg-vibe-dark/95 backdrop-blur-xl border-t border-black/[0.04] z-50 animate-in slide-in-from-bottom-4">
          <button 
            onClick={handleSaveAlert}
            disabled={!targetPrice || isSaving}
            className="w-full h-16 bg-gradient-to-br from-primary via-primary to-orange-600 text-white rounded-xl font-black uppercase tracking-[0.2em] text-[11px] shadow-[0_20px_40px_-10px_rgba(249,97,21,0.5)] border border-white/20 active:scale-[0.98] transition-all disabled:opacity-20 flex items-center justify-center gap-3"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registrando...
              </>
            ) : (
              <>
                Activar Monitor
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </>
            )}
          </button>
        </footer>
      )}
    </div>
  );
};

export default AddAlert;
