export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  tags: string[];
  inStock: boolean;
  featured?: boolean;
  onSale?: boolean;
  hidden?: boolean;
  options?: ProductOption[];
}

export interface ProductOption {
  name: string;
  values: string[];
  required: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedOptions?: Record<string, string>;
}