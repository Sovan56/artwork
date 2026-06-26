/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Visualizer from './components/Visualizer';
import Process from './components/Process';
import About from './components/About';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedArtType, setSelectedArtType] = useState<string | undefined>(undefined);

  // Open consultation modal, optionally with a pre-selected art category
  const openConsultation = (artType?: string) => {
    setSelectedArtType(artType);
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
    setSelectedArtType(undefined);
  };

  // Scroll spy to highlight active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'process', 'about', 'pricing'];
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreVisualizer = () => {
    const element = document.getElementById('interactive-visualizer');
    if (element) {
      const offset = 80;
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
    <div className="bg-neutral-950 min-h-screen text-neutral-100 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Floating Header & Navigation */}
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenConsultation={() => openConsultation()}
      />

      {/* Main Sections Stack */}
      <main className="flex-1">
        {/* Hero Landing */}
        <div id="home">
          <Hero
            onOpenConsultation={() => openConsultation()}
            onExploreVisualizer={handleExploreVisualizer}
          />
        </div>

        {/* Gallery Grid Catalog */}
        <div id="portfolio">
          <Portfolio onOpenConsultation={(artType) => openConsultation(artType)} />
        </div>

        {/* Interactive Wall Visualizer preview */}
        <Visualizer onOpenConsultation={(artType) => openConsultation(artType)} />

        {/* Stepper Process Workflow */}
        <div id="process">
          <Process onOpenConsultation={() => openConsultation()} />
        </div>

        {/* Co-Founders & Specialty Profiles */}
        <div id="about">
          <About />
        </div>

        {/* Interactive Estimator Calculator */}
        <div id="pricing">
          <Pricing onOpenConsultation={(artType) => openConsultation(artType)} />
        </div>
      </main>

      {/* Footer Contact Details card */}
      <Footer onOpenConsultation={() => openConsultation()} />

      {/* Free Consultation Form Request Modal */}
      <ContactModal
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
        preSelectedArt={selectedArtType}
      />
    </div>
  );
}
