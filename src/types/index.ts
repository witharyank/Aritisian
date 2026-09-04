export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'customer' | 'artisan';
  avatarUrl?: string;
}

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  location: string;
  bio?: string;
  avatarUrl?: string;
  joinedDate: string;
  rating: number;
  reviewCount: number;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  artisanId: string;
  artisanName: string;
  location: string;
  material: string;
  craftType: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags: string[];
  featured: boolean;
}

export interface Reel {
  id: string;
  title: string;
  description: string;
  videoUrl?: string; // Optional for future video integration
  thumbnailUrl: string;
  artisanId: string;
  linkedProductId: string; // Crucial for "Shop This Product"
  likes: number;
  views: number;
  createdAt: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: { productId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  "AI Studio": undefined;
  Cart: undefined;
  Profile: undefined;
};

export interface Category {
  id: string;
  name: string;
  imageUrl?: string;
  description?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  artisanId: string;
  imageUrl: string;
}

// Phase 3A: AI Service Types

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AIGeneratedCatalog {
  productName: string;
  category: string;
  material: string;
  craftType: string;
  englishDescription: string;
  hindiDescription: string;
  keywords: string[];
}

export interface PriceSuggestion {
  suggestedPrice: number;
  minPrice: number;
  maxPrice: number;
  confidence: 'High' | 'Medium' | 'Low';
  reasoning: string;
}

