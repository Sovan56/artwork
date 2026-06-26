import React from 'react';
import { CheckCircle2, AlertCircle, Percent, Paintbrush, ArrowRight, ClipboardList } from 'lucide-react';
import { PROCESS_STEPS, SPECIALTIES, WHY_CHOOSE_US } from '../data';

interface ProcessProps {
  onOpenConsultation: () => void;
}

export default function Process({ onOpenConsultation }: ProcessProps) {
  return (
    <section id="process" className="py-20 bg-neutral-50 text-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Process Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4">
            How We Work
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base">
            From your raw initial sketches to a varnished, durable masterpiece, we maintain a systematic process to prepare, execute, and deliver pristine murals.
          </p>
        </div>

        {/* 6 Step Interactive Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          
          {/* Decorative link connectors for desktop (lines across grid cards) */}
          <div className="absolute hidden lg:block inset-0 z-0 pointer-events-none" />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl border border-neutral-200/80 p-6 shadow-sm hover:shadow-lg transition-all duration-300 relative z-10 flex flex-col justify-between group"
            >
              <div>
                {/* Number Accent */}
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold text-base mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors duration-300">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold text-neutral-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step Special Action (Like Design Planning trigger button shown in screenshots) */}
              {step.ctaText && (
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <button
                    onClick={onOpenConsultation}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline text-left"
                  >
                    <span>Request custom proposal layout</span>
                    <ArrowRight className="h-3 w-3 shrink-0" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Process Supplementary Details Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Materials Included info matching screenshots */}
          <div className="lg:col-span-6 bg-blue-600 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-3xl pointer-events-none opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Paintbrush className="h-6 w-6 text-blue-200" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Materials Included</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                All necessary painting materials, brushes, scaffolds, canvas boards, varnishes, and low-odor, premium non-toxic acrylic colors are provided by us unless otherwise discussed. No hidden logistical charges.
              </p>
              
              <ul className="space-y-2 text-xs sm:text-sm text-blue-50">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-300 shrink-0" />
                  <span>Premium high-fidelity acrylic, oil or enamel paints</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-300 shrink-0" />
                  <span>Protective floor sheets & painter tape masking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-300 shrink-0" />
                  <span>Dual protective protective lacquer coating layer</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-500/30 relative z-10">
              <button
                onClick={onOpenConsultation}
                className="bg-white hover:bg-neutral-100 text-blue-600 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 text-center block w-full sm:w-auto"
              >
                Get Free Consultation
              </button>
            </div>
          </div>

          {/* Right Block: Project Discount program from screenshots */}
          <div className="lg:col-span-6 bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Percent className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">Project Discount</h3>
              </div>
              
              <div className="space-y-4 text-sm text-neutral-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-neutral-800 text-sm">Special Discounts For Large Projects</h4>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                    For large commercial, institutional, corporate offices, or bulk residential painting projects, special discounted slab rates apply.
                  </p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-neutral-500">
                    The final discount relies on overall project area (sq. ft.), the height range of the layout, and details/complexity level. Let's inspect the wall dimensions and outline a custom commercial proposal quote.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100">
              <p className="text-xs font-semibold text-neutral-400 mb-3">
                🏢 Suitable for Hotels, Cafés, Offices, Schools & Apartments.
              </p>
              <button
                onClick={onOpenConsultation}
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md active:scale-95 text-center block w-full sm:w-auto"
              >
                Inquire For Bulk Rates
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
