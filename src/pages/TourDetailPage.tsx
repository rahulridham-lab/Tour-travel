import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  Car,
  Hotel,
  Users,
  MessageSquare,
  Printer,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  Share2,
  Compass,
  Phone,
  Mail,
  Sliders,
} from 'lucide-react';
import { Circuit, CircuitDay, circuitsData } from '../data/circuits';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';
import { SEOHead } from '../components/SEOHead';

interface TourDetailPageProps {
  circuit: Circuit;
  currentCurrency: CurrencyConfig;
  onNavigate: (page: string) => void;
  onSelectCircuit: (circuit: Circuit) => void;
  onOpenCustomPlanner: () => void;
}

export const TourDetailPage: React.FC<TourDetailPageProps> = ({
  circuit,
  currentCurrency,
  onNavigate,
  onSelectCircuit,
  onOpenCustomPlanner,
}) => {
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedMonth, setSelectedMonth] = useState<string>('August');
  const [selectedVehicle, setSelectedVehicle] = useState<string>('Toyota Land Cruiser Prado 4x4');
  const [lodgingTier, setLodgingTier] = useState<'standard' | 'luxury'>('standard');
  const [travelerName, setTravelerName] = useState<string>('');
  const [travelerEmail, setTravelerEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  // Price calculations
  let basePrice = circuit.basePriceEUR;
  if (guestCount >= 4) basePrice *= 0.85;
  if (guestCount >= 6) basePrice *= 0.78;
  if (guestCount === 1) basePrice *= 1.45;
  if (lodgingTier === 'luxury') basePrice += 350;

  const totalGroupPrice = Math.round(basePrice * guestCount);
  const perPersonPrice = Math.round(basePrice);

  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const handleWhatsAppBooking = () => {
    const message = `Hello Ernest! I would like to book or inquire about:
- Tour: ${circuit.title} (${circuit.durationDays} Days / ${circuit.durationNights} Nights)
- Travelers: ${guestCount} ${guestCount === 1 ? 'Person' : 'People'}
- Target Month: ${selectedMonth}
- Lodging Tier: ${lodgingTier === 'luxury' ? 'Luxury VIP Eco-Lodges' : 'Authentic Comfort Tier'}
- Vehicle: ${selectedVehicle}
- Estimated Total: ${formatPrice(totalGroupPrice)} (${formatPrice(perPersonPrice)} / person in ${currentCurrency.code})
${travelerName ? `- Lead Traveler: ${travelerName}` : ''}
${specialRequests ? `- Special Notes: ${specialRequests}` : ''}

Please let me know vehicle availability and booking confirmation steps.`;

    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const otherCircuits = circuitsData.filter((c) => c.id !== circuit.id).slice(0, 3);

  return (
    <div className="pt-20 pb-16 bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      <SEOHead
        title={`${circuit.title} (${circuit.durationDays} Days) | Madagascar Ernest Travel Tours`}
        description={circuit.subtitle}
        ogImage={circuit.heroImage}
      />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-16 z-30 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0D9488] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('tours')}
              className="hover:text-[#0D9488] transition-colors"
            >
              Tours & Circuits
            </button>
            <span>/</span>
            <span className="text-[#0F172A] font-semibold truncate max-w-[200px] sm:max-w-md">
              {circuit.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#475569] hover:bg-[#F1F5F9] transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Itinerary</span>
            </button>
            <button
              onClick={() => onNavigate('tours')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0D9488] hover:text-[#0F766E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All Tours</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Visual Header */}
      <div className="relative h-[340px] sm:h-[460px] lg:h-[520px] overflow-hidden bg-[#0F172A]">
        <img
          src={circuit.heroImage}
          alt={circuit.title}
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12 text-white">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#0D9488] text-white font-bold text-xs uppercase tracking-wider">
              {circuit.regionLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {circuit.durationDays} Days / {circuit.durationNights} Nights
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold text-xs flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              {circuit.rating} ({circuit.reviewsCount} verified reviews)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-display font-bold text-white max-w-4xl tracking-tight leading-tight">
            {circuit.title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-3xl font-light leading-relaxed">
            {circuit.subtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 pt-4 border-t border-white/20">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-300 block">
                Starting Private Rate
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {formatPrice(circuit.basePriceEUR)}
                <span className="text-xs font-normal text-slate-300 ml-1">/ person ({currentCurrency.code})</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-6 text-xs text-slate-200 ml-auto">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#38BDF8]" />
                <span>Dedicated 4x4 & Chauffeur</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Antsirabe HQ Supervision</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Itinerary Timeline & Details (Left) + Direct Booking Form (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT CONTENT COLUMN (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Route Overview Path */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
              <h2 className="text-xs uppercase font-bold tracking-wider text-[#0D9488] mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#0D9488]" />
                <span>Expedition Route Waypoints</span>
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {circuit.routeOverview.map((stop, i) => (
                  <React.Fragment key={i}>
                    <span className="px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
                      {stop}
                    </span>
                    {i < circuit.routeOverview.length - 1 && (
                      <span className="text-[#94A3B8] font-bold">&rarr;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Circuit Key Highlights */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
                Expedition Highlights & Experiences
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {circuit.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#334155] leading-relaxed font-medium">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-Day Complete Detailed Itinerary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[#0F172A]">
                    Day-by-Day Detailed Itinerary
                  </h2>
                  <p className="text-xs text-[#64748B] mt-1">
                    Click any day to view activities, driving times, accommodations, and included meals.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDay(activeDay === null ? 1 : null)}
                  className="text-xs font-bold text-[#0D9488] hover:underline"
                >
                  {activeDay === null ? 'Expand Days' : 'Collapse All'}
                </button>
              </div>

              <div className="space-y-3">
                {circuit.days.map((day) => {
                  const isOpen = activeDay === day.day;
                  return (
                    <div
                      key={day.day}
                      className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveDay(isOpen ? null : day.day)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F8FAFC] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 text-[#0D9488] font-bold text-sm flex flex-col items-center justify-center shrink-0 border border-[#0D9488]/20">
                            <span className="text-[10px] uppercase font-semibold text-[#64748B]">Day</span>
                            <span>{day.day}</span>
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-[#0D9488] uppercase tracking-wider block">
                              {day.location}
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">
                              {day.title}
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {day.driveTimeHours ? (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#64748B] bg-[#F1F5F9] px-2.5 py-1 rounded-md">
                              <Car className="w-3 h-3 text-[#0D9488]" />
                              ~{day.distanceKm} km ({day.driveTimeHours}h)
                            </span>
                          ) : null}
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-[#64748B]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#64748B]" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 pt-2 border-t border-[#F1F5F9] space-y-4">
                          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                            {day.description}
                          </p>

                          {/* Day Activities */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] uppercase font-bold text-[#64748B] block">
                              Planned Activities & Highlights:
                            </span>
                            <ul className="space-y-1 text-xs text-[#334155]">
                              {day.activities.map((act, aIdx) => (
                                <li key={aIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                                  <span>{act}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Day Metadata Box */}
                          <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2 text-[#475569]">
                              <Hotel className="w-4 h-4 text-[#0D9488] shrink-0" />
                              <span>
                                <strong>Lodging:</strong> {day.accommodation}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#475569]">
                              <CheckCircle2 className="w-4 h-4 text-[#D97706] shrink-0" />
                              <span>
                                <strong>Meals:</strong> {day.meals}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#166534] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                  <span>Included in This Package</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#14532D]">
                  {circuit.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#16a34a] font-bold">&check;</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#991B1B] flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-[#dc2626]" />
                  <span>Not Included</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#7F1D1D]">
                  {circuit.notIncluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#dc2626] font-bold">&times;</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: DIRECT BOOKING & LIVE QUOTE CALCULATOR (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-6 sm:p-7 sticky top-28 space-y-6">
              <div className="border-b border-[#F1F5F9] pb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block mb-1">
                  Private Tour Reservation &bull; Antsirabe HQ
                </span>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-3xl font-bold text-[#0D9488]">
                      {formatPrice(totalGroupPrice)}
                    </span>
                    <span className="text-xs text-[#64748B] block mt-0.5">
                      Total for {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} ({formatPrice(perPersonPrice)}/pers)
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-xs font-bold text-[#0F172A]">
                    {currentCurrency.code}
                  </span>
                </div>
              </div>

              {bookingSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center space-y-3 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-[#16a34a]/20 text-[#16a34a] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#14532D]">Inquiry Sent to Ernest!</h4>
                  <p className="text-xs text-[#166534] leading-relaxed">
                    Thank you, {travelerName || 'Traveler'}. We have received your dates and fleet preference for{' '}
                    <strong>{circuit.title}</strong>. Ernest will contact you within a few hours.
                  </p>
                  <button
                    onClick={handleWhatsAppBooking}
                    className="w-full py-3 rounded-xl bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Open in WhatsApp for Instant Reply</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  {/* Number of Guests */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-1">
                      Number of Travelers
                    </label>
                    <div className="flex items-center justify-between p-2 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC]">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] font-bold hover:bg-[#F1F5F9]"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm text-[#0F172A]">
                        {guestCount} {guestCount === 1 ? 'Traveler' : 'Travelers'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-[#CBD5E1] text-[#0F172A] font-bold hover:bg-[#F1F5F9]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Travel Month */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-1">
                      Target Travel Month
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                    >
                      {[
                        'April (Emerald Green Season)',
                        'May (Clear Skies)',
                        'June (Cool & Sunny)',
                        'July (Whale Migration)',
                        'August (Peak Safari)',
                        'September (Active Wildlife)',
                        'October (Baby Lemurs)',
                        'November (Baobab Blooms)',
                        'December (Holiday Departures)',
                      ].map((m) => (
                        <option key={m} value={m.split(' ')[0]}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lodging Tier */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-1">
                      Lodging Standard
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setLodgingTier('standard')}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          lodgingTier === 'standard'
                            ? 'border-[#0D9488] bg-[#F0FDF4] font-bold text-[#0D9488]'
                            : 'border-[#CBD5E1] text-[#64748B]'
                        }`}
                      >
                        <div>Comfort Tier</div>
                        <div className="text-[10px] text-[#94A3B8]">Included in Base</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setLodgingTier('luxury')}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          lodgingTier === 'luxury'
                            ? 'border-[#0D9488] bg-[#F0FDF4] font-bold text-[#0D9488]'
                            : 'border-[#CBD5E1] text-[#64748B]'
                        }`}
                      >
                        <div>Luxury VIP</div>
                        <div className="text-[10px] text-[#D97706]">+€350 / pers</div>
                      </button>
                    </div>
                  </div>

                  {/* Traveler Name & Contact */}
                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      placeholder="e.g. Jean Dupont"
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#475569] uppercase tracking-wider block mb-1">
                      Email or WhatsApp Contact
                    </label>
                    <input
                      type="text"
                      required
                      value={travelerEmail}
                      onChange={(e) => setTravelerEmail(e.target.value)}
                      placeholder="e.g. traveler@gmail.com or +33 6..."
                      className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="button"
                      onClick={handleWhatsAppBooking}
                      className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all transform active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Instant WhatsApp Quote</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0D9488]/20 transition-all transform active:scale-95"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Inquiry to HQ</span>
                    </button>

                    <button
                      type="button"
                      onClick={onOpenCustomPlanner}
                      className="w-full py-2.5 text-center text-xs font-semibold text-[#0D9488] hover:underline"
                    >
                      Want to modify or customize this route?
                    </button>
                  </div>
                </form>
              )}

              {/* Direct Concierge Badge */}
              <div className="pt-4 border-t border-[#F1F5F9] flex items-center gap-3 text-xs text-[#64748B]">
                <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0" />
                <span className="leading-tight">
                  Direct Malagasy driver-guide rates &bull; No middleman &bull; 24/7 road assistance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Other Curated Circuits */}
        <div className="mt-20 pt-12 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#0D9488] block">
                More Madagascar Expeditions
              </span>
              <h3 className="text-2xl font-display font-bold text-[#0F172A]">
                You May Also Love
              </h3>
            </div>
            <button
              onClick={() => onNavigate('tours')}
              className="text-xs font-bold text-[#0D9488] hover:underline flex items-center gap-1"
            >
              <span>View All Circuits</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCircuits.map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  onSelectCircuit(other);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={other.heroImage}
                    alt={other.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#0F172A]">
                      {other.durationDays} Days
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#0D9488]">
                    {other.regionLabel}
                  </span>
                  <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#0D9488] transition-colors line-clamp-1">
                    {other.title}
                  </h4>
                  <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                    {other.subtitle}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-[#F1F5F9]">
                    <span className="text-xs font-bold text-[#0D9488]">
                      From {formatPrice(other.basePriceEUR)}
                    </span>
                    <span className="text-xs font-semibold text-[#0F172A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Tour &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
