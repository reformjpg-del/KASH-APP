
import { Product, StorePrice, UserActivity, PriceAlert, VibeNotification } from './types';

export const BCV_RATE = 36.58; 

export interface Store {
  id: string;
  name: string;
  logo: string;
  type: string;
  rating: number;
  distance: string;
}

export const MOCK_STORES: Store[] = [
  { id: 's1', name: 'Farmatodo', logo: 'https://picsum.photos/seed/farmatodo/200/200', type: 'Farmacia', rating: 4.8, distance: '0.8 km' },
  { id: 's2', name: 'Luxor', logo: 'https://picsum.photos/seed/luxor/200/200', type: 'Supermercado', rating: 4.5, distance: '1.2 km' },
  { id: 's3', name: 'Forum', logo: 'https://picsum.photos/seed/forum/200/200', type: 'Mayorista', rating: 4.2, distance: '2.5 km' },
  { id: 's4', name: 'Locatel', logo: 'https://picsum.photos/seed/locatel/200/200', type: 'Salud', rating: 4.7, distance: '1.5 km' },
  { id: 's5', name: 'Bio', logo: 'https://picsum.photos/seed/bio/200/200', type: 'Mercado', rating: 4.4, distance: '3.1 km' },
  { id: 's6', name: 'Traki', logo: 'https://picsum.photos/seed/traki/200/200', type: 'Tienda por Dept.', rating: 4.0, distance: '4.2 km' },
];

export const CATEGORIES_CONFIG = [
  { id: '1', name: 'Salud', icon: 'medical_services', count: '1.2k', color: 'bg-blue-500/10 text-blue-600', accent: '#2563eb' },
  { id: '2', name: 'Alimentos', icon: 'shopping_basket', count: '4.5k', color: 'bg-green-500/10 text-green-600', accent: '#16a34a' },
  { id: '3', name: 'Tecnología', icon: 'devices', count: '850', color: 'bg-purple-500/10 text-purple-600', accent: '#9333ea' },
  { id: '4', name: 'Hogar', icon: 'home', count: '1.1k', color: 'bg-orange-500/10 text-orange-600', accent: '#ea580c' },
  { id: '5', name: 'Mascotas', icon: 'pets', count: '600', color: 'bg-yellow-600/10 text-yellow-700', accent: '#ca8a04' },
  { id: '6', name: 'Belleza', icon: 'content_cut', count: '920', color: 'bg-pink-500/10 text-pink-600', accent: '#db2777' },
];

