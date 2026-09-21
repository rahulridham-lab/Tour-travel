import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ArrowLeft,
  Share2,
  Printer,
  ChevronDown,
  ChevronUp,
  Car,
  Compass,
  DollarSign,
  Heart,
  Send,
  Sparkles,
  AlertCircle,
  Award,
  PhoneCall,
  Check,
} from 'lucide-react';
import { Circuit, circuitsData, CircuitDay } from '../data/circuits';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';

interface CircuitDetailPageProps {
  circuit: Circuit;
  currentCurrency: CurrencyConfig;
  onBack: () => void;
  onSelectCircuit: (circuit: Circuit) => void;
  onBookCircuit: (circuitId: string) => void;
}

export const CircuitDetailPage: React.FC<CircuitDetailPageProps> = ({
  circuit,
  currentCurrency,
  onBack,
  onSelectCircuit,
  onBookCircuit,
}) => {
  const [selectedGroupTier, setSelectedGroupTier] = useState<'2' | '3-4' | '5+'>('2');
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });
  const [copiedLink, setCopiedLink] = useState(false);

  // Inquiry form states
  const [travelerName, setTravelerName] = useState('');
  const [travelerEmail, setTravelerEmail] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Currency formatting helper
  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const currentTierPricing = useMemo(() => {
    if (!circuit.tieredPricing) {
      return {
        label: 'Standard Tariff',
        totalEUR: circuit.basePriceEUR * 2,
        perPersonEUR: circuit.basePriceEUR,
      };
    }
    if (selectedGroupTier === '2') {
      return {
        label: '2 Guests (Private Duo)',
        totalEUR: circuit.tieredPricing.twoPersonsTotalEUR,
        perPersonEUR: circuit.tieredPricing.twoPersonsPerPersonEUR,
      };
    }
    if (selectedGroupTier === '3-4') {
      return {
        label: '3 to 4 Guests (Small Group)',
        totalEUR: circuit.tieredPricing.threeFourPersonsTotalEUR,
        perPersonEUR: circuit.tieredPricing.threeFourPersonsPerPersonEUR,
      };
    }
    return {
      label: '5+ Guests (Group Safari Privilege)',
      totalEUR: circuit.tieredPricing.fivePlusPersonsPerPersonEUR * 5,
      perPersonEUR: circuit.tieredPricing.fivePlusPersonsPerPersonEUR,
    };
  }, [circuit, selectedGroupTier]);

  const toggleDay = (dayNum: number) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const expandAllDays = () => {
    const all: Record<number, boolean> = {};
    circuit.days.forEach((d) => {
      all[d.day] = true;
    });
    setExpandedDays(all);
  };

  const collapseAllDays = () => {
    setExpandedDays({});
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${circuit.title} - Madagascar Ernest Tours`,
          text: circuit.subtitle,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppBooking = () => {
    const tierText =
      selectedGroupTier === '2'
        ? '2 Persons'
        : selectedGroupTier === '3-4'
        ? '3-4 Persons'
        : '5+ Persons Group';
    const message = `Hello Ernest Soa! I would like to book or customize the tour:
*${circuit.title}*
- Duration: ${circuit.durationDays} Days (${circuit.durationNights} Nights)
- Party Size: ${tierText}
- Estimated Rate: ${formatPrice(currentTierPricing.perPersonEUR)} / person
- Route: ${circuit.routeOverview.join(' -> ')}

Could you please check availability and advise on the next steps?`;

    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 800);
  };

  // Alternative circuits
  const relatedCircuits = useMemo(() => {
    return circuitsData
      .filter((c) => c.id !== circuit.id)
      .slice(0, 3);
  }, [circuit.id]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20 text-[#0F172A]">
      {/* Top Breadcrumb & Action Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0F172A] hover:text-[#0D9488] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Circuits</span>
          </button>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-all"
              title="Share itinerary"
            >
              <Share2 className="w-3.5 h-3.5 text-[#0D9488]" />
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-all"
              title="Print itinerary"
            >
              <Printer className="w-3.5 h-3.5 text-[#0D9488]" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={handleWhatsAppBooking}
              className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>Ask Ernest on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Circuit Hero Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl mb-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#0D9488]/10 text-[#0D9488] text-xs font-bold uppercase tracking-wider">
              {circuit.region.toUpperCase()} EXPEDITION
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {circuit.durationDays} Days / {circuit.durationNights} Nights
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
              Difficulty: {circuit.physicalLevel}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              Best Season: {circuit.bestSeason}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-bold text-[#0F172A] tracking-tight leading-tight mb-3">
            {circuit.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl font-light mb-6">
            {circuit.subtitle}
          </p>

          {/* Route Overview Stops */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-2">
              Overland Route Sequence ({circuit.routeOverview.length} Milestones):
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {circuit.routeOverview.map((stop, i) => (
                <React.Fragment key={i}>
                  <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F172A] shadow-xs">
                    {stop}
                  </span>
                  {i < circuit.routeOverview.length - 1 && (
                    <span className="text-slate-400 font-bold text-xs">&rarr;</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Left (Itinerary, Activities, Logistics) & Right (Pricing, Booking Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* 1. Official Tiered Tariff Schedule Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#0D9488] font-bold block">
                      Official Direct Operator Tariffs
                    </span>
                    <h3 className="text-lg font-bold text-[#0F172A]">
                      Pricing Schedule by Group Size
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  0% Agency Fees
                </span>
              </div>

              {/* Group Tier Tabs */}
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
                <button
                  onClick={() => setSelectedGroupTier('2')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedGroupTier === '2'
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  2 Persons (Duo)
                </button>
                <button
                  onClick={() => setSelectedGroupTier('3-4')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedGroupTier === '3-4'
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  3 – 4 Persons
                </button>
                <button
                  onClick={() => setSelectedGroupTier('5+')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    selectedGroupTier === '5+'
                      ? 'bg-white text-[#0F172A] shadow-sm'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  5+ Persons (Group)
                </button>
              </div>

              {/* Tier Rate Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-slate-300 block mb-1">
                    Selected Tier: {currentTierPricing.label}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold font-serif text-white">
                      {formatPrice(currentTierPricing.perPersonEUR)}
                    </span>
                    <span className="text-xs text-slate-300">/ person</span>
                  </div>
                  {selectedGroupTier !== '5+' && (
                    <span className="text-xs text-emerald-400 block mt-1 font-medium">
                      Total for party: {formatPrice(currentTierPricing.totalEUR)}
                    </span>
                  )}
                </div>

                <button
                  onClick={handleWhatsAppBooking}
                  className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Inquire This Tier</span>
                </button>
              </div>

              {/* Flexibility Notice (Requested by User) */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Important Stay & Duration Flexibility:</span>
                  <p className="mt-0.5 leading-relaxed">
                    The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration. Contact Ernest directly for personalized adjustments.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Comprehensive Day-by-Day Itinerary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#0D9488] font-bold block">
                    Detailed Day-by-Day Schedule
                  </span>
                  <h3 className="text-xl font-bold text-[#0F172A]">
                    Expedition Program ({circuit.days.length} Days)
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={expandAllDays}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAllDays}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Days Accordion List */}
              <div className="space-y-4 pt-6">
                {circuit.days.map((dayItem) => {
                  const isOpen = !!expandedDays[dayItem.day];
                  return (
                    <div
                      key={dayItem.day}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#0D9488]/50"
                    >
                      <button
                        onClick={() => toggleDay(dayItem.day)}
                        className="w-full p-4 sm:p-5 text-left bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-xl bg-[#0D9488] text-white flex items-center justify-center text-xs font-bold shrink-0">
                            D{dayItem.day}
                          </span>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-[#0F172A]">
                              {dayItem.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                              {dayItem.distanceKm ? (
                                <span>{dayItem.distanceKm} km</span>
                              ) : null}
                              {dayItem.driveTimeHours ? (
                                <span>&bull; ~{dayItem.driveTimeHours} hrs drive</span>
                              ) : null}
                              {dayItem.accommodation ? (
                                <span className="hidden sm:inline">
                                  &bull; {dayItem.accommodation}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="text-slate-400">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-[#0D9488]" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-5 bg-white border-t border-slate-100 space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <p className="font-light">{dayItem.description}</p>

                          {dayItem.activities && dayItem.activities.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                                Scheduled Visits & Highlights:
                              </span>
                              <ul className="space-y-1">
                                {dayItem.activities.map((act, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-1" />
                                    <span className="text-slate-700">{act}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-100">
                            {dayItem.meals && (
                              <span>
                                <strong>Meals:</strong> {dayItem.meals}
                              </span>
                            )}
                            {dayItem.accommodation && (
                              <span>
                                <strong>Stay:</strong> {dayItem.accommodation}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Program Activities List */}
            {circuit.activitiesList && circuit.activitiesList.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
                <span className="text-[10px] uppercase tracking-wider text-[#0D9488] font-bold block mb-1">
                  Full Highlights Breakdown
                </span>
                <h3 className="text-xl font-bold text-[#0F172A] mb-4">
                  Key Visits & Natural Reserves Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {circuit.activitiesList.map((act, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800"
                    >
                      <Sparkles className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                      <span className="leading-snug">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Inclusions & Exclusions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">
                What's Included & What's Excluded
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Included in This Circuit</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {circuit.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Not Included</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {circuit.notIncluded.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-rose-500 font-bold shrink-0">&times;</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. 4x4 Fleet & Logistic Standards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#0D9488] font-bold block">
                    Transport & Field Operations
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    Private 4x4 Vehicles & Safety Standards
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4">
                Every circuit operated by Ernest Soa utilizes well-maintained, heavy-duty private Toyota Land Cruisers or Hilux 4x4s with dedicated native driver-guides. You will never be merged with strangers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Fuel & Chauffeur</span>
                  <span className="text-slate-600">All diesel fuel, toll fees, and driver lodging & meals included.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Boat & Ferry Crossings</span>
                  <span className="text-slate-600">Local river ferries (bacs) and motorized boats covered where route specifies.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[#0F172A] block mb-1">Satellite Comm Support</span>
                  <span className="text-slate-600">24/7 direct communication with Antsirabe headquarters dispatch.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (4 cols) - Sticky Booking & Direct WhatsApp Action */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Action Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xl sticky top-36">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0D9488] block">
                Direct Booking & Inquiries
              </span>
              <h3 className="text-xl font-bold text-[#0F172A] mt-1 mb-2">
                Reserve or Customize Tour
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light mb-5">
                Send your planned dates directly to Ernest Soa. Receive a personalized itinerary proposal and confirmation within 2 hours.
              </p>

              {/* WhatsApp Fast Button */}
              <button
                onClick={handleWhatsAppBooking}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 transition-all mb-4"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Inquiry</span>
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200" />
                <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase font-bold">
                  Or Send Online Request
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {submitSuccess ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-900 text-sm">Request Received!</h4>
                  <p className="text-xs text-emerald-700">
                    Ernest will review your dates and reply to your email / WhatsApp promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      placeholder="e.g. Jean Dupont / John Smith"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={travelerEmail}
                        onChange={(e) => setTravelerEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                        WhatsApp / Tel
                      </label>
                      <input
                        type="tel"
                        value={travelerPhone}
                        onChange={(e) => setTravelerPhone(e.target.value)}
                        placeholder="+33 6... / +1..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                        Target Date
                      </label>
                      <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                        Travelers
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                      >
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5">5+ Persons Group</option>
                        <option value="1">Solo Traveler</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-600 block mb-1">
                      Custom Requests / Flexibility
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="Add or reduce days, special interests, preferred accommodations..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0D9488]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#0F172A] hover:bg-[#0D9488] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Send Direct Inquiry'}</span>
                  </button>
                </form>
              )}

              {/* Direct Phone & Dispatch Badge */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Direct Chauffeur-Guide:</span>
                <span className="font-bold text-[#0F172A]">{siteConfig.contacts.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Other Circuits Carousel */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#0D9488] block">
                Compare Overland Circuits
              </span>
              <h3 className="text-xl font-bold text-[#0F172A]">
                Other Recommended Madagascar Safaris
              </h3>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-bold text-[#0D9488] hover:underline"
            >
              View All 8 Circuits &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCircuits.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectCircuit(rel);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0D9488] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-[#0D9488] uppercase">{rel.region}</span>
                    <span>{rel.durationDays} Days</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A] mb-1.5 line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 font-light">
                    {rel.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F172A]">
                    From {formatPrice(rel.basePriceEUR)} / pers
                  </span>
                  <span className="text-xs font-bold text-[#0D9488]">View Detail &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
