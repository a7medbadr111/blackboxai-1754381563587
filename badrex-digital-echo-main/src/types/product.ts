export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  images: string[];
  featured: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  downloadable: boolean;
  instant: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  total: number;
  itemCount: number;
}