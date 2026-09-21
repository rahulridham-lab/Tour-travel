import React, { useState } from 'react';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Award, Compass, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface GalleryPhoto {
  id: string;
  image: string;
  backupImage: string;
  titleEn: string;
  titleEs: string;
  titleFr: string;
  locationEn: string;
  locationEs: string;
  locationFr: string;
  descriptionEn: string;
  descriptionEs: string;
  descriptionFr: string;
  tagEn: string;
  tagEs: string;
  tagFr: string;
}

export const clientGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'baobab-roof',
    image: '/tours/baobab-4x4.jpg',
    backupImage: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
    titleEn: '4x4 Sunset on the Avenue of the Baobabs',
    titleEs: 'Atardecer en 4x4 en la Avenida de los Baobabs',
    titleFr: 'Coucher de soleil en 4x4 sur l\'Allée des Baobabs',
    locationEn: 'Morondava, Menabe Region',
    locationEs: 'Morondava, Región de Menabe',
    locationFr: 'Morondava, Région Menabe',
    descriptionEn: 'Travelers celebrating golden hour on the roof rack of our expedition 4x4 among the century-old Grandidier baobabs.',
    descriptionEs: 'Viajeros celebrando la puesta de sol en la baca de nuestro 4x4 entre los centenarios baobabs de Grandidier.',
    descriptionFr: 'Voyageurs célébrant l\'heure dorée sur la galerie de notre 4x4 au milieu des baobabs de Grandidier centenaires.',
    tagEn: 'Iconic West',
    tagEs: 'Oeste Legendario',
    tagFr: 'Ouest Mythique',
  },
  {
    id: 'ernest-andohahela',
    image: '/tours/ernest-andohahela.jpg',
    backupImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Ernest at UNESCO Parc National d\'Andohahela',
    titleEs: 'Ernest en el Parque Nacional de Andohahela (UNESCO)',
    titleFr: 'Ernest au Parc National d\'Andohahela (UNESCO)',
    locationEn: 'Anosy, South-East Madagascar',
    locationEs: 'Anosy, Sudeste de Madagascar',
    locationFr: 'Anosy, Sud-Est de Madagascar',
    descriptionEn: 'Soa Ernest proudly standing at the official UNESCO entrance monument before leading a rainforest canopy expedition.',
    descriptionEs: 'Soa Ernest posando con orgullo en el monumento oficial de la UNESCO antes de guiar la expedición por la selva.',
    descriptionFr: 'Soa Ernest fier devant la stèle officielle de l\'UNESCO avant de guider l\'expédition en forêt tropicale.',
    tagEn: 'UNESCO Sanctuary',
    tagEs: 'Santuario UNESCO',
    tagFr: 'Sanctuaire UNESCO',
  },
  {
    id: 'canal-pangalanes',
    image: '/tours/canal-pangalanes.jpg',
    backupImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Canal des Pangalanes Expedition with Spanish Guests',
    titleEs: 'Excursión en Barco por el Canal de Pangalanes con Viajeros',
    titleFr: 'Navigation sur le Canal des Pangalanes avec nos Voyageurs',
    locationEn: 'Manakara, East Coast Waterways',
    locationEs: 'Manakara, Canales de la Costa Este',
    locationFr: 'Manakara, Voies Navigables de la Côte Est',
    descriptionEn: 'Our private boat crew navigating remote canal villages with cheerful Spanish travelers, sharing fresh tropical coconuts.',
    descriptionEs: 'Nuestra tripulación privada navegando canales remotos con viajeros hispanohablantes disfrutando de cocos frescos.',
    descriptionFr: 'Notre équipage privé naviguant à travers les villages côtiers avec des voyageurs hispanophones dans une ambiance festive.',
    tagEn: 'Waterway Safari',
    tagEs: 'Expedición Fluvial',
    tagFr: 'Safari Fluvial',
  },
  {
    id: 'tsiribihina-camp',
    image: '/tours/tsiribihina-camp.jpg',
    backupImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Riverside Bivouac in Tsiribihina Canyon Gorge',
    titleEs: 'Campamento Safari en el Cañón del Río Tsiribihina',
    titleFr: 'Bivouac Safari dans les Gorges de la Tsiribihina',
    locationEn: 'Tsiribihina River, Western Madagascar',
    locationEs: 'Río Tsiribihina, Madagascar Occidental',
    locationFr: 'Fleuve Tsiribihina, Ouest Malgache',
    descriptionEn: 'Camping under a blanket of stars on pristine white sandbanks directly beneath towering golden limestone cliffs.',
    descriptionEs: 'Campamento bajo un manto de estrellas en bancos de arena blanca frente a los colosales acantilados de piedra caliza.',
    descriptionFr: 'Campement sous la voûte céleste sur les bancs de sable blanc au pied des falaises de calcaire dorées.',
    tagEn: 'Wild Bivouac',
    tagEs: 'Campamento Salvaje',
    tagFr: 'Bivouac Sauvage',
  },
  {
    id: 'ernest-isalo',
    image: '/tours/ernest-isalo.jpg',
    backupImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Soa Ernest Scouting Trails in Isalo Savannah',
    titleEs: 'Soa Ernest Explorando Senderos en la Sabana de Isalo',
    titleFr: 'Soa Ernest sur les Pistes de la Savane de l\'Isalo',
    locationEn: 'Isalo National Park, Ranohira',
    locationEs: 'Parque Nacional de Isalo, Ranohira',
    locationFr: 'Parc National de l\'Isalo, Ranohira',
    descriptionEn: 'Ernest checking sandstone canyon routes and natural pool access points in the vast Jurassic landscape.',
    descriptionEs: 'Ernest verificando los accesos a cañones de arenisca y piscinas naturales en el inmenso paisaje jurásico del sur.',
    descriptionFr: 'Ernest vérifiant l\'accès aux gorges de grès et piscines naturelles dans l\'immensité jurassique du sud.',
    tagEn: 'Founder & Guide',
    tagEs: 'Fundador y Guía',
    tagFr: 'Fondateur & Guide',
  },
  {
    id: 'ringtailed-lemur',
    image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=1200&q=80',
    backupImage: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Ring-Tailed Lemur (Maki Catta) in Anja Reserve',
    titleEs: 'Lémur de Cola Anillada (Maki Catta) en Reserva de Anja',
    titleFr: 'Lémurien Catta (Maki) dans la Réserve d\'Anja',
    locationEn: 'Anja Community Reserve, Ambalavao',
    locationEs: 'Reserva Comunitaria de Anja, Ambalavao',
    locationFr: 'Réserve Communautaire d\'Anja, Ambalavao',
    descriptionEn: 'Encountering troops of wild ring-tailed lemurs sunbathing on granite boulders just feet away from our guests.',
    descriptionEs: 'Encuentros cercanos con familias de lémures maki tomando el sol sobre grandes rocas de granito.',
    descriptionFr: 'Rencontre avec des familles de lémuriens catta se réchauffant au soleil sur les blocs de granit.',
    tagEn: 'Native Wildlife',
    tagEs: 'Fauna Autóctona',
    tagFr: 'Faune Sauvage',
  },
  {
    id: 'tsaranoro-peak',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    backupImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Tsaranoro Valley & Colossal Granite Massif',
    titleEs: 'Valle de Tsaranoro y Macizo Colosal de Granito',
    titleFr: 'Vallée du Tsaranoro & Massifs Vertigineux de Granit',
    locationEn: 'Andringitra National Park, Highlands',
    locationEs: 'Parque Nacional Andringitra, Tierras Altas',
    locationFr: 'Parc National d\'Andringitra, Hautes Terres',
    descriptionEn: 'The awe-inspiring 800-meter sheer cliff rising above traditional red brick villages and emerald rice terraces.',
    descriptionEs: 'El impresionante acantilado de 800 metros sobre pueblos tradicionales y bancales esmeralda de arroz.',
    descriptionFr: 'L\'impressionnante paroi de 800 mètres dominant les villages traditionnels et les rizières en terrasses.',
    tagEn: 'Highland Trekking',
    tagEs: 'Trekking en Altura',
    tagFr: 'Randonnée Altitude',
  },
  {
    id: 'highland-route7',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    backupImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    titleEn: 'Overland Vistas Along Route Nationale 7',
    titleEs: 'Paisajes de Ruta por la Route Nationale 7',
    titleFr: 'Panoramas Terrestres sur la Route Nationale 7',
    locationEn: 'Vakinankaratra to Fianarantsoa',
    locationEs: 'De Vakinankaratra a Fianarantsoa',
    locationFr: 'De Vakinankaratra à Fianarantsoa',
    descriptionEn: 'Rolling red laterite soil hills, granite peaks, and winding panoramic roads traversed comfortably in our private 4x4s.',
    descriptionEs: 'Colinas de tierra roja laterítica, picos graníticos y carreteras panorámicas recorridas con el confort de nuestros 4x4.',
    descriptionFr: 'Collines de latérite rouge et crêtes de granit traversées dans le confort absolu de nos 4x4 privés.',
    tagEn: 'RN7 Highway',
    tagEs: 'Ruta Nacional 7',
    tagFr: 'Route Nationale 7',
  }
];

