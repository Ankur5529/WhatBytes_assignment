export type ProductCategory = 'Electronics' | 'Clothing' | 'Home';

export interface Product {
  id: string;
  title: string;
  price: number;
  category: ProductCategory;
  image: string;
  description: string;
  rating: number;
  reviewsCount?: number;
  features?: string[];
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
