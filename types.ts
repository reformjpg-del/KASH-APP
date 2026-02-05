
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string; // Cambiado a string para mayor flexibilidad con los IDs de categorías
  presentation: string;
  imageUrl: string;
}

export interface StorePrice {
  id: string;
  productId: string;
  storeName: string;
  priceBs: number;
  priceUsd: number;
  distanceKm: number;
  location: string;
  address: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
  popularity: number; // 0-100 score
  createdAt: string; // ISO date for "recents"
}

export interface UserActivity {
  id: string;
  type: 'report' | 'verification' | 'search';
  description: string;
  detail: string;
  points: number;
  date: string;
}

export interface PriceAlert {
  id: string;
  productName: string;
  category: string;
  presentation: string;
  targetPrice: number;
  isActive: boolean;
  imageUrl: string;
}

export interface VibeNotification {
  id: string;
  type: 'price_drop' | 'system' | 'points_earned';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  productId?: string;
  priceBefore?: number;
  priceNow?: number;
  storeName?: string;
  imageUrl?: string;
}
