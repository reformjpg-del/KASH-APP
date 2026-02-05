
import { Product, StorePrice, UserActivity, PriceAlert, VibeNotification } from './types';

export const BCV_RATE = 36.58; // Tasa oficial de referencia

export const CATEGORIES_CONFIG = [
  { id: '1', name: 'Medicamentos', icon: 'medical_services', count: '1.2k', color: 'bg-blue-500/10 text-blue-600', accent: '#2563eb' },
  { id: '2', name: 'Supermercado', icon: 'shopping_basket', count: '4.5k', color: 'bg-green-500/10 text-green-600', accent: '#16a34a' },
  { id: '3', name: 'Tecnología', icon: 'devices', count: '850', color: 'bg-purple-500/10 text-purple-600', accent: '#9333ea' },
  { id: '4', name: 'Hogar', icon: 'home', count: '1.1k', color: 'bg-orange-500/10 text-orange-600', accent: '#ea580c' },
  { id: '5', name: 'Mascotas', icon: 'pets', count: '600', color: 'bg-yellow-600/10 text-yellow-700', accent: '#ca8a04' },
  { id: '6', name: 'Belleza', icon: 'content_cut', count: '920', color: 'bg-pink-500/10 text-pink-600', accent: '#db2777' },
  { id: '7', name: 'Deportes', icon: 'fitness_center', count: '430', color: 'bg-cyan-500/10 text-cyan-600', accent: '#0891b2' },
  { id: '8', name: 'Bebés', icon: 'child_care', count: '780', color: 'bg-indigo-500/10 text-indigo-600', accent: '#4f46e5' },
  { id: '9', name: 'Librería', icon: 'menu_book', count: '310', color: 'bg-rose-500/10 text-rose-600', accent: '#e11d48' },
  { id: '10', name: 'Herramientas', icon: 'build', count: '540', color: 'bg-slate-500/10 text-slate-600', accent: '#475569' },
  { id: '11', name: 'Automotriz', icon: 'directions_car', count: '290', color: 'bg-red-500/10 text-red-600', accent: '#dc2626' },
  { id: '12', name: 'Moda', icon: 'checkroom', count: '1.8k', color: 'bg-teal-500/10 text-teal-600', accent: '#0d9488' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Ibuprofeno 600mg', description: 'Antiinflamatorio no esteroideo indicado para el alivio del dolor y la inflamación.', category: '1', presentation: 'Caja 20 tabletas', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: '2', name: 'Atamel 500mg', description: 'Analgésico y antipirético para malestares generales. Recomendado para dolores de cabeza y fiebre leve.', category: '1', presentation: 'Blister 10 tabletas', imageUrl: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: '3', name: 'Vitamina C 1g', description: 'Suplemento alimenticio efervescente.', category: '1', presentation: 'Tubo 10 tabletas', imageUrl: 'https://images.unsplash.com/photo-1616671276441-2f2c277b8bf4?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: '4', name: 'Amoxicilina 500mg', description: 'Antibiótico de amplio espectro (Requiere récipe).', category: '1', presentation: 'Caja 15 cápsulas', imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=400&h=400&auto=format&fit=crop' },
  { id: '5', name: 'Harina PAN 1kg', description: 'Harina de maíz precocida.', category: '2', presentation: 'Paquete 1kg', imageUrl: 'https://picsum.photos/seed/harina/400/400' },
  { id: '6', name: 'iPhone 15 Pro', description: 'Smartphone Apple.', category: '3', presentation: '128GB Titanium', imageUrl: 'https://picsum.photos/seed/iphone/400/400' },
];

export const MOCK_PRICES: StorePrice[] = [
  {
    id: 'p1', productId: '1', storeName: 'Farmatodo', priceBs: 450.00, priceUsd: 12.50, distanceKm: 0.8,
    location: 'Los Palos Grandes', address: 'Av. Francisco de Miranda, Caracas',
    stockStatus: 'in-stock', lastUpdated: 'Hoy', popularity: 95, createdAt: '2024-03-20T10:00:00Z'
  },
  {
    id: 'p2', productId: '2', storeName: 'Locatel', priceBs: 320.00, priceUsd: 8.90, distanceKm: 1.5,
    location: 'Chacao', address: 'Av. Libertador, Edif. Locatel',
    stockStatus: 'in-stock', lastUpdated: 'Hace 2h', popularity: 88, createdAt: '2024-03-20T11:00:00Z'
  },
  {
    id: 'p2_alt', productId: '2', storeName: 'Farmahorro', priceBs: 355.00, priceUsd: 9.80, distanceKm: 0.5,
    location: 'Altamira', address: 'Av. San Juan Bosco',
    stockStatus: 'low-stock', lastUpdated: 'Hace 1h', popularity: 75, createdAt: '2024-03-20T14:00:00Z'
  },
  {
    id: 'p2_alt2', productId: '2', storeName: 'Farmatodo', priceBs: 315.00, priceUsd: 8.75, distanceKm: 2.2,
    location: 'Las Mercedes', address: 'Av. Principal de las Mercedes',
    stockStatus: 'in-stock', lastUpdated: 'Hoy', popularity: 92, createdAt: '2024-03-20T09:00:00Z'
  },
  {
    id: 'p3', productId: '3', storeName: 'Farmahorro', priceBs: 180.00, priceUsd: 5.00, distanceKm: 0.5,
    location: 'Altamira', address: 'Av. San Juan Bosco',
    stockStatus: 'low-stock', lastUpdated: 'Ayer', popularity: 70, createdAt: '2024-03-19T10:00:00Z'
  },
  {
    id: 'p6', productId: '5', storeName: 'Central Madeirense', priceBs: 38.50, priceUsd: 1.07, distanceKm: 1.2,
    location: 'Chacao', address: 'Centro Comercial San Ignacio',
    stockStatus: 'in-stock', lastUpdated: 'Hace 1h', popularity: 99, createdAt: '2024-03-20T15:00:00Z'
  }
];

export const MOCK_NOTIFICATIONS: VibeNotification[] = [
  { id: 'n1', type: 'price_drop', title: '¡Baja de precio!', message: 'El Atamel bajó en Locatel.', date: 'Hace 5 min', isRead: false, productId: 'p2' },
  { id: 'n2', type: 'points_earned', title: '¡Has ganado puntos!', message: 'Tu reporte de Ibuprofeno fue verificado.', date: 'Hace 1 hora', isRead: true, productId: 'p1' }
];

export const MOCK_ALERTS: PriceAlert[] = [
  { id: 'a1', productName: 'Atamel 500mg', category: '1', presentation: '10 tabletas', targetPrice: 4.50, isActive: true, imageUrl: 'https://picsum.photos/seed/atamel/100/100' }
];

export const MOCK_HISTORY: UserActivity[] = [
  { id: 'h1', type: 'report', description: 'Reportaste un precio', detail: 'Exito en Chedraui', points: 10, date: 'Hace 2 horas' }
];
