import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Info, Link2, Upload, Move } from 'lucide-react';

// @ts-expect-error - image imports
import livingRoomBg from '../../assets/images/Modern Living Room Wall.jpg';
// @ts-expect-error - image imports
import cafeBg1 from '../../assets/images/Ultra-realistic luxury café .png';
// @ts-expect-error - image imports
import cafeBg2 from '../../assets/images/Ultra-realistic luxury café 2.jpg';
// @ts-expect-error - image imports
import officeBg1 from '../../assets/images/luxury corporate office reception lobby.jpg';

// @ts-expect-error - image imports
import livingRoomArt from '../../assets/images/artwork/Modern Living Room Wall.png';
// @ts-expect-error - image imports
import cafeArt1 from '../../assets/images/artwork/Ultra-realistic luxury café -1.png';
// @ts-expect-error - image imports
import cafeArt2 from '../../assets/images/artwork/Ultra-realistic luxury café 2.png';
// @ts-expect-error - image imports
import officeArt1 from '../../assets/images/artwork/luxury corporate office reception lobby.png';

interface VisualizerProps {
  onOpenConsultation: (artType: string) => void;
}

interface VisualizerPreset {
  id: string;
  name: string;
  icon: string;
  backdrop: string;
  artwork: string;
  artTitle: string;
  artTag: string;
  category: string;
  description: string;
}

const VISUALIZER_PRESETS: VisualizerPreset[] = [
  {
    id: 'living-room',
    name: 'Modern Living Room',
    icon: '🛋️',
    backdrop: livingRoomBg,
    artwork: livingRoomArt,
    artTitle: 'Contemporary Organic Foliage Mural',
    artTag: 'Modern & Minimalist Accent',
    category: 'vector-modern',
    description: 'A stylish layout blending soft curves and earthy botanicals perfectly scaled to accent modern home interiors.'
  },
  {
    id: 'cafe-botanical',
    name: 'Luxury Café (Lush)',
    icon: '☕',
    backdrop: cafeBg1,
    artwork: cafeArt1,
    artTitle: 'Exotic Tropical Botanical Mural',
    artTag: 'Chic Dining & Cafe Accent',
    category: 'custom-mural',
    description: 'Vivid and layered exotic leaves that elevate cafe walls into premium, highly-photogenic botanical sanctuaries.'
  },
  {
    id: 'cafe-prestige',
    name: 'Luxury Café (Prestige)',
    icon: '🥂',
    backdrop: cafeBg2,
    artwork: cafeArt2,
    artTitle: 'Prestige Wildlife & Floral Art',
    artTag: 'Fine Art Dining Accent',
    category: 'fine-art',
    description: 'Detailed high-end floral artistry that adds deep luxury, prestige, and timeless grace to sophisticated dining areas.'
  },
  {
    id: 'corporate-lobby',
    name: 'Corporate Lobby',
    icon: '🏢',
    backdrop: officeBg1,
    artwork: officeArt1,
    artTitle: 'Heritage Kalamkari Divine Art',
    artTag: 'Traditional & Cultural Mural',
    category: 'traditional-kalamkari',
    description: 'An elegant Indian traditional peacock & floral mural that brings prestige, heritage, and character to corporate spaces.'
  }
];

