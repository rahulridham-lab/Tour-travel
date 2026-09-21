import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLanguageOption: LanguageOption;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive dictionary for English, Spanish, and French
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.tours': 'Tours & Circuits',
    'nav.planner': 'Custom Trip Planner',
    'nav.contact': 'Contact HQ',
    'nav.currency': 'Currency',
    'nav.language': 'Language',
    'nav.customPlan': 'Bespoke Quote',
    'nav.tagline': 'Tours • Antsirabe HQ',

    // Hero
    'hero.badge': 'Official Licensed Tour Operator in Madagascar • Antsirabe HQ',
    'hero.title': 'Bespoke Madagascar Safaris & Private 4x4 Expeditions',
    'hero.subtitle': 'Immerse in the untamed wonder of Madagascar with Soa Ernest. 100% private 4x4 vehicles, certified native trackers, and transparent local direct pricing with no middlemen.',
    'hero.exploreBtn': 'Explore Private Circuits',
    'hero.plannerBtn': 'Custom Trip Planner',
    'hero.whatsappBtn': 'Chat on WhatsApp',
    'hero.statFleet': '100% Private 4x4 Fleet',
    'hero.statGuides': 'Certified Native Trackers',
    'hero.statDirect': 'Direct Antsirabe Pricing',
    'hero.statSupport': '24/7 Field Concierge',

    // Hero Search Widget
    'search.region': 'Region / Zone',
    'search.duration': 'Trip Duration',
    'search.travelStyle': 'Travel Style',
    'search.allRegions': 'All Madagascar Regions',
    'search.west': 'West (Tsingy & Baobabs)',
    'search.south': 'South (RN7 & Isalo Canyons)',
    'search.east': 'East (Pangalanes & Rainforest)',
    'search.allDurations': 'Any Duration (7 - 21 Days)',
    'search.short': '7 - 9 Days Expedition',
    'search.medium': '10 - 13 Days Classic',
    'search.long': '14+ Days Grand Odyssey',
    'search.filterBtn': 'Find Matching Circuits',

    // Circuits & Tours
    'tours.title': 'Private Circuits & Wildlife Expeditions',
    'tours.subtitle': 'Every itinerary is 100% private, customizable, and conducted in high-clearance 4x4 with dedicated chauffeur and park naturalists.',
    'tours.tabAll': 'All Circuits',
    'tours.tabWest': 'West & Tsingy',
    'tours.tabSouth': 'South RN7 & Isalo',
    'tours.tabEast': 'East & Pangalanes',
    'tours.tabCustom': 'Custom Expeditions',
    'tours.from': 'From',
    'tours.perPerson': 'per person',
    'tours.days': 'Days',
    'tours.nights': 'Nights',
    'tours.physical': 'Physical Level',
    'tours.season': 'Best Season',
    'tours.viewDetails': 'View Day-by-Day Itinerary',
    'tours.bookCircuit': 'Book / Inquire',
    'tours.included': 'What is Included',
    'tours.notIncluded': 'What is Excluded',

    // Real Moments Gallery (Ernest's Client Photos)
    'gallery.badge': 'Real Tour Gallery',
    'gallery.title': 'Real Moments on the Road with Ernest',
    'gallery.subtitle': 'Authentic, unfiltered snapshots from our actual private expeditions across Madagascar. Real travelers, real 4x4 journeys, real Malagasy hospitality.',
    'gallery.viewFull': 'View Full Gallery',
    'gallery.baobabRoof': 'Sunset from the 4x4 roof at Avenue of the Baobabs (Morondava)',
    'gallery.canalPangalanes': 'Excursion on the Canal des Pangalanes with Spanish travelers (Manakara)',
    'gallery.tsiribihinaCamp': 'Safari camping on the white sand riverbank of Tsiribihina canyon gorge',
    'gallery.ernestAndohahela': 'Ernest at official UNESCO Parc National d\'Andohahela entrance',
    'gallery.ernestIsalo': 'Ernest scouting trails in the golden savannah of Isalo National Park',
    'gallery.ringtailedLemur': 'Wild Ring-Tailed Lemur (Maki) at Anja Community Reserve',
    'gallery.tsaranoroValley': 'Towering granite massifs & traditional rice paddies in Tsaranoro Valley',
    'gallery.coastalHut': 'Secluded rocky cove & ocean hut along Madagascar\'s coast',
    'gallery.highlandHills': 'Dramatic red earth and rolling highlands along Route Nationale 7',

    // Fleet & Value
    'fleet.badge': 'The Ernest Tours Distinction',
    'fleet.title': 'Private Fleet & Untamed Comfort',
    'fleet.subtitle': 'In a country where terrain can be rugged, our meticulously serviced Toyota Land Cruiser 4x4s and private river cruisers provide peerless reliability.',
    'fleet.chauffeur': 'Private Chauffeur & Naturalist',
    'fleet.chauffeurDesc': 'No shared buses or fixed tour groups. You set the departure hour, photo stops, and daily rhythm.',
    'fleet.safety': 'Comprehensive Overland Safety',
    'fleet.safetyDesc': 'Air conditioning, twin spare all-terrain tires, satellite communications, and first-aid gear.',
    'fleet.direct': 'Zero Middlemen Direct Value',
    'fleet.directDesc': 'Book directly with Ernest in Antsirabe. No foreign reseller markups—fair rates supporting local guides.',
    'fleet.tailored': '100% Tailor-Made Flexibility',
    'fleet.tailoredDesc': 'Adjust route anytime for birding, botanical quests, beach extensions, or photography.',

    // Planner
    'planner.badge': 'Interactive Expedition Builder',
    'planner.title': 'Custom Madagascar Trip Planner',
    'planner.subtitle': 'Configure your dream itinerary in 4 intuitive steps with instant live matching price preview.',
    'planner.step1': 'Party & Group Size',
    'planner.step2': 'Regions & Highlights',
    'planner.step3': 'Duration & Timing',
    'planner.step4': 'Fleet & Lodging Standards',
    'planner.step5': 'Your Custom Expedition Proposal',
    'planner.stepOf': 'Step',
    'planner.of': 'of',
    'planner.next': 'Next Step',
    'planner.back': 'Back',
    'planner.generate': 'Generate Custom Proposal',
    'planner.livePreview': 'Live Matching Price Preview',
    'planner.totalFor': 'Total for',
    'planner.guests': 'Guests',
    'planner.guest': 'Guest',
    'planner.confirmWhatsApp': 'Confirm & Book on WhatsApp',
    'planner.printPdf': 'Print / Save PDF',
    'planner.editSpecs': 'Edit Specs',

    // About
    'about.title': 'Bespoke Malagasy Hospitality & Untamed Safaris',
    'about.subtitle': 'Founded by Soa Ernest in Antsirabe, we are an official licensed Malagasy tour operator delivering authentic private overland expeditions.',
    'about.storyTitle': 'The Story of Soa Ernest & His Ground Team',
    'about.storyP1': 'Born and raised in the volcanic crater lakes region of Vakinankaratra, Ernest began guiding travelers through the limestone labyrinths of the Grand Tsingy and the rainforest canopies of Ranomafana over fifteen years ago.',
    'about.storyP2': 'In 2012, Ernest founded Madagascar Ernest Travel Tours to assemble an impeccably maintained private 4x4 fleet, partner with charming independent eco-lodges, and employ exclusively native local park trackers.',
    'about.pillars': 'Our Three Uncompromising Pillars',
    'about.connectBtn': 'Connect With Ernest in Antsirabe',

    // Contact & Booking
    'contact.title': 'Contact Ernest Tours HQ',
    'contact.subtitle': 'Direct communication with Soa Ernest in Antsirabe. Fast WhatsApp replies, customized PDF proposals, and personalized advice.',
    'contact.formTitle': 'Send an Expedition Inquiry',
    'contact.name': 'Your Full Name',
    'contact.email': 'Your Email Address',
    'contact.whatsapp': 'WhatsApp Number (with country code)',
    'contact.guests': 'Number of Travelers',
    'contact.month': 'Target Travel Month',
    'contact.circuit': 'Interested Circuit / Ideas',
    'contact.message': 'Special Requests or Passions',
    'contact.sendBtn': 'Send Inquiry to Ernest',
    'contact.directCall': 'Call Directly',
    'contact.chatWhatsApp': 'Instant WhatsApp',

    // Footer
    'footer.tagline': 'Official certified Malagasy tour operator headquartered in Antsirabe. Tailor-made private 4x4 overland safaris, river expeditions, and remote island getaways.',
    'footer.quickLinks': 'Navigation',
    'footer.contactInfo': 'Antsirabe Headquarters',
    'footer.rights': 'All rights reserved. Official Ministry of Tourism License.',
  },

  es: {
    // Nav
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Nosotros',
    'nav.tours': 'Tours y Circuitos',
    'nav.planner': 'Planificador a Medida',
    'nav.contact': 'Contacto',
    'nav.currency': 'Moneda',
    'nav.language': 'Idioma',
    'nav.customPlan': 'Diseñar Itinerario',
    'nav.tagline': 'Tours • Sede en Antsirabe',

    // Hero
    'hero.badge': 'Operador Turístico Oficial Certificado en Madagascar • Sede en Antsirabe',
    'hero.title': 'Safaris a Medida en Madagascar y Expediciones Privadas en 4x4',
    'hero.subtitle': 'Sumérgete en la naturaleza salvaje de Madagascar con Soa Ernest. Vehículos 4x4 100% privados, rastreadores locales certificados y precios directos de Madagascar sin intermediarios.',
    'hero.exploreBtn': 'Explorar Circuitos Privados',
    'hero.plannerBtn': 'Diseñar Itinerario a Medida',
    'hero.whatsappBtn': 'Contactar por WhatsApp',
    'hero.statFleet': 'Flota 4x4 100% Privada',
    'hero.statGuides': 'Guías Nativos Certificados',
    'hero.statDirect': 'Precios Directos de Antsirabe',
    'hero.statSupport': 'Asistencia 24/7 en Ruta',

    // Hero Search Widget
    'search.region': 'Región / Zona',
    'search.duration': 'Duración del Viaje',
    'search.travelStyle': 'Estilo de Viaje',
    'search.allRegions': 'Todas las Regiones de Madagascar',
    'search.west': 'Oeste (Tsingy y Baobabs)',
    'search.south': 'Sur (RN7 y Cañones de Isalo)',
    'search.east': 'Este (Pangalanes y Selva)',
    'search.allDurations': 'Cualquier Duración (7 - 21 Días)',
    'search.short': '7 - 9 Días (Expedición)',
    'search.medium': '10 - 13 Días (Clásico)',
    'search.long': '14+ Días (Gran Odisea)',
    'search.filterBtn': 'Buscar Circuitos',

    // Circuits & Tours
    'tours.title': 'Circuitos Privados y Expediciones de Vida Silvestre',
    'tours.subtitle': 'Cada itinerario es 100% privado, totalmente personalizable y realizado en 4x4 preparado con chófer experto y guías naturalistas de los parques.',
    'tours.tabAll': 'Todos los Circuitos',
    'tours.tabWest': 'Oeste y Tsingy',
    'tours.tabSouth': 'Sur RN7 e Isalo',
    'tours.tabEast': 'Este y Pangalanes',
    'tours.tabCustom': 'Expediciones a Medida',
    'tours.from': 'Desde',
    'tours.perPerson': 'por persona',
    'tours.days': 'Días',
    'tours.nights': 'Noches',
    'tours.physical': 'Nivel Físico',
    'tours.season': 'Mejor Época',
    'tours.viewDetails': 'Ver Itinerario Día a Día',
    'tours.bookCircuit': 'Reservar / Consultar',
    'tours.included': 'Qué está Incluido',
    'tours.notIncluded': 'Qué no está Incluido',

    // Real Moments Gallery (Ernest's Client Photos)
    'gallery.badge': 'Galería de Expediciones Reales',
    'gallery.title': 'Momentos Reales en Ruta con Ernest',
    'gallery.subtitle': 'Fotografías reales y sin filtros de nuestros viajes privados por Madagascar. Viajeros auténticos, rutas en 4x4 y la genuina hospitalidad malgache.',
    'gallery.viewFull': 'Ver Galería Completa',
    'gallery.baobabRoof': 'Atardecer desde el techo del 4x4 en la Avenida de los Baobabs (Morondava)',
    'gallery.canalPangalanes': 'Excursión por el Canal de Pangalanes con viajeros en Manakara',
    'gallery.tsiribihinaCamp': 'Campamento safari sobre la arena blanca del cañón del río Tsiribihina',
    'gallery.ernestAndohahela': 'Ernest en el Parque Nacional de Andohahela (Patrimonio UNESCO)',
    'gallery.ernestIsalo': 'Ernest explorando los senderos en la sabana dorada del Parque Nacional Isalo',
    'gallery.ringtailedLemur': 'Lémur de cola anillada (Maki) en la Reserva Comunitaria de Anja',
    'gallery.tsaranoroValley': 'Macizos colosales de granito y arrozales en el Valle de Tsaranoro',
    'gallery.coastalHut': 'Calas secretas y cabañas tradicionales en la costa de Madagascar',
    'gallery.highlandHills': 'Tierras rojas y colinas onduladas a lo largo de la Route Nationale 7',

    // Fleet & Value
    'fleet.badge': 'La Distinción Ernest Tours',
    'fleet.title': 'Flota Privada y Confort en Ruta',
    'fleet.subtitle': 'En un país con carreteras exigentes, nuestros Toyota Land Cruiser 4x4 y embarcaciones privadas ofrecen seguridad, fiabilidad y máxima comodidad.',
    'fleet.chauffeur': 'Chófer Privado y Naturalista',
    'fleet.chauffeurDesc': 'Sin autobuses compartidos ni horarios rígidos. Tú marcas las paradas para fotos, el ritmo y las salidas diarias.',
    'fleet.safety': 'Seguridad Total en Expedición',
    'fleet.safetyDesc': 'Aire acondicionado, doble rueda de repuesto para todo terreno, teléfono satelital y botiquín de primeros auxilios.',
    'fleet.direct': 'Precios Directos Sin Intermediarios',
    'fleet.directDesc': 'Reserva directamente con Ernest en Antsirabe. Sin sobrecostes de agencias extranjeras; pagos justos a los guías locales.',
    'fleet.tailored': 'Flexibilidad 100% a Medida',
    'fleet.tailoredDesc': 'Modifica la ruta para avistamiento de aves, botánica, descanso en playas paradisíacas o fotografía profesional.',

    // Planner
    'planner.badge': 'Diseñador de Itinerarios',
    'planner.title': 'Planificador de Viaje a Medida',
    'planner.subtitle': 'Configura tu viaje soñado por Madagascar en 4 sencillos pasos con cálculo y cotización en tiempo real.',
    'planner.step1': 'Viajeros y Estilo de Viaje',
    'planner.step2': 'Regiones y Destinos',
    'planner.step3': 'Duración y Fechas',
    'planner.step4': 'Vehículo y Nivel de Alojamiento',
    'planner.step5': 'Propuesta de tu Expedición Personalizada',
    'planner.stepOf': 'Paso',
    'planner.of': 'de',
    'planner.next': 'Siguiente Paso',
    'planner.back': 'Atrás',
    'planner.generate': 'Generar Propuesta Personalizada',
    'planner.livePreview': 'Vista Previa del Precio en Directo',
    'planner.totalFor': 'Total para',
    'planner.guests': 'Viajeros',
    'planner.guest': 'Viajero',
    'planner.confirmWhatsApp': 'Confirmar y Reservar por WhatsApp',
    'planner.printPdf': 'Imprimir / Guardar PDF',
    'planner.editSpecs': 'Modificar Parámetros',

    // About
    'about.title': 'Hospitalidad Malgache Auténtica y Safaris Privados',
    'about.subtitle': 'Fundada por Soa Ernest en Antsirabe, somos una agencia de viajes oficial y certificada en Madagascar especializada en expediciones privadas en 4x4.',
    'about.storyTitle': 'La Historia de Soa Ernest y su Equipo Local',
    'about.storyP1': 'Nacido y criado en la región volcánica y de lagos de cráter de Vakinankaratra, Ernest comenzó a guiar a viajeros por los laberintos de piedra caliza del Grand Tsingy y las selvas de Ranomafana hace más de quince años.',
    'about.storyP2': 'En 2012, Ernest fundó Madagascar Ernest Travel Tours para ofrecer una flota privada de 4x4 perfectamente equipada, alojamientos con encanto seleccionados y rastreadores nativos de cada parque nacional.',
    'about.pillars': 'Nuestros Tres Pilares Inquebrantables',
    'about.connectBtn': 'Hablar con Ernest en Antsirabe',

    // Contact & Booking
    'contact.title': 'Contacto Sede Central en Antsirabe',
    'contact.subtitle': 'Contacto directo con Soa Ernest en Antsirabe. Respuesta rápida por WhatsApp, propuestas personalizadas en PDF y asesoramiento local experto.',
    'contact.formTitle': 'Enviar Consulta de Expedición',
    'contact.name': 'Nombre Completo',
    'contact.email': 'Correo Electrónico',
    'contact.whatsapp': 'Número de WhatsApp (con prefijo internacional)',
    'contact.guests': 'Número de Viajeros',
    'contact.month': 'Mes Previsto para Viajar',
    'contact.circuit': 'Circuito de Interés / Ideas',
    'contact.message': 'Preferencias Especiales o Dudas',
    'contact.sendBtn': 'Enviar Consulta a Ernest',
    'contact.directCall': 'Llamar Directamente',
    'contact.chatWhatsApp': 'WhatsApp Inmediato',

    // Footer
    'footer.tagline': 'Operador turístico local oficial certificado con sede en Antsirabe, Madagascar. Safaris privados a medida en 4x4, descensos de ríos y escapadas insulares.',
    'footer.quickLinks': 'Navegación',
    'footer.contactInfo': 'Sede en Antsirabe',
    'footer.rights': 'Todos los derechos reservados. Licencia Oficial del Ministerio de Turismo de Madagascar.',
  },

  fr: {
    // Nav
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.tours': 'Circuits & Safaris',
    'nav.planner': 'Créateur sur Mesure',
    'nav.contact': 'Contact',
    'nav.currency': 'Devise',
    'nav.language': 'Langue',
    'nav.customPlan': 'Créer un Voyage',
    'nav.tagline': 'Circuits • Siège Antsirabe',

    // Hero
    'hero.badge': 'Opérateur Touristique Officiel Certifié à Madagascar • Siège à Antsirabe',
    'hero.title': 'Safaris Privés d\'Exception à Madagascar & Circuits 4x4',
    'hero.subtitle': 'Explorez la beauté sauvage de Madagascar avec Soa Ernest. Véhicules 4x4 100% privés, pisteurs locaux certifiés et tarifs directs sans intermédiaire.',
    'hero.exploreBtn': 'Explorer les Circuits Privés',
    'hero.plannerBtn': 'Créer un Itinéraire sur Mesure',
    'hero.whatsappBtn': 'Contacter sur WhatsApp',
    'hero.statFleet': 'Flotte 4x4 100% Privée',
    'hero.statGuides': 'Guides Locaux Certifiés',
    'hero.statDirect': 'Tarifs Directs Antsirabe',
    'hero.statSupport': 'Assistance 24/7 sur le Terrain',

    // Hero Search Widget
    'search.region': 'Région / Zone',
    'search.duration': 'Durée du Séjour',
    'search.travelStyle': 'Style de Voyage',
    'search.allRegions': 'Toutes les Régions de Madagascar',
    'search.west': 'Ouest (Tsingy & Baobabs)',
    'search.south': 'Sud (RN7 & Canyons de l\'Isalo)',
    'search.east': 'Est (Pangalanes & Forêt Tropicale)',
    'search.allDurations': 'Toutes Durées (7 - 21 Jours)',
    'search.short': '7 - 9 Jours (Expédition)',
    'search.medium': '10 - 13 Jours (Classique)',
    'search.long': '14+ Jours (Grande Odyssée)',
    'search.filterBtn': 'Trouver un Circuit',

    // Circuits & Tours
    'tours.title': 'Circuits Privés & Safaris Faune Sauvage',
    'tours.subtitle': 'Chaque circuit est 100% privé, personnalisable et réalisé en 4x4 révisé avec chauffeur dédié et naturalistes des parcs.',
    'tours.tabAll': 'Tous les Circuits',
    'tours.tabWest': 'Ouest & Tsingy',
    'tours.tabSouth': 'Sud RN7 & Isalo',
    'tours.tabEast': 'Est & Pangalanes',
    'tours.tabCustom': 'Expéditions sur Mesure',
    'tours.from': 'À partir de',
    'tours.perPerson': 'par personne',
    'tours.days': 'Jours',
    'tours.nights': 'Nuits',
    'tours.physical': 'Niveau Physique',
    'tours.season': 'Meilleure Saison',
    'tours.viewDetails': 'Voir l\'Itinéraire Détaillé',
    'tours.bookCircuit': 'Réserver / Devis',
    'tours.included': 'Ce qui est Inclus',
    'tours.notIncluded': 'Ce qui n\'est pas Inclus',

    // Real Moments Gallery
    'gallery.badge': 'Galerie Réelle d\'Expéditions',
    'gallery.title': 'Moments Réels sur les Pistes avec Ernest',
    'gallery.subtitle': 'Photos authentiques sans retouches prises par nos voyageurs et guides à travers Madagascar. De vrais voyageurs, de vrais 4x4, l\'accueil chaleureux malgache.',
    'gallery.viewFull': 'Voir Toute la Galerie',
    'gallery.baobabRoof': 'Coucher de soleil sur le toit du 4x4 à l\'Allée des Baobabs (Morondava)',
    'gallery.canalPangalanes': 'Descente en pirogue à moteur sur le Canal des Pangalanes avec des voyageurs (Manakara)',
    'gallery.tsiribihinaCamp': 'Bivouac safari sur les bancs de sable blanc du canyon de la Tsiribihina',
    'gallery.ernestAndohahela': 'Ernest devant le panneau officiel du Parc National d\'Andohahela (UNESCO)',
    'gallery.ernestIsalo': 'Ernest sur les pistes de la savane dorée du Parc National de l\'Isalo',
    'gallery.ringtailedLemur': 'Lémuriens Catta (Maki) sauvages dans la Réserve d\'Anja',
    'gallery.tsaranoroValley': 'Pics de granit vertigineux et rizières de la vallée du Tsaranoro',
    'gallery.coastalHut': 'Crique secrète et paillote traditionnelle le long de la côte',
    'gallery.highlandHills': 'Terres rouges et collines vallonnées sur la Route Nationale 7',

    // Fleet & Value
    'fleet.badge': 'La Distinction Ernest Tours',
    'fleet.title': 'Flotte Privée & Confort sur les Pistes',
    'fleet.subtitle': 'Dans un pays aux routes parfois exigeantes, nos Toyota Land Cruiser 4x4 et pirogues fluviales assurent sécurité, robustesse et sérénité.',
    'fleet.chauffeur': 'Chauffeur Privé & Naturaliste',
    'fleet.chauffeurDesc': 'Pas de bus collectifs ni d\'horaires imposés. Vous décidez des pauses photos et des heures de départ.',
    'fleet.safety': 'Sécurité Complète en Expédition',
    'fleet.safetyDesc': 'Climatisation, double roue de secours tout-terrain, téléphone satellite et trousse de secours.',
    'fleet.direct': 'Tarifs Directs Sans Intermédiaire',
    'fleet.directDesc': 'Réservez directement auprès d\'Ernest à Antsirabe. Zéro marge d\'agence occidentale; rémunération équitable des guides locaux.',
    'fleet.tailored': 'Flexibilité 100% sur Mesure',
    'fleet.tailoredDesc': 'Ajustez votre circuit pour l\'ornithologie, la botanique, le farniente insulaire ou la photographie.',

    // Planner
    'planner.badge': 'Créateur d\'Itinéraire Interactif',
    'planner.title': 'Votre Voyage sur Mesure à Madagascar',
    'planner.subtitle': 'Configurez votre itinéraire de rêve en 4 étapes avec aperçu du tarif en temps réel.',
    'planner.step1': 'Taille du Groupe & Style',
    'planner.step2': 'Régions & Incontournables',
    'planner.step3': 'Durée & Période',
    'planner.step4': 'Normes Véhicule & Hébergements',
    'planner.step5': 'Votre Proposition d\'Expédition sur Mesure',
    'planner.stepOf': 'Étape',
    'planner.of': 'sur',
    'planner.next': 'Étape Suivante',
    'planner.back': 'Retour',
    'planner.generate': 'Générer Mon Itinéraire sur Mesure',
    'planner.livePreview': 'Aperçu du Tarif en Temps Réel',
    'planner.totalFor': 'Total pour',
    'planner.guests': 'Voyageurs',
    'planner.guest': 'Voyageur',
    'planner.confirmWhatsApp': 'Confirmer & Réserver sur WhatsApp',
    'planner.printPdf': 'Imprimer / Sauvegarder PDF',
    'planner.editSpecs': 'Modifier les Critères',

    // About
    'about.title': 'Authentique Hospitalité Malgache & Safaris Privés',
    'about.subtitle': 'Fondée par Soa Ernest à Antsirabe, nous sommes une agence de voyages réceptive officielle et certifiée à Madagascar.',
    'about.storyTitle': 'L\'Histoire de Soa Ernest & de son Équipe de Terrain',
    'about.storyP1': 'Né au cœur des sources thermales et lacs de cratère du Vakinankaratra, Ernest a débuté comme guide dans les labyrinthes de calcaire du Grand Tsingy et la canopée de Ranomafana il y a plus de 15 ans.',
    'about.storyP2': 'En 2012, Ernest a fondé Madagascar Ernest Travel Tours pour réunir une flotte de 4x4 privés rigoureusement entretenus, sélectionner des écolodges de charme et engager des pisteurs locaux autochtones.',
    'about.pillars': 'Nos Trois Piliers Fondamentaux',
    'about.connectBtn': 'Échanger avec Ernest à Antsirabe',

    // Contact & Booking
    'contact.title': 'Contactez le Siège à Antsirabe',
    'contact.subtitle': 'Échangez directement avec Soa Ernest à Antsirabe. Réponses rapides sur WhatsApp, devis détaillés en PDF et conseils avisés.',
    'contact.formTitle': 'Envoyer une Demande d\'Expédition',
    'contact.name': 'Votre Nom Complet',
    'contact.email': 'Votre Adresse Email',
    'contact.whatsapp': 'Numéro WhatsApp (avec indicatif pays)',
    'contact.guests': 'Nombre de Voyageurs',
    'contact.month': 'Mois de Voyage Envisagé',
    'contact.circuit': 'Circuit Souhaité / Envies',
    'contact.message': 'Demandes Particulières ou Passions',
    'contact.sendBtn': 'Envoyer la Demande à Ernest',
    'contact.directCall': 'Appel Direct',
    'contact.chatWhatsApp': 'WhatsApp Immédiat',

    // Footer
    'footer.tagline': 'Opérateur réceptif officiel certifié à Antsirabe, Madagascar. Circuits privatifs sur mesure en 4x4, descentes de fleuves et retraites insulaires.',
    'footer.quickLinks': 'Navigation',
    'footer.contactInfo': 'Siège à Antsirabe',
    'footer.rights': 'Tous droits réservés. Licence Officielle du Ministère du Tourisme de Madagascar.',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('madagascar_lang') as Language;
    if (saved && (saved === 'en' || saved === 'es' || saved === 'fr')) {
      return saved;
    }
    // Check browser language
    if (typeof navigator !== 'undefined' && navigator.language) {
      if (navigator.language.startsWith('es')) return 'es';
      if (navigator.language.startsWith('fr')) return 'fr';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('madagascar_lang', lang);
    } catch {
      // localStorage may fail in restricted iframes
    }
  };

  const currentLanguageOption =
    supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const defaultDict = translations.en;
    if (defaultDict && defaultDict[key]) {
      return defaultDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLanguageOption, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
