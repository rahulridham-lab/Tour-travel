/**
 * Madagascar Ernest Travel Tours
 * Structured Itineraries Data Layer
 * 
 * Official Tours with authentic Day-by-Day itineraries, complete activity lists,
 * exact inclusions/exclusions, and tiered pricing according to number of travelers.
 */

export interface CircuitDay {
  day: number;
  title: string;
  location: string;
  description: string;
  activities: string[];
  accommodation: string;
  meals: string;
  distanceKm?: number;
  driveTimeHours?: number;
}

export interface TieredPricing {
  twoGuestsEUR: number; // Total for 2 persons
  threeGuestsEUR?: number; // Total for 3 persons (if specified individually)
  fourGuestsEUR?: number; // Total for 4 persons (if specified individually)
  threeToFourGuestsEUR?: number; // Total for 3 or 4 persons
  groupPerPersonEUR: number; // Rate per person for 5+ persons (group)
  customDurationNote?: string;
}

export interface Circuit {
  id: string;
  title: string;
  subtitle: string;
  region: 'west' | 'south' | 'east' | 'mixed';
  regionLabel: string;
  durationDays: number;
  durationNights: number;
  basePriceEUR: number; // Starting price per person (for 2 guests private tour)
  heroImage: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  routeOverview: string[];
  highlights: string[];
  bestSeason: string;
  physicalLevel: 'Easy' | 'Moderate' | 'Challenging' | 'Flexible';
  tieredPricing: TieredPricing;
  activitiesList: string[];
  included: string[];
  notIncluded: string[];
  customDurationNote: string;
  days: CircuitDay[];
}

