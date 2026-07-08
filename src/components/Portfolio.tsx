import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Eye, Calendar, BookOpen, Layers, Check } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  onOpenConsultation: (artType: string) => void;
  portfolioItems: PortfolioItem[];
  categories: { id: string; name: string }[];
}

export default function Portfolio({ onOpenConsultation, portfolioItems, categories }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Track which cards are currently showing "Room Mockup" view vs "Artwork Only" view
  const [roomMockupView, setRoomMockupView] = useState<Record<string, boolean>>({});

  const toggleViewMode = (itemId: string) => {
    setRoomMockupView((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const filteredItems = portfolioItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-20 bg-white text-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
              Our Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              Wall Painting Portfolio
            </h2>
            <p className="mt-2 text-neutral-500 max-w-xl text-sm sm:text-base">
              A curated collection of customized wall graphics, Vastu designs, Kalamkari artworks, and modern geometric scenery hand-crafted for our patrons.
            </p>
          </div>

          {/* Quick Stats Badge */}
          <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 p-3 rounded-2xl shrink-0">
            <span className="text-3xl font-extrabold text-blue-600">50+</span>
            <div className="text-xs text-neutral-500 leading-tight">
              <p className="font-bold text-neutral-800">Completed Murals</p>
              <p>Across West Bengal</p>
            </div>
          </div>
        </div>

        {/* Featured Magical Monkey Forest Band Project Showcase Banner */}
        <div id="featured-showcase-mural" className="mb-16 rounded-2xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-900 text-white relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* The artwork Image */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-0 bg-neutral-950">
              <img
                src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80"
                alt="Magical Monkey Forest Band wall mural"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950/60" />
            </div>

            {/* Description side */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-neutral-950">
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full border border-blue-400/20 inline-block">
                  Featured Masterpiece
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Magical Monkey Forest Band
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  A beautiful digital and hand-crafted concept designed for children's spaces and theme cafes. Three musical monkeys—playing keyboard, saxophone, and drums—perform on a glowing wooden stage inside a moonlit forest.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-xs">
                    <p className="text-neutral-500 font-semibold">Dimensions</p>
                    <p className="font-bold text-neutral-100">14 ft x 9 ft</p>
                  </div>
                  <div className="text-xs">
                    <p className="text-neutral-500 font-semibold">Technique</p>
                    <p className="font-bold text-neutral-100">Mixed Digital & Low-VOC Paint</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800/60 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenConsultation('vector-modern')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  <span>Book This Theme</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="text-xs text-neutral-400 text-center sm:text-left font-medium">
                  🎨 Inquire for custom kids room layouts.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Interactive Category Filter Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pb-4 mb-8 scrollbar-none border-b border-neutral-100">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4.5 py-2.5 rounded-full text-xs font-bold shrink-0 transition-all ${
              activeCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600 hover:text-neutral-900'
            }`}
          >
            All Artworks
          </button>
          {categories.filter(cat => cat.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10'
                  : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Portfolio Dynamic Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const showMockup = !!roomMockupView[item.id];
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col justify-between bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 h-full"
                >
                  {/* Photo Section */}
                  <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden shrink-0 border-b border-neutral-100">
                    {/* View Art image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Text Details Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-lg font-bold text-neutral-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-neutral-500 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Booking CTA */}
                    <div className="mt-5 pt-4 border-t border-neutral-100">
                      {/* Click to book now */}
                      <button
                        onClick={() => onOpenConsultation(item.category)}
                        className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-xl transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
