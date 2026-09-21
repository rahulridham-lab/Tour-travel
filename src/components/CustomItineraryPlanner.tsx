import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  Compass,
  Calendar,
  Clock,
  Car,
  Hotel,
  CheckCircle2,
  FileDown,
  Printer,
  X,
  MessageSquare,
  MapPin,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
  RefreshCw,
  Heart,
  Sliders,
  DollarSign,
  Share2,
  Camera,
  Anchor,
  Globe,
  Trees,
} from 'lucide-react';
import { circuitsData, Circuit, CircuitDay } from '../data/circuits';
import { siteConfig, CurrencyConfig } from '../data/siteConfig';

export type TravelerType = 'family' | 'friends' | 'honeymoon' | 'solo';
export type TripStyle = 'wildlife' | 'canyons' | 'baobab' | 'river' | 'beaches' | 'mixed';
export type TripDurationOption = '7-9' | '10-14' | '15+';
export type TravelPace = 'relaxed' | 'balanced' | 'fast';
export type AccommodationPreference = 'luxury-eco' | 'boutique-comfort' | 'vip-sanctuary';
export type TransportPreference = 'land-cruiser-v8' | 'executive-minibus' | 'river-chaland-combo';

interface CustomItineraryPlannerProps {
  currentCurrency: CurrencyConfig;
  initialStep?: number;
}

