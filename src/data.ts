import { Category, PortfolioItem, Founder, ProcessStep, WorkSpace } from './types';

export const CATEGORIES: { id: Category; name: string }[] = [
  { id: 'all', name: 'All Artworks' },
  { id: 'vector-modern', name: 'Vector & Modern Murals' },
  { id: 'traditional-kalamkari', name: 'Traditional & Kalamkari' },
  { id: 'spiritual-vastu', name: 'Spiritual & Vastu' },
  { id: 'kids-educational', name: 'Kids & Educational' },
  { id: 'office-commercial', name: 'Office & Commercial' }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'Wall Painting Vector Type',
    category: 'vector-modern',
    description: 'This class helps you develop your own unique movement vocabulary and respond to music in the moment. Hand-painted vector style nature scenery illustrating vibrant hills, forests, meadows, and blue sky, optimized to create a deep, soothing perspective in any living space.',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    roomMockupImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    schedule: 'Tuesdays 7:00 PM - 9:00 PM',
    priceRange: '₹350 - ₹600 / sq. ft.'
  },
  {
    id: '2',
    title: 'Kalamkari Wall Painting',
    category: 'traditional-kalamkari',
    description: 'Custom Kalamkari design created for a client\'s cafe. Intricate traditional Indian artwork featuring iconic sacred cow figures, delicate multi-petal lotuses, stylized foliage, and beautiful arch frames on a cream-yellow background.',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80',
    roomMockupImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    schedule: 'Tuesdays 7:00 PM - 9:00 PM',
    priceRange: '₹500 - ₹900 / sq. ft.'
  },
  {
    id: '3',
    title: 'Custom Wall Art - 2018',
    category: 'vector-modern',
    description: 'Customized Mexican beach painting tailored for a client\'s home. Vibrant coastal design with palm trees, lounge chairs, an umbrella, dynamic blue ocean waves, and a golden sunset sky, establishing a relaxing escape inside.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    roomMockupImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    schedule: 'Wednesdays 7:00 PM - 9:00 PM',
    priceRange: '₹400 - ₹750 / sq. ft.'
  },
  {
    id: '4',
    title: 'Canvas Painting',
    category: 'vector-modern',
    description: 'High-quality canvas painting created for a client\'s wall. A meticulously detailed oil and acrylic representation of a cute baby deer (fawn) seated in a dreamlike, sunlit autumn forest setting, evoking warmth and gentleness.',
    image: 'https://images.unsplash.com/photo-1579783928621-7a13d66a6211?auto=format&fit=crop&w=800&q=80',
    roomMockupImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
    schedule: 'Thursdays 7:00 PM - 9:00 PM',
    priceRange: '₹600 - ₹1000 / sq. ft.'
  },
  {
    id: '5',
    title: 'Personal Room Wall Design',
    category: 'kids-educational',
    description: 'Cartoon portrait design painted on a client\'s room wall. Energetic black-and-white stylized graffiti illustration centered on a personalized cartoon caricature, featuring bold typography: "BE YOUR OWN HERO" to inspire motivation.',
    image: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?auto=format&fit=crop&w=800&q=80',
    roomMockupImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    schedule: 'Fridays 7:00 PM - 9:00 PM',
    priceRange: '₹300 - ₹500 / sq. ft.'
  },
  {
    id: '6',
    title: 'Vastu & Spiritual Wall Art',
    category: 'spiritual-vastu',
    description: 'Vastu consultancy and a painting of running horses. Hand-Painted vs. Digital Wall Art. Seven dynamic white, brown, and dark horses galloping vigorously through snow-covered mountain valleys under a clear sky, designed to channel power, wealth, and continuous progress according to ancient Indian Vastu principles.',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
    roomMockupImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    schedule: 'Saturdays 10:00 AM - 12:00 PM',
    priceRange: '₹450 - ₹800 / sq. ft.'
  }
];

