import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, MapPin, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenConsultation: () => void;
}

export default function Navbar({ activeSection, setActiveSection, onOpenConsultation }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'process', label: 'Our Process' },
    { id: 'about', label: 'About Us' },
    { id: 'pricing', label: 'Pricing' }
  ];

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    // Smooth scroll to element
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of floating navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Scroll alert bar/banner matching the top banner in screenshots */}
      <div id="alert-banner" className="bg-blue-600 text-white text-xs py-2 px-4 text-center overflow-hidden font-semibold border-b border-blue-500 flex justify-center items-center gap-4 relative z-50">
        <div className="flex items-center gap-1.5 animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Special Large Projects Discount Active!</span>
        </div>
        <span className="hidden sm:inline-block">|</span>
        <span className="hidden sm:inline-block text-blue-100">Hand-Painted vs. Premium Digital Wall Art Solutions</span>
        <button 
          onClick={onOpenConsultation} 
          className="underline text-white hover:text-blue-100 transition-colors ml-1 font-bold"
        >
          Book Now
        </button>
      </div>

      {/* Main floating Header */}
      <header
        id="app-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-900/90 backdrop-blur-md shadow-lg border-b border-neutral-800'
            : 'bg-neutral-950 border-b border-neutral-900'
        } text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo Brand Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex flex-col text-left group"
            >
              <span className="text-sm sm:text-base font-extrabold tracking-tight font-mono text-neutral-100 group-hover:text-blue-400 transition-colors">
                artworks
              </span>
              <span className="text-[10px] text-neutral-400 font-medium font-sans">
                CREATIVE ART CULTURE
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeSection === item.id
                    ? 'bg-neutral-800 text-blue-400 border border-neutral-700/50'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact / Right Side Badges */}
          <div className="hidden lg:flex items-center gap-4">
            {/* West Bengal Location badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300">
              <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
              <span>West Bengal, India</span>
            </div>

            {/* Quick Consultation Trigger Button */}
            <button
              onClick={onOpenConsultation}
              id="header-consultation-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free Consultation</span>
            </button>
          </div>

          {/* Hamburger Menu (Mobile Only) */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-2 rounded-lg transition-all"
            >
              Get Quote
            </button>
            <button
              id="mobile-menu-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:text-blue-400 transition-all text-neutral-300"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-dropdown-nav"
            className="md:hidden bg-neutral-950 border-b border-neutral-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1.5 border-t border-neutral-900">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-neutral-900 text-blue-400 border border-neutral-800'
                      : 'text-neutral-300 hover:bg-neutral-900/40 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}

              <div className="pt-4 border-t border-neutral-900 space-y-3">
                {/* Mobile badges */}
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-xs font-semibold text-neutral-300">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>West Bengal, India</span>
                </div>

                <button
                  onClick={onOpenConsultation}
                  id="mobile-drawer-consultation-btn"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Request Consultation</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
