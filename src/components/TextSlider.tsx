import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface TextSlide {
  id: string;
  badgeEn: string;
  badgeEs: string;
  badgeFr: string;
  titleEn: string;
  titleEs: string;
  titleFr: string;
  descEn: string;
  descEs: string;
  descFr: string;
  highlightEn: string;
  highlightEs: string;
  highlightFr: string;
  ctaTextEn: string;
  ctaTextEs: string;
  ctaTextFr: string;
  target: 'planner' | 'tours' | 'whatsapp';
}

export const textSlides: TextSlide[] = [
  {
    id: 'slide-1',
    badgeEn: 'Direct Antsirabe Operator',
    badgeEs: 'Operador Local Directo',
    badgeFr: 'Opérateur Local Direct',
    titleEn: '100% Private 4x4 Overland Expeditions',
    titleEs: 'Expediciones en 4x4 100% Privadas',
    titleFr: 'Expéditions 4x4 100% Privées',
    descEn: 'Travel without compromises or shared tour buses. Every vehicle, driver-guide, and trail is dedicated exclusively to your party.',
    descEs: 'Viaja sin concesiones ni autobuses compartidos. Cada vehículo todoterreno, chófer-guía y sendero está dedicado en exclusiva a ti y tu familia.',
    descFr: 'Voyagez sans compromis ni bus partagés. Chaque 4x4 tout-terrain, chauffeur-guide et sentier est dédié exclusivement à vos proches.',
    highlightEn: 'Zero Middlemen • Real Malagasy Local Rates',
    highlightEs: 'Sin Intermediarios • Tarifas Locales Directas',
    highlightFr: 'Sans Intermédiaires • Prix Locaux Directs',
    ctaTextEn: 'Build Bespoke Plan',
    ctaTextEs: 'Diseñar Viaje a Medida',
    ctaTextFr: 'Créer un Plan Sur Mesure',
    target: 'planner',
  },
  {
    id: 'slide-2',
    badgeEn: 'Iconic Malagasy Wonders',
    badgeEs: 'Maravillas de Madagascar',
    badgeFr: 'Merveilles de Madagascar',
    titleEn: 'Grand Tsingy, Sunset Baobabs & Tsiribihina River',
    titleEs: 'Grand Tsingy, Baobabs al Atardecer y Río Tsiribihina',
    titleFr: 'Grands Tsingy, Baobabs au Couchant & Fleuve Tsiribihina',
    descEn: 'From karst limestone cathedrals to century-old giant baobabs and traditional river barge bivouacs with personal Malagasy chefs.',
    descEs: 'Desde catedrales de piedra caliza hasta baobabs gigantes centenarios y vivacs fluviales en chaland con chefs locales privados.',
    descFr: 'Des cathédrales de calcaire aux baobabs géants séculaires et bivouacs en chaland traditionnel avec chef cuisinier privé.',
    highlightEn: 'Exclusive Access • Certified Native Wildlife Trackers',
    highlightEs: 'Acceso Exclusivo • Rastreadores Nativos Certificados',
    highlightFr: 'Accès Exclusif • Pisteurs Locaux Certifiés',
    ctaTextEn: 'Explore Signature Circuits',
    ctaTextEs: 'Ver Circuitos Emblemáticos',
    ctaTextFr: 'Découvrir les Circuits',
    target: 'tours',
  },
  {
    id: 'slide-3',
    badgeEn: 'Real Trust & Multilingual Guides',
    badgeEs: 'Confianza Real y Guías Multilingües',
    badgeFr: 'Confiance & Guides Polyglottes',
    titleEn: 'Led Personally by Soa Ernest & Senior Ground Team',
    titleEs: 'Guiado Personalmente por Soa Ernest y su Equipo',
    titleFr: 'Guidé Personnellement par Soa Ernest et son Équipe',
    descEn: 'Fluent Spanish, French, and English speakers. Over 15 years guiding international travelers across national parks with complete safety and care.',
    descEs: 'Hablamos español fluido, francés e inglés. Más de 15 años guiando viajeros por todos los parques nacionales con seguridad y calidez humana.',
    descFr: 'Guides francophones, hispanophones et anglophones. Plus de 15 ans d\'expérience sur les pistes des parcs nationaux en toute sécurité.',
    highlightEn: 'Official License • 24/7 Field Dispatch from Antsirabe HQ',
    highlightEs: 'Licencia Oficial • Asistencia 24/7 desde Antsirabe',
    highlightFr: 'Agrément Officiel • Assistance 24h/24 depuis Antsirabe',
    ctaTextEn: 'Instant WhatsApp Quote',
    ctaTextEs: 'Cotización Directa por WhatsApp',
    ctaTextFr: 'Devis Direct WhatsApp',
    target: 'whatsapp',
  },
];

interface TextSliderProps {
  onNavigate?: (page: string) => void;
}

export const TextSlider: React.FC<TextSliderProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % textSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = textSlides[currentIdx];

  const handleCta = () => {
    if (slide.target === 'whatsapp') {
      const msg = language === 'es'
        ? 'Hola Ernest, vi la información de los tours en su sitio web y me gustaría recibir una cotización directa para mi grupo.'
        : language === 'fr'
        ? 'Bonjour Ernest, j\'aimerais obtenir un devis direct pour mon groupe de voyage.'
        : 'Hello Ernest, I would like to request an instant direct quote for our private expedition.';
      window.open(`https://wa.me/261325700405?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    } else if (slide.target === 'planner') {
      if (onNavigate) {
        onNavigate('custom-planner');
      } else {
        const el = document.getElementById('custom-planner');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (onNavigate) {
        onNavigate('tours');
      } else {
        const el = document.getElementById('tours-grid-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-gradient-to-r from-[#0F172A] via-[#162238] to-[#0F172A] text-white py-8 sm:py-10 border-y border-slate-700/60 relative overflow-hidden"
    >
      {/* Subtle ambient light accents */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left / Main slide content */}
          <div className="flex-1 text-center md:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'es' ? slide.badgeEs : language === 'fr' ? slide.badgeFr : slide.badgeEn}
              </span>
            </div>

            {/* Slide Title */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white tracking-tight leading-tight">
              {language === 'es' ? slide.titleEs : language === 'fr' ? slide.titleFr : slide.titleEn}
            </h3>

            {/* Slide Description */}
            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'es' ? slide.descEs : language === 'fr' ? slide.descFr : slide.descEn}
            </p>

            {/* Highlight Banner */}
            <div className="mt-3 flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {language === 'es' ? slide.highlightEs : language === 'fr' ? slide.highlightFr : slide.highlightEn}
              </span>
            </div>
          </div>

          {/* Right Controls & CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Slide indicators & navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => (prev - 1 + textSlides.length) % textSlides.length)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5 px-2">
                {textSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIdx === i ? 'w-6 bg-[#0D9488]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => (prev + 1) % textSlides.length)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleCta}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0f766e] hover:from-[#0f766e] hover:to-[#115e59] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#0D9488]/30 transition-all transform active:scale-95 cursor-pointer"
            >
              <span>
                {language === 'es' ? slide.ctaTextEs : language === 'fr' ? slide.ctaTextFr : slide.ctaTextEn}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
