import React, { useState } from 'react';
import { Calculator, Sparkles, AlertCircle, RefreshCw, Layers, Check, FileText } from 'lucide-react';

interface PricingProps {
  onOpenConsultation: (artType: string) => void;
}

export default function Pricing({ onOpenConsultation }: PricingProps) {
  const [width, setWidth] = useState('10');
  const [height, setHeight] = useState('8');
  const [complexity, setComplexity] = useState<'basic' | 'medium' | 'premium'>('medium');

  // Calculator helper
  const w = parseFloat(width);
  const h = parseFloat(height);
  const area = isNaN(w) || isNaN(h) || w <= 0 || h <= 0 ? 0 : w * h;

  let rate = 550; // medium
  let label = "Medium Detail Mural";
  let techDesc = "Medium complexity scenery, corporate branding layouts, detailed vector fields, or customized café typography designs.";
  
  if (complexity === 'basic') {
    rate = 200;
    label = "Basic Silhouette / Geometric Art";
    techDesc = "Simple shapes, single-color layouts, block geometric patterns, basic kids cartoons, or minimal line art.";
  } else if (complexity === 'premium') {
    rate = 1000;
    label = "High-Fidelity Premium / Kalamkari Art";
    techDesc = "Intricate Kalamkari motifs, complex spiritual Vastu horse portraits, hyper-detailed multi-layered realism, or highly textured brush paintings.";
  }

  const basePrice = area * rate;
  const minPrice = Math.round(basePrice * 0.9);
  const maxPrice = Math.round(basePrice * 1.1);

  const formatPrice = (p: number) => {
    return p.toLocaleString('en-IN');
  };

  const factors = [
    'Artwork complexity level (detailed brushstrokes vs. broad silhouettes)',
    'Wall size, height, and layout dimensions',
    'Project location and structural logistics',
    'Accessibility of the site (ladders vs. heavy scaffold needs)',
    'Surface base condition (fresh plaster vs. raw wall preparation)',
    'Custom stencil, texture, or specialized metallic paint requirements',
    'Completion timeline and speed requirements'
  ];

  return (
    <section id="pricing" className="py-20 bg-white text-neutral-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pricing Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Cost Estimations
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-4">
            Pricing Section & Calculator
          </h2>
          <p className="mt-3 text-neutral-500 text-sm sm:text-base">
            Transparent pricing based on total wall dimensions and artwork detail level. Enter your sizes to calculate a quick ballpark budget.
          </p>
        </div>

        {/* Pricing Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Interactive Calculator Widget */}
          <div className="lg:col-span-7 bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-400 shrink-0" />
                  <span className="font-bold text-sm uppercase tracking-wider">Wall Budget Estimator</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">
                  <Sparkles className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span>Real-Time Rates</span>
                </div>
              </div>

              {/* Input Inputs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="pricing-width" className="block text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 mb-1.5">
                    Wall Width (Feet)
                  </label>
                  <input
                    type="number"
                    id="pricing-width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    min="1"
                    placeholder="Width"
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="pricing-height" className="block text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 mb-1.5">
                    Wall Height (Feet)
                  </label>
                  <input
                    type="number"
                    id="pricing-height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    min="1"
                    placeholder="Height"
                    className="w-full rounded-xl bg-neutral-950 border border-neutral-800 px-4 py-2.5 text-sm text-neutral-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-[10px] uppercase tracking-wider font-extrabold text-neutral-400 mb-1.5">
                    Complexity
                  </span>
                  <div className="flex bg-neutral-950 rounded-xl p-1 border border-neutral-800 h-[42px] text-xs font-semibold">
                    <button
                      onClick={() => setComplexity('basic')}
                      className={`flex-1 py-1 px-2 rounded-lg transition-colors ${complexity === 'basic' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Basic
                    </button>
                    <button
                      onClick={() => setComplexity('medium')}
                      className={`flex-1 py-1 px-2 rounded-lg transition-colors ${complexity === 'medium' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Mid
                    </button>
                    <button
                      onClick={() => setComplexity('premium')}
                      className={`flex-1 py-1 px-2 rounded-lg transition-colors ${complexity === 'premium' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'}`}
                    >
                      Full
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic details output */}
              {area > 0 ? (
                <div className="space-y-4">
                  {/* Selected Complexity Card */}
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/60">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="h-4 w-4 text-blue-400" />
                      <span className="text-xs font-extrabold text-blue-400 uppercase tracking-wider">{label}</span>
                    </div>
                    <p className="text-xs text-neutral-400 leading-normal">{techDesc}</p>
                    <span className="text-xs text-neutral-500 block mt-2 font-mono">
                      Calculated Rate: ₹{rate} per sq. ft.
                    </span>
                  </div>

                  {/* Summary Area and Price */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-neutral-800">
                    <div className="shrink-0">
                      <span className="text-xs text-neutral-400 block uppercase tracking-wider">Total Wall Area:</span>
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-neutral-100">{area.toFixed(1)} Sq. Ft.</span>
                    </div>
                    <div className="bg-blue-600/10 border border-blue-500/20 p-4 px-6 rounded-xl text-center sm:text-right w-full sm:w-auto">
                      <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold block mb-1 whitespace-nowrap">Estimated Price Range</span>
                      <span className="text-xl sm:text-2xl font-mono font-bold text-blue-400 whitespace-nowrap block">
                        ₹{formatPrice(minPrice)} - ₹{formatPrice(maxPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800 text-center italic text-neutral-400 text-sm">
                  Please enter valid positive dimensions to view a dynamic price calculation.
                </div>
              )}
            </div>

            {/* Quote Action button */}
            <div className="mt-8 pt-4 border-t border-neutral-800">
              <button
                onClick={() => onOpenConsultation(complexity)}
                className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-600/10"
              >
                <FileText className="h-4 w-4" />
                <span>Submit Sizes For Customized Quote Proposal</span>
              </button>
            </div>
          </div>

          {/* Right Block: General Pricing Info and factors list from screenshots */}
          <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block mb-3">
                Estimated pricing
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900">
                ₹200 – ₹1000 per sq. ft.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
                Wall painting costs rely on structural complexity, total surface preparation needs, height logistics, and completion timelines. Every mural matches custom client specifications.
              </p>

              {/* Factors list */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <span className="text-xs font-bold text-neutral-800 block mb-3 uppercase tracking-wider">
                  Factors Affecting Pricing:
                </span>
                <ul className="space-y-2.5">
                  {factors.map((fact, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-neutral-500 leading-normal">
                      <Check className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-200 text-center sm:text-left bg-blue-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-2xl border-t border-blue-100">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 shrink-0" />
                <p className="text-[11px] text-neutral-500 text-left leading-normal font-medium">
                  <strong>Site Inspection:</strong> A physical site inspection or clear photographic wall assessment is conducted prior to finalizing the quotation.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
