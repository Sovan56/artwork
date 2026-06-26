import React from 'react';
import { Mail, Instagram, Facebook, Phone, MapPin, ExternalLink, Globe, Sparkles } from 'lucide-react';
import { CONTACT_INFO, WHY_CHOOSE_US } from '../data';

interface FooterProps {
  onOpenConsultation: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-neutral-950 text-white pt-16 pb-8 border-t border-neutral-900 relative overflow-hidden">
      
      {/* Absolute decorative ambient light */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-900">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold tracking-tight font-mono text-white">
                artworks
              </span>
              <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest mt-1">
                CREATIVE ART CULTURE
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Premium professional wall painting and mural services portfolio. Transforming empty surfaces into spectacular, engaging landmarks with high-VOC non-toxic premium paints.
            </p>

            {/* Quick Consultation Trigger Banner */}
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl max-w-sm flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <span className="text-xs text-neutral-300 font-semibold text-center sm:text-left">
                Ready to transform your walls?
              </span>
              <button
                onClick={onOpenConsultation}
                id="footer-get-free-consultation"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-all active:scale-95 shrink-0"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Column 2: Contact Info from Screenshots */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-blue-400">
              Direct Contact
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
              {/* Emails */}
              <div className="flex items-start gap-3">
                <Mail className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href={`mailto:${CONTACT_INFO.email1}`} className="hover:text-blue-400 hover:underline block font-medium">
                    {CONTACT_INFO.email1}
                  </a>
                  <a href={`mailto:${CONTACT_INFO.email2}`} className="hover:text-blue-400 hover:underline block font-medium">
                    {CONTACT_INFO.email2}
                  </a>
                </div>
              </div>

              {/* Social Medias */}
              <div className="flex items-start gap-3">
                <Instagram className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Instagram</span>
                  <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                    <span>@{CONTACT_INFO.instagram}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Facebook</span>
                  <a href={CONTACT_INFO.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                    <span>{CONTACT_INFO.facebook}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Address & Phone details from Screenshots */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-blue-400">
              Address & Calling
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm text-neutral-300">
              {/* Phones */}
              <div className="flex items-start gap-3">
                <Phone className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Call / WhatsApp</span>
                  <div className="space-y-0.5">
                    <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 hover:underline block font-bold text-neutral-100">
                      {CONTACT_INFO.phone1}
                    </a>
                    <span className="block font-bold text-neutral-100">{CONTACT_INFO.phone2}</span>
                  </div>
                </div>
              </div>

              {/* Local registration */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4.5 w-4.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase font-bold">Registered Office</span>
                  <p className="font-semibold text-neutral-100 leading-normal">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Brand details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Subhankar wallArt. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Serving West Bengal, India & Commercial Projects Nationwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
