import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Users,
  Search,
  MessageSquare,
  ShieldCheck,
  Star,
  Sliders,
  Car,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { siteConfig, CurrencyConfig } from '../data/siteConfig';
import { circuitsData } from '../data/circuits';

interface TravexaHeroProps {
  currentCurrency: CurrencyConfig;
  onSearchCircuits?: (filters: { region: string; duration: string; activity: string }) => void;
  onOpenCustomPlanner?: () => void;
  onBookCircuit?: (circuitId: string) => void;
}

export const TravexaHero: React.FC<TravexaHeroProps> = ({
  currentCurrency,
  onSearchCircuits,
  onOpenCustomPlanner,
  onBookCircuit,
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'custom'>('search');

  // Tab 1: Search Form State
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [activityFilter, setActivityFilter] = useState<string>('all');

  // Tab 2: Custom Builder Form State (NO AI)
  const [groupSize, setGroupSize] = useState<number>(2);
  const [travelMonth, setTravelMonth] = useState<string>('August');
  const [vehiclePref, setVehiclePref] = useState<string>('Toyota Land Cruiser Prado 4x4');
  const [pacePref, setPacePref] = useState<string>('Balanced (Scenic & Comfortable)');
  const [preferredLandscape, setPreferredLandscape] = useState<string>('West (Baobabs & Tsingy)');

  // Calculate live matching count for Tab 1
  const matchingCount = circuitsData.filter((c) => {
    if (regionFilter !== 'all' && c.region !== regionFilter) return false;
    if (durationFilter === '7-9' && (c.durationDays < 7 || c.durationDays > 9)) return false;
    if (durationFilter === '10-13' && (c.durationDays < 10 || c.durationDays > 13)) return false;
    if (durationFilter === '14+' && c.durationDays < 14) return false;
    return true;
  }).length;

  // Live dynamic pricing calculation for Tab 2
  const baseDays = preferredLandscape.includes('West') ? 10 : preferredLandscape.includes('South') ? 13 : preferredLandscape.includes('East') ? 11 : 14;
  let estimatedEurPerGuest = Math.round(110 * baseDays);
  if (groupSize >= 6) estimatedEurPerGuest = Math.round(estimatedEurPerGuest * 0.78);
  else if (groupSize >= 4) estimatedEurPerGuest = Math.round(estimatedEurPerGuest * 0.85);
  else if (groupSize === 1) estimatedEurPerGuest = Math.round(estimatedEurPerGuest * 1.45);

  if (vehiclePref.includes('V8')) estimatedEurPerGuest += 140;
  const totalEurGroup = estimatedEurPerGuest * groupSize;

  const formatHeroPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchCircuits) {
      onSearchCircuits({
        region: regionFilter,
        duration: durationFilter,
        activity: activityFilter,
      });
    }
    const target = document.getElementById('tours-grid-section') || document.getElementById('circuits');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCustomWhatsAppDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Ernest! I would like to design a bespoke private tour in Madagascar:
- Group Size: ${groupSize} travelers
- Preferred Target Month: ${travelMonth}
- Primary Landscape/Region: ${preferredLandscape} (~${baseDays} Days)
- Vehicle Preference: ${vehiclePref}
- Expedition Pace: ${pacePref}
- Estimated Base Rate: ${formatHeroPrice(estimatedEurPerGuest)} / guest (Total ~ ${formatHeroPrice(totalEurGroup)})

Could you please prepare a customized day-by-day itinerary proposal and quote for our group?`;

    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative pt-20 lg:pt-24 pb-16 lg:pb-24 overflow-hidden bg-[#F8FAFC]">
      {/* 1. CINEMATIC HERO BANNER IMAGE WITH CRISP READABILITY OVERLAY */}
      <div className="relative h-[480px] sm:h-[540px] lg:h-[600px] w-full overflow-hidden bg-[#0F172A]">
        <img
          src="/tours/baobab-4x4.jpg"
          alt="Real 4x4 Tour at Avenue of the Baobabs Sunset Madagascar"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-gradient backdrop for typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/30" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0F172A]/40 to-[#0F172A]/80" />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center text-white pb-12 sm:pb-16 z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-sm mb-6 text-xs font-semibold text-white">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-bold tracking-wide">Official Malagasy Tour Operator</span>
            <span className="text-white/40">&bull;</span>
            <span className="text-slate-200">Antsirabe Head Office</span>
            <div className="flex items-center text-amber-300 ml-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 text-[11px] font-bold text-white">4.98/5</span>
            </div>
          </div>

          {/* Main Headline - Increased Size and Crisp Styling */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.12] max-w-4xl drop-shadow-md">
            Private 4x4 Overland Safaris Across Madagascar
          </h1>

          {/* Subtitle - Professional, Clear, Increased Readability */}
          <p className="mt-5 text-base sm:text-xl text-slate-100 max-w-3xl mx-auto font-normal leading-relaxed drop-shadow-sm">
            Handcrafted private expeditions led personally by Ernest Soa and native wildlife trackers. 
            Discover limestone Tsingy, sunset baobabs, river chaland cruises, and pristine Indian Ocean islands.
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-slate-200">
            <span className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              100% Private Custom Tours
            </span>
            <span className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
              <Car className="w-4 h-4 text-[#38BDF8] shrink-0" />
              Dedicated 4x4 Fleet & Chauffeur
            </span>
            <span className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-white/10">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              Direct Operator Rates &bull; No Middlemen
            </span>
          </div>
        </div>
      </div>

      {/* 2. CREATIVE HERO SEARCH & BESPOKE TOUR BUILDER WIDGET */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-20 relative z-20">
        {/* Creative Tab Headers (Optimized for Mobile & Desktop) */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200/80 sm:bg-transparent sm:p-0 rounded-2xl sm:rounded-t-2xl sm:rounded-b-none sm:flex sm:items-center sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`w-full sm:w-auto px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-t-2xl font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 cursor-pointer ${
              activeTab === 'search'
                ? 'bg-white text-[#0F172A] shadow-md sm:shadow-xl sm:border-t-4 sm:border-[#0D9488]'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/60'
            }`}
          >
            <Search className="w-4 h-4 text-[#0D9488] shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">Search Curated Packages</span>
              <span className="sm:hidden">Explore Tours</span>
            </span>
            <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-[#E2E8F0] text-[#0F172A] font-bold shrink-0">
              {circuitsData.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`w-full sm:w-auto px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-t-2xl font-bold text-xs sm:text-sm tracking-wider transition-all flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5 cursor-pointer ${
              activeTab === 'custom'
                ? 'bg-white text-[#0F172A] shadow-md sm:shadow-xl sm:border-t-4 sm:border-[#D97706]'
                : 'text-[#64748B] hover:text-[#0F172A] hover:bg-white/60'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#D97706] shrink-0" />
            <span className="truncate">
              <span className="hidden sm:inline">Bespoke Trip Builder</span>
              <span className="sm:hidden">Custom Quote</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-[#FEF3C7] text-[#92400E] font-bold shrink-0">
              Live Price
            </span>
          </button>
        </div>

        {/* Search Widget Container */}
        <div className="bg-white rounded-3xl sm:rounded-tl-none border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 transition-all">
          {activeTab === 'search' ? (
            /* TAB 1: SEARCH PACKAGES */
            <form onSubmit={handleSearchSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Field 1: Destination Region */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#0D9488]" />
                    <span>Destination Region</span>
                  </label>
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 transition-all cursor-pointer"
                  >
                    <option value="all">All Regions of Madagascar</option>
                    <option value="west">West (Baobabs, Tsingy, Tsiribihina)</option>
                    <option value="south">South RN7 (Isalo Canyons, Ranomafana)</option>
                    <option value="east">East (Pangalanes Canal, Sainte-Marie)</option>
                    <option value="mixed">Mixed Grand Expeditions</option>
                  </select>
                  <span className="text-[11px] text-[#64748B] block">Select your desired landscape</span>
                </div>

                {/* Field 2: Duration */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#0D9488]" />
                    <span>Trip Duration</span>
                  </label>
                  <select
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 transition-all cursor-pointer"
                  >
                    <option value="all">Any Duration (7 - 16 Days)</option>
                    <option value="7-9">7 to 9 Days (Express Safaris)</option>
                    <option value="10-13">10 to 13 Days (Signature Circuits)</option>
                    <option value="14+">14+ Days (Grand Comprehensive)</option>
                  </select>
                  <span className="text-[11px] text-[#64748B] block">Tailored to your holiday dates</span>
                </div>

                {/* Field 3: Primary Activity */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-[#0D9488]" />
                    <span>Experience Focus</span>
                  </label>
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 transition-all cursor-pointer"
                  >
                    <option value="all">All Wildlife & Scenery</option>
                    <option value="wildlife">Endemic Lemurs & Night Treks</option>
                    <option value="karst">UNESCO Tsingy Karst Pinnacles</option>
                    <option value="beach">Indian Ocean Whales & Beaches</option>
                    <option value="river">Tsiribihina River Chaland Safari</option>
                  </select>
                  <span className="text-[11px] text-[#64748B] block">Includes private local park guide</span>
                </div>
              </div>

              {/* Submit & Quick Filter Info */}
              <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]" />
                  <span>
                    <strong>{matchingCount} Signature Circuits</strong> matching your criteria
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#0D9488]/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>View Matching Packages</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* TAB 2: BESPOKE TRIP BUILDER (CREATIVE & INTERACTIVE) */
            <form onSubmit={handleCustomWhatsAppDispatch} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Party Size */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#D97706]/40 cursor-pointer"
                  >
                    <option value={1}>1 Solo Explorer</option>
                    <option value={2}>2 Guests (Couple / Friends)</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family / Group)</option>
                    <option value={5}>5 to 6 Guests</option>
                    <option value={8}>7+ Extended Group</option>
                  </select>
                </div>

                {/* Target Month */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Travel Season / Month</span>
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#D97706]/40 cursor-pointer"
                  >
                    <option value="April">April (Lush Season)</option>
                    <option value="May">May (Clear Skies)</option>
                    <option value="June">June (Cool & Sunny)</option>
                    <option value="July">July (Whales & Safaris)</option>
                    <option value="August">August (Peak Season)</option>
                    <option value="September">September (Active Wildlife)</option>
                    <option value="October">October (Baby Lemurs)</option>
                    <option value="November">November (Baobabs & Sun)</option>
                    <option value="December">December (Holiday Safaris)</option>
                  </select>
                </div>

                {/* Primary Region */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Preferred Region</span>
                  </label>
                  <select
                    value={preferredLandscape}
                    onChange={(e) => setPreferredLandscape(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#D97706]/40 cursor-pointer"
                  >
                    <option value="West (Baobabs & Tsingy)">West (Baobabs & Tsingy)</option>
                    <option value="South RN7 (Isalo & Ranomafana)">South RN7 (Canyons & Rainforest)</option>
                    <option value="East (Sainte-Marie & Pangalanes)">East (Islands & Marine Life)</option>
                    <option value="Cross-Country Grand Route">Cross-Country Grand Route</option>
                  </select>
                </div>

                {/* 4x4 Fleet Preference */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-bold text-[#475569] tracking-wider flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Private 4x4 Vehicle</span>
                  </label>
                  <select
                    value={vehiclePref}
                    onChange={(e) => setVehiclePref(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-3.5 py-2.5 focus:ring-2 focus:ring-[#D97706]/40 cursor-pointer"
                  >
                    <option value="Toyota Land Cruiser Prado 4x4">Toyota Land Cruiser Prado 4x4</option>
                    <option value="Toyota Land Cruiser V8 Executive">Toyota Land Cruiser V8 Executive</option>
                    <option value="Hyundai Starex 4x4 Van (Group)">Hyundai Starex 4x4 Van (Group)</option>
                    <option value="Executive Safari Minibus">Executive Safari Minibus</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Live Matching Price Card (Mobile & Desktop) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7]/50 border border-[#FDE68A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#D97706]/15 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-bold">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#92400E]">
                        Estimated Direct HQ Rate
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#10B981]/15 text-[#047857]">
                        {groupSize > 1 ? `${groupSize} Guests Group Discount` : 'Private Chauffeur Tour'}
                      </span>
                    </div>
                    <p className="text-xs text-[#78350F] mt-0.5">
                      Includes private 4x4 ({vehiclePref.split('(')[0].trim()}), dedicated chauffeur, fuel & ~{baseDays} days guided route.
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#FDE68A]">
                  <p className="text-[10px] sm:text-[11px] text-[#92400E] font-bold uppercase tracking-wider">Estimated From</p>
                  <div className="flex items-baseline sm:justify-end gap-1.5">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-[#92400E]">
                      {formatHeroPrice(estimatedEurPerGuest)}
                    </span>
                    <span className="text-xs font-semibold text-[#B45309]">/ guest</span>
                  </div>
                  {groupSize > 1 && (
                    <p className="text-[10px] text-[#B45309]">
                      Total: {formatHeroPrice(totalEurGroup)} for {groupSize} travelers
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#64748B] text-center sm:text-left">
                  <span className="font-semibold text-[#0F172A]">Direct Antsirabe HQ Quote</span> &bull; We reply within 2 hours on WhatsApp
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenCustomPlanner}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-[#CBD5E1] text-[#0F172A] hover:bg-[#F1F5F9] font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer"
                  >
                    Open Full Interactive Planner
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Request WhatsApp Quote</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
