import React, { useState, useEffect, useRef } from 'react';
import {
  Tag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Gift,
  Flame,
  PhoneCall,
} from 'lucide-react';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';
import { Circuit, circuitsData } from '../data/circuits';

interface OfferItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  discountText: string;
  perks: string[];
  validUntil: string;
  targetCircuitId?: string;
  bgGradient: string;
}

const promotionalOffers: OfferItem[] = [
  {
    id: 'early-bird-2026',
    badge: 'SEASON SPECIAL 2026/2027',
    badgeColor: 'bg-emerald-500 text-white',
    title: 'Early Bird Safari Bonus & Complimentary VIP Perks',
    subtitle: 'Confirm your private 4x4 overland expedition 60+ days in advance and receive exclusive extras for your entire group.',
    discountText: 'Complimentary €180 Value Pack',
    perks: [
      'Complimentary nocturnal lemur safari walk with specialized ranger',
      'Local 4G SIM cards with 15GB high-speed data per vehicle',
      'Welcome bottle of chilled French champagne at Avenue of the Baobabs',
    ],
    validUntil: 'Valid for departures throughout 2026 & 2027',
    targetCircuitId: 'circuits-west-8-days',
    bgGradient: 'from-[#064E3B] via-[#043628] to-[#022219]',
  },
  {
    id: 'pangalanes-chaland-all-inclusive',
    badge: 'EXCLUSIVE RIVER CRUISE',
    badgeColor: 'bg-sky-500 text-white',
    title: 'Pangalanes Canal Engine Boat: All Meals Included',
    subtitle: 'Full 3-day private navigation on Lake Rasoabe & Pangalanes canal with dedicated boat crew and chef-prepared fresh meals aboard.',
    discountText: 'All Meals Aboard Included',
    perks: [
      'Private motorized chaland barge reserved exclusively for your party',
      'Fresh local seafood and fruit meals prepared fresh aboard for 3 days',
      'Nocturnal boat expedition to spot rare Aye-Aye lemurs at Palmarium',
    ],
    validUntil: 'Available year-round on East 7 Days circuit',
    targetCircuitId: 'circuits-est-7-days',
    bgGradient: 'from-[#0C4A6E] via-[#07324B] to-[#031C2B]',
  },
  {
    id: 'group-privilege-discount',
    badge: 'FAMILY & SMALL GROUP TARIFF',
    badgeColor: 'bg-amber-500 text-white',
    title: 'Small Group Privilege: Rates Down to €600 – €750 / Person',
    subtitle: 'Travel with family or friends and unlock transparent tiered pricing across all signature overland circuits.',
    discountText: 'Up to 35% Savings / Person',
    perks: [
      'Transparent flat rates for 2 persons, 3-4 persons, and 5+ person groups',
      'Spacious dedicated Toyota 4x4 Land Cruiser or private safari minibus',
      'Direct local operator rates with zero agency commission markups',
    ],
    validUntil: 'Applicable to all 8 circuits',
    targetCircuitId: 'circuits-mixt-sud-west-23-days',
    bgGradient: 'from-[#78350F] via-[#522409] to-[#2E1404]',
  },
  {
    id: 'free-airport-hotel-transfers',
    badge: 'COMFORT TRAVELERS',
    badgeColor: 'bg-purple-600 text-white',
    title: 'Free Antananarivo Hotel & Ivato Airport VIP Transfers',
    subtitle: 'Seamless door-to-door escort from your international flight arrival to departure with our certified local guide.',
    discountText: 'Zero Transfer Hassle',
    perks: [
      'Personal meet & greet inside Ivato International Airport terminal',
      'Private air-conditioned transfer directly to your capital hotel',
      'Assistance with currency exchange and local telephone connectivity',
    ],
    validUntil: 'Standard on Comfort Edition Circuits',
    targetCircuitId: 'circuits-est-7-days-comfort',
    bgGradient: 'from-[#4C1D95] via-[#331366] to-[#1E0B3C]',
  },
];

interface OffersSliderProps {
  onSelectCircuit?: (circuit: Circuit) => void;
  onBookCircuit?: (circuitId: string) => void;
}

export const OffersSlider: React.FC<OffersSliderProps> = ({
  onSelectCircuit,
  onBookCircuit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotionalOffers.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? promotionalOffers.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promotionalOffers.length);
  };

  const handleClaimOffer = (offer: OfferItem) => {
    if (offer.targetCircuitId) {
      const match = circuitsData.find((c) => c.id === offer.targetCircuitId);
      if (match && onSelectCircuit) {
        onSelectCircuit(match);
        return;
      }
      if (onBookCircuit) {
        onBookCircuit(offer.targetCircuitId);
        return;
      }
    }
    const message = `Hello Ernest! I would like to inquire about the promotional offer: "${offer.title}". Could you please provide full details?`;
    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const currentOffer = promotionalOffers[currentIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (diff > 50) handleNext();
          else if (diff < -50) handlePrev();
          touchStartX.current = null;
        }}
      >
        {/* Animated Slide Background */}
        <div
          className={`p-6 sm:p-10 bg-gradient-to-r ${currentOffer.bgGradient} text-white transition-all duration-700 relative overflow-hidden`}
        >
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-black/20 rounded-full blur-2xl pointer-events-none" />

          {/* Slide Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm ${currentOffer.badgeColor}`}
                >
                  {currentOffer.badge}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-white/90 border border-white/15 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-300 fill-current" />
                  <span>Limited Availability</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">
                {currentOffer.title}
              </h3>

              <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl font-light">
                {currentOffer.subtitle}
              </p>

              {/* Perks List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                {currentOffer.perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/10 border border-white/10 flex items-start gap-2 backdrop-blur-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-white/90 leading-tight font-medium">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Action Block (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-3 pt-4 lg:pt-0 lg:border-l lg:border-white/15 lg:pl-8">
              <div className="lg:text-right">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                  Exclusive Package Benefit
                </span>
                <span className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
                  {currentOffer.discountText}
                </span>
                <span className="text-[11px] text-white/60 block mt-0.5">
                  {currentOffer.validUntil}
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => handleClaimOffer(currentOffer)}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white text-[#0F172A] hover:bg-[#C6A87D] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-black/20 active:scale-95 transition-all"
                >
                  <span>Claim / View Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Indicators & Controls */}
          <div className="relative z-10 flex items-center justify-between pt-6 mt-4 border-t border-white/10">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {promotionalOffers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'w-8 bg-white'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous offer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next offer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
