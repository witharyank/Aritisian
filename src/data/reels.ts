import { Reel } from '../types';

export const REELS: Reel[] = [
  {
    id: 'r1',
    title: 'The Making of a Banarasi Saree',
    description: 'Watch the traditional weaving process and the detailed craftsmanship behind creating one Banarasi silk saree.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800&auto=format&fit=crop',
    artisanId: 'a1',
    linkedProductId: 'p1', // Handwoven Banarasi Silk Saree
    likes: 1245,
    views: 15400,
    createdAt: '2023-10-12T10:30:00Z',
  },
  {
    id: 'r2',
    title: 'Colors of Madhubani',
    description: 'Experience the intricate process of creating a traditional Madhubani painting by hand, using natural colors and twigs.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1580136607993-faafdd17bcf2?q=80&w=800&auto=format&fit=crop',
    artisanId: 'a2',
    linkedProductId: 'p3', // Handmade Madhubani Painting
    likes: 3420,
    views: 45000,
    createdAt: '2023-10-15T14:20:00Z',
  },
  {
    id: 'r3',
    title: 'From Clay to Craft',
    description: 'See how a block of clay transforms into a beautiful terracotta vase on the traditional potter\'s wheel.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop',
    artisanId: 'a3',
    linkedProductId: 'p4', // Traditional Terracotta Vase
    likes: 890,
    views: 12000,
    createdAt: '2023-10-18T09:15:00Z',
  }
];
