import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Calculator,
  Users,
  Calendar,
  Car,
  MessageSquare,
  Mail,
  Check,
  Compass,
  ShieldAlert,
  HelpCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { circuitsData, Circuit } from '../data/circuits';
import { siteConfig, CurrencyConfig, VehicleOption } from '../data/siteConfig';

interface InteractiveBookingProps {
  currentCurrency: CurrencyConfig;
  preselectedCircuitId?: string;
}

export const InteractiveBooking: React.FC<InteractiveBookingProps> = ({
  currentCurrency,
  preselectedCircuitId,
}) => {
  // Booking state
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>(
    preselectedCircuitId || circuitsData[0].id
  );
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('land-cruiser-v8');
  const [accommodationTier, setAccommodationTier] = useState<'luxury' | 'comfort' | 'charter'>('luxury');
  const [travelMonth, setTravelMonth] = useState<string>('July');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [quoteGenerated, setQuoteGenerated] = useState<boolean>(false);

  // Sync if preselected circuit changed
  useEffect(() => {
    if (preselectedCircuitId) {
      setSelectedCircuitId(preselectedCircuitId);
    }
  }, [preselectedCircuitId]);

  const activeCircuit =
    circuitsData.find((c) => c.id === selectedCircuitId) || circuitsData[0];
  const activeVehicle =
    siteConfig.fleet.find((v) => v.id === selectedVehicleId) || siteConfig.fleet[0];

  // Dynamic Price Estimator Logic
  // Base circuit price * vehicle multiplier * accommodation multiplier * group size factor
  const tierMultipliers = {
    comfort: 0.88,
    luxury: 1.0,
    charter: 1.35,
  };

  // Group size sharing economies: more guests slightly lower per-person private guide/4x4 cost
  const groupDiscountMultiplier =
    guestCount === 1 ? 1.45 : guestCount === 2 ? 1.0 : guestCount <= 4 ? 0.85 : 0.75;

  const calculatedBaseEUR = Math.round(
    activeCircuit.basePriceEUR *
      activeVehicle.priceMultiplier *
      tierMultipliers[accommodationTier] *
      groupDiscountMultiplier
  );

  const totalCalculatedEUR = calculatedBaseEUR * guestCount;

  // Currency formatters
  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  const perPersonPriceFormatted = formatPrice(calculatedBaseEUR);
  const totalPriceFormatted = formatPrice(totalCalculatedEUR);

  // Pre-formatted WhatsApp Message string
  const generateWhatsAppMessage = () => {
    const lines = [
      `*MADAGASCAR ERNEST TRAVEL TOURS — BESPOKE QUOTE INQUIRY*`,
      `----------------------------------------------------`,
      `*Itinerary:* ${activeCircuit.title} (${activeCircuit.durationDays}D / ${activeCircuit.durationNights}N)`,
      `*Guests:* ${guestCount} Person(s)`,
      `*Vehicle Preference:* ${activeVehicle.name}`,
      `*Lodge Category:* ${
        accommodationTier === 'luxury'
          ? 'Luxury Eco-Lodge & Suites'
          : accommodationTier === 'charter'
          ? 'VIP Luxury Charter & Overwater/Private Villas'
          : 'Boutique Safari Comfort'
      }`,
      `*Estimated Travel Period:* ${travelMonth} 2026/2027`,
      `*Estimated Budget:* ~${totalPriceFormatted} (${perPersonPriceFormatted} / guest)`,
      fullName ? `*Lead Traveler:* ${fullName}` : null,
      email ? `*Email:* ${email}` : null,
      guestPhone ? `*Client WhatsApp:* ${guestPhone}` : null,
      specialNotes ? `*Special Safari Requests:* ${specialNotes}` : null,
      `----------------------------------------------------`,
      `Hello Ernest, please confirm guide availability and send detailed quotation.`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleLaunchWhatsApp = () => {
    // Trigger celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6A87D', '#2D6A4F', '#F4F1EA', '#E0CEAF'],
    });

    setQuoteGenerated(true);
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleLaunchEmail = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    setQuoteGenerated(true);
    const subject = encodeURIComponent(
      `Private Tour Inquiry: ${activeCircuit.title} - ${guestCount} Guests`
    );
    const body = encodeURIComponent(generateWhatsAppMessage());
    window.location.href = `mailto:${siteConfig.contacts.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateWhatsAppMessage());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="booking-section" className="py-24 relative bg-[#09100D] border-t border-[#C6A87D]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#1E3A2B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3A2B]/60 border border-[#C6A87D]/30 text-xs font-semibold text-[#C6A87D] uppercase tracking-widest mb-4">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Bespoke Estimator
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#F4F1EA] mb-4">
            Interactive Price & Quote Calculator
          </h2>
          <p className="text-sm sm:text-base text-[#9EACA3] max-w-2xl mx-auto font-light">
            Adjust party size, overland vehicles, and lodging standards for real-time cost transparency.
            Dispatch directly to Ernest on WhatsApp for instant confirmation.
          </p>
        </div>

        {/* 2-Column Grid: Config Form & Live Estimate Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Controls (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A87D]/25 space-y-6">
            {/* 1. Circuit Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C6A87D] font-bold mb-2">
                1. Select Preferred Private Itinerary
              </label>
              <select
                value={selectedCircuitId}
                onChange={(e) => setSelectedCircuitId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#09100D] border border-[#C6A87D]/30 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C6A87D] transition-colors"
              >
                {circuitsData.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.durationDays} Days / {c.durationNights} Nights) &mdash; {c.regionLabel}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Travelers Slider & Month */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs uppercase tracking-wider text-[#C6A87D] font-bold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    2. Private Party Size
                  </label>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#1E3A2B] text-[#E0CEAF]">
                    {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value))}
                  className="w-full accent-[#C6A87D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#9EACA3] mt-1">
                  <span>Solo (VIP Chauffeur)</span>
                  <span>Couple (2)</span>
                  <span>Family (4-6)</span>
                  <span>Expedition (10)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#C6A87D] font-bold mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  Target Travel Season / Month
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09100D] border border-[#C6A87D]/30 text-sm text-[#F4F1EA] focus:outline-none focus:border-[#C6A87D]"
                >
                  {[
                    'April (Emerald Post-Rains)',
                    'May (Prime Tsingy Opening)',
                    'June (Clear Skies & Trekking)',
                    'July (Whales & High Safari Season)',
                    'August (Peak Whale & Wildlife)',
                    'September (Baby Lemurs & Whales)',
                    'October (Spring Lemur Breeding)',
                    'November (Chameleon & Reptile Peak)',
                    'December (Summer Holidays)',
                  ].map((m) => (
                    <option key={m} value={m.split(' ')[0]}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Vehicle Fleet Option */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C6A87D] font-bold mb-2 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5" />
                3. Private Overland Fleet Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {siteConfig.fleet.map((veh) => {
                  const isSelected = selectedVehicleId === veh.id;
                  return (
                    <div
                      key={veh.id}
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1E3A2B]/70 border-[#C6A87D] shadow-lg'
                          : 'bg-[#09100D] border-white/10 hover:border-[#C6A87D]/40'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#F4F1EA] leading-tight mb-1">{veh.name}</p>
                      <p className="text-[10px] text-[#9EACA3] leading-snug">{veh.capacity}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Lodging Standard */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#C6A87D] font-bold mb-2">
                4. Lodging & Accommodation Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'comfort',
                    label: 'Safari Comfort',
                    desc: 'Handpicked authentic 3-star eco-bungalows with private bath',
                  },
                  {
                    id: 'luxury',
                    label: 'Luxury Eco-Lodge',
                    desc: 'Premier boutique lodges, infinity pools, fine dining suites',
                  },
                  {
                    id: 'charter',
                    label: 'VIP Deluxe Villa',
                    desc: '5-Star overwater villas, beachfront estates & charter upgrades',
                  },
                ].map((tier) => {
                  const isSelected = accommodationTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setAccommodationTier(tier.id as any)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#1E3A2B]/70 border-[#C6A87D] shadow-lg'
                          : 'bg-[#09100D] border-white/10 hover:border-[#C6A87D]/40'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#F4F1EA] mb-1">{tier.label}</p>
                      <p className="text-[10px] text-[#9EACA3] leading-snug">{tier.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5. Contact Details (For Pre-populating WhatsApp) */}
            <div className="pt-2 border-t border-white/10">
              <label className="block text-xs uppercase tracking-wider text-[#C6A87D] font-bold mb-2">
                5. Traveler Contact Info (Included in WhatsApp dispatch)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name (e.g. Eleanor Vance)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#09100D] border border-white/15 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C6A87D]"
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#09100D] border border-white/15 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C6A87D]"
                />
              </div>

              <div className="mt-3">
                <textarea
                  rows={2}
                  placeholder="Special requests: Dietary needs, photography gear, private flight questions..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#09100D] border border-white/15 text-xs text-[#F4F1EA] focus:outline-none focus:border-[#C6A87D]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Live Quotation Summary & WhatsApp Trigger (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#C6A87D]/40 shadow-2xl relative overflow-hidden bg-gradient-to-b from-[#0F1E17] to-[#0A1410]">
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs uppercase tracking-widest text-[#C6A87D] font-bold">
                  Quotation Estimate
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-[#1E3A2B] text-emerald-300 border border-emerald-500/30">
                  Direct Operator Rate
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-semibold text-[#F4F1EA] mb-1">
                {activeCircuit.title}
              </h3>
              <p className="text-xs text-[#9EACA3] mb-6">
                {activeCircuit.durationDays} Days / {activeCircuit.durationNights} Nights &bull;{' '}
                {activeCircuit.regionLabel}
              </p>

              {/* Price Breakdown Box */}
              <div className="p-5 rounded-2xl bg-[#09100D]/80 border border-[#C6A87D]/25 space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs text-[#9EACA3]">
                  <span>Private 4x4 & Guide Base:</span>
                  <span className="font-semibold text-[#F4F1EA]">Included</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#9EACA3]">
                  <span>Vehicle Tier ({activeVehicle.name.split(' ')[0]}):</span>
                  <span className="font-semibold text-[#F4F1EA]">{activeVehicle.capacity}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#9EACA3]">
                  <span>Lodge Standard:</span>
                  <span className="font-semibold text-[#F4F1EA] capitalize">{accommodationTier}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#9EACA3]">
                  <span>Private Travelers:</span>
                  <span className="font-semibold text-[#F4F1EA]">{guestCount} Person(s)</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9EACA3] block">
                      Estimated Per Guest:
                    </span>
                    <span className="text-2xl font-serif font-bold text-[#C6A87D]">
                      {perPersonPriceFormatted}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#9EACA3] block">
                      Estimated Party Total:
                    </span>
                    <span className="text-lg font-serif font-semibold text-[#F4F1EA]">
                      {totalPriceFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <button
                onClick={handleLaunchWhatsApp}
                className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-all active:scale-95 mb-3"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Send Quote Directly to WhatsApp</span>
              </button>

              {/* Secondary Email & Copy Buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleLaunchEmail}
                  className="py-2.5 px-3 rounded-xl bg-[#1E3A2B] border border-[#C6A87D]/30 text-xs font-semibold text-[#F4F1EA] hover:bg-[#2A4D3B] flex items-center justify-center gap-1.5 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C6A87D]" />
                  <span>Send via Email</span>
                </button>

                <button
                  onClick={handleCopyQuote}
                  className="py-2.5 px-3 rounded-xl bg-[#09100D] border border-white/15 text-xs font-semibold text-[#9EACA3] hover:text-[#F4F1EA] flex items-center justify-center gap-1.5 transition-all"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Quote'}</span>
                </button>
              </div>

              {/* Instant WhatsApp Help note */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-[#9EACA3]">
                <Compass className="w-4 h-4 text-[#C6A87D] shrink-0 mt-0.5" />
                <p>
                  Clicking WhatsApp pre-populates your selected circuit, group size, and vehicle
                  directly into your WhatsApp chat with <strong className="text-[#F4F1EA]">Ernest (+261 32 57 004 05)</strong>.
                  Zero obligations, instant answers.
                </p>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="p-5 rounded-2xl bg-[#0F1E17]/60 border border-[#C6A87D]/20 text-xs text-[#9EACA3] space-y-2">
              <p className="font-semibold text-[#F4F1EA]">Prefer Direct Telephone or Voicemail?</p>
              <p>Primary Mobile: <strong className="text-[#C6A87D]">{siteConfig.contacts.phonePrimary}</strong></p>
              <p>WhatsApp Line: <strong className="text-[#C6A87D]">{siteConfig.contacts.whatsappDisplay}</strong></p>
              <p>Official Dispatch: <strong className="text-[#C6A87D]">{siteConfig.contacts.email}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
