export interface RetailerOffer {
  id: string;
  retailerId: string;
  retailerName: string;
  retailerLogo?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  affiliateUrl: string;
  inStock: boolean;
  shippingInfo?: string;
  isDirectPartner?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  subcategory: string;
  description: string;
  shortDescription: string;
  modelNumber: string;
  sku: string;
  tags: string[];
  primaryImage: string;
  galleryImages: string[];
  price: number; // lowest active price
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  retailers: RetailerOffer[];
  status: 'published' | 'draft';
  isFeatured: boolean;
  isDeal: boolean;
  dealBadge?: string;
  dealExpiry?: string;
  pros: string[];
  cons: string[];
  verdict: string;
  whoItsFor?: string;
  youtubeVideoId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  subcategories: string[];
  order: number;
}

export interface Retailer {
  id: string;
  name: string;
  domain: string;
  logo: string;
  color?: string;
  affiliateParam?: string;
  isEnabled: boolean;
}

export interface AffiliateClick {
  id: string;
  productId: string;
  productName: string;
  retailerName: string;
  retailerId: string;
  targetUrl: string;
  price: number;
  timestamp: string;
}

export type ViewMode = 
  | 'home' 
  | 'category' 
  | 'product' 
  | 'compare' 
  | 'deals' 
  | 'reviews' 
  | 'wishlist' 
  | 'admin'
  | 'disclosure';
