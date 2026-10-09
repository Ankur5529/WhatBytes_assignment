import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'running-shoes',
    title: 'Running Shoes',
    price: 99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    description: 'Lightweight performance running shoes engineered with responsive cushioning and breathable mesh for optimal comfort on every stride.',
    rating: 4.8,
    reviewsCount: 124,
    features: [
      'Breathable athletic mesh upper',
      'Ultra-responsive foam midsole',
      'Durable anti-slip rubber outsole',
      'Ergonomic heel support'
    ],
    inStock: true
  },
  {
    id: 'wireless-headphones',
    title: 'Wireless Headphones',
    price: 129,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    description: 'Over-ear Bluetooth headphones with premium active noise cancellation, deep acoustic resonance, and up to 40 hours of continuous playtime.',
    rating: 4.7,
    reviewsCount: 98,
    features: [
      'Active Noise Cancellation (ANC)',
      '40-hour battery life with fast USB-C charge',
      'Memory foam plush ear cushions',
      'Built-in dual microphones for crystal-clear calls'
    ],
    inStock: true
  },
  {
    id: 'backpack',
    title: 'Backpack',
    price: 129,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    description: 'Sleek, weather-resistant commuter backpack with a dedicated padded 16-inch laptop compartment and intuitive organizational pockets.',
    rating: 4.9,
    reviewsCount: 86,
    features: [
      'Waterproof ballistic nylon construction',
      'Padded sleeve fits laptops up to 16"',
      'Hidden anti-theft passport pocket',
      'Ergonomic airflow back panel'
    ],
    inStock: true
  },
  {
    id: 'smartwatch',
    title: 'Smartwatch',
    price: 249,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    description: 'Advanced lifestyle smartwatch featuring an always-on high-resolution AMOLED display, heart rate tracking, sleep analysis, and 5 ATM water resistance.',
    rating: 4.6,
    reviewsCount: 152,
    features: [
      'Vibrant 1.4" AMOLED touch display',
      'Comprehensive 24/7 biometric health sensors',
      'Water resistant to 50 meters (5 ATM)',
      '7-day battery life on a single charge'
    ],
    inStock: true
  },
  {
    id: 'sunglasses',
    title: 'Sunglasses',
    price: 149,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop',
    description: 'Timeless unisex sunglasses featuring polarized UV400 protective lenses, sturdy lightweight acetate frames, and scratch-resistant coating.',
    rating: 4.5,
    reviewsCount: 64,
    features: [
      '100% UV400 polarization protection',
      'Lightweight handcrafted acetate frame',
      'Scratch and impact-resistant lenses',
      'Includes premium hard leather travel case'
    ],
    inStock: true
  },
  {
    id: 'digital-camera',
    title: 'Digital Camera',
    price: 499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    description: 'Compact mirrorless 4K camera boasting high-speed autofocus, interchangeable lens compatibility, and superior low-light photographic fidelity.',
    rating: 4.8,
    reviewsCount: 77,
    features: [
      '24.2 MP APS-C CMOS sensor',
      'Uncompressed 4K video recording at 60fps',
      'Ultra-fast eye-tracking autofocus system',
      'Tiltable 3.0" touchscreen LCD'
    ],
    inStock: true
  },
  {
    id: 't-shirt',
    title: 'T-shirt',
    price: 29,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    description: 'Essential crewneck t-shirt made from 100% combed organic cotton with pre-shrunk fabric, tailored fit, and enduring softness.',
    rating: 4.4,
    reviewsCount: 210,
    features: [
      '100% certified organic combed cotton',
      'Pre-shrunk to retain shape wash after wash',
      'Tagless neck label for maximum comfort',
      'Double-stitched seams for extra durability'
    ],
    inStock: true
  },
  {
    id: 'smartphone',
    title: 'Smartphone',
    price: 699,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    description: 'Flagship 5G smartphone equipped with a 6.7-inch OLED Super Retina display, next-gen neural processor, and a professional triple-lens camera array.',
    rating: 4.9,
    reviewsCount: 312,
    features: [
      '6.7-inch OLED Super Retina 120Hz display',
      '50MP triple-lens optical image stabilization',
      'All-day battery life with 30W wireless charging',
      'IP68 dust and water resistance'
    ],
    inStock: true
  },
  {
    id: 'modern-desk-lamp',
    title: 'Modern Desk Lamp',
    price: 79,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
    description: 'Minimalist architectural LED desk lamp with adjustable arm, customizable color temperature settings, and built-in wireless charging pad.',
    rating: 4.7,
    reviewsCount: 53,
    features: [
      'Touch control with 5 brightness levels',
      'Adjustable color temperatures (Warm to Cool)',
      '10W Qi fast wireless phone charging base',
      'Energy-efficient eye-caring LED diodes'
    ],
    inStock: true
  },
  {
    id: 'ceramic-mug-set',
    title: 'Ceramic Mug Set',
    price: 39,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    description: 'Set of 4 handcrafted artisanal ceramic mugs with ergonomic wide handles and matte glazed finish, microwave and dishwasher safe.',
    rating: 4.6,
    reviewsCount: 41,
    features: [
      'Includes set of 4 12oz ceramic mugs',
      'Handcrafted with non-toxic lead-free glaze',
      'Microwave, oven, and dishwasher safe',
      'Comfortable heat-resistant ergonomic grip'
    ],
    inStock: true
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getAllCategories(): string[] {
  return ['All', 'Electronics', 'Clothing', 'Home'];
}
