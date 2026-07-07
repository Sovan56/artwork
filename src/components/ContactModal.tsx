import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, CheckCircle2, Calculator, Info, Phone, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedArt?: string;
}

export default function ContactModal({ isOpen, onClose, preSelectedArt }: ContactModalProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [artworkType, setArtworkType] = useState(preSelectedArt || 'custom');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [complexity, setComplexity] = useState<'basic' | 'medium' | 'premium'>('medium');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pricing calculator logic
  const calculateEstimate = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null;

    const area = w * h;
    let minRate = 300;
    let maxRate = 590;
    let rateLabel = "300 - 590";
    
    if (complexity === 'basic') {
      minRate = 100;
      maxRate = 290;
      rateLabel = "100 - 290";
    } else if (complexity === 'premium') {
      minRate = 600;
      maxRate = 1000;
      rateLabel = "600 - 1000";
    }

    const minEstimate = Math.round(area * minRate);
    const maxEstimate = Math.round(area * maxRate);

    return {
      area: area.toFixed(1),
      min: minEstimate.toLocaleString('en-IN'),
      max: maxEstimate.toLocaleString('en-IN'),
      rate: rateLabel
    };
  };

  const estimate = calculateEstimate();

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending data to server
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setArtworkType('custom');
    setWidth('');
    setHeight('');
    setComplexity('medium');
    setMessage('');
    setFile(null);
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 rounded-full bg-neutral-100 p-2 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Column - Pricing Info & Details */}
            <div className="w-full md:w-5/12 bg-blue-600 text-white p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-blue-700 px-2.5 py-1 rounded-full">
                  Instant Quote
                </span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">Get Free Consultation</h3>
                <p className="mt-2 text-blue-100 text-sm leading-relaxed">
                  Provide your wall details and ideas, and our design team will construct a bespoke preview overlay for your home or office.
                </p>

                {/* Direct Contacts */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 shrink-0 text-blue-200" />
                    <div>
                      <p className="text-xs text-blue-200">Call / WhatsApp</p>
                      <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                        {CONTACT_INFO.phone1}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Info className="h-4 w-4 shrink-0 text-blue-200 mt-0.5" />
                    <div>
                      <p className="text-xs text-blue-200">Pricing Guideline</p>
                      <p className="font-medium text-blue-100">₹100 – ₹1,000 per sq. ft. depending on artwork detail level.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimate Visualizer (Inside Modal Sidebar) */}
              <div className="mt-8 pt-6 border-t border-blue-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-5 w-5 text-blue-200" />
                  <span className="font-semibold text-sm">Estimate Calculator</span>
                </div>
                {estimate ? (
                  <div className="bg-blue-700/40 rounded-xl p-4 border border-blue-400/20">
                    <div className="flex justify-between text-xs text-blue-200 mb-1">
                      <span>Total Area:</span>
                      <span className="font-mono">{estimate.area} sq. ft.</span>
                    </div>
                    <div className="flex justify-between text-xs text-blue-200 mb-2">
                      <span>Rate Mode:</span>
                      <span>₹{estimate.rate} / sq. ft.</span>
                    </div>
                    <div className="pt-2 border-t border-blue-500/40">
                      <span className="text-[10px] text-blue-200 uppercase tracking-wider block">Estimated Price Range</span>
                      <span className="text-xl font-mono font-bold text-white whitespace-nowrap block">
                        ₹{estimate.min} - ₹{estimate.max}
                      </span>
                      <p className="text-[10px] text-blue-200 mt-1 leading-normal">
                        *Final quote subject to layout inspection & custom prep needs.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-700/20 rounded-xl p-4 border border-blue-500/20 text-center">
                    <p className="text-xs text-blue-100 italic">
                      Enter wall height & width in the form to view an instant budget range.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full md:w-7/12 p-6 md:p-8 overflow-y-auto max-h-[90vh] md:max-h-none">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                  <h4 className="text-2xl font-bold text-neutral-900">Thank you!</h4>
                  <p className="mt-2 text-neutral-600 max-w-sm text-sm">
                    Your inquiry has been successfully transmitted. Subhankar and the team will review your wall details and reply with a mock concept proposal within 24 hours.
                  </p>
                  <button
                    id="submit-another-btn"
                    onClick={resetForm}
                    className="mt-6 px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors text-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h4 className="text-lg font-bold text-neutral-900">Tell Us About Your Space</h4>

                  {/* Basic Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-neutral-700 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 85840 03915"
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="artworkType" className="block text-xs font-semibold text-neutral-700 mb-1">Mural Style preference</label>
                      <select
                        id="artworkType"
                        value={artworkType}
                        onChange={(e) => setArtworkType(e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm text-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      >
                        <option value="custom">Custom Design (Let's design it!)</option>
                        <option value="vector-modern">Vector & Modern Scenery</option>
                        <option value="traditional-kalamkari">Kalamkari Traditional Art</option>
                        <option value="spiritual-vastu">Spiritual & Vastu (Horses, etc.)</option>
                        <option value="kids-educational">Kids & Educational Murals</option>
                        <option value="office-commercial">Corporate / Office Murals</option>
                      </select>
                    </div>
                  </div>

                  {/* Dimensions & Complexity (For pricing quote) */}
                  <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                    <span className="text-xs font-bold text-neutral-800 block mb-2">Wall Dimensions (Optional for estimate)</span>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label htmlFor="width" className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">Width (ft)</label>
                        <input
                          type="number"
                          id="width"
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          placeholder="W"
                          min="1"
                          className="w-full rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm text-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="height" className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">Height (ft)</label>
                        <input
                          type="number"
                          id="height"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="H"
                          min="1"
                          className="w-full rounded-lg border border-neutral-300 px-2.5 py-1.5 text-sm text-neutral-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-neutral-500 mb-0.5">Complexity</label>
                        <div className="flex rounded-lg border border-neutral-300 overflow-hidden text-xs font-semibold h-[34px]">
                          <button
                            type="button"
                            onClick={() => setComplexity('basic')}
                            className={`flex-1 flex items-center justify-center border-r border-neutral-300 transition-colors ${complexity === 'basic' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
                          >
                            Basic
                          </button>
                          <button
                            type="button"
                            onClick={() => setComplexity('medium')}
                            className={`flex-1 flex items-center justify-center border-r border-neutral-300 transition-colors ${complexity === 'medium' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
                          >
                            Mid
                          </button>
                          <button
                            type="button"
                            onClick={() => setComplexity('premium')}
                            className={`flex-1 flex items-center justify-center transition-colors ${complexity === 'premium' ? 'bg-blue-600 text-white' : 'bg-white hover:bg-neutral-100 text-neutral-600'}`}
                          >
                            Full
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flexible File Upload Area */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Upload your Wall Image (Optional - For digital preview overlay)
                    </label>
                    <div
                      id="file-drop-zone"
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={handleUploadClick}
                      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-5 cursor-pointer transition-all ${
                        dragActive
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-neutral-300 hover:border-blue-400 hover:bg-neutral-50/50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {file ? (
                        <div className="flex items-center gap-3 w-full px-2">
                          <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg">
                            <Upload className="h-5 w-5" />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-semibold text-neutral-800 truncate">{file.name}</p>
                            <p className="text-[10px] text-neutral-500">{(file.size / 1024).toFixed(1)} KB • Click to replace</p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFile(null);
                            }}
                            className="text-xs text-neutral-400 hover:text-red-500 font-medium bg-neutral-100 hover:bg-red-50 p-1.5 rounded-md"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
                          <p className="text-xs font-semibold text-neutral-800">
                            Drag & drop your wall photo here, or <span className="text-blue-600 underline">browse</span>
                          </p>
                          <p className="text-[10px] text-neutral-500 mt-1">PNG, JPG, JPEG up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 mb-1">Your Ideas / Specific requirements</label>
                    <textarea
                      id="message"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about the design style you have in mind, colors, or references..."
                      className="w-full rounded-xl border border-neutral-300 px-3.5 py-2 text-sm text-neutral-800 placeholder-neutral-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-consultation-btn"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Request Free Consultation</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
