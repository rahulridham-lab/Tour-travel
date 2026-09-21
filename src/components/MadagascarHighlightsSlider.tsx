import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, Eye, Camera, Compass } from 'lucide-react';

interface HighlightSlide {
  id: string;
  title: string;
  location: string;
  region: string;
  description: string;
  image: string;
  tag: string;
}

const slides: HighlightSlide[] = [
  {
    id: 'baobabs',
    title: 'Avenue of the Baobabs Sunset',
    location: 'Morondava & Menabe',
    region: 'West Madagascar',
    description: 'Ancient 800-year-old Adansonia grandidieri towers reaching 30 meters into the crimson twilight sky.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80',
    tag: 'Iconic Wonder',
  },
  {
    id: 'tsingy',
    title: 'Grand Tsingy Limestone Labyrinths',
    location: 'Tsingy de Bemaraha UNESCO',
    region: 'West Madagascar',
    description: 'Suspension footbridges over razor-sharp cathedral karst needles and rare Decken’s sifaka lemurs.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80',
    tag: 'UNESCO World Heritage',
  },
  {
    id: 'isalo',
    title: 'Isalo Jurassic Sandstone Canyons',
    location: 'Isalo National Park',
    region: 'South RN7',
    description: 'Eroded jurassic plateaus, deep natural thermal pools, and ring-tailed lemur troops at sunset oasis.',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1400&q=80',
    tag: 'Geological Wonder',
  },
  {
    id: 'lemurs',
    title: 'Andasibe Rainforest & Indri Indri',
    location: 'Andasibe-Mantadia',
    region: 'East Madagascar',
    description: 'Waking up to the haunting territorial wail of the Indri, the largest living lemur in misty canopy.',
    image: 'https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=1400&q=80',
    tag: 'Endemic Wildlife',
  },
  {
    id: 'sainte-marie',
    title: 'Sainte-Marie Turquoise Lagoons',
    location: 'Nosy Boraha & Île aux Nattes',
    region: 'East Indian Ocean',
    description: 'Breaching humpback mother-calf pairs in protected calm shallows, pirate graveyards, and palm beaches.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=80',
    tag: 'Marine Sanctuary',
  },
  {
    id: 'tsiribihina',
    title: 'Tsiribihina River Chaland Safari',
    location: 'Miandrivazo Gorge',
    region: 'Central West',
    description: 'Three days gliding peacefully downstream past remote Sakalava villages, waterfalls, and roosting fruit bats.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80',
    tag: 'River Expedition',
  },
];

interface SliderProps {
  onExploreCircuit?: (region: string) => void;
  onNavigate?: (page: string) => void;
}

export const MadagascarHighlightsSlider: React.FC<SliderProps> = ({
  onExploreCircuit,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const current = slides[currentIndex];

  return (
    <section
      id="highlights-slider-section"
      className="py-14 sm:py-20 bg-white border-t border-[#E2E8F0] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#0D9488] text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Madagascar Natural Wonders Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#0F172A] tracking-tight">
              Iconic Terrains Waiting For Your 4x4
            </h2>
            <p className="text-sm text-[#64748B] mt-1 max-w-2xl">
              From limestone labyrinths to baobab corridors. Every expedition is guided by Ernest’s local team.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prevSlide}
              aria-label="Previous landscape"
              className="w-11 h-11 rounded-full border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F1F5F9] hover:border-[#0D9488] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-[#475569] min-w-[50px] text-center">
              0{currentIndex + 1} / 0{slides.length}
            </span>
            <button
              onClick={nextSlide}
              aria-label="Next landscape"
              className="w-11 h-11 rounded-full border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F1F5F9] hover:border-[#0D9488] flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slider Display Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E2E8F0] h-[380px] sm:h-[460px] lg:h-[500px] group bg-[#0F172A]">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          />
          {/* Subtle Dark Bottom & Left Vignette for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/40 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-end text-white">
            <div className="max-w-3xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0D9488] text-white text-xs font-bold uppercase tracking-wider">
                  {current.tag}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  {current.location} &bull; {current.region}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed max-w-2xl">
                {current.description}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate && onNavigate('tours')}
                  className="px-5 py-2.5 rounded-xl bg-white text-[#0F172A] font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#0D9488]" />
                  <span>See Tours Visiting This Region</span>
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 right-6 hidden sm:flex items-center gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-8 bg-[#0D9488]'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Selector Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mt-4">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer text-left ${
                currentIndex === idx
                  ? 'border-[#0D9488] shadow-md scale-[1.02]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-1.5">
                <span className="text-[10px] font-bold text-white line-clamp-1">
                  {slide.title.split(' ')[0]}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
