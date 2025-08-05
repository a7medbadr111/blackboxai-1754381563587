import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Steam Account - Premium Games Bundle',
    description: 'Premium Steam account with 50+ AAA games including latest releases. Fully verified and secure.',
    price: 49.99,
    originalPrice: 89.99,
    category: 'Gaming Accounts',
    tags: ['Steam', 'Games', 'Premium', 'Instant'],
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    downloadable: false,
    instant: true
  },
  {
    id: '2',
    name: 'Adobe Creative Suite 2024',
    description: 'Complete Adobe Creative Cloud suite with Photoshop, Illustrator, Premiere Pro, and more.',
    price: 29.99,
    originalPrice: 52.99,
    category: 'Software',
    tags: ['Adobe', 'Creative', 'Design', 'Professional'],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 187,
    inStock: true,
    downloadable: true,
    instant: true
  },
  {
    id: '3',
    name: 'Netflix Premium - 1 Year',
    description: '12 months of Netflix Premium subscription with 4K streaming and multiple profiles.',
    price: 79.99,
    originalPrice: 155.99,
    category: 'Subscriptions',
    tags: ['Netflix', 'Streaming', 'Premium', '4K'],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    downloadable: false,
    instant: true
  },
  {
    id: '4',
    name: 'Cyberpunk 2077 - Ultimate Edition',
    description: 'The complete Cyberpunk 2077 experience with all DLCs and expansion packs.',
    price: 34.99,
    originalPrice: 59.99,
    category: 'PC Games',
    tags: ['RPG', 'Cyberpunk', 'Action', 'Singleplayer'],
    images: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    downloadable: true,
    instant: true
  },
  {
    id: '5',
    name: 'Microsoft Office 365 Pro',
    description: 'Complete Microsoft Office suite with Word, Excel, PowerPoint, and cloud storage.',
    price: 24.99,
    originalPrice: 69.99,
    category: 'Software',
    tags: ['Microsoft', 'Office', 'Productivity', 'Business'],
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    rating: 4.8,
    reviewCount: 312,
    inStock: true,
    downloadable: true,
    instant: true
  },
  {
    id: '6',
    name: 'Spotify Premium Family',
    description: '6 months of Spotify Premium Family plan for up to 6 accounts.',
    price: 39.99,
    originalPrice: 59.94,
    category: 'Subscriptions',
    tags: ['Spotify', 'Music', 'Family', 'Premium'],
    images: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    downloadable: false,
    instant: true
  }
];

export const categories = [
  'All Products',
  'Gaming Accounts',
  'PC Games',
  'Software',
  'Subscriptions',
  'Mobile Apps',
  'Gift Cards'
];