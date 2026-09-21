import React, { useState } from 'react';
import {
  X,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  BedDouble,
  Utensils,
  Car,
  Compass,
  ShieldCheck,
  Share2,
  Users,
  Info,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import { Circuit } from '../data/circuits';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';

interface ItineraryModalProps {
  circuit: Circuit | null;
  currentCurrency: CurrencyConfig;
  onClose: () => void;
  onBookNow: (circuitId: string) => void;
  onViewFullPage?: (circuit: Circuit) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  circuit,
  currentCurrency,
  onClose,
  onBookNow,
  onViewFullPage,
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(1); // default expand day 1
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedGuestTier, setSelectedGuestTier] = useState<'2' | '3-4' | '5+'>('2');

  if (!circuit) return null;

  const formatMoney = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const toggleDay = (dayNum: number) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDirectWhatsApp = () => {
    const message = `Hello Ernest! I would like to book or ask for a quote on the "${circuit.title}" (${circuit.durationDays} Days / ${circuit.durationNights} Nights).
Group Size: ${selectedGuestTier} travelers.
Could you please confirm availability and detailed quote? Thank you!`;
    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#09100D] border border-[#C6A87D]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Hero Image Backdrop */}
        <div className="relative aspect-[21/8] sm:aspect-[21/7] shrink-0 overflow-hidden">
          <img
            src={circuit.heroImage}
            alt={circuit.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09100D] via-[#09100D]/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-[#F4F1EA] hover:text-[#C6A87D] hover:bg-black/90 flex items-center justify-center transition-all z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dedicated Full Page button */}
          {onViewFullPage && (
            <button
              onClick={() => {
                onClose();
                onViewFullPage(circuit);
              }}
              className="absolute top-4 right-32 px-3 py-1.5 rounded-full bg-[#0D9488] hover:bg-[#0F766E] border border-white/20 text-xs text-white flex items-center gap-1.5 transition-all z-20 shadow-md font-semibold"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Dedicated Page</span>
            </button>
          )}

          {/* Share button */}
          <button
            onClick={handleShare}
            className="absolute top-4 right-16 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-xs text-[#F4F1EA] hover:text-[#C6A87D] flex items-center gap-1.5 transition-all z-20"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          {/* Title & Key Stats */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#1E3A2B] text-emerald-300 border border-emerald-500/40">
                {circuit.regionLabel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0F1E17] text-[#C6A87D] border border-[#C6A87D]/30">
                {circuit.physicalLevel} Physical Grade
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-medium text-[#F4F1EA]">
              {circuit.title}
            </h2>
          </div>
        </div>

        {/* Quick Route Strip */}
        <div className="px-6 py-3.5 bg-[#0F1E17] border-y border-[#C6A87D]/20 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#9EACA3]">
            <Clock className="w-4 h-4 text-[#C6A87D]" />
            <span className="font-semibold text-[#F4F1EA]">
              {circuit.durationDays} Days / {circuit.durationNights} Nights
            </span>
            <span>&bull;</span>
            <span>Best Season: {circuit.bestSeason}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-[#9EACA3] uppercase tracking-wider block">
                Official Starting Rate:
              </span>
              <span className="text-sm font-bold text-[#C6A87D]">
                {formatMoney(circuit.basePriceEUR)} / guest
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookNow(circuit.id);
              }}
              className="px-4 py-2 rounded-lg bg-[#C6A87D] text-[#09100D] font-bold text-xs uppercase tracking-wider hover:bg-[#E0CEAF] transition-all"
            >
              Book Itinerary
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Official Tiered Rates Table */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0F1E17] to-[#14261D] border border-[#C6A87D]/40 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#C6A87D]/20">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C6A87D] block flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Official Tariff Schedule
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#F4F1EA]">
                  Rates According to Number of Travelers
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1E3A2B] text-[11px] text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-[#C6A87D]" />
                <span>100% Private Circuit</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 2 Persons Tier */}
              <div
                onClick={() => setSelectedGuestTier('2')}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedGuestTier === '2'
                    ? 'bg-[#1E3A2B] border-[#C6A87D] shadow-lg shadow-[#C6A87D]/10'
                    : 'bg-[#09100D]/70 border-white/10 hover:border-[#C6A87D]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#F4F1EA]">2 Persons</span>
                  {selectedGuestTier === '2' && (
                    <span className="w-2 h-2 rounded-full bg-[#C6A87D]" />
                  )}
                </div>
                <div className="text-lg font-bold text-[#C6A87D]">
                  {formatMoney(circuit.tieredPricing.twoGuestsEUR)}
                </div>
                <span className="text-[11px] text-[#9EACA3] block mt-0.5">
                  ({formatMoney(Math.round(circuit.tieredPricing.twoGuestsEUR / 2))} / person)
                </span>
              </div>

              {/* 3 to 4 Persons Tier */}
              <div
                onClick={() => setSelectedGuestTier('3-4')}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedGuestTier === '3-4'
                    ? 'bg-[#1E3A2B] border-[#C6A87D] shadow-lg shadow-[#C6A87D]/10'
                    : 'bg-[#09100D]/70 border-white/10 hover:border-[#C6A87D]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#F4F1EA]">
                    {circuit.tieredPricing.threeGuestsEUR && circuit.tieredPricing.fourGuestsEUR
                      ? '3 or 4 Persons'
                      : '3 – 4 Persons'}
                  </span>
                  {selectedGuestTier === '3-4' && (
                    <span className="w-2 h-2 rounded-full bg-[#C6A87D]" />
                  )}
                </div>
                <div className="text-lg font-bold text-[#C6A87D]">
                  {circuit.tieredPricing.threeToFourGuestsEUR
                    ? formatMoney(circuit.tieredPricing.threeToFourGuestsEUR)
                    : circuit.tieredPricing.threeGuestsEUR && circuit.tieredPricing.fourGuestsEUR
                    ? `${formatMoney(circuit.tieredPricing.threeGuestsEUR)} – ${formatMoney(circuit.tieredPricing.fourGuestsEUR)}`
                    : formatMoney(circuit.basePriceEUR * 3)}
                </div>
                <span className="text-[11px] text-[#9EACA3] block mt-0.5">
                  {circuit.tieredPricing.threeToFourGuestsEUR
                    ? `(${formatMoney(Math.round(circuit.tieredPricing.threeToFourGuestsEUR / 4))} / person for 4p)`
                    : 'Total group rate'}
                </span>
              </div>

              {/* 5+ Persons Tier */}
              <div
                onClick={() => setSelectedGuestTier('5+')}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedGuestTier === '5+'
                    ? 'bg-[#1E3A2B] border-[#C6A87D] shadow-lg shadow-[#C6A87D]/10'
                    : 'bg-[#09100D]/70 border-white/10 hover:border-[#C6A87D]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#F4F1EA]">5+ Persons (Groups)</span>
                  {selectedGuestTier === '5+' && (
                    <span className="w-2 h-2 rounded-full bg-[#C6A87D]" />
                  )}
                </div>
                <div className="text-lg font-bold text-[#C6A87D]">
                  {formatMoney(circuit.tieredPricing.groupPerPersonEUR)}
                </div>
                <span className="text-[11px] text-[#9EACA3] block mt-0.5">
                  per person in group
                </span>
              </div>
            </div>

            {/* Custom Duration & Flexibility Note */}
            <div className="mt-4 p-3 rounded-xl bg-[#09100D]/60 border border-[#C6A87D]/20 flex items-start gap-2.5 text-xs text-[#E0CEAF]">
              <Info className="w-4 h-4 text-[#C6A87D] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold text-[#F4F1EA]">Duration Flexibility: </span>
                {circuit.customDurationNote ||
                  'The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.'}
              </p>
            </div>
          </div>

          {/* Route Overview Path */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#C6A87D] font-bold mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Complete Route Navigation
            </h3>
            <div className="flex flex-wrap items-center gap-2 p-4 rounded-2xl bg-[#0F1E17]/60 border border-[#C6A87D]/15">
              {circuit.routeOverview.map((stop, idx) => (
                <React.Fragment key={idx}>
                  <span className="text-xs font-medium text-[#F4F1EA] bg-[#1E3A2B]/40 px-2.5 py-1 rounded-lg border border-white/5">
                    {stop}
                  </span>
                  {idx < circuit.routeOverview.length - 1 && (
                    <span className="text-[#C6A87D] text-xs font-bold">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Activities List */}
          {circuit.activitiesList && circuit.activitiesList.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#C6A87D] font-bold mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C6A87D]" />
                Scheduled Tour Activities & Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {circuit.activitiesList.map((act, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[#0F1E17]/50 border border-white/5 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A87D] mt-1.5 shrink-0" />
                    <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">{act}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-by-Day Interactive Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs uppercase tracking-widest text-[#C6A87D] font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Day-by-Day Itinerary Breakdown ({circuit.days.length} Days)
              </h3>
              <button
                onClick={() => setExpandedDay(expandedDay === null ? 1 : null)}
                className="text-[11px] text-[#9EACA3] hover:text-[#C6A87D] underline"
              >
                {expandedDay === null ? 'Expand Days' : 'Collapse All'}
              </button>
            </div>

            <div className="space-y-3">
              {circuit.days.map((d) => {
                const isExpanded = expandedDay === d.day;
                return (
                  <div
                    key={d.day}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded
                        ? 'bg-[#0F1E17] border-[#C6A87D]/50 shadow-xl'
                        : 'bg-[#0A1410]/60 border-white/5 hover:border-[#C6A87D]/30'
                    }`}
                  >
                    {/* Day Accordion Header */}
                    <button
                      onClick={() => toggleDay(d.day)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isExpanded
                              ? 'bg-[#C6A87D] text-[#09100D]'
                              : 'bg-[#1E3A2B] text-[#C6A87D]'
                          }`}
                        >
                          D{d.day}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#F4F1EA]">{d.title}</p>
                          <p className="text-[11px] text-[#9EACA3] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-[#C6A87D]" />
                            {d.location}
                            {d.distanceKm && (
                              <span className="text-white/40">
                                &bull; {d.distanceKm} km ({d.driveTimeHours}h drive)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="text-[#C6A87D]">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {/* Day Expanded Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/5 space-y-4 text-xs text-[#9EACA3] animate-in slide-in-from-top-2 duration-200">
                        <p className="leading-relaxed font-light text-[#F4F1EA]/90">{d.description}</p>

                        {/* Activities */}
                        {d.activities && d.activities.length > 0 && (
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#C6A87D] font-bold block mb-1.5">
                              Day Activities:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {d.activities.map((act, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-[#1E3A2B]/60 text-[#F4F1EA] border border-white/5 flex items-center gap-1.5"
                                >
                                  <Compass className="w-3 h-3 text-[#C6A87D]" />
                                  {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Accommodation & Meals */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5">
                          <div className="flex items-center gap-2">
                            <BedDouble className="w-4 h-4 text-[#C6A87D]" />
                            <div>
                              <span className="text-[10px] text-white/50 block">Night Accommodation:</span>
                              <span className="font-medium text-[#F4F1EA]">{d.accommodation}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-[#C6A87D]" />
                            <div>
                              <span className="text-[10px] text-white/50 block">Meals:</span>
                              <span className="font-medium text-[#F4F1EA]">{d.meals}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            {/* Included */}
            <div className="p-5 rounded-2xl bg-[#0F1E17]/60 border border-emerald-500/20">
              <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Included in Circuit Package
              </h4>
              <ul className="space-y-2 text-xs text-[#9EACA3]">
                {circuit.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&check;</span>
                    <span className="text-[#F4F1EA]/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="p-5 rounded-2xl bg-[#0F1E17]/60 border border-red-500/20">
              <h4 className="text-xs uppercase tracking-wider font-bold text-red-400 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Not Included in Package
              </h4>
              <ul className="space-y-2 text-xs text-[#9EACA3]">
                {circuit.notIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">&times;</span>
                    <span className="text-[#9EACA3]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Action Bar */}
        <div className="p-4 sm:p-6 bg-[#09100D] border-t border-[#C6A87D]/25 flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#9EACA3] block">
              Tariff for {selectedGuestTier} Travelers:
            </span>
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#C6A87D]">
              {selectedGuestTier === '2'
                ? formatMoney(circuit.tieredPricing.twoGuestsEUR)
                : selectedGuestTier === '3-4'
                ? circuit.tieredPricing.threeToFourGuestsEUR
                  ? formatMoney(circuit.tieredPricing.threeToFourGuestsEUR)
                  : `${formatMoney(circuit.tieredPricing.twoGuestsEUR * 1.3)}`
                : `${formatMoney(circuit.tieredPricing.groupPerPersonEUR)} / person`}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {onViewFullPage && (
              <button
                onClick={() => {
                  onClose();
                  onViewFullPage(circuit);
                }}
                className="px-4 py-2.5 text-xs font-bold rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
              >
                <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
                <span className="hidden sm:inline">Dedicated Page</span>
              </button>
            )}
            <button
              onClick={handleDirectWhatsApp}
              className="px-4 py-2.5 text-xs font-bold rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center gap-1.5 shadow-md transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>WhatsApp Ernest</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(circuit.id);
              }}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#C6A87D] text-[#09100D] hover:bg-[#E0CEAF] shadow-lg shadow-[#C6A87D]/20 active:scale-95 transition-all"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
