export type Category =
  | 'Men'
  | 'Women'
  | 'New Arrivals'
  | 'Streetwear'
  | 'Casual Wear'
  | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  description: string;
  fabric: string;
  fit: string;
  tags: string[];
  bestSeller?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  stock: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  total: number;
  address: Address;
}

export interface User {
  name: string;
  email: string;
  phone: string;
}

export type Page =
  | { name: 'home' }
  | { name: 'shop'; category?: Category; filter?: string }
  | { name: 'product'; id: string }
  | { name: 'checkout' }
  | { name: 'account' }
  | { name: 'admin' }
  | { name: 'about' };
