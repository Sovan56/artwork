import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ZoomIn, Info, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data';

interface VisualizerProps {
  onOpenConsultation: (artType: string) => void;
}

interface RoomBackdrop {
  id: string;
  name: string;
  icon: string;
  image: string;
  wallAreaClass: string; // Tailored classes for absolute positioning on specific walls
}

const ROOMS: RoomBackdrop[] = [
  {
    id: 'living-room',
    name: 'Modern Living Room',
    icon: '🛋️',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    wallAreaClass: 'top-[16%] left-[24%] w-[51%] h-[48%] rounded-sm rotate-[-0.5deg]'
  },
  {
    id: 'cafe',
    name: 'Classy Café Wall',
    icon: '☕',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
    wallAreaClass: 'top-[15%] left-[28%] w-[45%] h-[50%] rounded-md'
  },
  {
    id: 'office',
    name: 'Corporate Lobby',
    icon: '🏢',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    wallAreaClass: 'top-[22%] left-[18%] w-[55%] h-[42%] rounded-sm'
  },
  {
    id: 'bedroom',
    name: 'Cozy Bedroom',
    icon: '🛏️',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    wallAreaClass: 'top-[18%] left-[26%] w-[48%] h-[46%] rounded-sm'
  }
];

// Additional high quality visual artwork thumbnails for the slider
const ARTWORKS_FOR_VISUALIZER = [
  {
    id: '1',
    title: 'Vector Hills',
    category: 'vector-modern',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    tag: 'Vector & Modern'
  },
  {
    id: '2',
    title: 'Kalamkari Divine Cow',
    category: 'traditional-kalamkari',
    url: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=800&q=80',
    tag: 'Kalamkari Traditional'
  },
  {
    id: '3',
    title: 'Sunset Beach',
    category: 'vector-modern',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    tag: 'Custom Wall Art'
  },
  {
    id: '4',
    title: 'Autumn Fawn',
    category: 'vector-modern',
    url: 'https://images.unsplash.com/photo-1579783928621-7a13d66a6211?auto=format&fit=crop&w=800&q=80',
    tag: 'Fine Canvas Art'
  },
  {
    id: '5',
    title: 'Be Your Own Hero',
    category: 'kids-educational',
    url: 'https://images.unsplash.com/photo-1561053720-76cd73ff22c3?auto=format&fit=crop&w=800&q=80',
    tag: 'Kids & Typography'
  },
  {
    id: '6',
    title: 'Vastu Seven Horses',
    category: 'spiritual-vastu',
    url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=800&q=80',
    tag: 'Vastu & Spiritual'
  }
];

export default function Visualizer({ onOpenConsultation }: VisualizerProps) {
  const [selectedArt, setSelectedArt] = useState(ARTWORKS_FOR_VISUALIZER[0]);
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [blendOpacity, setBlendOpacity] = useState(85);
  const [blendMode, setBlendMode] = useState<'normal' | 'multiply' | 'overlay'>('multiply');

  return (
    <section id="interactive-visualizer" className="py-20 bg-neutral-900 text-white relative overflow-hidden">
      {/* Absolute ambient lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Space Designer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Visualize Murals In Real-Time
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Toggle room backdrops and different artworks to preview how our hand-painted murals will blend harmoniously with your furniture, lighting, and interior theme.
          </p>
        </div>

        {/* Master Visualizer Flex Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: 3D interactive preview container */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-neutral-950 rounded-2xl border border-neutral-800 p-4 md:p-6 shadow-2xl">
            {/* The Stage Screen */}
            <div className="relative aspect-[16/10] w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group shadow-lg">
              {/* Active Room Background */}
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* Masked Absolute Art Projection */}
              <div className={`absolute ${selectedRoom.wallAreaClass} overflow-hidden shadow-inner flex items-center justify-center transition-all duration-500`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedArt.id}-${selectedRoom.id}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full relative"
                  >
                    <img
                      src={selectedArt.url}
                      alt={selectedArt.title}
                      referrerPolicy="no-referrer"
                      style={{
                        opacity: blendOpacity / 100,
                        mixBlendMode: blendMode
                      }}
                      className="w-full h-full object-cover select-none pointer-events-none transition-all duration-300 contrast-[1.04]"
                    />
                    {/* Shadow overlay to simulate wall corner ambient occlusion */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 mix-blend-multiply pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 mix-blend-multiply pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Status HUD indicators */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>Mockup Preview: {selectedArt.title} in {selectedRoom.name}</span>
              </div>

              {/* Visual hints */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <Eye className="h-3.5 w-3.5" />
                <span>Wall Perspective Active</span>
              </div>
            </div>

            {/* Visualizer adjustment controls below the stage */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
              {/* Opacity slider */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-semibold text-neutral-400">
                  <label htmlFor="opacity-slider">Artwork Blend Density</label>
                  <span>{blendOpacity}%</span>
                </div>
                <input
                  type="range"
                  id="opacity-slider"
                  min="40"
                  max="100"
                  value={blendOpacity}
                  onChange={(e) => setBlendOpacity(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Blending technique selection */}
              <div>
                <span className="block text-xs mb-1.5 font-semibold text-neutral-400">Wall Texture Blend Technique</span>
                <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800 text-xs font-semibold">
                  {(['normal', 'multiply', 'overlay'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setBlendMode(mode)}
                      className={`flex-1 py-1 px-2 rounded-md capitalize transition-colors ${blendMode === mode ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      {mode === 'multiply' ? 'Wall Texture' : mode === 'overlay' ? 'Vivid Glow' : 'Flat Overlay'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Settings & Navigation selectors */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-xl">
            {/* 1. Backdrop Selector */}
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-3">
                1. Select Room Backdrop
              </span>
              <div className="grid grid-cols-2 gap-2">
                {ROOMS.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all ${
                      selectedRoom.id === room.id
                        ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-lg shadow-blue-500/15'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-100'
                    }`}
                  >
                    <span className="text-lg">{room.icon}</span>
                    <span className="text-xs font-medium leading-tight">{room.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Artwork Selector Slider */}
            <div className="flex-1 mt-2">
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-3">
                2. Choose Artwork Style
              </span>
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {ARTWORKS_FOR_VISUALIZER.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArt(art)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl border text-left transition-all ${
                      selectedArt.id === art.id
                        ? 'bg-neutral-900 border-blue-500 text-white ring-1 ring-blue-500/50 shadow-md'
                        : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-12 w-16 bg-neutral-800 rounded-lg overflow-hidden shrink-0 border border-neutral-800">
                      <img
                        src={art.url}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Art Label */}
                    <div className="overflow-hidden">
                      <span className="text-xs font-semibold block text-neutral-100 truncate">{art.title}</span>
                      <span className="text-[10px] text-neutral-500 block leading-normal mt-0.5">{art.tag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Informative Tip */}
            <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex items-start gap-2.5 text-xs text-neutral-400 leading-normal">
              <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <p>
                Every project begins with a bespoke high-definition digital conceptual overlay on your <strong>actual wall photo</strong>, entirely free of charge.
              </p>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenConsultation(selectedArt.category)}
              id="mural-visualizer-consultation-btn"
              className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-600/10 hover:shadow-blue-600/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Get Free Consultation For This Art</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