// Generador de 100 productos
const generateMockProducts = (): Product[] => {
  const categories = {
    '1': ['Ibuprofeno', 'Atamel', 'Vitamina C', 'Amoxicilina', 'Loratadina', 'Omeprazol', 'Losartan', 'Diclofenac', 'Paracetamol', 'Aspirina', 'Desloratadina', 'Cetirizina', 'Gaviscon', 'Teragrip', 'Bedoyecta', 'Glucofage', 'Eutirox', 'Enterogermina', 'Liolactil', 'Voltaren'],
    '2': ['Harina PAN', 'Arroz Mary', 'Pasta Primor', 'Aceite Diana', 'Azúcar Montalbán', 'Café Fama de América', 'Leche La Campesina', 'Mantequilla Mavesa', 'Mayonesa Kraft', 'Atún Margarita', 'Sardinas La Gaviota', 'Caraotas Negras', 'Sal Refinada', 'Vinagre Blanco', 'Salsa de Tomate', 'Pan de Sándwich', 'Queso Paisa', 'Jamón de Espalda', 'Huevos Cartón', 'Avena en Hojuelas'],
    '3': ['iPhone 15 Pro', 'Samsung Galaxy S24', 'AirPods Pro', 'Xiaomi Redmi Note 13', 'Powerbank 10000mAh', 'Cargador Tipo C', 'Laptop HP 15"', 'Monitor LG 24"', 'Teclado Mecánico', 'Mouse Gamer', 'Audífonos Sony', 'Smartwatch Huawei', 'Tablet Samsung S9', 'Nintendo Switch', 'PlayStation 5', 'Cámara Canon', 'Impresora Epson', 'Router TP-Link', 'Micro SD 128GB', 'Parlante JBL'],
    '4': ['Detergente Ariel', 'Cloro Nevex', 'Suavizante Downy', 'Jabón de Panela', 'Esponjas Scotch-Brite', 'Papel Higiénico Scott', 'Servilletas Familia', 'Bolsas de Basura', 'Desinfectante Mistolín', 'Limpia Vidrios', 'Mopa de Microfibra', 'Escoba Tradicional', 'Bombillo LED 9W', 'Insecticida Baygon', 'Fósforos El Faro', 'Velas Blancas', 'Jabón de Trastes', 'Pila Alcalina AA', 'Extensión Eléctrica', 'Guantes de Goma'],
    '5': ['Perrarina Dog Chow', 'Gatarina Cat Chow', 'Arena para Gatos', 'Shampoo para Perros', 'Collar Antipulgas', 'Juguete Mordedor', 'Snacks Dentales', 'Plato de Acero', 'Cama Acolchada', 'Transportadora L', 'Peine Metálico', 'Hueso de Carnaza', 'Vacuna Sextuple', 'Desparasitante', 'Vitaminas Caninas', 'Correa Retráctil', 'Ropa para Invierno', 'Pañales para Cachorros', 'Limpiador de Oídos', 'Cepillo de Dientes Mascota'],
  };

  const products: Product[] = [];
  Object.entries(categories).forEach(([catId, names]) => {
    names.forEach((name, i) => {
      products.push({
        id: `prod-${catId}-${i}`,
        name: name,
        description: `Producto de alta calidad para el consumo diario en la categoría ${CATEGORIES_CONFIG.find(c => c.id === catId)?.name}.`,
        category: catId,
        presentation: i % 2 === 0 ? 'Unidad estándar' : 'Empaque familiar',
        imageUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/400/400`
      });
    });
  });
  return products;
};

export const MOCK_PRODUCTS = generateMockProducts();

// Generador de Precios (400+ entradas)
const generateMockPrices = (products: Product[]): StorePrice[] => {
  const prices: StorePrice[] = [];
  const stores = MOCK_STORES;
  
  products.forEach((product) => {
    // Cada producto está en al menos 3 a 5 tiendas aleatorias
    const numStores = Math.floor(Math.random() * 3) + 3;
    const shuffledStores = [...stores].sort(() => 0.5 - Math.random()).slice(0, numStores);
    
    // Precio base aleatorio según categoría
    let basePrice = 50;
    if (product.category === '1') basePrice = Math.random() * 800 + 100;
    if (product.category === '2') basePrice = Math.random() * 200 + 30;
    if (product.category === '3') basePrice = Math.random() * 25000 + 1500;
    if (product.category === '4') basePrice = Math.random() * 400 + 50;
    if (product.category === '5') basePrice = Math.random() * 600 + 200;

    shuffledStores.forEach((store) => {
      // Variación de precio por tienda (+/- 15%)
      const variation = 0.85 + (Math.random() * 0.3);
      const finalPrice = basePrice * variation;
      
      prices.push({
        id: `price-${product.id}-${store.id}`,
        productId: product.id,
        storeName: store.name,
        priceBs: finalPrice,
        priceUsd: finalPrice / BCV_RATE,
        distanceKm: parseFloat(store.distance),
        location: 'Maracay',
        address: `Av. Casanova Godoy, Local ${store.name}`,
        stockStatus: Math.random() > 0.2 ? 'in-stock' : 'low-stock',
        lastUpdated: 'Hace pocos minutos',
        popularity: Math.floor(Math.random() * 40) + 60,
        createdAt: new Date().toISOString()
      });
    });
  });
  return prices;
};

export const MOCK_PRICES = generateMockPrices(MOCK_PRODUCTS);

export const MOCK_NOTIFICATIONS: VibeNotification[] = [
  { id: 'n1', type: 'price_drop', title: '¡Baja de precio!', message: 'El Atamel bajó en Locatel.', date: 'Hace 5 min', isRead: false, productId: 'prod-1-1' },
  { id: 'n2', type: 'points_earned', title: '¡Has ganado puntos!', message: 'Tu reporte de Harina PAN fue verificado.', date: 'Hace 1 hora', isRead: true, productId: 'prod-2-0' }
];

export const MOCK_ALERTS: PriceAlert[] = [
  { id: 'a1', productName: 'Atamel 500mg', category: '1', presentation: '10 tabletas', targetPrice: 4.50, isActive: true, imageUrl: 'https://picsum.photos/seed/atamel/100/100' }
];

export const MOCK_HISTORY: UserActivity[] = [
  { id: 'h1', type: 'report', description: 'Reportaste un precio', detail: 'Éxito en Luxor Maracay', points: 10, date: 'Hace 2 horas' }
];
