import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      qEn: "What is the best time of year to visit Madagascar?",
      qEs: "¿Cuál es la mejor época del año para visitar Madagascar?",
      qFr: "Quelle est la meilleure période pour visiter Madagascar ?",
      aEn: "Madagascar is exceptional year-round with varied microclimates. April to November offers dry, crisp weather ideal for the Grand Tsingy karst, Avenue of the Baobabs, and RN7 canyons. July to September is peak season for humpback whale migrations around Sainte-Marie Island. December to March features lush green landscapes and fewer visitors.",
      aEs: "Madagascar es un destino fantástico todo el año con microclimas muy definidos. De abril a noviembre el clima es seco y templado, ideal para los Tsingy de Bemaraha, la Avenida de los Baobabs y los cañones de Isalo. De julio a septiembre es la temporada dorada para ver ballenas jorobadas en la Isla Sainte-Marie.",
      aFr: "Madagascar offre de magnifiques voyages toute l'année. D'avril à novembre, la saison sèche est idéale pour explorer les Grands Tsingy, l'Allée des Baobabs et les canyons de l'Isalo. De juillet à septembre, c'est la saison royale pour l'observation des baleines à bosse à l'Île Sainte-Marie.",
      tag: "Season & Weather",
    },
    {
      qEn: "Are your tours 100% private and customizable?",
      qEs: "¿Son los tours 100% privados y personalizables a medida?",
      qFr: "Vos circuits sont-ils 100% privés et sur mesure ?",
      aEn: "Yes, every single tour is exclusively private. You will never share your 4x4 or guides with strangers. You decide the daily departure times, photo stop durations, and hotel preferences. Ernest and his native team can customize any itinerary to fit your family, couple, or photography group.",
      aEs: "Sí, el 100% de nuestras expediciones son privadas y exclusivas. Nunca viajarás con desconocidos en el mismo vehículo. Tú decides los horarios de salida matutinos, las paradas fotográficas y el ritmo de cada día. Adaptamos todo el itinerario al gusto de tu grupo o familia.",
      aFr: "Oui, 100% de nos circuits sont strictement privés. Vous ne partagez jamais votre véhicule 4x4 ni votre guide avec des inconnus. Vous décidez du rythme, des arrêts photos et du niveau de confort des hébergements.",
      tag: "Private Safaris",
    },
    {
      qEn: "What vehicles and drivers do you provide for the overland expeditions?",
      qEs: "¿Qué tipo de vehículos 4x4 y conductores facilitáis en las expediciones?",
      qFr: "Quels véhicules 4x4 et chauffeurs fournissez-vous pour les pistes ?",
      aEn: "We operate our own private fleet of high-clearance Toyota Land Cruiser Prado & V8 4x4s, fitted with reinforced suspension, all-terrain tires, air conditioning, dual spare wheels, and satellite communication for remote tracks. Our drivers have over 10-15 years of Malagasy bush-road experience.",
      aEs: "Disponemos de flota privada de Toyota Land Cruiser Prado y V8 4x4 de chasis alto, con suspensión reforzada, aire acondicionado, doble rueda de repuesto y comunicación satelital. Nuestros chóferes-guías cuentan con más de 10 a 15 años de experiencia probada en pistas remotas.",
      aFr: "Nous opérons notre propre flotte de Toyota Land Cruiser Prado & V8 4x4 équipés pour les pistes exigeantes (climatisation, double roue de secours, suspension renforcée). Nos chauffeurs-guides cumulent plus de 10 à 15 ans d'expérience du terrain.",
      tag: "Fleet & Safety",
    },
    {
      qEn: "How does the booking, deposit, and direct pricing work?",
      qEs: "¿Cómo funciona la reserva, el depósito y los precios directos?",
      qFr: "Comment se déroulent la réservation, l'acompte et les tarifs directs ?",
      aEn: "Because we are an official Malagasy tour operator based in Antsirabe, you pay direct local rates with zero overseas agency commissions. A 30% bank deposit secures your private 4x4, park permits, and boutique eco-lodges. The remaining balance can be settled upon arrival or via international bank transfer.",
      aEs: "Al ser un touroperador oficial con sede en Antsirabe, disfrutas de tarifas locales directas sin comisiones de agencias intermediarias europeas o americanas. Un depósito del 30% bloquea tu vehículo 4x4, permisos de parques y lodges boutique. El resto se liquida a la llegada o por transferencia bancaria.",
      aFr: "En tant qu'opérateur officiel basé à Antsirabe, vous bénéficiez de tarifs directs sans intermédiaires. Un acompte de 30% valide la réservation du 4x4, des lodges et des permis parcs nationaux. Le solde est réglé avant le départ ou à l'arrivée.",
      tag: "Direct Pricing",
    },
    {
      qEn: "What level of physical fitness is required for Grand Tsingy and national parks?",
      qEs: "¿Qué nivel físico se requiere para el Grand Tsingy y los parques nacionales?",
      qFr: "Quel niveau physique est nécessaire pour les Grands Tsingy et parcs nationaux ?",
      aEn: "Our circuits can be tailored to all fitness levels. For the Grand Tsingy suspension bridges and limestone caves, moderate agility is helpful (safety harnesses are provided). However, if preferred, gentle Petits Tsingy walks or relaxed forest trails with lemurs are available everywhere.",
      aEs: "Nuestros circuitos se adaptan a cualquier condición física. En el Grand Tsingy se proporcionan arneses y guías especialistas para puentes colgantes, pero siempre existe la alternativa de recorrer los Petit Tsingy o senderos botánicos llanos para ver lémures con total tranquilidad.",
      aFr: "Nos circuits s'adaptent à toutes les conditions physiques. Pour les Grands Tsingy, des harnais de sécurité et des baudriers sont fournis. Pour ceux qui préfèrent une marche douce, les Petits Tsingy et les sentiers ombragés permettent d'observer les lémuriens sans difficulté.",
      tag: "Health & Fitness",
    },
    {
      qEn: "Can you accommodate Spanish, French, or English speaking travelers?",
      qEs: "¿Podéis atender a viajeros que hablen español, francés o inglés?",
      qFr: "Pouvez-vous accueillir des voyageurs hispanophones, francophones ou anglophones ?",
      aEn: "Yes! Soa Ernest and our senior guides are fully multilingual with fluent Spanish, French, English, and native Malagasy. We have welcomed hundreds of Spanish, French, and international travelers across Madagascar with rave reviews.",
      aEs: "¡Por supuesto! Soa Ernest y nuestros guías hablan español fluido, francés, inglés y malgache. Hemos acompañado a cientos de viajeros de España, Latinoamérica, Francia y todo el mundo con experiencias inolvidables.",
      aFr: "Absolument ! Soa Ernest et notre équipe parlent couramment français, espagnol, anglais et malgache. Nous guidons régulièrement des voyageurs francophones et internationaux avec un accompagnement sur mesure.",
      tag: "Multilingual Guides",
    }
  ];

  return (
    <section id="faq-section" className="py-16 sm:py-20 bg-white border-t border-[#E2E8F0] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#0D9488]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 text-xs font-bold text-[#0D9488] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {language === 'es' ? 'Preguntas Frecuentes' : language === 'fr' ? 'Foire Aux Questions' : 'Frequently Asked Questions'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-medium text-[#0F172A]">
            {language === 'es'
              ? 'Todo lo que necesitas saber sobre viajar con Ernest'
              : language === 'fr'
              ? 'Tout ce que vous devez savoir avant de partir avec Ernest'
              : 'Everything You Need to Know Before Traveling with Ernest'}
          </h2>
          <p className="mt-3 text-sm text-[#64748B]">
            {language === 'es'
              ? 'Respuestas directas del equipo local en Antsirabe sobre 4x4, temporadas, reservas y seguridad.'
              : language === 'fr'
              ? 'Réponses claires de notre équipe à Antsirabe sur les 4x4, la météo, les tarifs et la logistique.'
              : 'Clear, transparent answers directly from our Antsirabe operations team regarding 4x4 logistics, pricing, and permits.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const question = language === 'es' ? faq.qEs : language === 'fr' ? faq.qFr : faq.qEn;
            const answer = language === 'es' ? faq.aEs : language === 'fr' ? faq.aFr : faq.aEn;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#F8FAFC] border-[#0D9488]/40 shadow-sm'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold text-xs shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="font-semibold text-sm sm:text-base text-[#0F172A] leading-snug">
                      {question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#64748B] shrink-0 transition-transform">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#0D9488]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100 mt-1">
                    <p className="pt-3">{answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0D9488]/10 text-[#0D9488]">
                        {faq.tag}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {language === 'es' ? 'Verificado por Ernest Soa' : language === 'fr' ? 'Vérifié par Ernest Soa' : 'Verified by Ernest Soa'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div>
            <h4 className="font-bold text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'es' ? '¿Tienes una pregunta específica o ruta especial?' : language === 'fr' ? 'Une question sur mesure ou une date précise ?' : 'Have a custom question or specific travel dates?'}
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-1">
              {language === 'es' ? 'Escribe directamente a Ernest por WhatsApp para respuesta en minutos.' : language === 'fr' ? 'Écrivez directement à Ernest sur WhatsApp pour une réponse rapide.' : 'Chat directly with Ernest Soa on WhatsApp for instant guidance.'}
            </p>
          </div>
          <a
            href={`https://wa.me/261325700405?text=${encodeURIComponent(
              language === 'es'
                ? 'Hola Ernest, tengo una pregunta sobre organizar un viaje privado a Madagascar.'
                : language === 'fr'
                ? 'Bonjour Ernest, j\'ai une question sur l\'organisation d\'un circuit à Madagascar.'
                : 'Hello Ernest, I have a question about planning a private tour in Madagascar.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-all shadow-md cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>{language === 'es' ? 'Preguntar por WhatsApp' : language === 'fr' ? 'Poser ma question' : 'Ask via WhatsApp'}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
