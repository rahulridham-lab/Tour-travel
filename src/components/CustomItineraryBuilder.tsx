import React, { useState, useMemo } from 'react';
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
  DollarSign
} from 'lucide-react';
import { circuitsData, Circuit, CircuitDay } from '../data/circuits';
import { siteConfig, CurrencyConfig } from '../data/siteConfig';

// Types
export type TravelerType = 'family' | 'friends' | 'honeymoon' | 'solo';
export type TripStyle = 'wildlife' | 'canyons' | 'baobab' | 'river' | 'beaches' | 'mixed';
export type TripDurationOption = '7-9' | '10-14' | '15+';
export type TravelPace = 'relaxed' | 'balanced' | 'fast';
export type AccommodationPreference = 'luxury-eco' | 'boutique-comfort' | 'vip-sanctuary';
export type TransportPreference = 'land-cruiser-v8' | 'executive-minibus' | 'river-chaland-combo';

interface CustomItineraryBuilderProps {
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

export const CustomItineraryBuilder: React.FC<CustomItineraryBuilderProps> = ({
  currentCurrency,
  initialStep = 1,
}) => {
  // Wizard Step State (1 to 4, then 5 = Generated Result)
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  // Form selections
  const [travelerType, setTravelerType] = useState<TravelerType>('honeymoon');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [tripStyle, setTripStyle] = useState<TripStyle>('baobab');
  const [durationOption, setDurationOption] = useState<TripDurationOption>('10-14');
  const [exactDays, setExactDays] = useState<number>(11);
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [accommodation, setAccommodation] = useState<AccommodationPreference>('luxury-eco');
  const [transport, setTransport] = useState<TransportPreference>('land-cruiser-v8');
  const [targetMonth, setTargetMonth] = useState<string>('August');
  const [leadTravelerName, setLeadTravelerName] = useState<string>('');
  const [specialInterests, setSpecialInterests] = useState<string>('');

  // Generated Plan & PDF Preview Modal
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedCustomPlan | null>(null);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Sync exact days slider based on duration category selection
  const handleDurationCategoryChange = (opt: TripDurationOption) => {
    setDurationOption(opt);
    if (opt === '7-9') setExactDays(8);
    else if (opt === '10-14') setExactDays(11);
    else setExactDays(15);
  };

  // Currency Converter
  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateToEUR);
    if (currentCurrency.code === 'MGA') {
      return `${converted.toLocaleString()} ${currentCurrency.symbol}`;
    }
    return `${currentCurrency.symbol}${converted.toLocaleString()}`;
  };

  // Logic to synthesize custom day-by-day plan from circuits data
  const generatePlan = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // 1. Pick reference circuit based on style
      let baseCircuit: Circuit;
      if (tripStyle === 'baobab' || tripStyle === 'river') {
        baseCircuit = circuitsData.find((c) => c.id === 'west-grand-tsingy-10d') || circuitsData[0];
      } else if (tripStyle === 'canyons') {
        baseCircuit = circuitsData.find((c) => c.id === 'south-grand-odyssey-13d') || circuitsData[2];
      } else if (tripStyle === 'beaches') {
        baseCircuit = circuitsData.find((c) => c.id === 'east-wildlife-sainte-marie-11d') || circuitsData[4];
      } else if (tripStyle === 'wildlife') {
        baseCircuit = circuitsData.find((c) => c.id === 'south-rainforest-canyon-8d') || circuitsData[3];
      } else {
        baseCircuit = circuitsData.find((c) => c.id === 'mixed-ultimate-sanctuary-14d') || circuitsData[5];
      }

      // 2. Synthesize Days array tailored to exactDays
      let daysList: CircuitDay[] = [];
      const baseDays = baseCircuit.days;

      if (exactDays <= baseDays.length) {
        daysList = baseDays.slice(0, exactDays);
      } else {
        // Expand with curated highlight extensions
        daysList = [...baseDays];
        const extraNeeded = exactDays - baseDays.length;
        for (let i = 1; i <= extraNeeded; i++) {
          daysList.push({
            day: baseDays.length + i,
            title: `Bespoke Sanctuary Immersion & Wildlife Discovery Day ${i}`,
            location: tripStyle === 'beaches' ? 'Île Sainte-Marie Marine Reserve' : 'Private Eco-Reserve Highlands',
            description: `Exclusive customized day tailored for ${travelerType}. Enjoy private boat charters, twilight chameleon search walks, or serene champagne relaxation in secluded nature.`,
            activities: [
              'Private naturalist-guided forest excursion',
              'Sunset panoramic cocktail over the canopy',
              'Gastronomic dinner prepared with local vanilla and seafood',
            ],
            accommodation: accommodation === 'vip-sanctuary' ? 'Overwater Luxury Villa Suite' : 'Premium Forest Eco-Lodge',
            meals: 'Breakfast, Gourmet Picnic Lunch, Three-Course Dinner',
            distanceKm: 25,
            driveTimeHours: 1,
          });
        }
      }

      // 3. Dynamic pricing formula
      // Base daily rate + accommodation factor + vehicle factor + group factor + pace factor
      const basePerDayEUR = 215;
      const paceFactor = pace === 'fast' ? 1.08 : pace === 'relaxed' ? 0.96 : 1.0;
      const accomFactor = accommodation === 'vip-sanctuary' ? 1.38 : accommodation === 'luxury-eco' ? 1.0 : 0.88;
      const vehicleFactor = transport === 'executive-minibus' ? 1.15 : transport === 'river-chaland-combo' ? 1.22 : 1.0;
      const groupFactor = guestCount === 1 ? 1.55 : guestCount === 2 ? 1.0 : guestCount <= 4 ? 0.82 : 0.72;

      const perPersonCalculated = Math.round(
        basePerDayEUR * exactDays * accomFactor * vehicleFactor * groupFactor * paceFactor
      );
      const totalCalculated = perPersonCalculated * guestCount;

      // 4. Bespoke Touches based on traveler type
      const bespokeTouches: string[] = [];
      if (travelerType === 'honeymoon') {
        bespokeTouches.push('Private sunset champagne toast beneath 800-year-old Baobabs');
        bespokeTouches.push('Complimentary tropical couple massage & candlelit beach dinner');
        bespokeTouches.push('Handcrafted Malagasy wild vanilla & artisanal spice gift hamper');
      } else if (travelerType === 'family') {
        bespokeTouches.push('Junior Ranger wildlife discovery booklets & field binoculars for children');
        bespokeTouches.push('Flexible daily departure times & child-friendly lodge menus');
        bespokeTouches.push('Safety-verified private 4x4 booster seating & dedicated family guide');
      } else if (travelerType === 'friends') {
        bespokeTouches.push('Private campfire acoustic guitar evenings along Tsiribihina sandbars');
        bespokeTouches.push('Action photography assistance and drone flight authorization support');
        bespokeTouches.push('Custom craft beer and local Madagascar rum tasting session');
      } else {
        bespokeTouches.push('Exclusive 1-on-1 photography pacing with certified senior naturalist guide');
        bespokeTouches.push('Flexible spontaneous stops for macro wildlife filming');
        bespokeTouches.push('Direct 24/7 Garmin inReach satellite emergency tracking');
      }

      const plan: GeneratedCustomPlan = {
        id: `bespoke-${Date.now()}`,
        title: `${exactDays}-Day Bespoke ${tripStyle.toUpperCase()} Expedition`,
        subtitle: `Customized for ${travelerType.toUpperCase()} (${guestCount} Guest${guestCount > 1 ? 's' : ''}) &bull; ${pace.toUpperCase()} Pace`,
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
        estimatedPriceEURPerPerson: perPersonCalculated,
        totalEstimatedPriceEUR: totalCalculated,
        days: daysList,
        highlights: [
          ...baseCircuit.highlights.slice(0, 3),
          `Customized ${exactDays}-day private itinerary engineered exclusively for your ${travelerType} party`,
          `Dedicated private chauffeur & certified senior naturalist from Antsirabe HQ`,
        ],
        inclusions: [
          `Private air-conditioned ${transport === 'executive-minibus' ? 'Executive Safari Minibus' : 'Toyota Land Cruiser Prado/V8 4x4'} with unlimited fuel`,
          `All nights handpicked ${accommodation === 'vip-sanctuary' ? 'VIP 5-Star Sanctuaries' : accommodation === 'luxury-eco' ? 'Luxury Eco-Lodges & Suites' : 'Boutique Comfort Lodges'} with en-suite baths`,
          `Daily gourmet breakfast & safari picnic or river chef banquets as stated`,
          `All national park admission permits, local forest trackers, and community concessions`,
          `Private airport meet-and-greet in Antananarivo and 24/7 HQ radio dispatch`,
        ],
        exclusions: [
          'International transatlantic flights & domestic flights',
          'Personal travel, medical, and emergency evacuation insurance',
          'Alcoholic drinks beyond complimentary toasts & personal tips for local trackers',
        ],
        bespokeTouches,
      };

      setGeneratedPlan(plan);
      setIsGenerating(false);
      setCurrentStep(5); // Show results view

      // Trigger Confetti!
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B89758', '#1E3B2B', '#F7F5F0', '#D4BA82'],
      });
    }, 600);
  };

  // WhatsApp Dispatch Generator
  const generateWhatsAppMessage = () => {
    if (!generatedPlan) return '';
    const lines = [
      `*MADAGASCAR ERNEST TRAVEL TOURS — AI BESPOKE EXPEDITION REQUEST*`,
      `----------------------------------------------------`,
      `*Custom Plan:* ${generatedPlan.title}`,
      `*Party Composition:* ${guestCount} Guest(s) (${travelerType.toUpperCase()})`,
      `*Trip Style:* ${tripStyle.toUpperCase()}`,
      `*Target Duration:* ${generatedPlan.durationDays} Days (${pace.toUpperCase()} Pace)`,
      `*Travel Period:* ${targetMonth} 2026/2027`,
      `*Vehicle Preference:* ${transport === 'executive-minibus' ? 'Executive Safari Minibus' : 'Toyota Land Cruiser Prado/V8 4x4'}`,
      `*Lodging Level:* ${accommodation === 'vip-sanctuary' ? 'VIP Sanctuary & Villas' : accommodation === 'luxury-eco' ? 'Luxury Eco-Lodges' : 'Boutique Comfort'}`,
      `*Estimated Cost:* ${formatPrice(generatedPlan.totalEstimatedPriceEUR)} (${formatPrice(generatedPlan.estimatedPriceEURPerPerson)} / guest)`,
      leadTravelerName ? `*Lead Traveler:* ${leadTravelerName}` : null,
      specialInterests ? `*Special Notes:* ${specialInterests}` : null,
      `----------------------------------------------------`,
      `Hello Ernest! Please review my generated custom itinerary and confirm guide availability for ${targetMonth}.`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const handleBookViaWhatsApp = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
    });
    const message = generateWhatsAppMessage();
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePrintProposal = () => {
    window.print();
  };

  return (
    <section
      id="custom-planner"
      className="py-16 sm:py-24 bg-[#F7F5F0] text-[#1A1A1A] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3B2B]/10 border border-[#B89758]/30 text-xs font-semibold text-[#1E3B2B] uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5 text-[#B89758]" />
            Bespoke Private Safari Architect
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#1A1A1A] mb-4">
            Design Your Custom Madagascar Expedition
          </h2>
          <p className="text-sm sm:text-base text-[#5A655F] max-w-2xl mx-auto font-light leading-relaxed">
            Answer four intuitive questions to dynamically formulate a private route,
            lodge roster, and transparent cost estimate tailored to your travel aspirations.
          </p>
        </div>

        {/* Wizard Steps Navigation Bar */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { num: 1, label: '1. Traveler Type', icon: Users },
              { num: 2, label: '2. Trip Style', icon: Compass },
              { num: 3, label: '3. Duration & Pace', icon: Clock },
              { num: 4, label: '4. Fleet & Lodging', icon: Car },
            ].map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => setCurrentStep(step.num)}
                  className={`py-3 px-2 rounded-2xl border transition-all flex flex-col items-center gap-1 sm:gap-1.5 ${
                    isActive
                      ? 'bg-[#1E3B2B] text-[#F7F5F0] border-[#1E3B2B] shadow-md'
                      : isDone
                      ? 'bg-[#FFFFFF] text-[#1E3B2B] border-[#B89758]/40 hover:border-[#1E3B2B]'
                      : 'bg-[#FAF8F5] text-[#5A655F]/60 border-black/5 hover:border-black/15'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4BA82]' : isDone ? 'text-[#B89758]' : ''}`} />
                  <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          {/* STEP 1: Traveler Type */}
          {currentStep === 1 && (
            <div className="light-luxury-card p-6 sm:p-10 rounded-3xl space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-black/5 pb-4">
                <span className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Step 1 of 4</span>
                <h3 className="text-2xl font-display font-medium text-[#1A1A1A]">Who is traveling with you?</h3>
                <p className="text-xs text-[#5A655F] mt-1">
                  We customize the balance of adventure, comfort, and pacing to match your party.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    type: 'family',
                    title: 'Family with Children',
                    desc: 'Kid-friendly eco-lodges, engaging lemur interactions, shorter driving legs, and safety-verified 4x4s.',
                    icon: Users,
                    defaultGuests: 4,
                  },
                  {
                    type: 'honeymoon',
                    title: 'Honeymoon Couple',
                    desc: 'Secluded luxury villas, private sunset toasts at Avenue of Baobabs, private boat transfers, and couple spa touches.',
                    icon: Heart,
                    defaultGuests: 2,
                  },
                  {
                    type: 'friends',
                    title: 'Group of Friends',
                    desc: 'High-adrenaline Tsingy canyon scrambles, Tsiribihina river campfires, group 4x4 convoys, and beach sundowners.',
                    icon: Compass,
                    defaultGuests: 4,
                  },
                  {
                    type: 'solo',
                    title: 'Solo Adventurer',
                    desc: 'Dedicated private chauffeur-naturalist, deep wildlife tracking, flexible sunrise photography, and maximum immersion.',
                    icon: Award,
                    defaultGuests: 1,
                  },
                ].map((item) => {
                  const isSelected = travelerType === item.type;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.type}
                      onClick={() => {
                        setTravelerType(item.type as TravelerType);
                        setGuestCount(item.defaultGuests);
                      }}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#B89758] bg-[#FAF8F5] shadow-md'
                          : 'border-black/10 bg-[#FFFFFF] hover:border-[#B89758]/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#1E3B2B] text-[#D4BA82]' : 'bg-[#FAF8F5] text-[#1E3B2B]'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-[#1A1A1A]">{item.title}</h4>
                          <p className="text-xs text-[#5A655F] mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Guests Count Selector */}
              <div className="pt-4 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                    Number of Travelers in Private Party
                  </label>
                  <span className="text-xs text-[#5A655F]">
                    Vehicles and private guides are exclusively chartered for your party.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-black/10 text-base font-bold hover:bg-[#1E3B2B] hover:text-[#F7F5F0] transition-colors"
                  >
                    -
                  </button>
                  <span className="text-base font-bold text-[#1E3B2B] w-8 text-center">
                    {guestCount}
                  </span>
                  <button
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-black/10 text-base font-bold hover:bg-[#1E3B2B] hover:text-[#F7F5F0] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-[#1E3B2B] text-[#F7F5F0] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#2A4E39] shadow-lg transition-all"
                >
                  <span>Continue to Trip Style</span>
                  <ArrowRight className="w-4 h-4 text-[#D4BA82]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Trip Style */}
          {currentStep === 2 && (
            <div className="light-luxury-card p-6 sm:p-10 rounded-3xl space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-black/5 pb-4">
                <span className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Step 2 of 4</span>
                <h3 className="text-2xl font-display font-medium text-[#1A1A1A]">What is your primary safari focus?</h3>
                <p className="text-xs text-[#5A655F] mt-1">
                  Madagascar is a micro-continent. Select your dream landscapes and wildlife highlights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'baobab',
                    title: 'Baobabs & Tsingy Karst',
                    desc: 'Avenue of the Baobabs, UNESCO Tsingy de Bemaraha suspension bridges, and Kirindy dry forest.',
                    tag: 'Iconic West',
                  },
                  {
                    id: 'wildlife',
                    title: 'Wildlife & Rainforest',
                    desc: 'Ranomafana, Andasibe-Mantadia, singing Indri Indri, golden bamboo lemurs, and chameleon night walks.',
                    tag: 'Biodiversity Peak',
                  },
                  {
                    id: 'canyons',
                    title: 'Canyons & Trekking',
                    desc: 'Isalo National Park Jurassic massifs, natural oasis pools, sapphire trading posts, and RN7 overland.',
                    tag: 'Grand South',
                  },
                  {
                    id: 'river',
                    title: 'River Expedition & Cruise',
                    desc: 'Multi-day motorized river chaland cruise on the Tsiribihina, gorge waterfalls, and private sandbar banquets.',
                    tag: 'Slow Adventure',
                  },
                  {
                    id: 'beaches',
                    title: 'Tropical Island Sanctuary',
                    desc: 'Île Sainte-Marie, pirate coves, humpback whale watching (July-Oct), and secluded coral sand beaches.',
                    tag: 'Untamed Coast',
                  },
                  {
                    id: 'mixed',
                    title: 'The Grand Circuit (Mixed)',
                    desc: 'Comprehensive multi-region traverse blending highlands, dry baobab forests, canyons, and azure seas.',
                    tag: 'All-Encompassing',
                  },
                ].map((item) => {
                  const isSelected = tripStyle === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setTripStyle(item.id as TripStyle)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#B89758] bg-[#FAF8F5] shadow-md'
                          : 'border-black/10 bg-[#FFFFFF] hover:border-[#B89758]/40'
                      }`}
                    >
                      <div>
                        <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1E3B2B]/10 text-[#1E3B2B] mb-2">
                          {item.tag}
                        </span>
                        <h4 className="text-base font-bold text-[#1A1A1A] mb-1">{item.title}</h4>
                        <p className="text-xs text-[#5A655F] leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#B89758] bg-[#B89758] text-white' : 'border-black/20'}`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-black/5">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-black/15 text-xs font-semibold text-[#5A655F] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 rounded-xl bg-[#1E3B2B] text-[#F7F5F0] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#2A4E39] shadow-lg transition-all"
                >
                  <span>Continue to Duration & Pace</span>
                  <ArrowRight className="w-4 h-4 text-[#D4BA82]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Duration & Pace */}
          {currentStep === 3 && (
            <div className="light-luxury-card p-6 sm:p-10 rounded-3xl space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-black/5 pb-4">
                <span className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Step 3 of 4</span>
                <h3 className="text-2xl font-display font-medium text-[#1A1A1A]">Duration & Preferred Pace</h3>
                <p className="text-xs text-[#5A655F] mt-1">
                  Travel in Madagascar is an authentic journey across varied terrains. Let us calibrate the rhythm.
                </p>
              </div>

              {/* Duration Options */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-3">
                  1. Trip Duration Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: '7-9', title: '7 – 9 Days', desc: 'Ideal for concentrated discovery of one marquee region (West or South highlights).' },
                    { id: '10-14', title: '10 – 14 Days', desc: 'Our most popular sweet spot. Allows two major regions without rushed transits.' },
                    { id: '15+', title: '15+ Days Expedition', desc: 'The definitive Grand Madagascar traverse. High biodiversity immersion & secluded islands.' },
                  ].map((dur) => {
                    const isSelected = durationOption === dur.id;
                    return (
                      <div
                        key={dur.id}
                        onClick={() => handleDurationCategoryChange(dur.id as TripDurationOption)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#B89758] bg-[#FAF8F5] shadow-md'
                            : 'border-black/10 bg-[#FFFFFF] hover:border-[#B89758]/40'
                        }`}
                      >
                        <h4 className="text-base font-bold text-[#1A1A1A] mb-1">{dur.title}</h4>
                        <p className="text-xs text-[#5A655F] leading-relaxed">{dur.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exact Days Slider */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-black/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#1E3B2B]">
                    Precise Days Target
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1E3B2B] text-[#D4BA82] text-xs font-bold">
                    {exactDays} Days / {exactDays - 1} Nights
                  </span>
                </div>
                <input
                  type="range"
                  min={durationOption === '7-9' ? 7 : durationOption === '10-14' ? 10 : 15}
                  max={durationOption === '7-9' ? 9 : durationOption === '10-14' ? 14 : 21}
                  value={exactDays}
                  onChange={(e) => setExactDays(parseInt(e.target.value))}
                  className="w-full accent-[#B89758] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#5A655F] mt-1">
                  <span>Minimum {durationOption === '7-9' ? 7 : durationOption === '10-14' ? 10 : 15} Days</span>
                  <span>Maximum {durationOption === '7-9' ? 9 : durationOption === '10-14' ? 14 : 21} Days</span>
                </div>
              </div>

              {/* Travel Pace */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-3">
                  2. Travel Pace & Rhythm
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'relaxed',
                      title: 'Relaxed & Unhurried',
                      desc: 'Multiple consecutive nights at marquee lodges, leisure mornings, sunset cocktails, and gentle nature walks.',
                    },
                    {
                      id: 'balanced',
                      title: 'Balanced Classic',
                      desc: 'Optimal combination of overland discovery, daily highlights, national park trails, and comfortable rests.',
                    },
                    {
                      id: 'fast',
                      title: 'Fast-Paced Explorer',
                      desc: 'Early morning game tracks, maximizing geographical ground, deep off-road traverses, and photography missions.',
                    },
                  ].map((p) => {
                    const isSelected = pace === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setPace(p.id as TravelPace)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#B89758] bg-[#FAF8F5] shadow-md'
                            : 'border-black/10 bg-[#FFFFFF] hover:border-[#B89758]/40'
                        }`}
                      >
                        <h4 className="text-base font-bold text-[#1A1A1A] mb-1">{p.title}</h4>
                        <p className="text-xs text-[#5A655F] leading-relaxed">{p.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Target Month */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-2">
                  3. Preferred Travel Month (Madagascar Seasons)
                </label>
                <select
                  value={targetMonth}
                  onChange={(e) => setTargetMonth(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FFFFFF] border border-black/15 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                >
                  {[
                    'April (Lush Post-Rain Landscapes & Waterfalls)',
                    'May (Tsingy Season Opens & Clear Sun)',
                    'June (Mild Highlands & Lemur Trekking)',
                    'July (Peak Whale Watching & Safari Season)',
                    'August (Peak High Season - Dry & Crisp)',
                    'September (Baby Lemurs & Calm Seas)',
                    'October (Warm Spring & Lemur Birthing)',
                    'November (Chameleon, Orchid & Reptile Peak)',
                    'December (Summer Beach Getaways)',
                  ].map((m) => (
                    <option key={m} value={m.split(' ')[0]}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-black/5">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-black/15 text-xs font-semibold text-[#5A655F] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 rounded-xl bg-[#1E3B2B] text-[#F7F5F0] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#2A4E39] shadow-lg transition-all"
                >
                  <span>Continue to Fleet & Lodging</span>
                  <ArrowRight className="w-4 h-4 text-[#D4BA82]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Accommodation & Fleet */}
          {currentStep === 4 && (
            <div className="light-luxury-card p-6 sm:p-10 rounded-3xl space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-black/5 pb-4">
                <span className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Step 4 of 4</span>
                <h3 className="text-2xl font-display font-medium text-[#1A1A1A]">Accommodations & Expedition Fleet</h3>
                <p className="text-xs text-[#5A655F] mt-1">
                  Select your lodging luxury tier and private overland transport preference.
                </p>
              </div>

              {/* Lodging Tier */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-3">
                  1. Lodging Standard
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'boutique-comfort',
                      title: 'Authentic Boutique Comfort',
                      desc: 'Carefully vetted 3-star character eco-bungalows with private hot-water bathrooms and garden terraces.',
                      tag: 'Heritage Value',
                    },
                    {
                      id: 'luxury-eco',
                      title: 'Luxury Eco-Lodges & Suites',
                      desc: 'Premier boutique safari retreats, swimming pools, chef fine dining, and panoramic cliffside or forest suites.',
                      tag: 'Signature Standard',
                    },
                    {
                      id: 'vip-sanctuary',
                      title: 'VIP Villas & Overwater Sanctuaries',
                      desc: '5-Star overwater beachfront villas, private plunge pools, helicopter transfer links, and champagne amenities.',
                      tag: 'Ultra-Luxury',
                    },
                  ].map((tier) => {
                    const isSelected = accommodation === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setAccommodation(tier.id as AccommodationPreference)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#B89758] bg-[#FAF8F5] shadow-md'
                            : 'border-black/10 bg-[#FFFFFF] hover:border-[#B89758]/40'
                        }`}
                      >
                        <div>
                          <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#B89758]/15 text-[#8C6D34] mb-2">
                            {tier.tag}
                          </span>
                          <h4 className="text-base font-bold text-[#1A1A1A] mb-1">{tier.title}</h4>
                          <p className="text-xs text-[#5A655F] leading-relaxed">{tier.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Transport Fleet */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-3">
                  2. Private Overland & River Fleet
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'land-cruiser-v8',
                      title: 'Toyota Land Cruiser Prado / V8 4x4',
                      desc: 'High-clearance suspension, panoramic safari windows, high-output AC, and onboard cooler with spring water.',
                      tag: 'Best for 1-4 VIPs',
                    },
                    {
                      id: 'executive-minibus',
                      title: 'Executive Safari Minibus',
                      desc: 'Air-conditioned luxury passenger touring van for families or groups of friends (5-10 travelers) with ample luggage hold.',
                      tag: 'Best for 5-10 Guests',
                    },
                    {
                      id: 'river-chaland-combo',
                      title: '4x4 + Private River Chaland Cruiser',
                      desc: 'Seamless blend of high-clearance 4x4 overland transit with private motorized chaland barge cruise and camp chef.',
                      tag: 'Expedition Favorite',
                    },
                  ].map((flt) => {
                    const isSelected = transport === flt.id;
                    return (
                      <div
                        key={flt.id}
                        onClick={() => setTransport(flt.id as TransportPreference)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#B89758] bg-[#FAF8F5] shadow-md'
                            : 'border-black/10 bg-[#FFFFFF] hover:border-[#B89758]/40'
                        }`}
                      >
                        <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1E3B2B]/10 text-[#1E3B2B] mb-2">
                          {flt.tag}
                        </span>
                        <h4 className="text-base font-bold text-[#1A1A1A] mb-1">{flt.title}</h4>
                        <p className="text-xs text-[#5A655F] leading-relaxed">{flt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optional Traveler Details */}
              <div className="pt-4 border-t border-black/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                    Lead Traveler Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Lord & Lady Sterling"
                    value={leadTravelerName}
                    onChange={(e) => setLeadTravelerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                    Special Wishes or Dietary Needs
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Gluten-free, drone permits, birdwatching focus"
                    value={specialInterests}
                    onChange={(e) => setSpecialInterests(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-black/5">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl border border-black/15 text-xs font-semibold text-[#5A655F] hover:text-[#1A1A1A] hover:bg-[#FAF8F5] transition-all"
                >
                  Back
                </button>
                <button
                  onClick={generatePlan}
                  disabled={isGenerating}
                  className="px-8 py-3.5 rounded-xl bg-[#B89758] text-[#1A1A1A] font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#D4BA82] shadow-xl transition-all transform active:scale-95 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#1A1A1A]" />
                      <span>Synthesizing Itinerary...</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4 text-[#1A1A1A]" />
                      <span>Generate Custom Itinerary</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Generated Result Display */}
          {currentStep === 5 && generatedPlan && (
            <div className="space-y-8 animate-in zoom-in-95 duration-500">
              {/* Proposal Header Banner */}
              <div className="emerald-luxury-card p-8 sm:p-12 rounded-3xl text-[#F4F1EA] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E3B2B]/40 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B89758]/20 border border-[#B89758]/40 text-xs font-bold text-[#D4BA82] uppercase tracking-widest">
                    <Award className="w-3.5 h-3.5" />
                    Bespoke Travel Proposal Formulated
                  </div>
                  <span className="text-xs text-[#9EACA3]">
                    Reference ID: #{generatedPlan.id.slice(-8).toUpperCase()}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-display font-medium text-[#F4F1EA] mb-2">
                  {generatedPlan.title}
                </h3>
                <p className="text-sm text-[#9EACA3] max-w-2xl font-light mb-8">
                  {generatedPlan.subtitle} &bull; Target Travel Month: {generatedPlan.targetMonth} 2026/2027
                </p>

                {/* Price Box */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-2xl bg-[#0A1912]/80 border border-[#B89758]/30 mb-8">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#9EACA3] block mb-1">
                      Estimated Cost Per Guest
                    </span>
                    <div className="text-3xl font-display font-bold text-[#D4BA82]">
                      {formatPrice(generatedPlan.estimatedPriceEURPerPerson)}
                    </div>
                    <span className="text-[11px] text-[#9EACA3]">
                      Based on {generatedPlan.guestCount} guest(s) private charter
                    </span>
                  </div>
                  <div className="sm:text-right sm:border-l sm:border-white/10 sm:pl-6 flex flex-col justify-center">
                    <span className="text-xs uppercase tracking-wider text-[#9EACA3] block mb-1">
                      Total Private Expedition Estimate
                    </span>
                    <div className="text-2xl font-display font-bold text-[#F4F1EA]">
                      {formatPrice(generatedPlan.totalEstimatedPriceEUR)}
                    </div>
                    <span className="text-[11px] text-[#D4BA82]">
                      Direct Operator Rates &bull; Zero Hidden Markups
                    </span>
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={handleBookViaWhatsApp}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(37,211,102,0.35)] transition-all active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Book This Custom Route via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setShowPdfModal(true)}
                    className="w-full sm:w-auto px-6 py-4 rounded-xl bg-[#1E3B2B] hover:bg-[#2A4E39] border border-[#B89758]/40 text-[#F4F1EA] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <FileDown className="w-4 h-4 text-[#D4BA82]" />
                    <span>Instant PDF Proposal Preview</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-[#9EACA3] hover:text-[#F4F1EA] flex items-center gap-1 sm:ml-auto underline"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Modify Parameters</span>
                  </button>
                </div>
              </div>

              {/* Bespoke Touches Callout */}
              <div className="light-luxury-card p-6 sm:p-8 rounded-3xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89758] font-bold mb-4">
                  <Compass className="w-4 h-4 text-[#B89758]" />
                  Bespoke Touches Included For Your {generatedPlan.travelerType.toUpperCase()} Party
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {generatedPlan.bespokeTouches.map((touch, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#1E3B2B] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                        {touch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day-by-Day Timeline */}
              <div className="light-luxury-card p-6 sm:p-10 rounded-3xl">
                <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
                  <div>
                    <h4 className="text-2xl font-display font-medium text-[#1A1A1A]">
                      Generated Day-by-Day Travel Route
                    </h4>
                    <p className="text-xs text-[#5A655F]">
                      Carefully sequenced logistics with realistic overland driving times and verified lodge stops.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1E3B2B] text-[#D4BA82]">
                    {generatedPlan.durationDays} Full Days
                  </span>
                </div>

                <div className="space-y-6">
                  {generatedPlan.days.map((day) => (
                    <div
                      key={day.day}
                      className="p-5 rounded-2xl bg-[#FAF8F5] border border-black/5 hover:border-[#B89758]/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-[#1E3B2B] text-[#D4BA82] text-xs font-bold flex items-center justify-center">
                            {day.day}
                          </span>
                          <h5 className="text-base font-bold text-[#1A1A1A]">{day.title}</h5>
                        </div>
                        <span className="text-xs font-medium text-[#8C6D34] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {day.location}
                        </span>
                      </div>

                      <p className="text-xs text-[#5A655F] leading-relaxed mb-4 pl-9">
                        {day.description}
                      </p>

                      <div className="pl-9 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#5A655F] pt-3 border-t border-black/5">
                        <div>
                          <strong className="text-[#1A1A1A]">Lodging: </strong>
                          {day.accommodation}
                        </div>
                        <div>
                          <strong className="text-[#1A1A1A]">Meals: </strong>
                          {day.meals}
                        </div>
                        <div>
                          {day.driveTimeHours ? (
                            <span>
                              <strong className="text-[#1A1A1A]">Transit: </strong>
                              {day.distanceKm} km (~{day.driveTimeHours} hrs)
                            </span>
                          ) : (
                            <span className="text-[#1E3B2B] font-semibold">Wildlife / Trail Day</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="light-luxury-card p-6 sm:p-8 rounded-3xl">
                  <h4 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Included in This Quotation</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5A655F]">
                    {generatedPlan.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E3B2B] mt-1.5 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="light-luxury-card p-6 sm:p-8 rounded-3xl">
                  <h4 className="text-base font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500" />
                    <span>Not Included</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5A655F]">
                    {generatedPlan.exclusions.map((exc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INSTANT PDF TRAVEL PROPOSAL MODAL (Printable Document View) */}
      {showPdfModal && generatedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 no-print-backdrop">
          <div className="relative w-full max-w-4xl bg-white text-black rounded-3xl shadow-2xl overflow-hidden border border-[#B89758]/30 animate-in zoom-in-95 duration-300">
            {/* Modal Actions Bar (Excluded from Print) */}
            <div className="bg-[#1E3B2B] text-white px-6 py-4 flex items-center justify-between no-print">
              <div className="flex items-center gap-2">
                <FileDown className="w-4 h-4 text-[#D4BA82]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Official Travel Proposal Document Preview
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrintProposal}
                  className="px-4 py-1.5 rounded-lg bg-[#B89758] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#D4BA82] transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print or Save as PDF</span>
                </button>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Printable Document Body */}
            <div id="printable-proposal-content" className="p-8 sm:p-12 text-[#1A1A1A] space-y-8 print:p-0">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 border-[#1E3B2B] pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-6 h-6 text-[#B89758]" />
                    <span className="font-display font-bold text-2xl tracking-wide text-[#1E3B2B]">
                      {siteConfig.companyName}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A655F]">
                    {siteConfig.businessProfile.licensedStatus}
                  </p>
                  <p className="text-xs text-[#5A655F]">
                    Headquarters: {siteConfig.contacts.address}
                  </p>
                  <p className="text-xs text-[#5A655F]">
                    Direct: {siteConfig.contacts.phonePrimary} | Email: {siteConfig.contacts.email}
                  </p>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#B89758] block">
                    Bespoke Proposal Voucher
                  </span>
                  <p className="text-xs font-bold text-[#1A1A1A]">
                    PROPOSAL REF: #{generatedPlan.id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-[#5A655F]">
                    Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-[#5A655F]">
                    Season Target: {generatedPlan.targetMonth} 2026/2027
                  </p>
                </div>
              </div>

              {/* Client & Itinerary Overview Table */}
              <div className="bg-[#FAF8F5] p-5 rounded-xl border border-black/10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5A655F] block">Lead Traveler</span>
                    <strong className="text-[#1A1A1A]">{leadTravelerName || 'Private VIP Client'}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5A655F] block">Party Size</span>
                    <strong className="text-[#1A1A1A]">{generatedPlan.guestCount} Guest(s) ({generatedPlan.travelerType})</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5A655F] block">Total Duration</span>
                    <strong className="text-[#1A1A1A]">{generatedPlan.durationDays} Days / {generatedPlan.durationDays - 1} Nights</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5A655F] block">Quotation Total</span>
                    <strong className="text-[#B89758] font-bold">{formatPrice(generatedPlan.totalEstimatedPriceEUR)}</strong>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h4 className="text-lg font-display font-bold text-[#1E3B2B] mb-2">
                  Executive Itinerary Summary
                </h4>
                <p className="text-xs text-[#5A655F] leading-relaxed">
                  This custom expedition has been designed by Madagascar Ernest Travel Tours to provide
                  exclusive, high-comfort access to Madagascar&apos;s most extraordinary natural wonders.
                  Accompanied throughout by a certified senior guide and dedicated 4x4 chauffeur, your
                  party will experience unparalleled wildlife encounters, private dining, and authentic hospitality.
                </p>
              </div>

              {/* Day-by-Day Matrix */}
              <div>
                <h4 className="text-lg font-display font-bold text-[#1E3B2B] mb-3">
                  Day-by-Day Expedition Schedule
                </h4>
                <div className="space-y-3">
                  {generatedPlan.days.map((d) => (
                    <div key={d.day} className="p-3.5 rounded-lg border border-black/10 text-xs">
                      <div className="flex justify-between items-center font-bold text-[#1A1A1A] mb-1">
                        <span>Day {d.day}: {d.title}</span>
                        <span className="text-[#B89758]">{d.location}</span>
                      </div>
                      <p className="text-[#5A655F] mb-2">{d.description}</p>
                      <div className="flex flex-wrap gap-4 text-[10px] text-[#1E3B2B] font-medium">
                        <span>Lodge: {d.accommodation}</span>
                        <span>Meals: {d.meals}</span>
                        {d.distanceKm && <span>Transit: ~{d.distanceKm} km ({d.driveTimeHours}h)</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Terms */}
              <div className="grid grid-cols-2 gap-6 text-xs pt-4 border-t border-black/10">
                <div>
                  <h5 className="font-bold text-[#1A1A1A] mb-2">Included in Proposal:</h5>
                  <ul className="space-y-1 text-[#5A655F] list-disc list-inside">
                    {generatedPlan.inclusions.slice(0, 4).map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-[#1A1A1A] mb-2">Quotation Conditions:</h5>
                  <p className="text-[#5A655F] leading-relaxed">
                    Quote valid for 30 days from formulation. Rates include all taxes, driver allowances,
                    park entry fees, and fuel. Flights booked independently or via concierge request.
                  </p>
                </div>
              </div>

              {/* Signature Footer */}
              <div className="pt-6 border-t-2 border-black/10 flex justify-between items-end text-xs">
                <div>
                  <p className="font-bold text-[#1E3B2B]">Soa Ernest</p>
                  <p className="text-[#5A655F]">Founder & Managing Director</p>
                  <p className="text-[#5A655F]">Madagascar Ernest Travel Tours &bull; Antsirabe</p>
                </div>
                <div className="text-right">
                  <div className="w-24 h-12 border-b border-black/30 mb-1 inline-block" />
                  <p className="text-[10px] text-[#5A655F]">Official Authorization Seal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
