/**
 * Madagascar Ernest Travel Tours
 * Central Site Configuration & Brand Decoupled Layer
 * 
 * Edit this file to update company information, contact details, social links,
 * vehicle fleet specifications, currencies, and FAQs across the entire application.
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rateToEUR: number; // Conversion rate relative to EUR base
  name: string;
}

export interface VehicleOption {
  id: string;
  name: string;
  tagline: string;
  capacity: string;
  features: string[];
  priceMultiplier: number;
  image: string;
}

export interface Testimonial {
  id: string;
  author: string;
  country: string;
  countryCode: string;
  date: string;
  itinerary: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'logistics' | 'health' | 'experience';
}

export const siteConfig = {
  companyName: "Madagascar Ernest Travel Tours",
  shortName: "Ernest Tours",
  tagline: "Experience the Untamed Luxury of Madagascar",
  subTagline: "Bespoke private 4x4 overland safaris, river expeditions, and remote island sanctuaries crafted with uncompromising Malagasy hospitality.",
  
  contacts: {
    email: "soa.ernest@gmail.com",
    whatsappRaw: "+261325700405",
    whatsappDisplay: "+261 32 57 004 05",
    whatsapp: "+261 32 57 004 05",
    phonePrimary: "+261 34 52 673 85",
    phoneSecondary: "+261 32 57 004 05",
    phone: "+261 34 52 673 85",
    phoneRaw: "+261345267385",
    address: "Antsirabe vakinakaratra Madagascar, lot 20 B 205 MiaramasoandroVatofotsy",
    officeHours: "24/7 Concierge Support & Real-Time Safari Dispatch",
  },

  socialLinks: {
    facebook: "https://facebook.com/madagascarernesttours",
    instagram: "https://instagram.com/madagascarernesttours",
    tripadvisor: "https://tripadvisor.com/madagascarernesttours",
    whatsapp: "https://wa.me/261325700405",
  },

  businessProfile: {
    foundedYear: 2012,
    licensedStatus: "Official Ministry of Tourism Certified Malagasy Tour Operator",
    fleetCount: "12+ Bespoke Expedition 4x4s & Private River Vessels",
    satisfactionRate: "99.4% Exceptional Guest Feedback",
    expertGuides: "Multilingual Naturalists (English, French, German, Italian, Malagasy)",
  },

  currencies: [
    { code: "EUR", symbol: "€", rateToEUR: 1.0, name: "Euro" },
    { code: "USD", symbol: "$", rateToEUR: 1.09, name: "US Dollar" },
    { code: "GBP", symbol: "£", rateToEUR: 0.85, name: "British Pound" },
    { code: "MGA", symbol: "Ar", rateToEUR: 4950, name: "Malagasy Ariary" },
  ] as CurrencyConfig[],

  fleet: [
    {
      id: "land-cruiser-v8",
      name: "Toyota Land Cruiser Prado / V8 4x4",
      tagline: "High-clearance luxury overland expedition vehicle",
      capacity: "Up to 4 VIP Guests + Private Guide & Driver",
      features: [
        "Reinforced heavy-duty off-road suspension",
        "Individual high-output tropical climate control",
        "Panoramic safari windows & roof hatch for photography",
        "USB fast-charging ports & Garmin satellite tracking",
        "Onboard electric cooler with fresh spring water",
      ],
      priceMultiplier: 1.0,
      image: "/tours/baobab-4x4.jpg",
    },
    {
      id: "chaland-barge",
      name: "Private River Chaland & Motorized Cruiser",
      tagline: "Exclusive Tsiribihina & Pangalanas waterway vessel",
      capacity: "Private charter with personal onboard chef",
      features: [
        "Spacious shaded wooden dining deck & sun lounge",
        "Eco-friendly quiet outboard marine engines",
        "Private camp chef preparing fresh French-Malagasy cuisine",
        "Full safari camping gear, plush mattresses & safari shower",
        "Life vests and full marine navigational telemetry",
      ],
      priceMultiplier: 1.15,
      image: "/tours/canal-pangalanes.jpg",
    },
    {
      id: "safari-hiace",
      name: "Executive VIP Safari Minibus",
      tagline: "Smooth RN7 paved highway cruiser for families & private groups",
      capacity: "Up to 8 Guests + Dedicated Crew",
      features: [
        "Reclining leather-accented captain seats",
        "Ultra-quiet cruise on Madagascar's Route Nationale",
        "Oversized luggage bay for trek & diving gear",
        "PA audio system for guide wildlife commentary",
      ],
      priceMultiplier: 0.9,
      image: "/tours/ernest-isalo.jpg",
    },
  ] as VehicleOption[],

  testimonials: [
    {
      id: "t1",
      author: "Lord Henry & Lady Beatrice Montgomery",
      country: "United Kingdom",
      countryCode: "GB",
      date: "August 2025",
      itinerary: "10-Day Grand Tsingy & Baobab Avenue Expedition",
      rating: 5,
      quote: "Ernest and his team delivered what can only be described as a once-in-a-lifetime journey. Traversing the Tsingy pinnacles by day and returning to cold champagne under the ancient Baobabs at sunset was surreal. The 4x4 was immaculate and our driver knew every hidden turn.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "t2",
      author: "Dr. Alexandre & Sabine Mercier",
      country: "France / Switzerland",
      countryCode: "FR",
      date: "October 2025",
      itinerary: "13-Day Grand Southern Odyssey (RN7 & Isalo)",
      rating: 5,
      quote: "From the lemurs of Ranomafana to the breathtaking red sandstone gorges of Isalo and the white sands of Ifaty, everything ran like clockwork. Ernest is more than a guide; he is an ambassador of Madagascar's heart. Truly unmatched service.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "t3",
      author: "Klaus & Elena Weber",
      country: "Germany",
      countryCode: "DE",
      date: "November 2025",
      itinerary: "11-Day Wildlife & Sainte-Marie Tropical Haven",
      rating: 5,
      quote: "The sound of the Indri lemur singing in the mist of Andasibe will stay with us forever. Our private boat through the Pangalanas canal and our bungalow on Sainte-Marie exceeded all expectations. 100% recommended for serious travelers.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "t4",
      author: "Marcus & Victoria Vance",
      country: "United States",
      countryCode: "US",
      date: "May 2025",
      itinerary: "Custom 14-Day Wildlife & Tsingy Private Sanctuary",
      rating: 5,
      quote: "Organizing an expedition through remote Madagascar could feel daunting, but Ernest handled every detail with effortless professionalism. We felt safe, pampered, and privileged to witness wildlife seen nowhere else on Earth.",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    }
  ] as Testimonial[],

  faqs: [
    {
      question: "What is the best time of year to visit Madagascar?",
      answer: "Madagascar offers wonderful travels year-round, with distinct regional microclimates. April through November provides dry, pleasant weather with clear skies—ideal for the Tsingy de Bemaraha, Baobab Avenue, and Southern trekking. July to September is prime for humpback whale watching around Sainte-Marie Island.",
      category: "booking",
    },
    {
      question: "Are your tours completely private and customizable?",
      answer: "Yes, 100% of our expeditions are private. You will never be grouped with strangers. Your dedicated air-conditioned 4x4, private chauffeur-driver, local naturalists, and boats are reserved solely for you and your travel party. We tailor every itinerary to your exact pace and passions.",
      category: "experience",
    },
    {
      question: "How does the booking and payment process work?",
      answer: "Once we design your preferred itinerary via WhatsApp or email, we provide a transparent, itemized quotation. A 30% deposit secures your private 4x4, premium lodge reservations, and national park permits. The remainder can be settled prior to departure via international bank transfer or upon arrival in Antananarivo.",
      category: "booking",
    },
    {
      question: "What level of fitness is required for the National Parks?",
      answer: "Our itineraries can be adapted to all physical fitness levels. In parks like Andasibe and Ranomafana, we offer gentle 2-hour forest walks on marked paths as well as intensive full-day canopy treks. For the Grand Tsingy suspension bridges and harnesses, moderate mobility is recommended, though gentle Little Tsingy circuits are always available.",
      category: "health",
    },
    {
      question: "What vehicles and safety equipment do you provide?",
      answer: "We operate modern, meticulously maintained Toyota Land Cruiser 4x4s equipped with all-terrain tires, dual spare wheels, first-aid medical kits, air conditioning, and satellite communications. Our drivers have over 10 years of overland expertise across Madagascar's diverse terrain.",
      category: "logistics",
    },
  ] as FAQItem[],
};
