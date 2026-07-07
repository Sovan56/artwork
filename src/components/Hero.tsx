import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Paintbrush, Heart, Zap, Shield, CheckCircle } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';
// @ts-expect-error - PNG import from assets folder
import heroBg from '../../assets/images/herobackground.png';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreVisualizer: () => void;
}

export default function Hero({ onOpenConsultation, onExploreVisualizer }: HeroProps) {
  // Map icons to the highlights
  const getHighlightIcon = (index: number) => {
    switch (index) {
      case 0: return <Paintbrush className="h-4 w-4 text-blue-500 shrink-0" />;
      case 1: return <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />;
      case 2: return <Shield className="h-4 w-4 text-blue-500 shrink-0" />;
      case 3: return <Zap className="h-4 w-4 text-blue-500 shrink-0" />;
      default: return <Heart className="h-4 w-4 text-blue-500 shrink-0" />;
    }
  };

  return (
    <section id="hero-section" className="relative bg-neutral-950 text-white overflow-hidden min-h-screen lg:min-h-[90vh] flex flex-col justify-center py-16 md:py-24 border-b border-neutral-900">
      
      {/* Immersive Artistic Mural Background with parallax/scroll effects & overlays */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          src={heroBg}
          alt="Mural artist painting colorful geometric face portrait on a wall"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.85] select-none"
        />
        {/* Advanced radial & linear gradient overlays for visual depth and perfect text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          
          {/* Main Hero Header Text (Aligned left without glass block, for maximum negative space elegance) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start space-y-6"
          >
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold tracking-wide">
              <Paintbrush className="h-3.5 w-3.5 animate-pulse" />
              <span>Premium Mural & Wall Painting Studio</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
              Find <br />
              your wall <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
                painting.
              </span>
            </h1>

            <p className="max-w-xl text-neutral-200 text-sm sm:text-base md:text-lg leading-relaxed">
              Original hand-painted murals — Kalamkari, Vastu, contemporary and custom — designed and installed by Creative Art Culture across India.
            </p>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onOpenConsultation}
                id="hero-get-consultation-btn"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/35 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Get Free Consultation</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => {
                  const el = document.getElementById('portfolio');
                  if (el) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = el.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                id="hero-view-portfolio-btn"
                className="bg-transparent hover:bg-white/10 border border-white/60 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Portfolio</span>
              </button>
            </div>

            {/* Micro Rating Indicator */}
            <div className="flex items-center gap-3 text-xs text-neutral-400 pt-5 border-t border-neutral-800/80 w-full max-w-md">
              <div className="flex text-yellow-500 font-bold tracking-wider">★★★★★</div>
              <span>100% Client satisfaction across India & West Bengal.</span>
            </div>
          </motion.div>
        </div>

        {/* Horizontal scroll ticker displaying Why Choose Us items matching screenshot banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-neutral-900/30 border border-neutral-800/50 backdrop-blur-sm rounded-2xl p-4 overflow-x-auto scrollbar-none"
        >
          <div className="flex items-center gap-6 min-w-max px-2">
            <span className="text-xs uppercase tracking-wider font-extrabold text-blue-400 shrink-0 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
              Why Choose Us:
            </span>
            {WHY_CHOOSE_US.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs font-semibold text-neutral-200"
              >
                {getHighlightIcon(idx)}
                <span>{feature}</span>
                {idx < WHY_CHOOSE_US.length - 1 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 mx-1 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
