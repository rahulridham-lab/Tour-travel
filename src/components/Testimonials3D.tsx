import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ShieldCheck, Award } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const Testimonials3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = siteConfig.testimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Gentle auto-rotation every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section id="reviews" className="py-20 relative bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-xs font-semibold text-[#0D9488] uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Traveler Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0F172A] mb-3">
            Words From Our Guests
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-xl mx-auto font-normal">
            Read firsthand accounts from world explorers who entrusted their Madagascar voyage
            to Ernest and our private expedition teams.
          </p>
        </div>

        {/* 3D Testimonial Showcase Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-xl relative overflow-hidden bg-white">
            {/* Huge Decorative Quotation Mark */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-[#0D9488]/10 pointer-events-none" />

            {/* Rating Stars */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
              ))}
              <span className="text-xs text-[#0D9488] font-bold ml-2">5.0 Verified Expedition Rating</span>
            </div>

            {/* Quote Body */}
            <blockquote className="text-lg sm:text-2xl font-display text-[#0F172A] leading-relaxed italic mb-8 font-normal">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author Footer Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#0D9488]"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-[#0F172A]">
                    {current.author}
                  </h4>
                  <p className="text-xs text-[#0D9488] flex items-center gap-1 font-medium">
                    <span>{current.country}</span>
                    <span>&bull;</span>
                    <span className="text-[#64748B]">{current.date}</span>
                  </p>
                </div>
              </div>

              <div className="text-right sm:max-w-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold block">
                  Itinerary Completed:
                </span>
                <span className="text-xs font-semibold text-[#0F172A]">{current.itinerary}</span>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#0D9488]' : 'w-2 bg-[#CBD5E1] hover:bg-[#0D9488]/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0F172A] hover:text-white hover:bg-[#0D9488] hover:border-[#0D9488] flex items-center justify-center transition-all shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white border border-[#CBD5E1] text-[#0F172A] hover:text-white hover:bg-[#0D9488] hover:border-[#0D9488] flex items-center justify-center transition-all shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
