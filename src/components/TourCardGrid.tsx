import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Star,
  Heart,
  Search,
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Users,
  Eye,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { circuitsData, Circuit } from '../data/circuits';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';

interface TourCardGridProps {
  currentCurrency: CurrencyConfig;
  onSelectCircuit: (circuit: Circuit) => void;
  onBookCircuit: (circuitId: string) => void;
  initialFilters?: {
    region?: string;
    duration?: string;
    activity?: string;
  };
}

export const TourCardGrid: React.FC<TourCardGridProps> = ({
  currentCurrency,
  onSelectCircuit,
  onBookCircuit,
  initialFilters,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>(initialFilters?.region || 'all');
  const [selectedDuration, setSelectedDuration] = useState<string>(initialFilters?.duration || 'all');
  const [selectedActivity, setSelectedActivity] = useState<string>(initialFilters?.activity || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'duration-desc'>('featured');
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (circuitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(circuitId)) {
        next.delete(circuitId);
      } else {
        next.add(circuitId);
      }
      return next;
    });
  };

  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  // Helper badge generator based on circuit characteristics
  const getBadge = (circuit: Circuit) => {
    if (circuit.title.toLowerCase().includes('tsingy') || circuit.id.includes('tsingy')) return { text: 'UNESCO Grand Tsingy', color: 'bg-[#0D9488] text-white' };
    if (circuit.id.includes('est') || circuit.title.toLowerCase().includes('pangalanes')) return { text: 'Pangalanes & Rainforest', color: 'bg-[#0284C7] text-white' };
    if (circuit.region === 'mixed') return { text: 'Grand Cross-Island', color: 'bg-[#7C3AED] text-white' };
    if (circuit.region === 'south' || circuit.title.toLowerCase().includes('sud')) return { text: 'RN7 Canyons & Coast', color: 'bg-[#D97706] text-white' };
    return { text: 'Bespoke Overland', color: 'bg-[#1E3B2B] text-white' };
  };

  // Filter and sort circuits
  const filteredCircuits = useMemo(() => {
    return circuitsData
      .filter((circuit) => {
        // Region filter
        if (selectedRegion !== 'all' && circuit.region !== selectedRegion) {
          return false;
        }
        // Duration filter
        if (selectedDuration === '7-9' && (circuit.durationDays < 7 || circuit.durationDays > 9)) {
          return false;
        }
        if (selectedDuration === '10-13' && (circuit.durationDays < 10 || circuit.durationDays > 13)) {
          return false;
        }
        if (selectedDuration === '14+' && circuit.durationDays < 14) {
          return false;
        }
        // Activity filter
        if (selectedActivity === 'wildlife') {
          const hasWildlife = circuit.highlights.some(h => /lemur|fossa|chameleon|wildlife/i.test(h));
          if (!hasWildlife) return false;
        }
        if (selectedActivity === 'karst') {
          const hasKarst = circuit.highlights.some(h => /tsingy|limestone|karst|gorge/i.test(h));
          if (!hasKarst) return false;
        }
        if (selectedActivity === 'beach') {
          const hasBeach = circuit.highlights.some(h => /whale|beach|island|ocean|snorkeling/i.test(h));
          if (!hasBeach) return false;
        }
        if (selectedActivity === 'river') {
          const hasRiver = circuit.highlights.some(h => /river|chaland|cruise|canoe/i.test(h));
          if (!hasRiver) return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = circuit.title.toLowerCase().includes(query);
          const matchSubtitle = circuit.subtitle.toLowerCase().includes(query);
          const matchRoute = circuit.routeOverview.some((stop) => stop.toLowerCase().includes(query));
          if (!matchTitle && !matchSubtitle && !matchRoute) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePriceEUR - b.basePriceEUR;
        if (sortBy === 'price-desc') return b.basePriceEUR - a.basePriceEUR;
        if (sortBy === 'duration-desc') return b.durationDays - a.durationDays;
        return 0; // featured default
      });
  }, [selectedRegion, selectedDuration, selectedActivity, searchQuery, sortBy]);

  const handleQuickWhatsAppInquiry = (circuit: Circuit, e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello Ernest! I am interested in inquiring about the "${circuit.title}" (${circuit.durationDays} Days / ${circuit.durationNights} Nights).
Estimated Base Price: ${formatPrice(circuit.basePriceEUR)} / person.
Could you please share available departure dates and custom options?`;
    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="tours-grid-section" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 text-xs font-bold text-[#0D9488] uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Signature Private Overland Circuits</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0F172A]">
              Explore Madagascar’s Finest Routes
            </h2>
            <p className="mt-2 text-sm text-[#64748B] max-w-xl">
              100% private 4x4 vehicles, dedicated Malagasy driver-guides, hand-selected luxury eco-lodges,
              and flexible pacing tailored to your travelers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B]">Showing:</span>
            <span className="text-xs font-bold text-[#0F172A] px-3 py-1 rounded-lg bg-white border border-[#E2E8F0]">
              {filteredCircuits.length} of {circuitsData.length} Circuits
            </span>
          </div>
        </div>

        {/* Travexa Filter & Search Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-sm mb-10 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Baobabs, Tsingy, Isalo..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-medium text-[#0F172A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
              />
            </div>

            {/* Region Selector */}
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 cursor-pointer"
              >
                <option value="all">All Regions (Madagascar)</option>
                <option value="west">West (Grand Tsingy & Baobabs)</option>
                <option value="south">South (RN7 Canyons & Isalo)</option>
                <option value="east">East (Rainforests & Sainte-Marie)</option>
                <option value="mixed">Mixed (Grand Islands Highlights)</option>
              </select>
            </div>

            {/* Duration Selector */}
            <div>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="7-9">7 - 9 Days (Express)</option>
                <option value="10-13">10 - 13 Days (Signature)</option>
                <option value="14+">14+ Days (Expedition)</option>
              </select>
            </div>

            {/* Activity Selector */}
            <div>
              <select
                value={selectedActivity}
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 cursor-pointer"
              >
                <option value="all">All Activities</option>
                <option value="wildlife">Endemic Lemurs & Wildlife</option>
                <option value="karst">UNESCO Tsingy Karst Spires</option>
                <option value="beach">Ocean Whales & Beaches</option>
                <option value="river">Tsiribihina River Cruise</option>
              </select>
            </div>

            {/* Sorting */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-semibold text-[#0F172A] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 cursor-pointer"
              >
                <option value="featured">Featured / Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="duration-desc">Duration: Longest First</option>
              </select>
            </div>
          </div>

          {/* Quick Active Filter Chips */}
          {(selectedRegion !== 'all' || selectedDuration !== 'all' || selectedActivity !== 'all' || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F1F5F9] text-xs">
              <span className="text-[#94A3B8] font-medium">Active Filters:</span>
              {selectedRegion !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] font-semibold flex items-center gap-1">
                  Region: {selectedRegion}
                  <button onClick={() => setSelectedRegion('all')} className="hover:text-black">✕</button>
                </span>
              )}
              {selectedDuration !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-semibold flex items-center gap-1">
                  Duration: {selectedDuration} Days
                  <button onClick={() => setSelectedDuration('all')} className="hover:text-black">✕</button>
                </span>
              )}
              {selectedActivity !== 'all' && (
                <span className="px-2.5 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] font-semibold flex items-center gap-1">
                  Activity: {selectedActivity}
                  <button onClick={() => setSelectedActivity('all')} className="hover:text-black">✕</button>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569] font-semibold flex items-center gap-1">
                  Keyword: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-black">✕</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedDuration('all');
                  setSelectedActivity('all');
                  setSearchQuery('');
                }}
                className="text-[#0D9488] underline font-semibold text-xs ml-auto hover:text-[#0F766E]"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredCircuits.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#E2E8F0] p-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-medium text-[#0F172A]">No Matching Circuits Found</h3>
            <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
              We couldn’t find packages matching your exact filters. You can clear your filters or request a 100% tailor-made
              itinerary planned by Ernest.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedRegion('all');
                  setSelectedDuration('all');
                  setSelectedActivity('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white text-xs font-semibold"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          /* Travexa-Inspired 3-Column Card Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCircuits.map((circuit) => {
              const badge = getBadge(circuit);
              const isFavorited = wishlist.has(circuit.id);

              return (
                <div
                  key={circuit.id}
                  onClick={() => onSelectCircuit(circuit)}
                  className="travexa-card group overflow-hidden flex flex-col cursor-pointer bg-white"
                >
                  {/* Image Container with Zoom Effect */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={circuit.heroImage}
                      alt={circuit.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Top Itinerary Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>

                    {/* Wishlist Heart Toggle */}
                    <button
                      onClick={(e) => toggleWishlist(circuit.id, e)}
                      aria-label="Save to Wishlist"
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#64748B] hover:text-red-500 hover:scale-110 transition-all shadow-sm"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-600'
                        }`}
                      />
                    </button>

                    {/* Region Pill on Image */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white/95 text-xs font-semibold drop-shadow">
                      <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{circuit.regionLabel}</span>
                    </div>

                    {/* Rating Badge on Image */}
                    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white">
                      <Star className="w-3 h-3 text-[#F59E0B] fill-current" />
                      <span>{circuit.rating}</span>
                      <span className="text-white/60">({circuit.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Duration & Physical Grade */}
                      <div className="flex items-center justify-between text-xs text-[#64748B]">
                        <span className="flex items-center gap-1.5 font-bold text-[#0D9488]">
                          <Clock className="w-3.5 h-3.5" />
                          {circuit.durationDays} Days / {circuit.durationNights} Nights
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[10px] font-bold text-[#475569] uppercase">
                          Grade: {circuit.physicalLevel}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-display font-medium text-[#0F172A] leading-snug group-hover:text-[#0D9488] transition-colors">
                        {circuit.title}
                      </h3>

                      {/* Subtitle description */}
                      <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed font-normal">
                        {circuit.subtitle}
                      </p>
                    </div>

                    {/* Route Preview Chips */}
                    <div className="pt-2 border-t border-[#F1F5F9]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
                        Route Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {circuit.routeOverview.slice(0, 4).map((stop, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[10px] font-medium text-[#334155]"
                          >
                            {stop}
                          </span>
                        ))}
                        {circuit.routeOverview.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] text-[#94A3B8] font-bold">
                            +{circuit.routeOverview.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Pricing & Actions Row */}
                    <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">
                          From (Per Person)
                        </span>
                        <div className="text-lg font-bold text-[#0F172A] leading-tight">
                          {formatPrice(circuit.basePriceEUR)}
                        </div>
                        <span className="text-[10px] font-semibold text-[#0D9488] block mt-0.5">
                          Tiered 2p &bull; 3-4p &bull; 5+p
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Instant WhatsApp Quick Consultation */}
                        <button
                          onClick={(e) => handleQuickWhatsAppInquiry(circuit, e)}
                          title="Ask Ernest about this tour"
                          className="p-2.5 rounded-xl border border-[#CBD5E1] bg-white text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
                        </button>

                        {/* View Itinerary Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCircuit(circuit);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#0D9488] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <span>Itinerary</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