export const FOUNDERS: Founder[] = [
  {
    name: 'Subhankar Bhattacharjee',
    role: 'Art Mentor & Creative Concept Artist',
    bio: 'ART Mentor and Creative Concept Artist | Illustrator | 7+ Years of Experience in Digital & Manual Artwork | Specializing in Mascots, Character Design, & Background Layouts, Graphics Design.',
    details: 'As a co-founder, Subhankar leads the digital design conceptualization process. He works closely with residential and commercial clients to prepare initial digital overlays of what the murals will look like on their walls, ensuring 100% satisfaction before a single drop of paint is applied.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'Consultation',
    description: 'We discuss your vision, theme, wall dimensions, location, and budget.'
  },
  {
    number: 2,
    title: 'Design Planning',
    description: 'A custom concept and artwork proposal is prepared based on your requirements.',
    ctaText: 'Design Planning'
  },
  {
    number: 3,
    title: 'Quotation Approval',
    description: 'After reviewing the design and project details, we provide a final quotation.'
  },
  {
    number: 4,
    title: 'Wall Preparation',
    description: 'The surface is checked and prepared for painting.'
  },
  {
    number: 5,
    title: 'Painting Execution',
    description: 'Professional wall painting is completed using high-quality materials.'
  },
  {
    number: 6,
    title: 'Final Delivery',
    description: 'The completed artwork is reviewed and handed over after quality inspection.'
  }
];

export const WORK_SPACES: WorkSpace[] = [
  {
    title: 'Homes & Apartments',
    description: 'Add warmth, personality, and custom aesthetics to living rooms, bedrooms, entries, or dining spaces with bespoke hand-painted wall art.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Cafés & Restaurants',
    description: 'Create Instagrammable, cozy, and theme-oriented spots that keep diners coming back and sharing your space online.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Schools & Educational Institutes',
    description: 'Brighten nurseries, coaching centers, classrooms, and corridors with educational, inspiring, and friendly murals that encourage kids\' creativity.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Offices & Workspaces',
    description: 'Enhance employee motivation, emphasize brand identity, and elevate corporate aesthetics with modern architectural murals.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Resorts, Hotels & Retail',
    description: 'Infuse premium artistic grandeur or vacation beach vibes to elevate customer experience and architectural luxury.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'
  }
];

export const SPECIALTIES = [
  {
    title: 'Custom Wall Murals',
    description: 'Unique hand-painted wall murals designed specifically for homes, cafés, restaurants, offices, and commercial spaces. Every artwork is customized according to the client\'s vision and interior theme.'
  },
  {
    title: 'Interior Wall Art',
    description: 'Transform plain walls into visually engaging spaces with decorative illustrations, artistic patterns, and thematic designs that enhance the overall atmosphere.'
  },
  {
    title: 'Restaurant & Café Artwork',
    description: 'Jasmine has a gift for making modern dance accessible and enjoyable for beginners. Her classes are a gentle introduction to the fundamental principles of modern movement, focusing on body awareness, grounding, and creative exploration. (Also offering highly thematic and engaging gastronomic wall art and chalk-art illustrations.)'
  },
  {
    title: 'Educational & Kids Wall Painting',
    description: 'Interactive and educational wall art for schools, coaching centers, play schools, and children\'s rooms that inspire creativity and learning.'
  }
];

export const OFFICE_MURALS_INFO = {
  title: 'Corporate & Office Murals & Custom Design Consultation',
  items: [
    {
      id: 'A1',
      title: 'Corporate & Office Murals',
      description: 'Professional wall graphics and artistic installations designed to strengthen brand identity, motivate teams, and create a modern workplace environment.'
    },
    {
      id: 'A2',
      title: 'Custom Design Consultation',
      description: 'From concept development to final execution, we provide complete artistic consultation to ensure every project matches your space, goals, and budget.'
    }
  ]
};

export const CONTACT_INFO = {
  email1: 'creativeartculture48@gmail.com',
  email2: 'bhattacharjeesubhankar495@gmail.com',
  instagram: 'subhank161',
  instagramUrl: 'https://instagram.com/subhank161',
  facebook: 'Subhankar Bhattacharjee',
  facebookUrl: 'https://facebook.com/subhankar.bhattacharjee.art',
  phone1: '+91 8584003915',
  phone2: '+91 9748015212',
  whatsappUrl: 'https://wa.me/918584003915',
  address: 'Subhankar wallArt, West Bengal, India, 2026'
};

export const WHY_CHOOSE_US = [
  'Custom Artwork Design',
  'Professional Hand-Painted Finish',
  'High-Quality Materials',
  'Transparent Pricing',
  'On-Time Delivery',
  'Personalized Consultation',
  'Suitable for Residential & Commercial Projects'
];
