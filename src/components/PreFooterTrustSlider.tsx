import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Award,
  Users,
  Car,
  Compass,
  Clock,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

interface TrustPillar {
  icon: React.ElementType;
  title: string;
  tagline: string;
  desc: string;
  stat: string;
}

const trustPillars: TrustPillar[] = [
  {
    icon: Car,
    title: '100% Private Toyota 4x4 Fleet',
    tagline: 'Never Shared with Strangers',
    desc: 'Equipped with heavy-duty air conditioning, high ground clearance, satellite comms, and unlimited safari mileage.',
    stat: 'Private Fleet',
  },
  {
    icon: Award,
    title: '0% Middleman Commission',
    tagline: 'Direct Antsirabe Operator',
    desc: 'You book directly with Ernest Soa and native Malagasy trackers. No European intermediary agency markups.',
    stat: 'Direct Local Rate',
  },
  {
    icon: Users,
    title: 'Trilingual Certified Guides',
    tagline: 'French, English, Spanish',
    desc: 'Government-certified national escort guides passionate about Madagascar fauna, flora, history, and customs.',
    stat: 'Trilingual Team',
  },
  {
    icon: ShieldCheck,
    title: '24/7 Dispatch & Support HQ',
    tagline: 'Real-Time Oversight',
    desc: 'Continuous real-time tracking from Antsirabe & Antananarivo hubs ensuring seamless mechanical and medical safety.',
    stat: '24/7 Concierge',
  },
  {
    icon: Compass,
    title: 'Flexible Custom Pacing',
    tagline: 'Tailored to Your Holiday',
    desc: 'Every circuit can reduce or increase days according to your flight schedules, interests, and budget.',
    stat: '100% Tailor-Made',
  },
  {
    icon: CheckCircle2,
    title: 'Transparent Tiered Pricing',
    tagline: 'No Hidden Costs',
    desc: 'Clear upfront quotes for 2 persons, 3-4 persons, and 5+ person groups including fuel, parks, and driver lodging.',
    stat: 'All-Inclusive Quotes',
  },
];

interface PreFooterTrustSliderProps {
  onNavigate?: (page: string) => void;
}

export const PreFooterTrustSlider: React.FC<PreFooterTrustSliderProps> = ({
  onNavigate,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev === 0 ? trustPillars.length - itemsPerView : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (trustPillars.length - itemsPerView + 1));
  };

  const visibleItems = trustPillars.slice(startIndex, startIndex + itemsPerView);

  return (
    <section className="py-14 bg-gradient-to-b from-white to-[#0B1B13]/5 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D9488]/10 text-xs font-bold text-[#0D9488] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Why Discerning Travelers Choose Ernest</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A]">
              The Ernest Travel Tours Difference
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Authentic Malagasy hospitality, seasoned bush drivers, and rigorous safety standards for unforgettable overland expeditions.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous guarantee"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next guarantee"
              className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-[#0D9488] hover:text-white hover:border-[#0D9488] flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_rgba(13,148,136,0.12)] hover:border-[#0D9488]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.stat}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-xs font-semibold text-[#0D9488] block mt-0.5 mb-2">
                    {item.tagline}
                  </span>

                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Operator Guarantee
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Contact & Consultation Ribbon */}
        <div className="mt-8 p-4 sm:p-6 rounded-2xl bg-[#0B1B13] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#1A2E22] shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block">
                Have custom dates or specific group requirements?
              </span>
              <p className="text-sm font-semibold text-white">
                Chat directly with Ernest Soa on WhatsApp for instant routing advice & customized quotes.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent('Hello Ernest! I would like custom advice on planning my Madagascar trip.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
          >
            <span>WhatsApp Ernest (+261 34 02 000 00)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
