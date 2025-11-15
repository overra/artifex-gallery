export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}
export interface Comment {
  id: string;
  text: string;
  author: User;
  createdAt: string;
}
export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  artist: User;
  description: string;
  tags: string[];
  comments: Comment[];
  likes: number;
}
export const mockUsers: User[] = [
  { id: 'user-1', username: 'PixelProphet', avatarUrl: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', username: 'AI_Alchemist', avatarUrl: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', username: 'SynthWaveSorceress', avatarUrl: 'https://i.pravatar.cc/150?u=user-3' },
  { id: 'user-4', username: 'GigaGAN', avatarUrl: 'https://i.pravatar.cc/150?u=user-4' },
];
export const mockArtworks: Artwork[] = [
  {
    id: 'art-1',
    title: 'Cosmic Leviathan',
    imageUrl: 'https://images.unsplash.com/photo-1634412531243-88a455b45368?q=80&w=800',
    artist: mockUsers[0],
    description: 'A colossal being swims through the nebulae of a forgotten galaxy.',
    tags: ['space', 'leviathan', 'cosmic', 'nebula'],
    comments: [],
    likes: 132,
  },
  {
    id: 'art-2',
    title: 'Cyberpunk Geisha',
    imageUrl: 'https://images.unsplash.com/photo-1679974369853-9a8438945de6?q=80&w=800',
    artist: mockUsers[1],
    description: 'A fusion of traditional elegance and futuristic augmentation in the neon-drenched streets of Neo-Kyoto.',
    tags: ['cyberpunk', 'geisha', 'sci-fi', 'portrait'],
    comments: [],
    likes: 256,
  },
  {
    id: 'art-3',
    title: 'Whispering Woods',
    imageUrl: 'https://images.unsplash.com/photo-1674027446522-8a934a502a5e?q=80&w=800',
    artist: mockUsers[2],
    description: 'An enchanted forest where the trees hum with ancient, magical energies.',
    tags: ['fantasy', 'forest', 'magic', 'enchanted'],
    comments: [],
    likes: 489,
  },
  {
    id: 'art-4',
    title: 'Steampunk Metropolis',
    imageUrl: 'https://images.unsplash.com/photo-1694511252822-721615a62b32?q=80&w=800',
    artist: mockUsers[0],
    description: 'A bustling city powered by steam and intricate clockwork, with airships dotting the sky.',
    tags: ['steampunk', 'cityscape', 'airship', 'industrial'],
    comments: [],
    likes: 312,
  },
  {
    id: 'art-5',
    title: 'Solar Flare',
    imageUrl: 'https://images.unsplash.com/photo-1634412531243-88a455b45368?q=80&w=800',
    artist: mockUsers[3],
    description: 'An abstract representation of a star\'s immense power.',
    tags: ['abstract', 'space', 'sun', 'energy'],
    comments: [],
    likes: 98,
  },
  {
    id: 'art-6',
    title: 'Aquatic Dream',
    imageUrl: 'https://images.unsplash.com/photo-1688383133226-33474a63135a?q=80&w=800',
    artist: mockUsers[1],
    description: 'A surreal underwater world where jellyfish illuminate the depths.',
    tags: ['underwater', 'surreal', 'jellyfish', 'bioluminescence'],
    comments: [],
    likes: 543,
  },
  {
    id: 'art-7',
    title: 'The Last Dragon',
    imageUrl: 'https://images.unsplash.com/photo-1695430346131-86a82a77cb95?q=80&w=800',
    artist: mockUsers[2],
    description: 'A lone dragon perches atop a mountain peak, surveying its domain.',
    tags: ['dragon', 'fantasy', 'mountain', 'creature'],
    comments: [],
    likes: 721,
  },
  {
    id: 'art-8',
    title: 'Galactic Empress',
    imageUrl: 'https://images.unsplash.com/photo-1680002493235-4c703395c8b9?q=80&w=800',
    artist: mockUsers[3],
    description: 'Portrait of a ruler whose empire spans a thousand star systems.',
    tags: ['sci-fi', 'portrait', 'empress', 'space-opera'],
    comments: [],
    likes: 411,
  },
  {
    id: 'art-9',
    title: 'Forgotten Titan',
    imageUrl: 'https://images.unsplash.com/photo-1695239502048-a0a3b50449b5?q=80&w=800',
    artist: mockUsers[0],
    description: 'The petrified remains of a giant robot reclaimed by nature.',
    tags: ['post-apocalyptic', 'robot', 'nature', 'overgrown'],
    comments: [],
    likes: 632,
  },
  {
    id: 'art-10',
    title: 'Crystal Caverns',
    imageUrl: 'https://images.unsplash.com/photo-1678107353913-91b042525a8a?q=80&w=800',
    artist: mockUsers[1],
    description: 'A hidden cave system where giant, glowing crystals light the way.',
    tags: ['cave', 'crystal', 'fantasy', 'underground'],
    comments: [],
    likes: 388,
  },
];