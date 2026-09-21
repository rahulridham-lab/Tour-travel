import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { siteConfig } from '../data/siteConfig';
import { RealExpeditionsGallery } from '../components/RealExpeditionsGallery';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Award,
  ShieldCheck,
  Heart,
  Trees,
  Car,
  MapPin,
  CheckCircle2,
  Users,
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <div className="pt-24 bg-[#F7F5F0] min-h-screen text-[#1A1A1A]">
      <SEOHead
        title="About Ernest & Our Story | Madagascar Ernest Travel Tours"
        description="Learn about Soa Ernest, certified tour specialist in Antsirabe, and our commitment to bespoke private 4x4 safaris, native wildlife trackers, and responsible Malagasy ecotourism."
      />

      {/* Hero Section */}
      <div className="bg-[#0A1912] text-[#F4F1EA] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#B89758]/30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E3B2B]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3B2B]/70 border border-[#B89758]/40 text-xs font-bold text-[#D4BA82] uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Nuestra Historia y Legado' : language === 'fr' ? 'Notre Histoire & Héritage' : 'Our Heritage & Story'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-[#F4F1EA] mb-4">
            {t('about.title', 'Bespoke Malagasy Hospitality & Untamed Safaris')}
          </h1>
          <p className="text-sm sm:text-base text-[#9EACA3] max-w-2xl mx-auto font-light leading-relaxed">
            {t('about.subtitle', 'Founded by Soa Ernest in Antsirabe, we are an official, licensed tour operator delivering exclusive private 4x4 expeditions across Madagascar with an unyielding commitment to safety, comfort, and local conservation.')}
          </p>
        </div>
      </div>

      {/* Founder Story Split Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#B89758] font-bold">
              <Award className="w-4 h-4" />
              <span>{language === 'es' ? 'Una Vida Dedicada a Madagascar' : language === 'fr' ? 'Une Vie Dédiée à Madagascar' : 'A Lifetime Dedicated to Madagascar'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1A1A]">
              {t('about.storyTitle', 'The Story of Soa Ernest & His Ground Team')}
            </h2>
            <p className="text-sm text-[#5A655F] leading-relaxed">
              {t('about.storyP1', 'Born and raised in the thermal springs and crater lakes region of Vakinankaratra, Ernest began guiding curious travelers through the limestone labyrinths of the Grand Tsingy and the canopies of Ranomafana over fifteen years ago. He realized that international travelers seeking remote adventure frequently had to compromise between thrilling authenticity and dignified comfort.')}
            </p>
            <p className="text-sm text-[#5A655F] leading-relaxed">
              {t('about.storyP2', 'In 2012, Ernest founded Madagascar Ernest Travel Tours with a clear vision: assemble a private fleet of meticulously maintained overland 4x4s, partner with the finest independent boutique eco-lodges, and employ exclusively native local park trackers who possess ancestral knowledge of the forest.')}
            </p>

            {/* Quick credentials box */}
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-black/10 space-y-3">
              <div className="flex items-center gap-3 text-xs font-semibold text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'es' ? 'Certificado por el Ministerio de Turismo y Artesanía de Madagascar' : language === 'fr' ? 'Certifié par le Ministère du Tourisme de Madagascar' : 'Certified by the Ministry of Tourism & Handicrafts Madagascar'}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#1A1A1A]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'es' ? 'Sede en Antsirabe con bases logísticas activas en Morondava, Miandrivazo y Tamatave' : language === 'fr' ? 'Siège à Antsirabe avec bases logistiques à Morondava, Miandrivazo et Tamatave' : 'Headquartered in Antsirabe with active logistics stations in Morondava, Miandrivazo, and Tamatave'}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-[#1A1A1A]">
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{language === 'es' ? 'Guías Nativos Multilingües: Español fluido, Inglés, Francés, Alemán e Italiano' : language === 'fr' ? 'Guides Locaux Multilingues : Français, Anglais, Espagnol, Allemand et Italien' : 'Multilingual Native Guides: Fluent English, French, Spanish, German, Italian, and Malagasy'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-xl bg-[#1E3B2B] text-[#F7F5F0] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#2A4E39] shadow-lg transition-all cursor-pointer"
              >
                <span>{t('about.connectBtn', 'Connect With Ernest in Antsirabe')}</span>
                <ArrowRight className="w-4 h-4 text-[#D4BA82]" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Card with Real Photo of Soa Ernest (5 cols) */}
          <div className="lg:col-span-5">
            <div className="light-luxury-card rounded-3xl overflow-hidden p-3 bg-white shadow-xl border border-slate-200">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-slate-900">
                <img
                  src="/tours/ernest-isalo.jpg"
                  alt="Soa Ernest in Isalo Savannah"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1912] via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-[#F4F1EA]">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#0D9488] text-white inline-block mb-2">
                    {language === 'es' ? 'Fundador y Guía Principal' : language === 'fr' ? 'Fondateur & Guide Principal' : 'Founder & Lead Guide'}
                  </span>
                  <p className="font-display text-2xl font-bold mb-0.5">Soa Ernest</p>
                  <p className="text-xs text-[#D4BA82] font-medium">Antsirabe, Madagascar</p>
                  <p className="text-xs text-[#CBD5E1] mt-2 italic leading-relaxed">
                    {language === 'es'
                      ? '«Nuestra misión no es sólo mostrarte Madagascar, sino acogerte en su alma con seguridad, respeto y calidez humana.»'
                      : language === 'fr'
                      ? '«Notre mission n\'est pas seulement de vous faire découvrir Madagascar, mais de vous accueillir dans son âme avec sécurité, respect et générosité.»'
                      : '“Our mission is not merely to show you Madagascar, but to welcome you into its soul with safety, honor, and warmth.”'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ethical & Sustainable Stewardship Section */}
      <div className="bg-[#FAF8F5] py-16 border-y border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#B89758] font-bold block mb-2">
              {language === 'es' ? 'Turismo Responsable en Madagascar' : language === 'fr' ? 'Tourisme Responsable à Madagascar' : 'Responsible Malagasy Tourism'}
            </span>
            <h3 className="text-3xl font-display font-medium text-[#1A1A1A]">
              {t('about.pillars', 'Our Three Uncompromising Pillars')}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="light-luxury-card p-8 rounded-3xl bg-white space-y-4 shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center">
                <Trees className="w-6 h-6 text-[#B89758]" />
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A]">
                {language === 'es' ? '1. Pisteurs Nativos en Cada Parque' : language === 'fr' ? '1. Pisteurs Locaux Autochtones' : '1. 100% Native Ground Trackers'}
              </h4>
              <p className="text-xs text-[#5A655F] leading-relaxed">
                {language === 'es'
                  ? 'En cada reserva y parque nacional contratamos directamente a guardabosques de las comunidades locales, asegurando salarios justos y preservación del entorno.'
                  : language === 'fr'
                  ? 'Dans chaque parc national, nous employons directement les rangers des communautés locales, garantissant des revenus équitables et la protection de la biodiversité.'
                  : 'In every national park—from Montagne d\'Ambre to the spiny deserts of Ifaty—we contract directly with local community rangers, ensuring living wages and biodiversity protection.'}
              </p>
            </div>

            <div className="light-luxury-card p-8 rounded-3xl bg-white space-y-4 shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#B89758]" />
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A]">
                {language === 'es' ? '2. Reinversión Comunitaria Local' : language === 'fr' ? '2. Réinvestissement Communautaire' : '2. Community Re-Investment'}
              </h4>
              <p className="text-xs text-[#5A655F] leading-relaxed">
                {language === 'es'
                  ? 'Parte de los ingresos de cada circuito se destinan a material escolar y acceso al agua potable en aldeas a lo largo del río Tsiribihina y las Tierras Altas.'
                  : language === 'fr'
                  ? 'Une partie des revenus de chaque expédition finance des fournitures scolaires et l\'accès à l\'eau potable dans les villages de la Tsiribihina et des Hautes Terres.'
                  : 'A percentage of all expedition revenues directly funds community school supplies and freshwater access in rural villages along the Tsiribihina River and highlands.'}
              </p>
            </div>

            <div className="light-luxury-card p-8 rounded-3xl bg-white space-y-4 shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center">
                <Car className="w-6 h-6 text-[#B89758]" />
              </div>
              <h4 className="text-lg font-bold text-[#1A1A1A]">
                {language === 'es' ? '3. Flota 4x4 Rigurosamente Revisada' : language === 'fr' ? '3. Flotte 4x4 Rigoureusement Entretenue' : '3. Private Fleet Integrity'}
              </h4>
              <p className="text-xs text-[#5A655F] leading-relaxed">
                {language === 'es'
                  ? 'Cada vehículo 4x4 y embarcación se revisa minuciosamente en nuestro taller de Antsirabe antes de cada salida, garantizando máxima seguridad en ruta.'
                  : language === 'fr'
                  ? 'Chaque Toyota Land Cruiser et embarcation fluviale passe une inspection technique complète dans notre atelier d\'Antsirabe avant le départ.'
                  : 'Every Toyota Land Cruiser and river vessel undergoes strict mechanical inspection in our Antsirabe workshop prior to dispatch, guaranteeing peaceful reliability.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Expeditions Gallery */}
      <RealExpeditionsGallery />
    </div>
  );
};
