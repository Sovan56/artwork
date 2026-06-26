import React from 'react';
import { Sparkles, Award, User, Quote, BookOpen, GraduationCap } from 'lucide-react';
import { FOUNDERS, SPECIALTIES, OFFICE_MURALS_INFO } from '../data';

export default function About() {
  return (
    <section id="about" className="py-20 bg-neutral-950 text-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block mb-2">
              Our Creative Brains
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Founders & Artists
            </h2>
            <p className="mt-2 text-neutral-400 max-w-xl text-sm sm:text-base">
              Meet our master artists behind the custom concept sketches and hand-painted wall masterpieces.
            </p>
          </div>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl shrink-0">
            <Award className="h-4 w-4 text-blue-400" />
            <span>Over 12+ combined years in Digital & Manual Wall Artistry</span>
          </div>
        </div>

        {/* Co-Founders Profiles (Subhankar & Rahul) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-20">
          {FOUNDERS.map((founder, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 rounded-2xl border border-neutral-800/80 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start shadow-xl"
            >
              {/* Headshot Image */}
              <div className="h-28 w-28 sm:h-36 sm:w-36 rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-800 shrink-0 mx-auto sm:mx-0">
                <img
                  src={founder.image}
                  alt={founder.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                />
              </div>

              {/* Bio details */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <div>
                  <h4 className="text-xl font-bold text-white leading-snug">{founder.name}</h4>
                  <p className="text-xs font-bold text-blue-400 mt-0.5 uppercase tracking-wider">{founder.role}</p>
                </div>
                
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                  "{founder.bio.split('|')[0].trim()}"
                </p>

                {/* Additional detailed experience list */}
                <div className="text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60 pt-3">
                  {founder.details}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Specialties / Offered Wall Art Categories */}
        <div className="border-t border-neutral-900 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">
              Our Capabilities
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2">
              Wall Painting Specialties
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Our custom paintings span multiple architectural applications, tailored dynamically to match each room's aesthetic.
            </p>
          </div>

          {/* Specialities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {SPECIALTIES.map((spec, idx) => (
              <div
                key={idx}
                className="bg-neutral-900/40 border border-neutral-800/60 rounded-2xl p-6 hover:border-neutral-700 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <h4 className="text-lg font-bold text-white">{spec.title}</h4>
                </div>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate & Office section matching screenshots with office image */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Office Image */}
            <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern corporate workspace lounge with custom office mural"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            </div>

            {/* Corporate services list */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
              <h4 className="text-xl font-bold text-white mb-6">
                Corporate Office Solutions & Consultations
              </h4>
              
              <div className="space-y-6">
                {OFFICE_MURALS_INFO.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-400/10 h-7 w-7 rounded-lg flex items-center justify-center shrink-0 border border-blue-400/20">
                      {item.id}
                    </span>
                    <div>
                      <h5 className="font-bold text-neutral-100 text-sm sm:text-base">{item.title}</h5>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