export default function Visualizer({ onOpenConsultation }: VisualizerProps) {
  const [selectedPreset, setSelectedPreset] = useState<VisualizerPreset>(VISUALIZER_PRESETS[0]);
  const [blendOpacity, setBlendOpacity] = useState(100);
  const [blendMode, setBlendMode] = useState<'normal' | 'multiply' | 'overlay'>('normal');

  // Custom upload states
  const [customWallUrl, setCustomWallUrl] = useState<string | null>(null);
  const [customArtworkUrl, setCustomArtworkUrl] = useState<string | null>(null);
  const [artScale, setArtScale] = useState(40); // percentage scale for custom artwork dragging
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState<number>(40);

  const stageRef = useRef<HTMLDivElement>(null);

  const handleWallUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomWallUrl(url);
      setCustomArtworkUrl(null); // Reset previous artwork as requested
      setBlendOpacity(100);      // Reset opacity to full
      setArtScale(40);           // Reset scale to default
    }
  };

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomArtworkUrl(url);
      setBlendOpacity(100); // Reset opacity to full for the new artwork
    }
  };

  const activeBackdrop = customWallUrl || selectedPreset.backdrop;
  const activeArtwork = customArtworkUrl || (customWallUrl ? null : selectedPreset.artwork);

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
            Select room backdrops to preview how our hand-painted murals are custom aligned, styled, and perspective-matched to elevate professional and residential interiors.
          </p>
        </div>

        {/* Master Visualizer Flex Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Panel: Real-time overlay visualization stage */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-neutral-950 rounded-2xl border border-neutral-800 p-4 md:p-6 shadow-2xl">
            {/* The Stage Screen */}
            <div 
              ref={stageRef}
              className="relative aspect-[16/10] w-full bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group shadow-lg"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`${selectedPreset.id}-${customWallUrl ? 'custom-wall' : 'preset-wall'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Active Room Background */}
                  <img
                    src={activeBackdrop}
                    alt={selectedPreset.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Artwork Layer (Rendered separately to allow real-time non-blocking opacity dragging) */}
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                {customArtworkUrl ? (
                  /* Draggable Custom Artwork Layer with native touch & mouse support and pinch-to-zoom gesture */
                  <motion.div
                    drag
                    dragConstraints={stageRef}
                    dragMomentum={false}
                    dragElastic={0.05}
                    className="absolute cursor-grab active:cursor-grabbing select-none pointer-events-auto touch-none bg-transparent"
                    onTouchStart={(e) => {
                      if (e.touches.length === 2) {
                        const dist = Math.hypot(
                          e.touches[0].clientX - e.touches[1].clientX,
                          e.touches[0].clientY - e.touches[1].clientY
                        );
                        setTouchStartDist(dist);
                        setInitialScale(artScale);
                      }
                    }}
                    onTouchMove={(e) => {
                      if (e.touches.length === 2 && touchStartDist !== null) {
                        const dist = Math.hypot(
                          e.touches[0].clientX - e.touches[1].clientX,
                          e.touches[0].clientY - e.touches[1].clientY
                        );
                        const factor = dist / touchStartDist;
                        const newScale = Math.min(Math.max(Math.round(initialScale * factor), 15), 100);
                        setArtScale(newScale);
                      }
                    }}
                    onTouchEnd={() => {
                      setTouchStartDist(null);
                    }}
                    style={{
                      width: `${artScale}%`,
                      opacity: blendOpacity / 100,
                      mixBlendMode: blendMode,
                      // Centered initially
                      left: '30%',
                      top: '25%',
                      zIndex: 30
                    }}
                  >
                    <div className="relative group/art">
                      <img
                        src={customArtworkUrl}
                        alt="Custom user artwork"
                        className="w-full h-auto object-contain pointer-events-none select-none max-h-[80vh]"
                      />
                      {/* Interactive dashed border showing custom placement capability */}
                      <div className="absolute -inset-1 border-2 border-dashed border-blue-500/40 rounded-lg pointer-events-none group-hover/art:border-blue-500/80 transition-colors" />
                      
                      {/* Drag / Reposition hint bar */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-medium flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover/art:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                        <Move className="h-3 w-3" />
                        <span>Drag to position / Pinch to zoom</span>
                      </div>
                    </div>
                  </motion.div>
                ) : activeArtwork ? (
                  /* Perspective aligned standard preset artwork with removed transition-all for instant opacity update */
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                    <img
                      src={activeArtwork}
                      alt={selectedPreset.artTitle}
                      referrerPolicy="no-referrer"
                      style={{
                        opacity: blendOpacity / 100,
                        mixBlendMode: blendMode
                      }}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                    {/* Subtle shadow overlay to simulate depth */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 mix-blend-multiply pointer-events-none" />
                  </div>
                ) : null}
              </div>

              {/* Status HUD indicators */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold flex items-center gap-2 select-none">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span>
                  {customArtworkUrl ? 'Interactive Custom Art Preview' : `Perspective Overlay: ${selectedPreset.artTitle}`}
                </span>
              </div>

              {/* Visual hints */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none select-none">
                <Eye className="h-3.5 w-3.5" />
                <span>{customArtworkUrl ? 'Drag & Scale Enabled' : 'Wall Perspective Aligned'}</span>
              </div>
            </div>

            {/* Visualizer adjustment controls below the stage */}
            <div className="mt-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opacity slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-semibold text-neutral-400">
                    <label htmlFor="opacity-slider">Artwork Blend Density</label>
                    <span>{blendOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    id="opacity-slider"
                    min="0"
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

              {/* Artwork size slider - rendered dynamically for uploaded files */}
              {customArtworkUrl && (
                <div className="mt-4 pt-4 border-t border-neutral-800/80">
                  <div className="flex justify-between text-xs mb-1.5 font-semibold text-neutral-400">
                    <label htmlFor="scale-slider">Artwork Dimension Scale</label>
                    <span>{artScale}%</span>
                  </div>
                  <input
                    type="range"
                    id="scale-slider"
                    min="15"
                    max="100"
                    value={artScale}
                    onChange={(e) => setArtScale(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <p className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                    <Info className="h-3.5 w-3.5 text-blue-400" />
                    <span>Hold and drag the artwork inside the screen above to position it beautifully.</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Controls and Info */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 bg-neutral-950 rounded-2xl border border-neutral-800 p-6 shadow-xl">
            {/* 1. Backdrop Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block">
                  1. Select Room Backdrop
                </span>
                {customWallUrl && (
                  <button
                    onClick={() => {
                      setCustomWallUrl(null);
                      setCustomArtworkUrl(null);
                    }}
                    className="text-[10px] text-red-400 hover:underline font-semibold"
                  >
                    Reset to Preset
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {VISUALIZER_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCustomWallUrl(null);
                      setCustomArtworkUrl(null); // Reset when clicking standard presets
                    }}
                    className={`flex items-center gap-2 px-2.5 py-3 rounded-xl border text-left transition-all ${
                      selectedPreset.id === preset.id && !customWallUrl
                        ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-lg shadow-blue-500/15'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-100'
                    }`}
                  >
                    <span className="text-xl shrink-0">{preset.icon}</span>
                    <span className="text-xs font-medium leading-tight">{preset.name}</span>
                  </button>
                ))}
              </div>

              {/* Upload Custom Wall backdrop button */}
              <div className="mt-3">
                <label className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-xl border border-dashed text-xs font-semibold cursor-pointer transition-all ${
                  customWallUrl
                    ? 'border-blue-500/50 bg-blue-500/5 text-blue-400'
                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}>
                  <Upload className="h-4 w-4 shrink-0 text-blue-400" />
                  <span className="truncate">{customWallUrl ? "Custom Wall Image Loaded" : "Upload Custom Wall"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleWallUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* 2. Synced Artwork Overlay Details */}
            <div className="flex-1 mt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                  2. Matched Artwork Style
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-semibold">
                  <Link2 className="h-2.5 w-2.5" />
                  {customArtworkUrl ? 'Custom Art' : 'Synced'}
                </span>
              </div>
              
              <div className="bg-neutral-900 border border-blue-500/30 p-4 rounded-xl text-left transition-all ring-1 ring-blue-500/10">
                <div className="flex items-center gap-3">
                  {/* Thumbnail Preview */}
                  <div className="relative h-14 w-20 bg-neutral-950 rounded-lg overflow-hidden shrink-0 border border-neutral-800 flex items-center justify-center p-0.5">
                    {/* Backdrop at low opacity to show context */}
                    <img
                      src={activeBackdrop}
                      alt="backdrop"
                      className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                    {activeArtwork ? (
                      <img
                        src={activeArtwork}
                        alt={selectedPreset.artTitle}
                        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"
                      />
                    ) : (
                      <span className="text-xs text-neutral-600 font-mono">None</span>
                    )}
                  </div>
                  {/* Art Label */}
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold block text-neutral-100 truncate">
                      {customArtworkUrl ? 'Custom Design Overlay' : activeArtwork ? selectedPreset.artTitle : 'Blank Canvas'}
                    </span>
                    <span className="text-[10px] text-blue-400 font-semibold block leading-normal mt-0.5">
                      {customArtworkUrl ? 'User Uploaded File' : activeArtwork ? selectedPreset.artTag : 'Upload artwork below'}
                    </span>
                  </div>
                </div>
                
                <p className="text-[11px] text-neutral-400 mt-3 leading-relaxed border-t border-neutral-800/80 pt-2.5">
                  {customArtworkUrl 
                    ? 'Previewing your own uploaded mural/artwork. Adjust the scale, blending mode, and opacity controls, or drag the design around to position it.' 
                    : activeArtwork 
                    ? selectedPreset.description
                    : 'Your wall is uploaded and clean! Now upload a custom artwork below to preview it directly on your own space.'
                  }
                </p>
              </div>

              {/* Upload Custom Artwork button */}
              <div className="mt-3 flex gap-2">
                <label className={`flex items-center justify-center gap-2 flex-1 px-3 py-2.5 rounded-xl border border-dashed text-xs font-semibold cursor-pointer transition-all ${
                  customArtworkUrl
                    ? 'border-blue-500/50 bg-blue-500/5 text-blue-400'
                    : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                }`}>
                  <Upload className="h-4 w-4 shrink-0 text-blue-400" />
                  <span className="truncate">{customArtworkUrl ? "Custom Art Loaded" : "Upload Custom Artwork"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleArtworkUpload}
                    className="hidden"
                  />
                </label>
                {customArtworkUrl && (
                  <button
                    onClick={() => setCustomArtworkUrl(null)}
                    className="px-3 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-red-400 border border-neutral-800 hover:border-neutral-700 rounded-xl text-xs font-semibold transition-all"
                  >
                    Reset Art
                  </button>
                )}
              </div>
            </div>

            {/* Informative Tip */}
            <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex items-start gap-2.5 text-xs text-neutral-400 leading-normal">
              <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <p>
                Our master painters translate these visual templates into physical scale, matching texture, sheen, and dimensions to 100% precision.
              </p>
            </div>

            {/* Action CTA */}
            <button
              onClick={() => onOpenConsultation(customArtworkUrl ? 'custom' : selectedPreset.category)}
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
