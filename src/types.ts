export type Category = 
  | 'all' 
  | 'vector-modern' 
  | 'traditional-kalamkari' 
  | 'spiritual-vastu' 
  | 'kids-educational' 
  | 'office-commercial';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  image: string;
  roomMockupImage: string;
  schedule?: string;
  priceRange?: string;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  details: string;
  image: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  ctaText?: string;
}

export interface WorkSpace {
  title: string;
  description: string;
  image: string;
}