export const RealExpeditionsGallery: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto = selectedPhotoIndex !== null ? clientGalleryPhotos[selectedPhotoIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : clientGalleryPhotos.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => (prev! < clientGalleryPhotos.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <section id="real-gallery" className="py-20 bg-[#F1F5F9]/60 border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-xs font-semibold text-[#0D9488] uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>{t('gallery.badge', 'Real Tour Gallery')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0F172A] mb-3">
            {t('gallery.title', 'Real Moments on the Road with Ernest')}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            {t(
              'gallery.subtitle',
              'Authentic, unfiltered snapshots from our actual private expeditions across Madagascar. Real travelers, real 4x4 journeys, real Malagasy hospitality.'
            )}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {clientGalleryPhotos.map((photo, index) => {
            const title =
              language === 'es'
                ? photo.titleEs
                : language === 'fr'
                ? photo.titleFr
                : photo.titleEn;
            const location =
              language === 'es'
                ? photo.locationEs
                : language === 'fr'
                ? photo.locationFr
                : photo.locationEn;
            const tag =
              language === 'es' ? photo.tagEs : language === 'fr' ? photo.tagFr : photo.tagEn;

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] shadow-sm hover:shadow-xl hover:border-[#0D9488]/40 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo container with zoom on hover */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={photo.image}
                    alt={title}
                    onError={(e) => {
                      // Graceful fallback to backup image if local asset is loading
                      (e.currentTarget as HTMLImageElement).src = photo.backupImage;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider bg-white/90 text-[#0F172A] backdrop-blur-sm shadow-sm">
                      {tag}
                    </span>
                  </div>

                  {/* Hover icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-2.5 rounded-full bg-[#0D9488] text-white shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Bottom Location Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-1.5 text-xs drop-shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                    <span className="font-medium text-[11px] truncate text-slate-100">{location}</span>
                  </div>
                </div>

                {/* Card Info Box */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0D9488] transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <div className="mt-2.5 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
                    <span className="flex items-center gap-1 font-medium text-[#0D9488]">
                      <Compass className="w-3.5 h-3.5" />
                      <span>Ernest Expedition</span>
                    </span>
                    <span className="text-slate-400 font-mono">#{index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client trust quote banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0D9488]/10 border-2 border-[#0D9488] shrink-0">
              <img
                src="/tours/ernest-isalo.jpg"
                alt="Soa Ernest"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base font-medium text-[#0F172A]">
                {language === 'es'
                  ? '«Cada foto aquí es 100% auténtica: tomada durante nuestros viajes reales en 4x4 por toda la isla.»'
                  : language === 'fr'
                  ? '«Chaque photo ici est 100% authentique : prise lors de nos réelles expéditions 4x4 sur la Grande Île.»'
                  : '“Every photo here is 100% authentic: taken on our actual 4x4 overland expeditions across the Great Red Island.”'}
              </p>
              <p className="text-xs text-[#0D9488] font-bold mt-0.5">
                Soa Ernest &bull; {language === 'es' ? 'Guía Certificado y Fundador' : language === 'fr' ? 'Guide Certifié & Fondateur' : 'Certified Guide & Managing Director'}
              </p>
            </div>
          </div>
          <a
            href="https://wa.me/261325700405"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#0D9488]/20 flex items-center gap-2"
          >
            <span>{language === 'es' ? 'Consultar con Ernest' : language === 'fr' ? 'Contacter Ernest' : 'Talk with Ernest'}</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-white border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#0D9488] text-white">
                  {language === 'es'
                    ? activePhoto.tagEs
                    : language === 'fr'
                    ? activePhoto.tagFr
                    : activePhoto.tagEn}
                </span>
                <span className="text-xs text-slate-400">
                  {selectedPhotoIndex! + 1} / {clientGalleryPhotos.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Main Image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.image}
                alt={
                  language === 'es'
                    ? activePhoto.titleEs
                    : language === 'fr'
                    ? activePhoto.titleFr
                    : activePhoto.titleEn
                }
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = activePhoto.backupImage;
                }}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#0D9488] text-white transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#0D9488] text-white transition-all cursor-pointer backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Details Footer */}
            <div className="p-6 bg-slate-900 border-t border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="text-lg font-display font-semibold text-white">
                  {language === 'es'
                    ? activePhoto.titleEs
                    : language === 'fr'
                    ? activePhoto.titleFr
                    : activePhoto.titleEn}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#2DD4BF]">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>
                    {language === 'es'
                      ? activePhoto.locationEs
                      : language === 'fr'
                      ? activePhoto.locationFr
                      : activePhoto.locationEn}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'es'
                  ? activePhoto.descriptionEs
                  : language === 'fr'
                  ? activePhoto.descriptionFr
                  : activePhoto.descriptionEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