export const circuitsData: Circuit[] = [
  // 1. CIRCUITS EST 7 DAYS (Standard)
  {
    id: "circuits-est-7-days",
    title: "Circuits Est 7 Days — Andasibe & Pangalanes Canal in Chaland",
    subtitle: "Pangalanes Canal navigation on motor chaland, Lake Rasoabe, Aye-Aye lemurs at Palmarium Reserve, and Indri Indri in Andasibe Mantadia.",
    region: "east",
    regionLabel: "East Madagascar",
    durationDays: 7,
    durationNights: 6,
    basePriceEUR: 1060, // 2120 / 2
    heroImage: "/tours/canal-pangalanes.jpg",
    gallery: [
      "/tours/canal-pangalanes.jpg",
      "/tours/ringtailed-lemur.jpg",
      "/tours/coastal-hut.jpg",
      "/tours/baobab-4x4.jpg",
    ],
    rating: 4.98,
    reviewsCount: 58,
    routeOverview: [
      "Antananarivo",
      "Andasibe Mantadia",
      "Manambato",
      "Ankanin'ny Nofy (Palmarium)",
      "Pangalanes Canal",
      "Lake Rasoabe",
      "Ivato Airport",
    ],
    highlights: [
      "3 Days private navigation on engine boat (chaland) along Pangalanes canal & Lake Rasoabe",
      "Hear the haunting dawn call of the giant Indri Indri lemur in Andasibe Mantadia National Park",
      "Spot the elusive nocturnal Aye-Aye lemur (Daubentonia) in VOI Ankanin'ny Nofy Reserve",
      "Exotic reptiles, chameleons, geckos & endemic snakes at Peyreras private reserve",
      "All meals included during the 3-day chaland journey through remote fishermen's villages",
    ],
    bestSeason: "Year-round (Best: September to January for lemurs and pleasant temperatures)",
    physicalLevel: "Easy",
    tieredPricing: {
      twoGuestsEUR: 2120, // 1060 € / person
      threeGuestsEUR: 2400, // 800 € / person
      fourGuestsEUR: 2700, // 675 € / person
      groupPerPersonEUR: 700, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Rates adapt flexibly.",
    },
    activitiesList: [
      "Visit Madagascar National Park Andasibe Mantadia (Indri Indri, brown lemurs, bamboo lemurs, orchids)",
      "Reserve VOI Ankanin'ny Nofy Palmarium (botanical palm garden, aquatic flora, fishermen's village, nocturnal Aye-Aye lemurs)",
      "Visit private park Peyreras (chameleons, snakes, butterflies, crocodiles, lemurs)",
      "Travel in the engine boat (chaland) on the Pangalanes canal and Lake Rasoabe",
      "Authentic coastal encounters with local canal fishermen and vanilla villages",
    ],
    included: [
      "Travelling in the chaland (engine boat) 3 days on the Pangalanes canal and Lake Rasoabe Ankanin'ny Nofy",
      "Meals 3 days in the engine boat (chaland) trip on Pangalanes canal and Lake Rasoabe",
      "Entrance fee and local guide in the Madagascar National Parks visited during our trip days",
      "Communal tax",
      "Dedicated private vehicle with fuel and experienced driver from Antananarivo to Manambato return",
      "Driver and guide accommodation and meals",
    ],
    notIncluded: [
      "Restaurant (meals) during trip days apart from travel in 3 days on the Pangalanes canal and Lake Rasoabe",
      "Personal needs and souvenirs",
      "Mineral water during trip days",
      "International flights and travel insurance",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      {
        day: 1,
        title: "Antananarivo to Andasibe Mantadia via Peyreras Exotic Reserve",
        location: "Antananarivo _ Andasibe Mantadia",
        description: "Departure east from Antananarivo through the winding rainforest escarpment. Stop at the private reserve of Peyreras (Madagascar Exotic) to view colorful chameleons, leaf-tailed geckos, non-venomous tree snakes, and lemurs. Continue to Andasibe.",
        activities: ["Scenic drive through humid rainforest", "Peyreras exotic reptile park visit", "Evening twilight walk to spot nocturnal mouse lemurs"],
        accommodation: "Vakona Forest Lodge / Hotel Andasibe Cyperus",
        meals: "Dinner included",
        distanceKm: 145,
        driveTimeHours: 3.5,
      },
      {
        day: 2,
        title: "Andasibe Mantadia National Park — Realm of the Indri Indri",
        location: "Andasibe Mantadia",
        description: "Full day dedicated to the misty rainforests of Andasibe Mantadia National Park. Track the Indri Indri, the largest living lemur whose haunting territorial wail carries for miles. Encounter diademed sifakas, woolly lemurs, endemic orchids, and lush tree ferns.",
        activities: ["Guided morning trek in Analamazaotra / Mantadia", "Observation of Indri Indri and Sifakas", "Botany walk with medicinal plants"],
        accommodation: "Vakona Forest Lodge / Hotel Andasibe",
        meals: "Breakfast & Dinner",
        distanceKm: 25,
        driveTimeHours: 1,
      },
      {
        day: 3,
        title: "Andasibe Mantadia to Manambato",
        location: "Andasibe Mantadia _ Manambato",
        description: "Journey onward through the tropical green hills toward the east coast. Descend the lush eastern slopes to the shores of Lake Rasoabe at Manambato, the embarkation gateway to the historic Pangalanes Canal.",
        activities: ["Scenic drive to the eastern coast", "Arrival on the white sandy shores of Lake Rasoabe", "Briefing for the chaland canal expedition"],
        accommodation: "Hotel Le Manambato / Rasoabe Lodge",
        meals: "Breakfast & Dinner",
        distanceKm: 130,
        driveTimeHours: 3.5,
      },
      {
        day: 4,
        title: "Manambato to Ankanin'ny Nofy in Motor Chaland",
        location: "Manambato _ Ankanin'ny Nofy (IN CHALAND)",
        description: "Embarkation on our motorized private chaland barge. Glide peacefully across Lake Rasoabe and along the shaded calm waterways of the Pangalanes Canal. Arrive at Ankanin'ny Nofy ('Nest of Dreams'). Delicious freshly prepared lunch and dinner aboard.",
        activities: ["Engine boat navigation on Lake Rasoabe & Pangalanes canal", "Scenic canal photography", "Nocturnal expedition by boat to spot the rare Aye-Aye lemur"],
        accommodation: "Palmarium Reserve Bungalows / Hotel Ankanin'ny Nofy",
        meals: "All meals included aboard chaland",
        distanceKm: 30,
        driveTimeHours: 2.5,
      },
      {
        day: 5,
        title: "Ankanin'ny Nofy Palmarium Exploration in Chaland",
        location: "Ankanin'ny Nofy (in chaland)",
        description: "A magical day exploring the Palmarium Reserve and surrounding waterways aboard our chaland. Walk through palm forests where friendly lemurs (Black-and-White Ruffed, Crowned, Red-bellied) roam freely. Visit an authentic Betsimisaraka fishermen's village.",
        activities: ["Palmarium botanical reserve walk", "Interaction with wild friendly lemurs", "Visit to traditional fishermen village", "Navigation on Lake Ampitabe"],
        accommodation: "Palmarium Reserve Bungalows",
        meals: "All meals included aboard chaland",
        distanceKm: 20,
        driveTimeHours: 2,
      },
      {
        day: 6,
        title: "Ankanin'ny Nofy Return to Manambato in Chaland",
        location: "Ankanin'ny Nofy _ Manambato (IN CHALAND)",
        description: "Final peaceful voyage aboard the engine boat along the winding canal back to Manambato. Enjoy the quiet morning mist, watching kingfishers dive and local dugout pirogues transporting fresh tropical fruit.",
        activities: ["Morning canal chaland cruise", "Fresh meal aboard chaland", "Arrival at Manambato and transfer to overland lodge"],
        accommodation: "Lake Rasoabe Lodge / Manambato",
        meals: "All meals included aboard chaland",
        distanceKm: 30,
        driveTimeHours: 2.5,
      },
      {
        day: 7,
        title: "Manambato to Antananarivo & Transfer to Ivato International Airport",
        location: "Manambato _ Antananarivo + transfert to Ivato aéroport international flight. END",
        description: "Board our private vehicle for the scenic drive back across the highlands to Antananarivo. Direct escort and transfer to Ivato International Airport for your departing international flight. End of our services.",
        activities: ["Highland return drive", "Craft souvenir stops in Tana", "Airport VIP transfer for international departure flight"],
        accommodation: "End of Tour / International Flight",
        meals: "Breakfast",
        distanceKm: 260,
        driveTimeHours: 6,
      },
    ],
  },

  // 2. CIRCUITS MIXT SUD_WEST 23 DAYS
  {
    id: "circuits-mixt-sud-west-23-days",
    title: "Circuits Mixt Sud_West 23 Days — Tsiribihina River, Grand Tsingy, RN7 Canyons & Andasibe",
    subtitle: "The ultimate 23-day overland odyssey: 3-day Tsiribihina chaland descent, UNESCO Grand Tsingy, Avenue of Baobabs, Mozambique Channel beaches, Isalo canyons, and Andasibe rainforest.",
    region: "mixed",
    regionLabel: "West, South & East Madagascar",
    durationDays: 23,
    durationNights: 22,
    basePriceEUR: 2650, // 5300 / 2
    heroImage: "/tours/baobab-4x4.jpg",
    gallery: [
      "/tours/baobab-4x4.jpg",
      "/tours/tsiribihina-camp.jpg",
      "/tours/ernest-isalo.jpg",
      "/tours/ringtailed-lemur.jpg",
      "/tours/tsaranoro-valley.jpg",
      "/tours/coastal-hut.jpg",
    ],
    rating: 5.0,
    reviewsCount: 84,
    routeOverview: [
      "Antananarivo",
      "Antsirabe",
      "Miandrivazo",
      "Tsiribihina Chaland (Begidro - Ambatomisay)",
      "Bekopaka (Tsingy)",
      "Kirindy Forest",
      "Morondava Baobabs",
      "Manja",
      "Ifaty Beach",
      "Salary Bay (Canoe)",
      "Ranohira (Isalo)",
      "Ambalavao",
      "Ranomafana",
      "Ambositra",
      "Andasibe Mantadia",
      "Ivato Airport",
    ],
    highlights: [
      "3 Days & 2 Nights private motorized chaland expedition down the gorges of Tsiribihina River",
      "Scale the razor-sharp karst limestone spires & rope bridges of UNESCO Grand Tsingy de Bemaraha",
      "Champagne sunset beneath the colossal ancient Baobabs at world-famous Allée des Baobabs",
      "Day sailing in traditional canoe on the Mozambique Channel with seaside picnic lunch at Salary",
      "Trek through dramatic sandstone canyons, natural emerald pools & oasis springs of Isalo National Park",
      "Complete wildlife safaris across Kirindy, Ranomafana, Anja Reserve, and Andasibe Mantadia",
      "Domestic scheduled flight from Morondava back to Antananarivo included",
    ],
    bestSeason: "May to November (Optimal dry season for river navigation, Tsingy access, and hiking)",
    physicalLevel: "Moderate",
    tieredPricing: {
      twoGuestsEUR: 5300, // 2650 € / person
      threeToFourGuestsEUR: 7140, // 1785 € - 2380 € / person
      groupPerPersonEUR: 1850, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Travel by motorized boat on the River of Tsiribihina 3 days and 2 nights (crocodiles, lemurs, maki, aquatic birds, waterfalls)",
      "Swimming in natural rock pools, waterfalls, snorkeling, and pristine Mozambique Channel beaches",
      "Madagascar National Park visits: Tsingy de Bemaraha, Kirindy forest, Isalo park, Ranomafana park, Anja reserve, Andasibe Mantadia park",
      "Wildlife tracking: lemurs, maki, birds, reptiles, endemic medicinal plants, climbing in the gateway, fossa, chameleon species",
      "Baobab Tour and golden hour sunset on the Avenue of the Baobabs and Baobab Amoureux",
      "Traditional Sakalava, Vezo, and Merina village visits and cultural encounters",
      "Traditional sailing canoe expedition on Mozambique channel with fresh seafood picnic",
    ],
    included: [
      "Overnight hosting 23 days (comfortable lodges, hotels, and river camp)",
      "Vehicle for rent with fuel for all trip days (departure Antananarivo and return Antananarivo)",
      "Accommodation and food for driver and national escort guide",
      "Madagascar National Park entry fees and local guide fees for all scheduled parks",
      "Travelling in chaland 3 days and 2 nights on the River of Tsiribihina, with all meals during river trip included",
      "Ferry boat (BAC) crossings for the Tsiribihina, Manambolo, and Bevoay rivers",
      "Communal tax, Baobab lovers tour, and car park visit sunset on Baobab Avenue",
      "National flight Morondava – Antananarivo",
    ],
    notIncluded: [
      "Restaurant (meals) during trip days apart from travel in 3 days and 2 nights on River Tsiribihina",
      "Personal needs and tips",
      "Mineral water during trip days",
      "International flights",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Antsirabe", location: "Antananarivo _ Antsirabe", description: "Depart the capital traveling south across the high plateau. Stop at Ambatolampy to see traditional artisanal aluminium casting. Arrive in thermal city Antsirabe.", activities: ["Scenic highland drive", "Artisan workshop visit", "Antsirabe city rickshaw exploration"], accommodation: "Couleur Café / Hotel Plumeria", meals: "Breakfast & Dinner", distanceKm: 170, driveTimeHours: 3.5 },
      { day: 2, title: "Antsirabe to Miandrivazo", location: "Antsirabe _ Miandrivazo", description: "Drive westward descending the plateau into the warm Menabe region. Reach Miandrivazo on the banks of Mahajilo river, staging point for the river chaland descent.", activities: ["Volcanic plateau photography", "Arrival in Miandrivazo river staging port"], accommodation: "Princesse Tsiribihina Lodge", meals: "Breakfast & Dinner", distanceKm: 220, driveTimeHours: 4.5 },
      { day: 3, title: "Miandrivazo to Begidro — Chaland Day 1", location: "Miandrivazo _ Begidro (first day travel in chaland)", description: "Board our motorized chaland barge. Glide down the calm waters of the Tsiribihina River through spectacular towering red rock gorges. Observe giant fruit bats, herons, and wild lemurs along the riverbanks.", activities: ["Tsiribihina river descent", "Wildlife spotting from the boat", "Riverside camping under the stars with chef dinner"], accommodation: "Riverside tented camp on pristine sandbank", meals: "All meals included aboard chaland", distanceKm: 60, driveTimeHours: 6 },
      { day: 4, title: "Begidro to Ambatomisay — Chaland Day 2", location: "Begidro _ Ambatomisay (second day travel in chaland)", description: "Wake to the sounds of nature. Cruise past deep canyons and stop at Anosin'ampela waterfall for a refreshing swim in crystal freshwater pools. Drift past crocodiles basking on sandbanks.", activities: ["Anosin'ampela natural pool waterfall swim", "Spotting Nile crocodiles and lemur troops", "Campfire on the river sandbank"], accommodation: "Riverside tented camp", meals: "All meals included aboard chaland", distanceKm: 55, driveTimeHours: 6 },
      { day: 5, title: "Ambatomisay to Belo sur Tsiribihina to Bekopaka", location: "Ambatomisay _ Belo sur Tsiribihina (end of chaland) _ Bekopaka", description: "Conclude the river descent at Belo sur Tsiribihina. Transfer into private 4x4 Toyota Land Cruiser vehicles. Cross the Manambolo river by BAC ferry and drive north to Bekopaka, gateway to the Tsingy.", activities: ["End of chaland expedition", "BAC ferry crossing", "4x4 overland track to Bekopaka"], accommodation: "Soleil des Tsingy / Olympe du Bemaraha", meals: "Breakfast, Lunch & Dinner", distanceKm: 100, driveTimeHours: 5 },
      { day: 6, title: "Grand Tsingy de Bemaraha Expedition", location: "Bekopaka", description: "Full day exploring the UNESCO World Heritage Grand Tsingy. Navigate suspended rope bridges 60 meters above limestone labyrinths, explore cathedral caves, and view Decken's Sifakas.", activities: ["Grand Tsingy Broadway suspension bridges", "Cave exploration", "Panoramic lookout summit"], accommodation: "Soleil des Tsingy / Olympe du Bemaraha", meals: "Breakfast & Dinner", distanceKm: 35, driveTimeHours: 1.5 },
      { day: 7, title: "Bekopaka to Kirindy Dry Deciduous Forest", location: "Bekopaka _ Kirindy forest", description: "Ferry crossing back across the Manambolo and Tsiribihina rivers. Drive south into the dense dry forest of Kirindy, home to the elusive Fossa, giant jumping rats, and pygmy mouse lemurs.", activities: ["Ferry crossings", "Nocturnal safari walk in Kirindy tracking Fossa and night lemurs"], accommodation: "Relais du Kirindy Lodge", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 5 },
      { day: 8, title: "Kirindy Forest to Morondava & Baobabs Sunset", location: "Kirindy forest _ Morondava", description: "Morning wildlife walk in Kirindy forest. Afternoon visit to the famous Baobab Amoureux (Baobabs in Love) followed by sunset on the world-renowned Avenue of the Baobabs with drinks.", activities: ["Morning lemur tracking", "Baobab in Love photo stop", "Sunset toast at Avenue of the Baobabs"], accommodation: "Palissandre Côte Ouest Resort / Laguna Beach", meals: "Breakfast & Dinner", distanceKm: 60, driveTimeHours: 2 },
      { day: 9, title: "Morondava Seaside Leisure", location: "Morondava", description: "A day of coastal relaxation in the lively fishing town of Morondava. Stroll through the local Betania fishermen's village across the lagoon or unwind on the beach.", activities: ["Betania fishermen village canoe visit", "Seafood tasting", "Coastal rest"], accommodation: "Palissandre Côte Ouest Resort", meals: "Breakfast & Dinner", distanceKm: 10, driveTimeHours: 0.5 },
      { day: 10, title: "Morondava to Manja 4x4 Bush Track", location: "Morondava _ Manja", description: "Head south along the rugged wild 4x4 track traversing dry rivers and baobab dotted plains. Cross the Bevoay river by ferry and reach the historic inland town of Manja.", activities: ["Wild 4x4 overland safari track", "Bevoay BAC ferry crossing", "Scenic remote bush landscapes"], accommodation: "Hotel Kanto Manja", meals: "Breakfast & Dinner", distanceKm: 160, driveTimeHours: 6 },
      { day: 11, title: "Manja to Ifaty Beach via Mangoky River", location: "Manja _ Ifaty", description: "Cross the vast Mangoky river by ferry and drive past towering Za and Fony baobabs. Descend to the turquoise waters of the Mozambique Channel at Ifaty coral lagoon.", activities: ["Mangoky ferry crossing", "Spiny forest scenery", "Arrival at tranquil beach resort in Ifaty"], accommodation: "Le Paradisier / Dunes d'Ifaty", meals: "Breakfast & Dinner", distanceKm: 210, driveTimeHours: 7 },
      { day: 12, title: "Ifaty Lagoon & Reniala Baobab Spiny Forest", location: "Ifaty", description: "Morning exploration of the protected Reniala Spiny Forest with colossal thousand-year-old baobabs and endemic desert birdlife. Afternoon relaxing on the beach or snorkeling the barrier reef.", activities: ["Reniala botanical spiny forest walk", "Ancient baobabs exploration", "Coral reef snorkeling"], accommodation: "Le Paradisier / Dunes d'Ifaty", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 13, title: "Ifaty to Salary — Traditional Canoe Expedition & Beach Picnic", location: "Ifaty _ Salary (travel days in canoë traditionnel in the canal de Mozambique,picnic lunch)", description: "Sail along the pristine sapphire coastline to Salary Bay aboard a traditional Vezo outrigger canoe. Enjoy a fresh seafood beach picnic lunch on deserted white sands.", activities: ["Traditional canoe sailing on Mozambique channel", "Fresh grilled seafood beach picnic", "Snorkeling over pristine coral reefs"], accommodation: "Salary Bay Resort / Eco-Lodge", meals: "Breakfast, Picnic Lunch & Dinner", distanceKm: 85, driveTimeHours: 3 },
      { day: 14, title: "Salary to Ranohira (Isalo National Park)", location: "Salary _ Ranohira( Isalo)", description: "Leave the coast heading inland across sapphire-mining landscapes and the Ilakaka boomtown to the majestic jurassic sandstone massifs of Isalo National Park.", activities: ["Drive through Ilakaka sapphire town", "First views of the Isalo sandstone ruins", "Sunset through the Window of Isalo (La Fenêtre)"], accommodation: "Le Jardin du Roy / Isalo Rock Lodge", meals: "Breakfast & Dinner", distanceKm: 280, driveTimeHours: 6 },
      { day: 15, title: "Isalo National Park Deep Canyon Trekking", location: "Ranohira (Isalo)", description: "Full day trek through the dramatic canyons of Isalo. Swim in the crystal waters of the Piscine Naturelle (natural emerald rock pool) and hike to the Namaza Canyon and Cascade des Nymphes.", activities: ["Piscine Naturelle swim", "Cascade des Nymphes hike", "Encounter wild Ring-tailed and Verreaux's Sifaka lemurs"], accommodation: "Le Jardin du Roy / Isalo Rock Lodge", meals: "Breakfast & Dinner", distanceKm: 30, driveTimeHours: 1 },
      { day: 16, title: "Ranohira (Isalo) to Ambalavao via Anja Community Reserve", location: "Ranohira ( Isalo)_ Ambalavao", description: "Drive north through the Gate of the South and wide Horombe plateaus. Stop at Anja Community Reserve, famous for its large wild troops of ring-tailed lemurs (Maki) among giant granite boulders.", activities: ["Horombe plateau crossing", "Anja reserve ring-tailed lemurs walk", "Visit traditional Antemoro paper workshop in Ambalavao"], accommodation: "Betsileo Country Lodge / Hotel aux Bougainvillées", meals: "Breakfast & Dinner", distanceKm: 240, driveTimeHours: 4.5 },
      { day: 17, title: "Ambalavao to Ranomafana Rainforest", location: "Ambalavao _ Ranomafana", description: "Ascend through the Betsileo terraced valleys to the dense tropical cloud forest of Ranomafana National Park. Evening nocturnal walk along the forest fringe to spot chameleons and mouse lemurs.", activities: ["Terraced rice paddies photography", "Thermal springs of Ranomafana", "Nocturnal rain forest walk"], accommodation: "Thermal Hotel / Setam Lodge", meals: "Breakfast & Dinner", distanceKm: 120, driveTimeHours: 3 },
      { day: 18, title: "Ranomafana National Park Cloud Forest Safari", location: "Ranomafana", description: "Morning hike through lush primary rainforest. Search for the rare Golden Bamboo Lemur (discovered here in 1986), Greater Bamboo Lemur, Milne-Edwards Sifaka, and exotic birds.", activities: ["Golden Bamboo Lemur tracking", "Rainforest flora and waterfall trails", "Visit to local craft shops"], accommodation: "Thermal Hotel / Setam Lodge", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 19, title: "Ranomafana to Ambositra (Woodcarving Capital)", location: "Ranomafana _ Ambositra", description: "Drive through highland pine valleys to Ambositra, center of Madagascar's famed Zafimaniry woodcraft (UNESCO intangible heritage). Meet skilled woodcarvers and marquetry artisans.", activities: ["Highland scenic transit", "Zafimaniry woodcarver workshop visits", "Artisanal shopping"], accommodation: "Grand Hotel Ambositra / Artisan Hotel", meals: "Breakfast & Dinner", distanceKm: 150, driveTimeHours: 3.5 },
      { day: 20, title: "Ambositra to Antananarivo", location: "Ambositra _ Antananarivo", description: "Travel back up the scenic RN7 highway across the high Merina plateaus to Antananarivo. Check in to your hotel and rest before the eastern rainforest extension.", activities: ["RN7 highland scenery", "Arrival in Antananarivo", "Evening rest in the capital"], accommodation: "Palissandre Hotel & Spa", meals: "Breakfast & Dinner", distanceKm: 260, driveTimeHours: 5.5 },
      { day: 21, title: "Antananarivo to Andasibe Mantadia National Park", location: "Antananarivo _ Andasibe Mantadia", description: "Head east into the mist-covered eastern escarpment to Andasibe Mantadia. Stop at Peyreras exotic reptile reserve to see chameleons, butterflies, and amphibians.", activities: ["Drive to eastern escarpment", "Peyreras reptile park visit", "Nocturnal walk in Andasibe"], accommodation: "Vakona Forest Lodge", meals: "Breakfast & Dinner", distanceKm: 145, driveTimeHours: 3.5 },
      { day: 22, title: "Andasibe Mantadia Rainforest & Indri Indri Calls", location: "Andasibe Mantadia", description: "Full day discovering the primary rainforest of Andasibe. Experience the spine-tingling dawn cries of the Indri Indri, visit Vakona Lemur Island for close encounters, and photograph rare orchids.", activities: ["Indri Indri trekking in primary forest", "Vakona Lemur Island visit", "Orchidarium botanical walk"], accommodation: "Vakona Forest Lodge", meals: "Breakfast & Dinner", distanceKm: 25, driveTimeHours: 1 },
      { day: 23, title: "Andasibe Mantadia to Antananarivo & Ivato Airport Flight", location: "Andasibe Mantadia_ Antananarivo, transfert Ivato aéroport international flight.( END)", description: "Morning scenic drive from the rainforest back to Antananarivo. Brief stop at the Digue artisan market for last-minute vanilla and handicrafts, then direct transfer to Ivato Airport for your international flight.", activities: ["Return drive to Antananarivo", "Digue handicraft market visit", "Transfer to Ivato International Airport for flight departure"], accommodation: "Departure / End of Tour", meals: "Breakfast", distanceKm: 160, driveTimeHours: 4 },
    ],
  },

  // 3. CIRCUITS WEST 8 DAYS
  {
    id: "circuits-west-8-days",
    title: "Circuits West 8 Days — Tsingy de Bemaraha, Kirindy Forest & Baobab Avenue",
    subtitle: "High-impact 8-day private 4x4 overland expedition to UNESCO Grand Tsingy, nocturnal Kirindy wildlife, Baobab lovers, and sunset at Allée des Baobabs.",
    region: "west",
    regionLabel: "West Madagascar",
    durationDays: 8,
    durationNights: 7,
    basePriceEUR: 925, // 1850 / 2
    heroImage: "/tours/baobab-4x4.jpg",
    gallery: [
      "/tours/baobab-4x4.jpg",
      "/tours/tsiribihina-camp.jpg",
      "/tours/ernest-isalo.jpg",
      "/tours/ringtailed-lemur.jpg",
    ],
    rating: 4.97,
    reviewsCount: 63,
    routeOverview: [
      "Antananarivo",
      "Antsirabe",
      "Kirindy Forest",
      "Bekopaka (Grand Tsingy)",
      "Morondava",
      "Baobab Avenue",
      "Ivato Airport",
    ],
    highlights: [
      "Scale the razor-sharp karst limestone spires & suspension bridges of UNESCO Grand Tsingy de Bemaraha",
      "Spot Fossa (Madagascar's apex carnivore), jumping rats, and pygmy mouse lemurs in Kirindy Forest",
      "Visit the iconic Baobab Amoureux (Baobabs in Love) and legendary Allée des Baobabs sunset",
      "Navigating the scenic Manambolo River gorge by traditional wooden pirogue",
      "Dedicated air-conditioned 4x4 Toyota Land Cruiser with fuel and professional Malagasy driver-guide",
    ],
    bestSeason: "May to November (Dry season required for Tsingy de Bemaraha access)",
    physicalLevel: "Moderate",
    tieredPricing: {
      twoGuestsEUR: 1850, // 925 € / person
      threeToFourGuestsEUR: 2590, // 647.50 € - 863.33 € / person
      groupPerPersonEUR: 750, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Visit Madagascar National Park Tsingy de Bemaraha, Kirindy forest (lemurs, Maki, birds, reptile species, endemic medicinal plants, climbing in the gateway, panoramic views, fosa, snakes, etc.)",
      "Visit Baobab Lovers (Baobab Amoureux) and sunset toast on the Avenue of the Baobabs",
      "Manambolo River pirogue exploration and sacred caves",
      "Highland Merina artisan discovery in Antsirabe",
    ],
    included: [
      "Overnight hosting 8 days in selected hotels and eco-lodges",
      "Vehicle for rent with fuel for all trips (departure Antananarivo and return Antananarivo)",
      "Accommodation and meals for driver and national escort guide",
      "Entrance fee and local guide in the Madagascar National Parks",
      "Communal taxes",
      "Ferry crossings (BAC) across Tsiribihina and Manambolo rivers",
    ],
    notIncluded: [
      "National flight Morondava – Antananarivo",
      "Restaurant (meals) during our trip days",
      "Personal needs and souvenirs",
      "Mineral water during trip days",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Antsirabe", location: "Antananarivo _ Antsirabe", description: "Depart Antananarivo traveling south through the picturesque highland rice terraces. Stop at Ambatolampy to witness aluminium foundry craft. Arrive in the water city of Antsirabe.", activities: ["Scenic highland drive", "Ambatolampy foundry visit", "Antsirabe city rickshaw tour"], accommodation: "Couleur Café / Hotel Plumeria", meals: "Dinner included", distanceKm: 170, driveTimeHours: 3.5 },
      { day: 2, title: "Antsirabe to Kirindy Forest via Miandrivazo", location: "Antsirabe _ Kirindy forest", description: "Early departure traversing the volcanic ranges down into the warm western plains through Miandrivazo to Kirindy Dry Deciduous Reserve. Evening nocturnal spotlight safari.", activities: ["Crossing from highlands to dry west", "Nocturnal wildlife walk in Kirindy tracking Fossa and mouse lemurs"], accommodation: "Relais du Kirindy Lodge", meals: "Breakfast & Dinner", distanceKm: 380, driveTimeHours: 8 },
      { day: 3, title: "Kirindy Forest to Bekopaka (Tsingy)", location: "Kirindy forest _ Bekopaka", description: "Morning wildlife walk in Kirindy. Cross the Tsiribihina and Manambolo rivers via motorized ferry boats (BAC) and continue along the 4x4 track to Bekopaka.", activities: ["Day wildlife walk in Kirindy", "BAC river ferry crossings", "Off-road 4x4 track adventure"], accommodation: "Soleil des Tsingy / Olympe du Bemaraha", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 5 },
      { day: 4, title: "Grand Tsingy de Bemaraha Expedition", location: "Bekopaka", description: "Full day dedicated to the majestic UNESCO Grand Tsingy. Equipped with safety harnesses, traverse hanging bridges, deep karst chasms, and view Decken's Sifaka lemurs.", activities: ["Grand Tsingy via ferrata climbing gateway", "Suspension bridge crossing", "Viewpoints over the stone forest"], accommodation: "Soleil des Tsingy / Olympe du Bemaraha", meals: "Breakfast & Dinner", distanceKm: 35, driveTimeHours: 1.5 },
      { day: 5, title: "Petits Tsingy & Manambolo Gorge Pirogue", location: "Bekopaka", description: "Morning glide on traditional wooden pirogues through the sheer gorges of the Manambolo River. Afternoon explore the Petits Tsingy labyrinth with unique botanical species.", activities: ["Manambolo Gorge pirogue voyage", "Ancestral Vazimba burial caves", "Petits Tsingy botanical loop"], accommodation: "Soleil des Tsingy / Olympe du Bemaraha", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 6, title: "Bekopaka to Morondava & Baobabs Sunset", location: "Bekopaka _ Morondava", description: "Drive south crossing the ferries back to Morondava. Stop to photograph the Baobab Amoureux before enjoying the world-renowned sunset beneath the giants of Baobab Avenue.", activities: ["Ferry crossings", "Baobab in Love photo stop", "Legendary sunset on Avenue of the Baobabs"], accommodation: "Palissandre Côte Ouest / Laguna Beach", meals: "Breakfast & Dinner", distanceKm: 190, driveTimeHours: 7 },
      { day: 7, title: "Morondava Seaside Leisure", location: "Morondava", description: "Day of relaxation on the beaches of Morondava. Visit the local Vezo fishermen dhow port or take a wooden pirogue into the Betania mangrove lagoon.", activities: ["Beach relaxation", "Vezo fishing village visit", "Seafood lunch by the Mozambique Channel"], accommodation: "Palissandre Côte Ouest / Laguna Beach", meals: "Breakfast & Dinner", distanceKm: 10, driveTimeHours: 0.5 },
      { day: 8, title: "Morondava to Antananarivo Flight & Transfer to Ivato Airport", location: "Morondava _ Antananarivo National flight+ transfert to Ivato aéroport end international flight", description: "Transfer to Morondava airport for your scheduled domestic flight back to Antananarivo. Upon arrival, transfer directly to Ivato International Airport for your departing international flight. End of tour.", activities: ["Domestic flight to Antananarivo", "Artisan souvenir shopping in Tana", "Ivato International Airport transfer"], accommodation: "End of Tour / International Departure", meals: "Breakfast", distanceKm: 20, driveTimeHours: 1 },
    ],
  },

  // 4. CIRCUITS EST 7 DAYS (Comfort & Airport Transfer Inclus)
  {
    id: "circuits-est-7-days-comfort",
    title: "Circuits Est 7 Days (Comfort & Airport Transfer Included)",
    subtitle: "Upgraded comfort edition with private chaland on Pangalanes Canal, Lake Rasoabe, Aye-Aye lemurs, and full airport-hotel transfers in Antananarivo.",
    region: "east",
    regionLabel: "East Madagascar",
    durationDays: 7,
    durationNights: 6,
    basePriceEUR: 1430, // 2860 / 2
    heroImage: "/tours/canal-pangalanes.jpg",
    gallery: [
      "/tours/canal-pangalanes.jpg",
      "/tours/coastal-hut.jpg",
      "/tours/ringtailed-lemur.jpg",
      "/tours/baobab-4x4.jpg",
    ],
    rating: 4.99,
    reviewsCount: 39,
    routeOverview: [
      "Antananarivo (VIP Transfer)",
      "Andasibe Mantadia",
      "Manambato",
      "Ankanin'ny Nofy (Palmarium)",
      "Pangalanes Canal in Chaland",
      "Lake Rasoabe",
      "Ivato Airport",
    ],
    highlights: [
      "3 Days private navigation on engine boat (chaland) along Pangalanes canal & Lake Rasoabe with all meals aboard",
      "Full airport meet-and-greet and transfers between hotel in Antananarivo and Ivato International Airport",
      "Upgraded lodge and bungalow comfort throughout the trip",
      "Spot the giant Indri Indri in Andasibe and the nocturnal Aye-Aye in Palmarium Reserve",
      "Exotic reptiles, chameleons, geckos & endemic snakes at Peyreras private reserve",
    ],
    bestSeason: "Year-round (Best: September to January)",
    physicalLevel: "Easy",
    tieredPricing: {
      twoGuestsEUR: 2860, // 1430 € / person
      threeToFourGuestsEUR: 3860, // 965 € - 1286.66 € / person
      groupPerPersonEUR: 1000, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Visit Madagascar National Park Andasibe Mantadia (Indri Indri, lemur species, etc.)",
      "Reserve VOI Ankanin'ny Nofy Palmarium (palmarium, aquatic plants, fishermen's village, rare Aye-Aye nocturnal lemurs)",
      "Visit private park Peyreras (chameleons, snakes, crocodiles, lemurs)",
      "Travel in the engine boat on the Pangalanes canal and Lake Rasoabe",
      "Airport & hotel transfer in Antananarivo",
    ],
    included: [
      "Travelling in the chaland (engine boat) 3 days on the Pangalanes canal and Lake Rasoabe Ankanin'ny Nofy",
      "Meals 3 days in the engine boat (chaland) trip Pangalanes canal and Lake Rasoabe Ankanin'ny Nofy",
      "Entrance fee and local guide in the Madagascar National Parks visited during our trip days",
      "Communal tax",
      "Transfer hotel (accommodation) in Antananarivo to Ivato International Airport flight",
      "Private vehicle with fuel and professional driver for all transfers",
    ],
    notIncluded: [
      "Restaurant (meals) during trip days apart from travel in 3 days on the Pangalanes canal and Lake Rasoabe",
      "Personal needs and souvenirs",
      "Mineral water during trip days",
      "National flight Morondava – Antananarivo (if applicable to extensions)",
      "International airfare",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Andasibe Mantadia via Peyreras Reserve", location: "Antananarivo _ Andasibe Mantadia", description: "VIP pickup at your hotel or Ivato airport. Drive east through scenic rainforest escarpment with a stop at the Peyreras reserve to see chameleons and reptiles.", activities: ["VIP pickup", "Peyreras reptile park visit", "Evening nocturnal walk in Andasibe"], accommodation: "Vakona Forest Lodge", meals: "Dinner included", distanceKm: 145, driveTimeHours: 3.5 },
      { day: 2, title: "Andasibe Mantadia National Park Safari", location: "Andasibe Mantadia", description: "Trek in Andasibe Mantadia National Park to hear and see the giant Indri Indri, diademed sifakas, and lush primary rainforest flora.", activities: ["Indri Indri tracking", "Vakona Lemur Island", "Primary rainforest flora walk"], accommodation: "Vakona Forest Lodge", meals: "Breakfast & Dinner", distanceKm: 25, driveTimeHours: 1 },
      { day: 3, title: "Andasibe Mantadia to Manambato Lake", location: "Andasibe Mantadia _ Manambato", description: "Scenic drive down to the white sand beaches of Lake Rasoabe at Manambato. Prepare for embarkation on the chaland.", activities: ["Highland to coast drive", "Lake Rasoabe arrival", "Evening lakeside relaxation"], accommodation: "Rasoabe Luxury Lodge", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 3.5 },
      { day: 4, title: "Manambato to Ankanin'ny Nofy in Chaland", location: "Manambato _ Ankanin'ny Nofy.( IN CHALAND)", description: "Embark on the private motorized chaland. Cruise along the calm waters of the Pangalanes Canal to Ankanin'ny Nofy. Night excursion to spot the rare Aye-Aye lemur.", activities: ["Chaland cruise on Pangalanes canal", "All meals aboard chaland", "Nocturnal Aye-Aye lemur boat expedition"], accommodation: "Palmarium Reserve Bungalows", meals: "All meals included aboard chaland", distanceKm: 30, driveTimeHours: 2.5 },
      { day: 5, title: "Ankanin'ny Nofy Palmarium Exploration in Chaland", location: "Ankanin'ny Nofy ( in chaland)", description: "Explore the Palmarium reserve where lemurs come right up to greet you. Cruise on Lake Ampitabe and visit a local canal fishermen village.", activities: ["Palmarium lemur interaction", "Fishermen village visit", "Chaland lake navigation"], accommodation: "Palmarium Reserve Bungalows", meals: "All meals included aboard chaland", distanceKm: 20, driveTimeHours: 2 },
      { day: 6, title: "Ankanin'ny Nofy to Manambato in Chaland", location: "Ankanin'ny Nofy _ Manambato.( IN CHALAND)", description: "Return chaland voyage along the scenic Pangalanes canal back to Manambato. Enjoy the tranquility of nature and freshly prepared meals aboard.", activities: ["Morning canal cruise", "Birdwatching aboard chaland", "Transfer to overland lodge in Manambato"], accommodation: "Rasoabe Lodge", meals: "All meals included aboard chaland", distanceKm: 30, driveTimeHours: 2.5 },
      { day: 7, title: "Manambato to Antananarivo & Ivato Airport VIP Transfer", location: "Manambato _ Antananarivo + transfert to Ivato aéroport international flight. END", description: "Comfortable drive back to Antananarivo. VIP transfer directly to Ivato International Airport for your international flight departure.", activities: ["Scenic highland return drive", "Craft souvenir stop in Tana", "VIP transfer to Ivato International Airport"], accommodation: "End of Tour / International Departure", meals: "Breakfast", distanceKm: 260, driveTimeHours: 6 },
    ],
  },

  // 5. CIRCUITS MIXT WEST, EST, SUD 24 DAYS
  {
    id: "circuits-mixt-west-est-sud-24-days",
    title: "Circuits Mixt West, Est, Sud 24 Days — Grand Trans-Madagascar Expedition",
    subtitle: "The ultimate comprehensive Madagascar journey: Eastern rainforests, RN7 granite peaks, Mozambique speedboats at Anakao, wild 4x4 tracks to Morondava, and Grand Tsingy.",
    region: "mixed",
    regionLabel: "West, East & South Madagascar",
    durationDays: 24,
    durationNights: 23,
    basePriceEUR: 2370, // 4740 / 2
    heroImage: "/tours/tsaranoro-valley.jpg",
    gallery: [
      "/tours/tsaranoro-valley.jpg",
      "/tours/baobab-4x4.jpg",
      "/tours/ernest-isalo.jpg",
      "/tours/ringtailed-lemur.jpg",
      "/tours/coastal-hut.jpg",
    ],
    rating: 5.0,
    reviewsCount: 47,
    routeOverview: [
      "Antananarivo",
      "Andasibe Mantadia",
      "Antsirabe",
      "Ambositra",
      "Ranomafana",
      "Ambalavao",
      "Ranohira (Isalo)",
      "Tuléar",
      "Anakao (Fast Boat)",
      "Ifaty Beach",
      "Manja 4x4",
      "Morondava Baobabs",
      "Kirindy Forest",
      "Bekopaka (Tsingy)",
      "Ivato Airport",
    ],
    highlights: [
      "Comprehensive 24-day journey covering the East Rainforest, South RN7 & West Tsingy-Baobab circuits",
      "Speedboat crossing across the Mozambique Channel to the remote fishing haven of Anakao",
      "Full expeditions in UNESCO Grand Tsingy de Bemaraha, Isalo National Park, and Ranomafana",
      "Sunset champagne celebration at Avenue of the Baobabs and visit to Baobab Amoureux",
      "Multiple river ferry (BAC) crossings over the wild Bevoay, Tsiribihina, and Manambolo rivers",
    ],
    bestSeason: "May to November (Dry season optimal for remote tracks and Tsingy access)",
    physicalLevel: "Challenging",
    tieredPricing: {
      twoGuestsEUR: 4740, // 2370 € / person
      threeToFourGuestsEUR: 6580, // 1645 € - 2193.33 € / person
      groupPerPersonEUR: 1840, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Madagascar National Park visits (fauna and flora across 5 national parks)",
      "Village visits and cultural immersion with local communities",
      "Excursions, sea picnics, and snorkeling in pristine Mozambique Channel lagoons",
      "Travel by traditional outrigger canoe and fast speedboat transfers",
      "Via ferrata climbing in the gateway of the Grand Tsingy",
      "Trekking across diverse ecosystems from rainforests to sandstone canyons",
    ],
    included: [
      "Overnight hosting Hotel days 23",
      "Vehicle for rent with fuel for all trips (departure Antananarivo and return Antananarivo)",
      "Entrance to National Parks and local guidance during all trip days",
      "Boat transfers Anakao – Tuléar – Anakao",
      "Baobab tour and sunset on Baobab Avenue (car park visit)",
      "Tray (BAC) ferry crossings for the Bevoay, Tsiribihina, and Manambolo rivers",
      "Communal tax",
    ],
    notIncluded: [
      "Restaurant (meals) during trip days",
      "Personal needs and tips",
      "Mineral water during trip days",
      "International flights",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Andasibe Mantadia", location: "Antananarivo _ Andasibe Mantadia", description: "Drive east into the lush rain forest escarpment with reptile safari at Peyreras reserve.", activities: ["Scenic drive", "Peyreras reptile park", "Night lemur walk"], accommodation: "Vakona Forest Lodge", meals: "Dinner included", distanceKm: 145, driveTimeHours: 3.5 },
      { day: 2, title: "Andasibe Mantadia National Park", location: "Andasibe Mantadia", description: "Track the world-famous Indri Indri, diademed sifakas, and exotic orchids in primary forest.", activities: ["Indri Indri tracking", "Vakona Lemur Island"], accommodation: "Vakona Forest Lodge", meals: "Breakfast & Dinner", distanceKm: 25, driveTimeHours: 1 },
      { day: 3, title: "Andasibe Mantadia to Antsirabe", location: "Andasibe Mantadia _ Antsirabe", description: "Cross from the eastern rainforests through the high mountain plateau to the thermal spa city of Antsirabe.", activities: ["Highland scenic drive", "Antsirabe city tour by rickshaw"], accommodation: "Couleur Café", meals: "Breakfast & Dinner", distanceKm: 310, driveTimeHours: 6.5 },
      { day: 4, title: "Antsirabe to Ambositra (Woodcarving Capital)", location: "Antsirabe _ Ambositra", description: "Drive south through volcanic landscapes to Ambositra, center of Zafimaniry UNESCO woodcraft.", activities: ["Woodcarving workshops", "Artisan market"], accommodation: "Artisan Hotel", meals: "Breakfast & Dinner", distanceKm: 90, driveTimeHours: 2 },
      { day: 5, title: "Ambositra to Ranomafana National Park", location: "Ambositra _ Ranomafana", description: "Descend into the cloud forests of Ranomafana. Evening walk to spot chameleons and frogs.", activities: ["Cloud forest drive", "Nocturnal walk"], accommodation: "Setam Lodge / Thermal Hotel", meals: "Breakfast & Dinner", distanceKm: 140, driveTimeHours: 3.5 },
      { day: 6, title: "Ranomafana Cloud Forest Safari", location: "Ranomafana", description: "Full day tracking the endangered Golden Bamboo Lemur, Greater Bamboo Lemur, and endemic birds.", activities: ["Bamboo lemur safari", "Rainforest waterfall walk"], accommodation: "Setam Lodge", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 7, title: "Ranomafana to Ambalavao via Anja Reserve", location: "Ranomafana _Ambalavao", description: "Drive through Fianarantsoa to Ambalavao. Visit Anja Reserve to see ring-tailed lemurs.", activities: ["Anja ring-tailed lemurs", "Antemoro paper factory"], accommodation: "Betsileo Country Lodge", meals: "Breakfast & Dinner", distanceKm: 120, driveTimeHours: 3 },
      { day: 8, title: "Ambalavao to Ranohira (Isalo)", location: "Ambalavao _ Ranohira (Isalo)", description: "Cross the vast Horombe savannah plateau to the sandstone canyons of Isalo.", activities: ["Horombe plateau transit", "Sunset at Isalo Window"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 240, driveTimeHours: 4.5 },
      { day: 9, title: "Isalo National Park Trekking", location: "Ranohira (Isalo)", description: "Trek through Isalo canyons, swim in the Piscine Naturelle, and explore Namaza canyon.", activities: ["Piscine Naturelle swim", "Canyon trekking", "Lemur spotting"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 30, driveTimeHours: 1 },
      { day: 10, title: "Ranohira (Isalo) to Tuléar", location: "Ranohira (Isalo)_ Tuléar", description: "Drive through sapphire boomtown Ilakaka and Mahafaly tombs to the coastal port of Tuléar.", activities: ["Sapphire mining region", "Mahafaly tombs", "Tuléar sea market"], accommodation: "Moringa Hotel", meals: "Breakfast & Dinner", distanceKm: 240, driveTimeHours: 4 },
      { day: 11, title: "Tuléar to Anakao in Fast Boat", location: "Tuléar _ Anakao. ( Fast boat transfert on the Mozambique canal)", description: "Board the morning speedboat transfer across the Mozambique Channel to the idyllic fishing haven of Anakao.", activities: ["Speedboat crossing on Mozambique channel", "Anakao white sand arrival"], accommodation: "Anakao Ocean Lodge / Safari Vezo", meals: "Breakfast & Dinner", distanceKm: 40, driveTimeHours: 1 },
      { day: 12, title: "Anakao Marine Paradise & Nosy Ve", location: "Anakao", description: "Day in Anakao. Take a traditional pirogue to Nosy Ve island to view red-tailed tropicbirds and snorkel pristine coral reefs.", activities: ["Nosy Ve pirogue excursion", "Coral reef snorkeling", "Vezo fishermen village"], accommodation: "Anakao Ocean Lodge", meals: "Breakfast & Dinner", distanceKm: 15, driveTimeHours: 0.5 },
      { day: 13, title: "Anakao Return to Tuléar in Fast Boat to Ifaty", location: "Anakao _ Tuléar ( return fast boat transfert on the Mozambique canal) _ Ifaty", description: "Morning return speedboat to Tuléar. Board our 4x4 and drive north to the coastal resort of Ifaty.", activities: ["Speedboat return crossing", "4x4 drive to Ifaty", "Sunset on Ifaty lagoon"], accommodation: "Le Paradisier / Dunes d'Ifaty", meals: "Breakfast & Dinner", distanceKm: 50, driveTimeHours: 1.5 },
      { day: 14, title: "Ifaty Lagoon & Spiny Desert", location: "Ifaty", description: "Explore the ancient Baobab Spiny Forest at Reniala Reserve. Afternoon relaxed swimming or lagoon sailing.", activities: ["Reniala baobab forest walk", "Lagoon relaxation"], accommodation: "Le Paradisier", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 15, title: "Ifaty to Manja Wild 4x4 Track", location: "Ifaty _ Manja", description: "Embark on the legendary western 4x4 safari track across dry bush and river beds to Manja.", activities: ["Wild 4x4 trail", "Mangoky river crossing"], accommodation: "Hotel Kanto Manja", meals: "Breakfast & Dinner", distanceKm: 210, driveTimeHours: 7 },
      { day: 16, title: "Manja to Morondava via Bevoay Ferry", location: "Manja _ Morondava", description: "Cross the Bevoay river by ferry and drive past towering baobabs into coastal Morondava.", activities: ["Bevoay BAC ferry", "Arrival in Morondava"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 160, driveTimeHours: 6 },
      { day: 17, title: "Morondava to Kirindy Forest", location: "Morondava _ Kirindy forest", description: "Drive north to Kirindy reserve. Afternoon and nocturnal safaris tracking Fossa and lemurs.", activities: ["Baobab alley drive", "Kirindy night safari"], accommodation: "Relais du Kirindy", meals: "Breakfast & Dinner", distanceKm: 60, driveTimeHours: 2 },
      { day: 18, title: "Kirindy Forest to Bekopaka (Tsingy)", location: "Kirindy forest _ Bekopaka", description: "Cross the Tsiribihina and Manambolo rivers by BAC ferries into the realm of the Tsingy.", activities: ["Double BAC ferry crossings", "Off-road 4x4 adventure"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 5 },
      { day: 19, title: "Grand Tsingy de Bemaraha Expedition", location: "Bekopaka", description: "Scale the limestone needles of the Grand Tsingy via suspension bridges and cathedral caves.", activities: ["Grand Tsingy via ferrata climbing gateway", "Suspension bridge", "Lookout towers"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 35, driveTimeHours: 1.5 },
      { day: 20, title: "Petits Tsingy & Manambolo River Pirogue", location: "Bekopaka", description: "Pirogue exploration of the Manambolo gorge and hiking through the Petits Tsingy stone labyrinth.", activities: ["Manambolo gorge pirogue", "Petits Tsingy walk"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 21, title: "Bekopaka to Morondava & Baobabs Sunset", location: "Bekopaka _Morondava", description: "Return drive crossing the ferries. Celebrate sunset beneath the giants of the Avenue of the Baobabs.", activities: ["Baobab sunset celebration", "Baobab in Love visit"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 190, driveTimeHours: 7 },
      { day: 22, title: "Morondava to Antsirabe", location: "Morondava _ Antsirabe", description: "Drive eastward across the Menabe savannah through Miandrivazo back up to Antsirabe.", activities: ["Scenic cross-island drive", "Highland arrival"], accommodation: "Couleur Café", meals: "Breakfast & Dinner", distanceKm: 480, driveTimeHours: 9 },
      { day: 23, title: "Antsirabe to Antananarivo & Ivato International Airport", location: "Antsirabe _ Antananarivo, transfert Ivato aéroport international flight (END)", description: "Final drive back to Antananarivo. Digue artisan market shopping, then direct transfer to Ivato Airport for your international flight departure. End of tour.", activities: ["Highland return drive", "Handicraft market visit", "Ivato International Airport transfer"], accommodation: "End of Tour / Flight Departure", meals: "Breakfast", distanceKm: 170, driveTimeHours: 3.5 },
    ],
  },

  // 6. CIRCUITS SUD-OUEST 19 JOURS
  {
    id: "circuits-sud-ouest-19-jours",
    title: "Circuits Sud-Ouest 19 Jours — RN7 Highlands, Ifaty Beach & Tsingy Safari",
    subtitle: "19 Days through Antsirabe, Ranomafana rainforest, Isalo canyons, Ifaty beach, traditional canoe in Mozambique Channel, Grand Tsingy, and Baobabs with multilingual guide.",
    region: "south",
    regionLabel: "South-West Madagascar",
    durationDays: 19,
    durationNights: 18,
    basePriceEUR: 1882.5, // 3765 / 2
    heroImage: "/tours/ernest-isalo.jpg",
    gallery: [
      "/tours/ernest-isalo.jpg",
      "/tours/baobab-4x4.jpg",
      "/tours/ringtailed-lemur.jpg",
      "/tours/tsiribihina-camp.jpg",
      "/tours/coastal-hut.jpg",
    ],
    rating: 4.96,
    reviewsCount: 52,
    routeOverview: [
      "Antananarivo",
      "Antsirabe",
      "Ambositra",
      "Ranomafana",
      "Fianarantsoa",
      "Ambalavao",
      "Ranohira (Isalo)",
      "Ifaty Beach",
      "Manja 4x4",
      "Morondava Baobabs",
      "Bekopaka (Tsingy)",
      "Kirindy Forest",
      "Ivato Airport",
    ],
    highlights: [
      "Dedicated multilingual Malagasy driver and guide (fluent French, English, Spanish)",
      "Complete RN7 highlights: Ranomafana rainforest, Anja ring-tailed lemurs, and Isalo canyons",
      "Excursion & picnic by traditional canoe in the Mozambique Channel with snorkeling at Ifaty",
      "Overland 4x4 expedition through UNESCO Grand Tsingy de Bemaraha and Kirindy dry forest",
      "Golden hour photography and sunset celebration at the Avenue of the Baobabs",
      "Cultural village visits including Antsirabe rickshaw tours and Morondava fishermen settlements",
    ],
    bestSeason: "May to November (Optimal dry season for RN7 and Tsingy access)",
    physicalLevel: "Moderate",
    tieredPricing: {
      twoGuestsEUR: 3765, // 1882.50 € / person
      threeToFourGuestsEUR: 5285, // 1321.25 € - 1761.66 € / person
      groupPerPersonEUR: 1420, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Madagascar National Park visits (fauna and flora across Ranomafana, Isalo, Tsingy, Kirindy, Anja)",
      "Excursions picnic travel by traditional canoe in the Mozambique channel, snorkeling",
      "Village visits (rickshaw Antsirabe visit, fishermen's village Morondava, etc.)",
      "Trekking across tropical rainforests, sandstone canyons, and karst pinnacles",
      "Climbing in the gateway via ferrata at Grand Tsingy",
    ],
    included: [
      "Accommodation 18 days of travel in comfortable hotels and eco-lodges",
      "Vehicle for rent with fuel in all trip days (departure Antananarivo and return Antananarivo)",
      "Driver and guide spoken French, English, Spanish",
      "Madagascar National Park entry fee and local guide to visit during our circuits (in every national park)",
      "BAC (engine boat) ferry crossings to cross the Bevoay, Tsiribihina, and Manambolo rivers",
      "Village visits (rickshaw Antsirabe visit, fishermen's village Morondava, etc.)",
      "Communal tax",
    ],
    notIncluded: [
      "Restaurant (meals) during our trip days",
      "Personal needs and tips",
      "Mineral water during our trip days",
      "International flights",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Antsirabe", location: "Antananarivo _ Antsirabe", description: "Drive south through the central highlands with artisan stop at Ambatolampy. Arrive in thermal city Antsirabe.", activities: ["Scenic highland drive", "Ambatolampy foundry", "Antsirabe city rickshaw tour"], accommodation: "Couleur Café", meals: "Dinner included", distanceKm: 170, driveTimeHours: 3.5 },
      { day: 2, title: "Antsirabe to Ambositra", location: "Antsirabe _ Ambositra", description: "Journey into the center of Zafimaniry woodcraft at Ambositra. Discover master woodcarvers and marquetry.", activities: ["Woodcarving ateliers", "Highland market"], accommodation: "Artisan Hotel", meals: "Breakfast & Dinner", distanceKm: 90, driveTimeHours: 2 },
      { day: 3, title: "Ambositra to Ranomafana Rainforest", location: "Ambositra _ Ranomafana", description: "Descend into the tropical cloud forest of Ranomafana. Evening nocturnal walk to spot mouse lemurs and chameleons.", activities: ["Cloud forest drive", "Nocturnal wildlife walk"], accommodation: "Thermal Hotel / Setam Lodge", meals: "Breakfast & Dinner", distanceKm: 140, driveTimeHours: 3.5 },
      { day: 4, title: "Ranomafana to Fianarantsoa", location: "Ranomafana _ Fianarantsoa", description: "Morning rainforest trek for Golden Bamboo Lemurs. Afternoon drive to historical Fianarantsoa upper city.", activities: ["Bamboo lemur safari", "Fianarantsoa historic upper city walk"], accommodation: "Zomatel / Tsara Guest House", meals: "Breakfast & Dinner", distanceKm: 65, driveTimeHours: 1.5 },
      { day: 5, title: "Fianarantsoa to Ambalavao via Anja Reserve", location: "Fianarantsoa _ Ambalavao", description: "Drive to Ambalavao. Visit Anja Community Reserve to observe troops of wild ring-tailed lemurs.", activities: ["Anja ring-tailed lemurs walk", "Antemoro paper and silk workshops"], accommodation: "Betsileo Country Lodge", meals: "Breakfast & Dinner", distanceKm: 55, driveTimeHours: 1.5 },
      { day: 6, title: "Ambalavao to Ranohira (Isalo)", location: "Ambalavao _ Ranohira Isalo", description: "Cross the vast Horombe grasslands into the jurassic sandstone ruins of Isalo National Park.", activities: ["Horombe plateau drive", "Sunset at Isalo Window"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 240, driveTimeHours: 4.5 },
      { day: 7, title: "Isalo National Park Trekking", location: "Ranohira Isalo", description: "Full day trek through Isalo's dramatic canyons. Swim in the crystal Piscine Naturelle and hike Namaza.", activities: ["Piscine Naturelle swim", "Canyon hike", "Lemur spotting"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 30, driveTimeHours: 1 },
      { day: 8, title: "Ranohira (Isalo) to Ifaty Beach", location: "Ranohira Isalo _ Ifaty", description: "Drive through the sapphire boomtown of Ilakaka and Mahafaly tombs to the coral beaches of Ifaty.", activities: ["Mahafaly tombs", "Sapphire town Ilakaka", "Arrival at oceanfront beach resort"], accommodation: "Le Paradisier / Dunes d'Ifaty", meals: "Breakfast & Dinner", distanceKm: 270, driveTimeHours: 5 },
      { day: 9, title: "Ifaty Lagoon — Traditional Canoe & Snorkeling", location: "Ifaty", description: "Excursion in traditional Vezo outrigger canoe on the Mozambique Channel with picnic and snorkeling.", activities: ["Traditional canoe sailing", "Barrier reef snorkeling", "Reniala baobab forest visit"], accommodation: "Le Paradisier", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 10, title: "Ifaty to Manja 4x4 Safari Track", location: "Ifaty _ Manja", description: "Head north along the wild coastal 4x4 trail crossing the Mangoky river to the inland town of Manja.", activities: ["Wild off-road 4x4 track", "Mangoky river crossing"], accommodation: "Hotel Kanto Manja", meals: "Breakfast & Dinner", distanceKm: 210, driveTimeHours: 7 },
      { day: 11, title: "Manja to Morondava", location: "Manja _ Morondava", description: "Cross the Bevoay river by ferry boat and drive past towering baobab savannah into Morondava.", activities: ["Bevoay BAC ferry", "Baobab forest drive"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 160, driveTimeHours: 6 },
      { day: 12, title: "Morondava to Bekopaka (Tsingy)", location: "Morondava _ Bekopaka", description: "Journey north across the Tsiribihina and Manambolo rivers on motorized ferry boats to Bekopaka.", activities: ["Double BAC ferry crossings", "4x4 track to Tsingy"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 190, driveTimeHours: 7 },
      { day: 13, title: "Grand Tsingy de Bemaraha", location: "Bekopaka", description: "Full day scaling the razor limestone needles and crossing the suspension bridge of Grand Tsingy.", activities: ["Grand Tsingy via ferrata climbing gateway", "Suspension bridge", "Cathedral caves"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 35, driveTimeHours: 1.5 },
      { day: 14, title: "Bekopaka to Kirindy Forest", location: "Bekopaka _ Kirindy forest", description: "Cross the ferries south to Kirindy reserve. Night walk tracking Fossa and mouse lemurs.", activities: ["BAC ferry crossings", "Kirindy nocturnal wildlife safari"], accommodation: "Relais du Kirindy", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 5 },
      { day: 15, title: "Kirindy Forest to Morondava & Baobabs Sunset", location: "Kirindy forest _ Morondava", description: "Morning wildlife walk in Kirindy. Sunset celebration beneath the majestic Avenue of the Baobabs.", activities: ["Kirindy morning walk", "Baobabs in Love", "Avenue of the Baobabs sunset"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 60, driveTimeHours: 2 },
      { day: 16, title: "Morondava Seaside Leisure & Fishermen Village", location: "Morondava", description: "Restful day in Morondava. Visit the local Betania fishermen village and relax by the sea.", activities: ["Betania fishermen village tour", "Seafood dining", "Beach rest"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 10, driveTimeHours: 0.5 },
      { day: 17, title: "Morondava to Antsirabe", location: "Morondava _ Antsirabe", description: "Overland drive east across the Menabe savannah and through Miandrivazo back up to Antsirabe.", activities: ["Scenic cross-country drive", "Menabe plains to highland ascent"], accommodation: "Couleur Café", meals: "Breakfast & Dinner", distanceKm: 480, driveTimeHours: 9 },
      { day: 18, title: "Antsirabe to Antananarivo & Ivato Airport Flight", location: "Antsirabe _ Antananarivo, transfert Ivato aéroport international flight ( END)", description: "Return drive to Antananarivo. Visit the artisan craft markets, then transfer directly to Ivato International Airport for your international flight departure. End of tour.", activities: ["Highland return drive", "Handicraft market shopping", "Ivato International Airport transfer"], accommodation: "End of Tour / Flight Departure", meals: "Breakfast", distanceKm: 170, driveTimeHours: 3.5 },
    ],
  },

  // 7. CIRCUITS MIXT SUD _WEST _ EST 21 DAYS
  {
    id: "circuits-mixt-sud-west-est-21-days",
    title: "Circuits Mixt Sud_West_Est 21 Days — Tsingy, Belo sur Mer, Isalo, Manakara & Andasibe",
    subtitle: "21 Days grand tour spanning western karst Tsingy, coastal Belo sur Mer & Ifaty, Isalo canyons, southeast Pangalanes at Manakara, and eastern Indri rainforest.",
    region: "mixed",
    regionLabel: "West, South & East Madagascar",
    durationDays: 21,
    durationNights: 20,
    basePriceEUR: 2322.5, // 4645 / 2
    heroImage: "/tours/ernest-andohahela.jpg",
    gallery: [
      "/tours/ernest-andohahela.jpg",
      "/tours/baobab-4x4.jpg",
      "/tours/canal-pangalanes.jpg",
      "/tours/ernest-isalo.jpg",
      "/tours/coastal-hut.jpg",
    ],
    rating: 4.99,
    reviewsCount: 41,
    routeOverview: [
      "Antananarivo",
      "Antsirabe",
      "Kirindy Forest",
      "Bekopaka (Tsingy)",
      "Morondava Baobabs",
      "Belo sur Mer",
      "Ifaty Beach",
      "Ranohira (Isalo)",
      "Ambalavao",
      "Ranomafana",
      "Manakara",
      "Ambositra",
      "Andasibe Mantadia",
      "Ivato Airport",
    ],
    highlights: [
      "Complete cross-island loop connecting the dry west, turquoise south, southeast canal, and misty eastern rainforests",
      "Marine excursions in Belo sur Mer dhow boatyard, Morondava, Ifaty, and Manakara Pangalanes",
      "Scale the razor-sharp karst limestone spires & suspension bridges of UNESCO Grand Tsingy de Bemaraha",
      "Hike the canyons of Isalo National Park, swim in natural emerald springs, and spot dancing Sifakas",
      "Hear the dawn territorial wails of the giant Indri Indri lemurs in Andasibe Mantadia",
    ],
    bestSeason: "May to November",
    physicalLevel: "Moderate",
    tieredPricing: {
      twoGuestsEUR: 4645, // 2322.50 € / person
      threeToFourGuestsEUR: 6325, // 1581.25 € - 2108.33 € / person
      groupPerPersonEUR: 1680, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Madagascar National Park visit fauna and flora across 5 major ecosystems",
      "Excursions in the sea at Belo sur Mer, Morondava, Ifaty, Manakara",
      "Trekking across canyons, rainforests, and savannahs",
      "Climbing in gateway via ferrata at Grand Tsingy",
      "Avenue of the Baobabs sunset celebration and Baobab Amoureux visit",
    ],
    included: [
      "Overnight hosting Hotel 21 days",
      "Vehicle for rent with fuel in all the trips",
      "Accommodation and food for driver and national escort guide",
      "Entrance fee and local guide in the Madagascar National Parks to visit during our circuits",
      "Tray (BAC) ferry crossings to cross the Bevoay, Tsiribihina, and Manambolo rivers",
      "Communal tax and tour Baobab lovers and car park visit sunset on the Baobab Avenue",
    ],
    notIncluded: [
      "Restaurant (breakfast, lunch, dinner) during trip days apart from excursions travel in the sea",
      "Personal needs and tips",
      "Mineral water during trip days",
      "International airfare",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Antsirabe", location: "Antananarivo _ Antsirabe", description: "Drive south through highland rice terraces to Antsirabe.", activities: ["Scenic drive", "Ambatolampy foundry", "Antsirabe city tour"], accommodation: "Couleur Café", meals: "Dinner included", distanceKm: 170, driveTimeHours: 3.5 },
      { day: 2, title: "Antsirabe to Kirindy Forest", location: "Antsirabe _ Kirindy forest", description: "Cross into western plains to Kirindy dry reserve. Night safari for Fossa and lemurs.", activities: ["Western plains drive", "Kirindy nocturnal safari"], accommodation: "Relais du Kirindy", meals: "Breakfast & Dinner", distanceKm: 380, driveTimeHours: 8 },
      { day: 3, title: "Kirindy Forest to Bekopaka (Tsingy)", location: "Kirindy forest _ Bekopaka", description: "Cross Tsiribihina and Manambolo rivers by BAC ferries to Bekopaka.", activities: ["BAC ferry crossings", "4x4 track to Tsingy"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 5 },
      { day: 4, title: "Grand Tsingy de Bemaraha", location: "Bekopaka", description: "Full day scaling the UNESCO Grand Tsingy via suspension bridges and cathedral caves.", activities: ["Grand Tsingy via ferrata climbing gateway", "Suspension bridge", "Viewpoints"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 35, driveTimeHours: 1.5 },
      { day: 5, title: "Bekopaka to Morondava & Baobabs Sunset", location: "Bekopaka _ Morondava", description: "Drive south crossing the ferries. Sunset toast at the world-famous Avenue of the Baobabs.", activities: ["Ferry crossings", "Baobab in Love", "Avenue of the Baobabs sunset"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 190, driveTimeHours: 7 },
      { day: 6, title: "Morondava Coastal Leisure", location: "Morondava", description: "Relax by the Mozambique Channel or visit the local Betania fishermen village.", activities: ["Betania fishermen village", "Seafood dining", "Beach rest"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 10, driveTimeHours: 0.5 },
      { day: 7, title: "Morondava to Belo sur Mer Wild 4x4 Track", location: "Morondava _ Belo sur Mer", description: "Drive south along the coastal salt pans and baobab tracks to the tranquil fishing village of Belo sur Mer.", activities: ["Coastal 4x4 track", "Artisanal wooden schooner shipyard visit"], accommodation: "Ecolodge du Menabe / Hotel Entremer", meals: "Breakfast & Dinner", distanceKm: 80, driveTimeHours: 3.5 },
      { day: 8, title: "Belo sur Mer Marine Excursion", location: "Belo sur Mer", description: "Sailing in traditional pirogue to pristine coral islets with beach picnic and snorkeling.", activities: ["Marine pirogue excursion", "Reef snorkeling", "Beach picnic"], accommodation: "Ecolodge du Menabe", meals: "Breakfast & Dinner", distanceKm: 15, driveTimeHours: 1 },
      { day: 9, title: "Belo sur Mer to Ifaty Beach", location: "Belo sur Mer _ Ifaty", description: "Epic 4x4 trail traversing southern spiny bush and crossing the Mangoky river to Ifaty.", activities: ["Wild 4x4 safari trail", "Mangoky river crossing", "Arrival at Ifaty beach resort"], accommodation: "Le Paradisier / Dunes d'Ifaty", meals: "Breakfast & Dinner", distanceKm: 260, driveTimeHours: 8 },
      { day: 10, title: "Ifaty Beach & Reniala Spiny Forest", location: "Ifaty", description: "Morning walk in Reniala Baobab Spiny Forest. Afternoon snorkeling or relaxing on the beach.", activities: ["Reniala ancient baobabs", "Lagoon snorkeling", "Beach rest"], accommodation: "Le Paradisier", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 11, title: "Ifaty to Ranohira (Isalo)", location: "Ifaty _ Ranohira Isalo", description: "Drive inland past sapphire boomtown Ilakaka to the jurassic sandstone canyons of Isalo.", activities: ["Ilakaka sapphire town", "Sunset at Isalo Window"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 270, driveTimeHours: 5 },
      { day: 12, title: "Isalo National Park Trekking", location: "Ranohira Isalo", description: "Trek through the canyons of Isalo, swim in the Piscine Naturelle, and spot ring-tailed lemurs.", activities: ["Piscine Naturelle swim", "Canyon trek", "Lemur spotting"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 30, driveTimeHours: 1 },
      { day: 13, title: "Ranohira (Isalo) to Ambalavao via Anja Reserve", location: "Ranohira Isalo _ Ambalavao", description: "Cross the Horombe plateau to Ambalavao. Visit Anja Community Reserve for ring-tailed lemurs.", activities: ["Anja ring-tailed lemurs", "Antemoro paper atelier"], accommodation: "Betsileo Country Lodge", meals: "Breakfast & Dinner", distanceKm: 240, driveTimeHours: 4.5 },
      { day: 14, title: "Ambalavao to Ranomafana Rainforest", location: "Ambalavao _ Ranomafana", description: "Descend into the tropical cloud forest of Ranomafana. Evening nocturnal wildlife safari.", activities: ["Cloud forest drive", "Nocturnal rain forest walk"], accommodation: "Setam Lodge / Thermal Hotel", meals: "Breakfast & Dinner", distanceKm: 120, driveTimeHours: 3 },
      { day: 15, title: "Ranomafana National Park Safari", location: "Ranomafana", description: "Morning trek tracking the rare Golden Bamboo Lemur and Milne-Edwards Sifakas.", activities: ["Golden Bamboo Lemur tracking", "Rainforest waterfalls"], accommodation: "Setam Lodge", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 16, title: "Ranomafana to Manakara (East Coast)", location: "Ranomafana _ Manakara", description: "Descend the lush eastern escarpment to the coastal colonial port of Manakara on the Indian Ocean.", activities: ["Lush escarpment drive", "Arrival on the east coast at Manakara"], accommodation: "Hotel Parthenay Club / Hotel H1", meals: "Breakfast & Dinner", distanceKm: 150, driveTimeHours: 4 },
      { day: 17, title: "Manakara Pangalanes Canal Excursion", location: "Manakara", description: "Day cruise on the Pangalanes Canal in traditional pirogue. Visit fishermen's villages, essential oil distilleries, and enjoy a seaside picnic lunch.", activities: ["Pangalanes canal pirogue cruise", "Local vanilla and essential oil discovery", "Beach seafood picnic"], accommodation: "Hotel Parthenay Club", meals: "Breakfast & Dinner", distanceKm: 25, driveTimeHours: 1 },
      { day: 18, title: "Manakara to Ambositra", location: "Manakara _ Ambositra", description: "Ascend from the coast back to the highlands to Ambositra, center of Zafimaniry woodcraft.", activities: ["Scenic mountain ascent", "Zafimaniry woodcarving workshops"], accommodation: "Artisan Hotel", meals: "Breakfast & Dinner", distanceKm: 280, driveTimeHours: 6.5 },
      { day: 19, title: "Ambositra to Andasibe Mantadia", location: "Ambositra _ Andasibe Mantadia", description: "Drive north along the RN7 and branch east into the mist-covered primary rainforest of Andasibe.", activities: ["Highland scenic drive", "Arrival in Andasibe rainforest", "Night walk"], accommodation: "Vakona Forest Lodge", meals: "Breakfast & Dinner", distanceKm: 310, driveTimeHours: 6.5 },
      { day: 20, title: "Andasibe Mantadia National Park Safari", location: "Andasibe Mantadia", description: "Full day tracking the giant Indri Indri, diademed sifakas, and visiting Vakona Lemur Island.", activities: ["Indri Indri morning safari", "Vakona Lemur Island visit", "Primary rainforest flora"], accommodation: "Vakona Forest Lodge", meals: "Breakfast & Dinner", distanceKm: 25, driveTimeHours: 1 },
      { day: 21, title: "Andasibe Mantadia to Antananarivo & Ivato Airport Flight", location: "Andasibe Mantadia _ Antananarivo, transfert Ivato aéroport international flight END", description: "Drive back to Antananarivo. Brief stop at the artisan craft market, then transfer directly to Ivato International Airport for your international flight departure. End of tour.", activities: ["Scenic drive to Tana", "Handicraft market shopping", "Ivato International Airport transfer"], accommodation: "End of Tour / Flight Departure", meals: "Breakfast", distanceKm: 160, driveTimeHours: 4 },
    ],
  },

  // 8. CIRCUITS SUD_WEST 15 DAYS
  {
    id: "circuits-sud-west-15-days",
    title: "Circuits Sud_West 15 Days — Grand Tsingy, Baobabs, Ifaty Beach & Isalo Canyons",
    subtitle: "15 Days high-impact overland loop: UNESCO Grand Tsingy, Avenue of the Baobabs, Mozambique Channel at Ifaty, and the deep sandstone canyons of Isalo.",
    region: "south",
    regionLabel: "South-West Madagascar",
    durationDays: 15,
    durationNights: 14,
    basePriceEUR: 1700, // 3400 / 2
    heroImage: "/tours/ernest-isalo.jpg",
    gallery: [
      "/tours/ernest-isalo.jpg",
      "/tours/baobab-4x4.jpg",
      "/tours/ringtailed-lemur.jpg",
      "/tours/tsaranoro-valley.jpg",
      "/tours/coastal-hut.jpg",
    ],
    rating: 4.98,
    reviewsCount: 67,
    routeOverview: [
      "Antananarivo",
      "Antsirabe",
      "Morondava",
      "Kirindy Forest",
      "Bekopaka (Tsingy)",
      "Ifaty Beach",
      "Ranohira (Isalo)",
      "Ambalavao",
      "Ranomafana",
      "Ambositra",
      "Ivato Airport",
    ],
    highlights: [
      "Scale the limestone spires & hanging bridges of UNESCO Grand Tsingy de Bemaraha",
      "Golden hour celebration and champagne toast at the Avenue of the Baobabs",
      "Excursions and beach picnic on the Mozambique Channel at Ifaty lagoon",
      "Trek through the majestic sandstone canyons and natural pools of Isalo National Park",
      "Encounter wild troops of ring-tailed lemurs at Anja Community Reserve and bamboo lemurs in Ranomafana",
    ],
    bestSeason: "May to November (Dry season optimal for Tsingy access and trekking)",
    physicalLevel: "Moderate",
    tieredPricing: {
      twoGuestsEUR: 3400, // 1700 € / person
      threeToFourGuestsEUR: 4600, // 1150 € - 1533.33 € / person
      groupPerPersonEUR: 1200, // for 5+ persons
      customDurationNote: "Can reduce or increase days according to your holiday stay. Different rates follow your stay and duration.",
    },
    activitiesList: [
      "Madagascar National Park visit fauna and flora across 4 major national parks",
      "Village visits and cultural encounters (Antsirabe, Vezo fishermen, Betsileo artisans)",
      "Climbing in the gateway via ferrata at Grand Tsingy",
      "Trekking in Isalo canyons and Ranomafana cloud forest",
      "Excursions, picnic travel in the sea at Ifaty and Morondava",
    ],
    included: [
      "Overnight hosting 15 days in selected hotels and eco-lodges",
      "Vehicle for rent with fuel in all the trips",
      "Accommodation and food for driver and national escort guide",
      "Madagascar National Park visit fauna and flora",
      "Entrance fee and local guide to visit during our circuits",
      "Tray (BAC) ferry crossings to cross the Tsiribihina, Manambolo, and Bevoay rivers",
      "Communal tax and tour Baobab lovers and car park visit sunset on the Baobab Avenue",
    ],
    notIncluded: [
      "Restaurant (breakfast, lunch, dinner) during our trip days apart from excursions travel in the sea Ifaty, Morondava",
      "Personal needs and tips",
      "Mineral water during our trip days",
      "International flights",
    ],
    customDurationNote: "The different circuits can reduce or increase the days according to your holiday stay. Different rates follow your stay and duration.",
    days: [
      { day: 1, title: "Antananarivo to Antsirabe", location: "Antananarivo _ Antsirabe", description: "Drive south through the central highlands with artisan stop at Ambatolampy. Reach thermal spa city Antsirabe.", activities: ["Scenic highland drive", "Ambatolampy foundry", "Antsirabe city rickshaw tour"], accommodation: "Couleur Café", meals: "Dinner included", distanceKm: 170, driveTimeHours: 3.5 },
      { day: 2, title: "Antsirabe to Morondava", location: "Antsirabe _ Morondava", description: "Long scenic drive westward descending from the plateaus through Miandrivazo down to coastal Morondava.", activities: ["Plateau to western plains descent", "Arrival in Morondava by the Mozambique Channel"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 480, driveTimeHours: 9 },
      { day: 3, title: "Morondava to Kirindy Forest", location: "Morondava _ Kirindy forest", description: "Drive north into Kirindy reserve. Afternoon search for lemurs and evening spotlight night safari for Fossa.", activities: ["Baobab alley drive", "Kirindy nocturnal wildlife safari"], accommodation: "Relais du Kirindy", meals: "Breakfast & Dinner", distanceKm: 60, driveTimeHours: 2 },
      { day: 4, title: "Kirindy Forest to Bekopaka (Tsingy)", location: "Kirindy forest _ Bekopaka", description: "Cross the Tsiribihina and Manambolo rivers by BAC ferries into the realm of the Tsingy.", activities: ["Double BAC ferry crossings", "4x4 track to Tsingy"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 130, driveTimeHours: 5 },
      { day: 5, title: "Grand Tsingy de Bemaraha", location: "Bekopaka", description: "Full day scaling the razor limestone needles and crossing the suspension bridge of Grand Tsingy.", activities: ["Grand Tsingy via ferrata climbing gateway", "Suspension bridge", "Cathedral caves"], accommodation: "Soleil des Tsingy", meals: "Breakfast & Dinner", distanceKm: 35, driveTimeHours: 1.5 },
      { day: 6, title: "Bekopaka to Morondava & Baobabs Sunset", location: "Bekopaka _ Morondava", description: "Drive south crossing the ferries back to Morondava. Celebrate sunset beneath the giants of the Avenue of the Baobabs.", activities: ["Ferry crossings", "Baobab in Love", "Avenue of the Baobabs sunset"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 190, driveTimeHours: 7 },
      { day: 7, title: "Morondava Seaside Leisure", location: "Morondava", description: "Restful day in Morondava. Visit the local Betania fishermen village and relax by the sea.", activities: ["Betania fishermen village tour", "Seafood dining", "Beach rest"], accommodation: "Palissandre Côte Ouest", meals: "Breakfast & Dinner", distanceKm: 10, driveTimeHours: 0.5 },
      { day: 8, title: "Morondava to Ifaty Beach Wild 4x4 Track", location: "Morondava _ Ifaty", description: "Drive south along the wild coastal 4x4 trail crossing the Bevoay and Mangoky rivers to Ifaty.", activities: ["Wild 4x4 safari track", "Mangoky river crossing", "Arrival at Ifaty beach resort"], accommodation: "Le Paradisier / Dunes d'Ifaty", meals: "Breakfast & Dinner", distanceKm: 370, driveTimeHours: 10 },
      { day: 9, title: "Ifaty Beach & Spiny Desert Excursion", location: "Ifaty", description: "Traditional canoe sailing on Mozambique Channel, coral snorkeling, and walk through Reniala baobab spiny forest.", activities: ["Traditional canoe sailing", "Barrier reef snorkeling", "Reniala baobab forest walk"], accommodation: "Le Paradisier", meals: "Breakfast & Dinner", distanceKm: 20, driveTimeHours: 1 },
      { day: 10, title: "Ifaty to Ranohira (Isalo)", location: "Ifaty _ Ranohira Isalo", description: "Drive inland past sapphire boomtown Ilakaka to the jurassic sandstone canyons of Isalo.", activities: ["Ilakaka sapphire town", "Sunset at Isalo Window"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 270, driveTimeHours: 5 },
      { day: 11, title: "Isalo National Park Trekking", location: "Ranohira Isalo", description: "Trek through the canyons of Isalo, swim in the Piscine Naturelle, and spot ring-tailed lemurs.", activities: ["Piscine Naturelle swim", "Canyon trek", "Lemur spotting"], accommodation: "Le Jardin du Roy", meals: "Breakfast & Dinner", distanceKm: 30, driveTimeHours: 1 },
      { day: 12, title: "Ranohira (Isalo) to Ambalavao via Anja Reserve", location: "Ranohira Isalo _ Ambalavao", description: "Cross the Horombe plateau to Ambalavao. Visit Anja Community Reserve for ring-tailed lemurs.", activities: ["Anja ring-tailed lemurs", "Antemoro paper atelier"], accommodation: "Betsileo Country Lodge", meals: "Breakfast & Dinner", distanceKm: 240, driveTimeHours: 4.5 },
      { day: 13, title: "Ambalavao to Ranomafana Rainforest", location: "Ambalavao _ Ranomafana", description: "Descend into the tropical cloud forest of Ranomafana. Evening nocturnal wildlife safari.", activities: ["Cloud forest drive", "Nocturnal rain forest walk"], accommodation: "Setam Lodge / Thermal Hotel", meals: "Breakfast & Dinner", distanceKm: 120, driveTimeHours: 3 },
      { day: 14, title: "Ranomafana to Ambositra (Woodcarving Capital)", location: "Ranomafana _ Ambositra", description: "Morning rainforest trek for bamboo lemurs, then drive to Ambositra to discover Zafimaniry woodcarving.", activities: ["Rainforest bamboo lemur trek", "Zafimaniry woodcarving workshops"], accommodation: "Artisan Hotel", meals: "Breakfast & Dinner", distanceKm: 150, driveTimeHours: 3.5 },
      { day: 15, title: "Ambositra to Antananarivo & Ivato Airport Flight", location: "Ambositra _ Antananarivo, transfert Ivato aéroport international flight END", description: "Travel back up the RN7 highway to Antananarivo. Digue artisan market shopping, then direct transfer to Ivato Airport for your international flight departure. End of tour.", activities: ["Highland return drive", "Handicraft market shopping", "Ivato International Airport transfer"], accommodation: "End of Tour / Flight Departure", meals: "Breakfast", distanceKm: 260, driveTimeHours: 5.5 },
    ],
  },
];
