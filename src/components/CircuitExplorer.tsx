import React, { useState, useRef } from 'react';
import { Compass, Calendar, Clock, MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { circuitsData, Circuit } from '../data/circuits';
import { CurrencyConfig } from '../data/siteConfig';

interface CircuitExplorerProps {
  currentCurrency: CurrencyConfig;
  onSelectCircuit: (circuit: Circuit) => void;
  onBookCircuit: (circuitId: string) => void;
}

// 3D Tilt Card Component with Specular Light Reflection
const CircuitTiltCard: React.FC<{
  circuit: Circuit;
  currentCurrency: CurrencyConfig;
  onSelect: () => void;
  onBook: () => void;
}> = ({ circuit, currentCurrency, onSelect, onBook }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [sheenStyle, setSheenStyle] = useState({ opacity: 0, x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`
    );

    setSheenStyle({
      opacity: 0.25,
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setSheenStyle({ opacity: 0, x: 50, y: 50 });
  };

  // Price conversion
  const convertedPrice = Math.round(circuit.basePriceEUR * currentCurrency.rateToEUR);
  const formattedPrice =
    currentCurrency.code === 'MGA'
      ? `${convertedPrice.toLocaleString()} ${currentCurrency.symbol}`
      : `${currentCurrency.symbol}${convertedPrice.toLocaleString()}`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease-out',
      }}
      className="relative rounded-3xl glass-panel overflow-hidden border border-[#C6A87D]/25 flex flex-col justify-between group shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#C6A87D]/60"
    >
      {/* Specular Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
        style={{
          opacity: sheenStyle.opacity,
          background: `radial-gradient(circle at ${sheenStyle.x}% ${sheenStyle.y}%, rgba(255, 255, 255, 0.2), transparent 60%)`,
        }}
      />

      {/* Top Image Container with Badges */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={circuit.heroImage}
            alt={circuit.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E17] via-transparent to-black/40" />

          {/* Region Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#09100D]/85 text-[#E0CEAF] border border-[#C6A87D]/40 backdrop-blur-md shadow-md">
              {circuit.regionLabel}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#09100D]/85 border border-[#C6A87D]/30 backdrop-blur-md">
            <Star className="w-3 h-3 text-[#C6A87D] fill-[#C6A87D]" />
            <span className="text-xs font-bold text-[#F4F1EA]">{circuit.rating}</span>
            <span className="text-[10px] text-[#9EACA3]">({circuit.reviewsCount})</span>
          </div>

          {/* Duration Pill at bottom of image */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs text-[#F4F1EA]">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#C6A87D]" />
              <span className="font-semibold">{circuit.durationDays} Days / {circuit.durationNights} Nights</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1E3A2B]/80 backdrop-blur-sm border border-emerald-500/30 text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Private 4x4</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#F4F1EA] group-hover:text-[#E0CEAF] transition-colors leading-snug mb-2">
            {circuit.title}
          </h3>
          <p className="text-xs text-[#9EACA3] line-clamp-2 mb-4 leading-relaxed font-light">
            {circuit.subtitle}
          </p>

          {/* Route Overview Tags */}
          <div className="mb-4">
            <span className="text-[10px] uppercase tracking-wider text-[#C6A87D] font-bold block mb-1.5">
              Route Path:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {circuit.routeOverview.slice(0, 4).map((stop, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[10px] bg-[#1E3A2B]/50 text-[#F4F1EA]/90 border border-white/5"
                >
                  {stop}
                </span>
              ))}
              {circuit.routeOverview.length > 4 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1E3A2B]/30 text-[#C6A87D]">
                  +{circuit.routeOverview.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Highlights Preview */}
          <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
            {circuit.highlights.slice(0, 2).map((hl, i) => (
              <p key={i} className="text-xs text-[#9EACA3] flex items-start gap-2">
                <span className="text-[#C6A87D] font-bold">&bull;</span>
                <span className="line-clamp-1">{hl}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="px-6 pb-6 pt-3 border-t border-[#C6A87D]/15 bg-[#0A1410]/50 flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-[#9EACA3] block">
            From (Per Person)
          </span>
          <span className="text-lg font-serif font-bold text-[#C6A87D]">
            {formattedPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSelect}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1E3A2B] border border-[#C6A87D]/30 text-[#F4F1EA] hover:bg-[#2A4D3B] hover:border-[#C6A87D] transition-all"
          >
            Itinerary
          </button>
          <button
            onClick={onBook}
            className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C6A87D] text-[#09100D] hover:bg-[#E0CEAF] hover:shadow-lg transition-all"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export const CircuitExplorer: React.FC<CircuitExplorerProps> = ({
  currentCurrency,
  onSelectCircuit,
  onBookCircuit,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'west' | 'south' | 'east' | 'mixed'>('all');

  const filteredCircuits = circuitsData.filter((c) =>
    selectedRegion === 'all' ? true : c.region === selectedRegion
  );

  return (
    <section id="circuits" className="py-24 relative bg-[#09100D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3A2B]/60 border border-[#C6A87D]/30 text-xs font-semibold text-[#C6A87D] uppercase tracking-widest mb-3">
              <Compass className="w-3.5 h-3.5" />
              Private Guided Expeditions
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F4F1EA]">
              Signature Madagascar Circuits
            </h2>
            <p className="text-sm sm:text-base text-[#9EACA3] mt-2 max-w-xl font-light">
              Every itinerary is fully private, conducted in air-conditioned 4x4 vehicles with your
              dedicated chauffeur and expert naturalist guides.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#0F1E17] border border-[#C6A87D]/25">
            {[
              { id: 'all', label: 'All Circuits' },
              { id: 'west', label: 'West (Baobab & Tsingy)' },
              { id: 'south', label: 'South (RN7 & Isalo)' },
              { id: 'east', label: 'East (Rainforest & Island)' },
              { id: 'mixed', label: 'Custom / Mixed' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id as any)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl uppercase tracking-wider transition-all ${
                  selectedRegion === tab.id
                    ? 'bg-[#C6A87D] text-[#09100D] shadow-md font-bold'
                    : 'text-[#9EACA3] hover:text-[#F4F1EA] hover:bg-[#1E3A2B]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCircuits.map((circuit) => (
            <CircuitTiltCard
              key={circuit.id}
              circuit={circuit}
              currentCurrency={currentCurrency}
              onSelect={() => onSelectCircuit(circuit)}
              onBook={() => onBookCircuit(circuit.id)}
            />
          ))}
        </div>

        {/* Custom Itinerary Callout */}
        <div className="mt-16 p-8 rounded-3xl glass-panel border border-[#C6A87D]/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-[#0F1E17] via-[#152B20] to-[#0F1E17]">
          <div>
            <h3 className="text-2xl font-display font-medium text-[#F4F1EA]">
              Need a 100% Tailored Private Itinerary?
            </h3>
            <p className="text-sm text-[#9EACA3] mt-1.5 max-w-xl font-light">
              Want to combine North Diego Suarez with West Tsingy, or add a private helicopter flight?
              Ernest customizes your routes, pace, and lodge categories with zero hassle.
            </p>
          </div>
          <button
            onClick={() => onBookCircuit('custom-itinerary')}
            className="px-6 py-3.5 rounded-xl bg-[#C6A87D] text-[#09100D] text-xs uppercase tracking-wider font-bold hover:bg-[#E0CEAF] hover:shadow-xl transition-all whitespace-nowrap active:scale-95"
          >
            Design Custom Circuit
          </button>
        </div>
      </div>
    </section>
  );
};
