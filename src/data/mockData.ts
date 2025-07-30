import { Product, Category, Brand } from '@/types/product';

// Import generated images
import heroImage1 from '@/assets/hero-banner-1.jpg';
import promoBanner from '@/assets/promo-banner.jpg';
import bananasImg from '@/assets/bananas.jpg';
import milkImg from '@/assets/milk.jpg';
import colaImg from '@/assets/cola.jpg';
import cookiesImg from '@/assets/cookies.jpg';
import tomatoesImg from '@/assets/tomatoes.jpg';
import bhujiaImg from '@/assets/bhujia.jpg';

export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Fruits & Vegetables',
    subcategories: [
      { id: '1-1', name: 'Fresh Fruits', categoryId: '1' },
      { id: '1-2', name: 'Fresh Vegetables', categoryId: '1' },
      { id: '1-3', name: 'Exotic Fruits', categoryId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Dairy & Bakery',
    subcategories: [
      { id: '2-1', name: 'Milk & Dairy', categoryId: '2' },
      { id: '2-2', name: 'Bread & Bakery', categoryId: '2' },
      { id: '2-3', name: 'Cheese & Butter', categoryId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Beverages',
    subcategories: [
      { id: '3-1', name: 'Cold Drinks', categoryId: '3' },
      { id: '3-2', name: 'Hot Beverages', categoryId: '3' },
      { id: '3-3', name: 'Juices', categoryId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Snacks & Packaged',
    subcategories: [
      { id: '4-1', name: 'Chips & Namkeen', categoryId: '4' },
      { id: '4-2', name: 'Biscuits & Cookies', categoryId: '4' },
      { id: '4-3', name: 'Chocolates', categoryId: '4' },
    ]
  }
];

export const dummyBrands: Brand[] = [
  { id: '1', name: 'Amul', logo: '/api/placeholder/80/40' },
  { id: '2', name: 'Britannia', logo: '/api/placeholder/80/40' },
  { id: '3', name: 'Nestle', logo: '/api/placeholder/80/40' },
  { id: '4', name: 'Haldiram', logo: '/api/placeholder/80/40' },
  { id: '5', name: 'Mother Dairy', logo: '/api/placeholder/80/40' },
  { id: '6', name: 'Coca Cola', logo: '/api/placeholder/80/40' },
];

export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 48,
    originalPrice: 60,
    image: bananasImg,
    description: 'Fresh and sweet bananas, perfect for breakfast or snacks.',
    category: 'Fruits & Vegetables',
    subcategory: 'Fresh Fruits',
    brand: 'Local Farm',
    tags: ['fresh', 'organic'],
    inStock: true,
    featured: true,
    onSale: true,
  },
  {
    id: '2',
    name: 'Amul Fresh Milk',
    price: 28,
    image: milkImg,
    description: 'Pure and fresh milk from Amul dairy.',
    category: 'Dairy & Bakery',
    subcategory: 'Milk & Dairy',
    brand: 'Amul',
    tags: ['dairy', 'fresh'],
    inStock: true,
    featured: false,
  },
  {
    id: '3',
    name: 'Coca Cola 500ml',
    price: 20,
    originalPrice: 25,
    image: colaImg,
    description: 'Refreshing cola drink, perfect for any occasion.',
    category: 'Beverages',
    subcategory: 'Cold Drinks',
    brand: 'Coca Cola',
    tags: ['beverage', 'cold'],
    inStock: true,
    onSale: true,
  },
  {
    id: '4',
    name: 'Britannia Good Day Cookies',
    price: 35,
    image: cookiesImg,
    description: 'Delicious butter cookies from Britannia.',
    category: 'Snacks & Packaged',
    subcategory: 'Biscuits & Cookies',
    brand: 'Britannia',
    tags: ['snack', 'sweet'],
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Fresh Tomatoes',
    price: 30,
    image: tomatoesImg,
    description: 'Fresh red tomatoes, essential for cooking.',
    category: 'Fruits & Vegetables',
    subcategory: 'Fresh Vegetables',
    brand: 'Local Farm',
    tags: ['fresh', 'vegetable'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Haldiram Aloo Bhujia',
    price: 45,
    originalPrice: 50,
    image: bhujiaImg,
    description: 'Crispy and spicy potato snack from Haldiram.',
    category: 'Snacks & Packaged',
    subcategory: 'Chips & Namkeen',
    brand: 'Haldiram',
    tags: ['snack', 'spicy'],
    inStock: true,
    onSale: true,
    featured: true,
  },
];

export const heroSlides = [
  {
    id: 1,
    title: 'Fresh Groceries Delivered',
    subtitle: 'Get fresh fruits, vegetables and more delivered to your doorstep',
    image: heroImage1,
    cta: 'Shop Now'
  },
  {
    id: 2,
    title: 'Special Offers',
    subtitle: 'Up to 30% off on dairy products and beverages',
    image: promoBanner,
    cta: 'Explore Deals'
  },
  {
    id: 3,
    title: 'Premium Quality',
    subtitle: 'Handpicked products from trusted brands',
    image: heroImage1,
    cta: 'Discover More'
  }
];

export { promoBanner };