export interface GeneratedCustomPlan {
  id: string;
  title: string;
  subtitle: string;
  travelerType: TravelerType;
  tripStyle: TripStyle;
  durationRange: TripDurationOption;
  durationDays: number;
  pace: TravelPace;
  accommodation: AccommodationPreference;
  transport: TransportPreference;
  guestCount: number;
  targetMonth: string;
  matchingCircuitId: string;
  baseCircuitTitle: string;
  estimatedPriceEURPerPerson: number;
  totalEstimatedPriceEUR: number;
  days: CircuitDay[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  bespokeTouches: string[];
}

export const CustomItineraryPlanner: React.FC<CustomItineraryPlannerProps> = ({
  currentCurrency,
  initialStep = 1,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Form states
  const [travelerType, setTravelerType] = useState<TravelerType>('family');
  const [guestCount, setGuestCount] = useState<number>(4);
  const [tripStyle, setTripStyle] = useState<TripStyle>('baobab');
  const [durationOption, setDurationOption] = useState<TripDurationOption>('10-14');
  const [exactDays, setExactDays] = useState<number>(11);
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [accommodation, setAccommodation] = useState<AccommodationPreference>('luxury-eco');
  const [transport, setTransport] = useState<TransportPreference>('land-cruiser-v8');
  const [targetMonth, setTargetMonth] = useState<string>('August');
  const [leadTravelerName, setLeadTravelerName] = useState<string>('');
  const [specialInterests, setSpecialInterests] = useState<string>('');

  const [generatedPlan, setGeneratedPlan] = useState<GeneratedCustomPlan | null>(null);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleDurationCategoryChange = (opt: TripDurationOption) => {
    setDurationOption(opt);
    if (opt === '7-9') setExactDays(8);
    else if (opt === '10-14') setExactDays(11);
    else setExactDays(15);
  };

  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  // Live dynamic matching price estimate for real-time mobile and desktop feedback
  const currentEstimate = React.useMemo(() => {
    let baseCircuit: Circuit;
    if (tripStyle === 'baobab' || tripStyle === 'river') {
      baseCircuit = circuitsData.find((c) => c.id === 'circuits-west-8-days') || circuitsData[2];
    } else if (tripStyle === 'canyons') {
      baseCircuit = circuitsData.find((c) => c.id === 'circuits-sud-ouest-19-jours') || circuitsData[4];
    } else if (tripStyle === 'beaches' || tripStyle === 'wildlife') {
      baseCircuit = circuitsData.find((c) => c.id === 'circuits-est-7-days') || circuitsData[0];
    } else {
      baseCircuit = circuitsData.find((c) => c.id === 'circuits-mixt-sud-west-23-days') || circuitsData[1];
    }

    let perPersonPrice = baseCircuit.basePriceEUR * (exactDays / baseCircuit.durationDays);
    if (guestCount >= 6) perPersonPrice *= 0.78;
    else if (guestCount >= 4) perPersonPrice *= 0.85;
    else if (guestCount === 1) perPersonPrice *= 1.45;

    if (accommodation === 'vip-sanctuary') perPersonPrice += 450;
    if (accommodation === 'boutique-comfort') perPersonPrice -= 180;

    const totalGroupPrice = Math.round(perPersonPrice * guestCount);
    return {
      perPersonEUR: Math.round(perPersonPrice),
      totalEUR: totalGroupPrice,
      baseCircuitTitle: baseCircuit.title,
      baseCircuitId: baseCircuit.id,
    };
  }, [tripStyle, exactDays, guestCount, accommodation]);

  const generatePlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Pick matching circuit as base
      let baseCircuit: Circuit;
      if (tripStyle === 'baobab' || tripStyle === 'river') {
        baseCircuit = circuitsData.find((c) => c.id === 'circuits-west-8-days') || circuitsData[2];
      } else if (tripStyle === 'canyons') {
        baseCircuit = circuitsData.find((c) => c.id === 'circuits-sud-ouest-19-jours') || circuitsData[4];
      } else if (tripStyle === 'beaches' || tripStyle === 'wildlife') {
        baseCircuit = circuitsData.find((c) => c.id === 'circuits-est-7-days') || circuitsData[0];
      } else {
        baseCircuit = circuitsData.find((c) => c.id === 'circuits-mixt-sud-west-23-days') || circuitsData[1];
      }

      let daysList: CircuitDay[] = [];
      const baseDays = baseCircuit.days;

      if (exactDays <= baseDays.length) {
        daysList = baseDays.slice(0, exactDays);
      } else {
        daysList = [...baseDays];
        const extraNeeded = exactDays - baseDays.length;
        for (let i = 1; i <= extraNeeded; i++) {
          daysList.push({
            day: baseDays.length + i,
            title: `Bespoke Sanctuary Immersion & Wildlife Discovery Day ${i}`,
            location: 'Private Wildlife Reserve & Coastal Lagoon',
            description:
              'Extended personalized expedition guided by native trackers. Flexible schedule allowing photography hides, village craft workshops, and private sunset aperitifs.',
            activities: [
              'Guided nocturnal lemur search',
              'Traditional Malagasy culinary tasting with local chef',
              'Sunset coastal cocktail overlooking the ocean',
            ],
            accommodation: 'Luxury Waterfront Bungalow / Private Villa',
            meals: 'Breakfast, Lunch & Gourmet Dinner',
            distanceKm: 40,
            driveTimeHours: 1.5,
          });
        }
      }

      // Group discount scaling
      let perPersonPrice = baseCircuit.basePriceEUR * (exactDays / baseCircuit.durationDays);
      if (guestCount >= 6) perPersonPrice *= 0.78;
      else if (guestCount >= 4) perPersonPrice *= 0.85;
      else if (guestCount === 1) perPersonPrice *= 1.45;

      if (accommodation === 'vip-sanctuary') perPersonPrice += 450;
      if (accommodation === 'boutique-comfort') perPersonPrice -= 180;

      const totalGroupPrice = Math.round(perPersonPrice * guestCount);

      const plan: GeneratedCustomPlan = {
        id: `EP-${Math.floor(100000 + Math.random() * 900000)}`,
        title: `Tailor-Made ${exactDays}-Day Madagascar Odyssey`,
        subtitle: `Custom private expedition crafted for ${guestCount} ${guestCount === 1 ? 'traveler' : 'travelers'} with private 4x4 fleet and dedicated Malagasy guide.`,
        travelerType,
        tripStyle,
        durationRange: durationOption,
        durationDays: exactDays,
        pace,
        accommodation,
        transport,
        guestCount,
        targetMonth,
        matchingCircuitId: baseCircuit.id,
        baseCircuitTitle: baseCircuit.title,
        estimatedPriceEURPerPerson: Math.round(perPersonPrice),
        totalEstimatedPriceEUR: totalGroupPrice,
        days: daysList,
        highlights: [
          ...baseCircuit.highlights.slice(0, 4),
          `Exclusively private 4x4 vehicle with unlimited mileage & dedicated chauffeur`,
          `Daily flexible departure timings tuned to your preferred pace`,
        ],
        inclusions: [
          'Private 4x4 vehicle with fuel, driver-guide allowance, and emergency satellite comms',
          'All hand-picked boutique eco-lodges & hotels on Half-Board / Full-Board',
          'National Park entrance fees, local park ranger permits, and night safari trackers',
          'Domestic flights assistance and seamless airport meet-and-greet transfers in Antananarivo',
          'Private river chaland barge or marine boat crossings where applicable',
          '24/7 direct concierge supervision by Ernest Soa in Antsirabe HQ',
        ],
        exclusions: [
          'International flights to/from Ivato Airport (TNR)',
          'Personal travel insurance and visa fees ($35 on arrival)',
          'Discretionary gratuities for local park trackers & drivers',
          'Premium alcoholic spirits and personal laundry items',
        ],
        bespokeTouches: [
          `Complimentary local SIM card with high-speed 4G data for your group`,
          `Sunset Baobab Champagne toast & local seasonal tropical fruit tastings`,
          `Customized Malagasy artisan welcome basket handcrafted in Antsirabe`,
        ],
      };

      setGeneratedPlan(plan);
      setIsGenerating(false);
      setCurrentStep(5);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0D9488', '#D97706', '#0284C7', '#1E3B2B'],
        });
      } catch (e) {
        // Confetti fallback
      }
    }, 900);
  };

  const handleWhatsAppBooking = () => {
    if (!generatedPlan) return;
    const message = `Hello Ernest! I generated a custom private Madagascar itinerary proposal:
- Plan Reference: ${generatedPlan.id}
- Route: ${generatedPlan.title}
- Duration: ${generatedPlan.durationDays} Days
- Guests: ${generatedPlan.guestCount} (${generatedPlan.travelerType})
- Target Month: ${generatedPlan.targetMonth}
- Style: ${generatedPlan.tripStyle}
- Vehicle: ${generatedPlan.transport}
- Lodging: ${generatedPlan.accommodation}
- Estimated Total: ${formatPrice(generatedPlan.totalEstimatedPriceEUR)} (${formatPrice(generatedPlan.estimatedPriceEURPerPerson)} / person)

Lead Traveler: ${leadTravelerName || 'Inquiry'}
Special notes: ${specialInterests || 'None'}

Please confirm availability and the next steps for reserving our dates with your team!`;

    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="custom-planner" className="py-12 sm:py-16 bg-[#F8FAFC] relative overflow-hidden">
      {/* Animated Subtle Travel Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-8 text-[#0D9488]/15 animate-float-slow">
          <Compass className="w-16 h-16" />
        </div>
        <div className="absolute top-1/4 right-10 text-[#D97706]/15 animate-float-reverse">
          <Car className="w-20 h-20" />
        </div>
        <div className="absolute bottom-1/3 left-12 text-[#0D9488]/12 animate-float-slow">
          <Camera className="w-16 h-16" />
        </div>
        <div className="absolute bottom-16 right-16 text-[#0D9488]/15 animate-float-reverse">
          <MapPin className="w-16 h-16" />
        </div>
        <div className="absolute top-2/3 right-1/4 text-[#D97706]/10 animate-float-slow">
          <Anchor className="w-14 h-14" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 text-xs font-bold text-[#0D9488] uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>Interactive Bespoke Journey Builder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0F172A]">
            Design Your Tailor-Made Safari
          </h2>
          <p className="mt-2 text-sm text-[#64748B]">
            Whether traveling as a family, with lifelong friends, or on honeymoon, customize your dream route
            in 4 quick steps and receive an instant transparent quote.
          </p>
        </div>

        {/* Step Progress Bar (Optimized for Mobile & Desktop) */}
        {currentStep < 5 && (
          <div className="mb-6 sm:mb-10 bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
            {/* Mobile Step Header */}
            <div className="sm:hidden flex items-center justify-between text-xs font-bold text-[#0F172A] mb-2.5 px-1">
              <span className="text-[#0D9488]">Step {currentStep} of 4:</span>
              <span className="text-[#475569] font-semibold">
                {currentStep === 1 && 'Party & Group Size'}
                {currentStep === 2 && 'Landscapes & Bucket List'}
                {currentStep === 3 && 'Duration & Travel Pace'}
                {currentStep === 4 && 'Vehicle Fleet & Lodging'}
              </span>
            </div>

            {/* Desktop Step Header */}
            <div className="hidden sm:flex items-center justify-between text-xs font-bold text-[#64748B] mb-2 px-1">
              <span className={currentStep >= 1 ? 'text-[#0D9488]' : ''}>1. Party & Group</span>
              <span className={currentStep >= 2 ? 'text-[#0D9488]' : ''}>2. Priorities</span>
              <span className={currentStep >= 3 ? 'text-[#0D9488]' : ''}>3. Duration & Pace</span>
              <span className={currentStep >= 4 ? 'text-[#0D9488]' : ''}>4. Fleet & Lodging</span>
            </div>
            <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0D9488] to-[#0284C7] h-full transition-all duration-500 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Main Interactive Wizard Box */}
        <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-xl p-5 sm:p-10 transition-all">
          {/* STEP 1: PARTY & TRAVELER TYPE */}
          {currentStep === 1 && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h3 className="text-xl font-display font-medium text-[#0F172A]">
                  Step 1: Who is joining this Madagascar expedition?
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Select your party composition so we can match ideal vehicle seating and room layouts.
                </p>
              </div>

              {/* Traveler Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                {[
                  {
                    id: 'family',
                    title: 'Family with Children',
                    desc: 'Spacious 4x4, family lodges, child-friendly walking trails & lemur encounters.',
                    icon: Users,
                  },
                  {
                    id: 'friends',
                    title: 'Group of Friends',
                    desc: 'Shared expedition, scenic river aperitifs, campfires, and private 4x4 convoy.',
                    icon: Compass,
                  },
                  {
                    id: 'honeymoon',
                    title: 'Couple & Honeymoon',
                    desc: 'Romantic oceanfront retreats, secluded sunset baobab toasts, and tranquil pacing.',
                    icon: Heart,
                  },
                  {
                    id: 'solo',
                    title: 'Solo Adventurer',
                    desc: '100% private guided photographic focus with dedicated native tracker.',
                    icon: Award,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTravelerType(item.id as TravelerType)}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      travelerType === item.id
                        ? 'border-[#0D9488] bg-[#F0FDF4]/70 shadow-md ring-2 ring-[#0D9488]/30'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                    }`}
                  >
                    <div>
                      <item.icon
                        className={`w-6 h-6 mb-3 ${
                          travelerType === item.id ? 'text-[#0D9488]' : 'text-[#64748B]'
                        }`}
                      />
                      <h4 className="text-sm font-bold text-[#0F172A] mb-1">{item.title}</h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                    </div>
                    {travelerType === item.id && (
                      <span className="mt-3 text-[11px] font-bold text-[#0D9488] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Guest Count Slider */}
              <div className="bg-[#F8FAFC] p-4 sm:p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                    Number of Travelers in your party
                  </label>
                  <span className="px-3 py-1 rounded-lg bg-[#0D9488] text-white font-bold text-sm">
                    {guestCount} {guestCount === 1 ? 'Guest (Solo)' : 'Guests'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                  className="w-full accent-[#0D9488] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>1 Guest</span>
                  <span>4 (1x 4x4)</span>
                  <span>8 (2x Fleet)</span>
                  <span>12 (Convoy)</span>
                </div>
              </div>

              {/* Real-Time Live Matching Estimate (Mobile & Desktop) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F0FDF4] to-[#ECFDF5] border border-[#A7F3D0] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#047857]">
                        Live Matching Price Preview
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D9488]/15 text-[#0D9488]">
                        {exactDays} Days &bull; {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      Baseline Route: <span className="font-semibold text-[#0F172A]">{currentEstimate.baseCircuitTitle}</span>
                    </p>
                  </div>

                  <div className="flex items-baseline sm:flex-col sm:items-end justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1FAE5]">
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-display font-bold text-[#047857]">
                        {formatPrice(currentEstimate.perPersonEUR)}
                        <span className="text-xs font-normal text-[#64748B]"> / guest</span>
                      </div>
                      <div className="text-[11px] text-[#059669] font-medium">
                        Total: {formatPrice(currentEstimate.totalEUR)} for group ({currentCurrency.code})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0D9488]/20 transition-all cursor-pointer"
                >
                  <span>Continue to Priorities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LANDSCAPES & ACTIVITIES */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h3 className="text-xl font-display font-medium text-[#0F172A]">
                  Step 2: What landscapes are on your bucket list?
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Choose your primary thematic focus across Madagascar’s contrasting bioregions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: 'baobab',
                    title: 'West: Giant Baobabs & Grand Tsingy',
                    desc: 'Avenue of the Baobabs sunset, Tsiribihina river cruise, and razor-sharp UNESCO limestone spires.',
                    badge: 'Iconic Wonder',
                  },
                  {
                    id: 'canyons',
                    title: 'South: RN7 Odyssey & Isalo Canyons',
                    desc: 'Jurassic sandstone plateaus, natural desert oases, sapphire towns, and coastal Ifaty fishermen.',
                    badge: 'Dramatic Vistas',
                  },
                  {
                    id: 'beaches',
                    title: 'East: Sainte-Marie & Pangalanes',
                    desc: 'Tropical humpback whale calving sanctuaries, pirate coves, and lush Canal des Pangalanes canals.',
                    badge: 'Marine & Island',
                  },
                  {
                    id: 'wildlife',
                    title: 'Rainforest & Endemic Lemurs',
                    desc: 'Andasibe-Mantadia Indri calls, Ranomafana cloud forests, golden bamboo lemurs, and chameleon night walks.',
                    badge: 'Biodiversity Hotspot',
                  },
                  {
                    id: 'river',
                    title: 'Tsiribihina River Safari & Camping',
                    desc: 'Serene motorized chaland barge cruise, sandbank campfires, swimming under hidden waterfalls.',
                    badge: 'Expedition Cruise',
                  },
                  {
                    id: 'mixed',
                    title: 'The Grand Island Comprehensive',
                    desc: 'Combines the best of West karst, Central Highlands artisans in Antsirabe, and South desert canyons.',
                    badge: 'Ultimate Voyage',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTripStyle(item.id as TripStyle)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      tripStyle === item.id
                        ? 'border-[#0D9488] bg-[#F0FDF4]/70 shadow-md ring-2 ring-[#0D9488]/30'
                        : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1]">
                          {item.badge}
                        </span>
                        {tripStyle === item.id && (
                          <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-[#0F172A] mb-1">{item.title}</h4>
                      <p className="text-xs text-[#64748B] leading-relaxed">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Real-Time Live Matching Estimate (Mobile & Desktop) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F0FDF4] to-[#ECFDF5] border border-[#A7F3D0] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#047857]">
                        Live Matching Price Preview
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D9488]/15 text-[#0D9488]">
                        {exactDays} Days &bull; {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      Matching Circuit: <span className="font-semibold text-[#0F172A]">{currentEstimate.baseCircuitTitle}</span>
                    </p>
                  </div>

                  <div className="flex items-baseline sm:flex-col sm:items-end justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1FAE5]">
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-display font-bold text-[#047857]">
                        {formatPrice(currentEstimate.perPersonEUR)}
                        <span className="text-xs font-normal text-[#64748B]"> / guest</span>
                      </div>
                      <div className="text-[11px] text-[#059669] font-medium">
                        Total: {formatPrice(currentEstimate.totalEUR)} for group ({currentCurrency.code})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] text-xs font-bold text-center cursor-pointer transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0D9488]/20 transition-all cursor-pointer"
                >
                  <span>Set Duration & Pace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DURATION, PACE & TARGET MONTH */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h3 className="text-xl font-display font-medium text-[#0F172A]">
                  Step 3: Duration, Dates & Preferred Travel Pace
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Adjust your approximate days and travel intensity for the optimal balance of discovery and relaxation.
                </p>
              </div>

              {/* Duration Category Pills */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] block">
                  Trip Duration Bracket
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: '7-9', label: '7 to 9 Days', sub: 'Express Highlights' },
                    { id: '10-14', label: '10 to 14 Days', sub: 'Signature In-Depth' },
                    { id: '15+', label: '15+ Days', sub: 'Grand Comprehensive' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleDurationCategoryChange(cat.id as TripDurationOption)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        durationOption === cat.id
                          ? 'border-[#0D9488] bg-[#F0FDF4] ring-2 ring-[#0D9488]/30 font-bold'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <div className="text-sm text-[#0F172A]">{cat.label}</div>
                      <div className="text-xs text-[#64748B]">{cat.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Exact Days Fine-Tuner */}
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#475569]">
                    Exact Target Duration
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-[#0284C7] text-white font-bold text-sm">
                    {exactDays} Days Expedition ({exactDays - 1} Nights)
                  </span>
                </div>
                <input
                  type="range"
                  min={7}
                  max={21}
                  value={exactDays}
                  onChange={(e) => setExactDays(parseInt(e.target.value, 10))}
                  className="w-full accent-[#0284C7] cursor-pointer"
                />
                <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                  <span>7 Days</span>
                  <span>14 Days</span>
                  <span>21 Days (Full Traverse)</span>
                </div>
              </div>

              {/* Month and Pace Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>Target Month of Travel</span>
                  </label>
                  <select
                    value={targetMonth}
                    onChange={(e) => setTargetMonth(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-semibold text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 cursor-pointer"
                  >
                    {[
                      'April (Emerald Season)',
                      'May (Pleasant & Clear)',
                      'June (Cool & Sunny)',
                      'July (Whales & Lemurs)',
                      'August (Peak Safari Season)',
                      'September (Warm & Active Wildlife)',
                      'October (Baby Lemurs & Orchids)',
                      'November (Baobab Flowers)',
                      'December (Holiday Departures)',
                    ].map((m) => (
                      <option key={m} value={m.split(' ')[0]}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>Expedition Pace</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'relaxed', label: 'Relaxed', sub: '2 nights/stop' },
                      { id: 'balanced', label: 'Balanced', sub: 'Optimal mix' },
                      { id: 'fast', label: 'Expedition', sub: 'Max terrain' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPace(p.id as TravelPace)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          pace === p.id
                            ? 'border-[#0D9488] bg-[#F0FDF4] font-bold text-[#0D9488]'
                            : 'border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A]'
                        }`}
                      >
                        <div className="text-xs">{p.label}</div>
                        <div className="text-[10px] text-[#94A3B8]">{p.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-Time Live Matching Estimate (Mobile & Desktop) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F0FDF4] to-[#ECFDF5] border border-[#A7F3D0] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#047857]">
                        Live Matching Price Preview
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D9488]/15 text-[#0D9488]">
                        {exactDays} Days &bull; {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} &bull; {targetMonth}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      Baseline Circuit: <span className="font-semibold text-[#0F172A]">{currentEstimate.baseCircuitTitle}</span>
                    </p>
                  </div>

                  <div className="flex items-baseline sm:flex-col sm:items-end justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1FAE5]">
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-display font-bold text-[#047857]">
                        {formatPrice(currentEstimate.perPersonEUR)}
                        <span className="text-xs font-normal text-[#64748B]"> / guest</span>
                      </div>
                      <div className="text-[11px] text-[#059669] font-medium">
                        Total: {formatPrice(currentEstimate.totalEUR)} for group ({currentCurrency.code})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] text-xs font-bold text-center cursor-pointer transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0D9488]/20 transition-all cursor-pointer"
                >
                  <span>Fleet & Lodging Standards</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FLEET & LODGING STANDARDS */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-[#F1F5F9] pb-4">
                <h3 className="text-xl font-display font-medium text-[#0F172A]">
                  Step 4: Vehicle Fleet & Accommodation Standard
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Choose your comfort tier across certified boutique lodges and private overland safari vehicles.
                </p>
              </div>

              {/* Vehicle Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Private Transport Preference</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'land-cruiser-v8',
                      name: 'Toyota Land Cruiser Prado / V8',
                      desc: 'Heavy-duty 4WD with AC, high clearance for Tsingy tracks & unlimited mileage.',
                      badge: 'Most Popular',
                    },
                    {
                      id: 'executive-minibus',
                      name: 'Executive 4WD Minibus',
                      desc: 'Ideal for groups of 5+ guests, panoramic oversized windows and ample luggage boot.',
                      badge: 'Groups & Families',
                    },
                    {
                      id: 'river-chaland-combo',
                      name: 'River Chaland Barge + 4x4',
                      desc: 'Includes private motorized river cruiser with chef and tented safari sandbank bivouac.',
                      badge: 'River Safari',
                    },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setTransport(v.id as TransportPreference)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        transport === v.id
                          ? 'border-[#0D9488] bg-[#F0FDF4] ring-2 ring-[#0D9488]/30 shadow-sm'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] mb-2 inline-block">
                        {v.badge}
                      </span>
                      <h4 className="text-xs font-bold text-[#0F172A] mb-1">{v.name}</h4>
                      <p className="text-[11px] text-[#64748B] leading-relaxed">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lodging Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Lodging Standard</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'luxury-eco',
                      name: 'Luxury Eco-Lodge Tier',
                      desc: 'Handcrafted boutique eco-lodges immersed in nature with private verandas and ensuite amenities.',
                      priceNote: 'Included in Base',
                    },
                    {
                      id: 'vip-sanctuary',
                      name: 'VIP Private Sanctuaries & Villas',
                      desc: 'Premier suites, heated plunge pools (where available), and exclusive waterfront retreats.',
                      priceNote: '+ Approx €450 / pers',
                    },
                    {
                      id: 'boutique-comfort',
                      name: 'Authentic Comfort & Charme',
                      desc: 'Warm family-run guesthouses, clean traditional bungalows, and authentic Malagasy hospitality.',
                      priceNote: 'Savings €180 / pers',
                    },
                  ].map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setAccommodation(l.id as AccommodationPreference)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        accommodation === l.id
                          ? 'border-[#0D9488] bg-[#F0FDF4] ring-2 ring-[#0D9488]/30 shadow-sm'
                          : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <span className="text-[10px] font-bold text-[#D97706] block mb-1">
                        {l.priceNote}
                      </span>
                      <h4 className="text-xs font-bold text-[#0F172A] mb-1">{l.name}</h4>
                      <p className="text-[11px] text-[#64748B] leading-relaxed">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Lead Traveler Name & Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">
                    Your Name (Optional for proposal personalization)
                  </label>
                  <input
                    type="text"
                    value={leadTravelerName}
                    onChange={(e) => setLeadTravelerName(e.target.value)}
                    placeholder="e.g. Sarah & David Miller"
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#475569] block mb-1">
                    Special Requests or Wildlife Dreams
                  </label>
                  <input
                    type="text"
                    value={specialInterests}
                    onChange={(e) => setSpecialInterests(e.target.value)}
                    placeholder="e.g. Fossa spotting, photography hides, anniversary dinner"
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#CBD5E1] text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40"
                  />
                </div>
              </div>

              {/* Real-Time Live Matching Estimate (Mobile & Desktop) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F0FDF4] to-[#ECFDF5] border border-[#A7F3D0] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] uppercase font-bold tracking-wider text-[#047857]">
                        Live Matching Price Preview
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0D9488]/15 text-[#0D9488]">
                        {exactDays} Days &bull; {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} &bull; {transport === 'land-cruiser-v8' ? 'Land Cruiser' : transport}
                      </span>
                    </div>
                    <p className="text-xs text-[#475569]">
                      Baseline Circuit: <span className="font-semibold text-[#0F172A]">{currentEstimate.baseCircuitTitle}</span>
                    </p>
                  </div>

                  <div className="flex items-baseline sm:flex-col sm:items-end justify-between sm:justify-center pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D1FAE5]">
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-display font-bold text-[#047857]">
                        {formatPrice(currentEstimate.perPersonEUR)}
                        <span className="text-xs font-normal text-[#64748B]"> / guest</span>
                      </div>
                      <div className="text-[11px] text-[#059669] font-medium">
                        Total: {formatPrice(currentEstimate.totalEUR)} for group ({currentCurrency.code})
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Plan Button */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] text-xs font-bold text-center cursor-pointer transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={generatePlan}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#0D9488]/25 transition-all transform active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Your Route...</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4 text-white" />
                      <span>Generate Custom Itinerary Proposal</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: GENERATED ITINERARY PROPOSAL & LIVE BREAKDOWN */}
          {currentStep === 5 && generatedPlan && (
            <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-400">
              {/* Proposal Header Banner */}
              <div className="bg-gradient-to-r from-[#0F2419] to-[#0D9488] text-white p-5 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Custom Proposal &bull; Ref: {generatedPlan.id}</span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-medium leading-tight">
                    {generatedPlan.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed font-light">
                    Prepared for <strong>{leadTravelerName || 'Private Expedition'}</strong> &bull;{' '}
                    {generatedPlan.guestCount} {generatedPlan.guestCount === 1 ? 'Guest' : 'Guests'} &bull;{' '}
                    Target: {generatedPlan.targetMonth} &bull; Pace: {generatedPlan.pace}
                  </p>
                </div>

                {/* Price Display Card */}
                <div className="bg-white text-[#0F172A] p-4 sm:p-5 rounded-2xl shadow-lg shrink-0 w-full md:w-auto text-left md:text-right border border-emerald-100">
                  <span className="text-[10px] uppercase font-bold text-[#64748B] block tracking-wider">
                    Estimated Total for {generatedPlan.guestCount} {generatedPlan.guestCount === 1 ? 'Traveler' : 'Travelers'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#0D9488]">
                    {formatPrice(generatedPlan.totalEstimatedPriceEUR)}
                  </div>
                  <span className="text-xs font-semibold text-[#059669] block mt-0.5">
                    ({formatPrice(generatedPlan.estimatedPriceEURPerPerson)} per person &bull; {currentCurrency.code})
                  </span>
                </div>
              </div>

              {/* Action Toolbar: WhatsApp Booking + Print PDF + Adjust */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488] shrink-0" />
                  <span>Direct Antsirabe HQ pricing &bull; 100% private 4x4 & local guides</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handleWhatsAppBooking}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Confirm & Book on WhatsApp</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print PDF</span>
                    </button>

                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-[#CBD5E1] bg-white text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Edit Specs</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Day-by-Day Interactive Timeline Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-display font-medium text-[#0F172A]">
                    Day-by-Day Customized Route Overview
                  </h4>
                  <span className="text-xs font-bold text-[#0D9488]">
                    {generatedPlan.days.length} Days / {generatedPlan.days.length - 1} Nights
                  </span>
                </div>

                <div className="space-y-3">
                  {generatedPlan.days.map((day) => (
                    <div
                      key={day.day}
                      className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#CBD5E1] transition-all flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                      {/* Day Number Pill */}
                      <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 text-[#0D9488] font-bold text-sm flex flex-col items-center justify-center shrink-0 border border-[#0D9488]/20">
                        <span className="text-[10px] uppercase font-semibold text-[#64748B]">Day</span>
                        <span>{day.day}</span>
                      </div>

                      {/* Day Details */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h5 className="text-sm font-bold text-[#0F172A]">{day.title}</h5>
                          <span className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-[10px] font-semibold text-[#475569] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#0D9488]" />
                            {day.location}
                          </span>
                        </div>

                        <p className="text-xs text-[#64748B] leading-relaxed">{day.description}</p>

                        <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#475569]">
                          <span>
                            <strong className="text-[#0F172A]">Lodging:</strong> {day.accommodation}
                          </span>
                          <span>&bull;</span>
                          <span>
                            <strong className="text-[#0F172A]">Meals:</strong> {day.meals}
                          </span>
                          {day.distanceKm ? (
                            <>
                              <span>&bull;</span>
                              <span>
                                <strong className="text-[#0F172A]">Transit:</strong> ~{day.distanceKm} km ({day.driveTimeHours}h)
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Guarantees Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#166534] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                    <span>Included in This Private Proposal</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-[#14532D]">
                    {generatedPlan.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#16a34a] font-bold">&check;</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#92400E] flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D97706]" />
                    <span>Complimentary Bespoke Touches</span>
                  </h5>
                  <ul className="space-y-2 text-xs text-[#78350F]">
                    {generatedPlan.bespokeTouches.map((touch, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#D97706] font-bold">&starf;</span>
                        <span>{touch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
