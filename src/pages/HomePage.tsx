import React, { useState } from 'react';
import { TravexaHero } from '../components/TravexaHero';
import { TourCardGrid } from '../components/TourCardGrid';
import { CustomItineraryPlanner } from '../components/CustomItineraryPlanner';
import { MadagascarMap3D } from '../components/MadagascarMap3D';
import { ExperienceShowcase } from '../components/ExperienceShowcase';
import { RealExpeditionsGallery } from '../components/RealExpeditionsGallery';
import { Testimonials3D } from '../components/Testimonials3D';
import { ThreeDPerspectiveWrapper } from '../components/3DPerspectiveWrapper';
import { FloatingStickyBar } from '../components/FloatingStickyBar';
import { FAQSection } from '../components/FAQSection';
import { TextSlider } from '../components/TextSlider';
import { QuickActionLinks } from '../components/QuickActionLinks';
import { TravelSearchEngine, SearchFilterState } from '../components/TravelSearchEngine';
import { OffersSlider } from '../components/OffersSlider';
import { PreFooterTrustSlider } from '../components/PreFooterTrustSlider';
import { SEOHead } from '../components/SEOHead';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';
import { Circuit } from '../data/circuits';

interface HomePageProps {
  currentCurrency: CurrencyConfig;
  onSelectCircuit: (circuit: Circuit) => void;
  onBookCircuit: (circuitId: string) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentCurrency,
  onSelectCircuit,
  onBookCircuit,
  onNavigate,
}) => {
  const [heroSearchFilters, setHeroSearchFilters] = useState<{
    region?: string;
    duration?: string;
    activity?: string;
  }>({
    region: 'all',
    duration: 'all',
    activity: 'all',
  });

  const handleHeroSearch = (filters: { region: string; duration: string; activity: string }) => {
    setHeroSearchFilters(filters);
  };

  const handleSearchEngineFilters = (filters: SearchFilterState) => {
    setHeroSearchFilters({
      region: filters.region,
      duration: filters.duration,
      activity: filters.keyword ? filters.keyword : 'all',
    });
  };

  return (
    <div className="relative bg-[#F8FAFC]">
      {/* Dynamic SEO & Schema.org Structured Data */}
      <SEOHead
        title="Madagascar Ernest Travel Tours | Travexa Light Luxury Overland Safaris"
        description="Official certified Malagasy tour operator in Antsirabe. Bespoke 4x4 overland safaris, Grand Tsingy expeditions, Avenue of Baobabs sunset toasts, and Sainte-Marie Island marine getaways."
      />

      {/* 1. Travexa Light Luxury Hero Section */}
      <TravexaHero
        currentCurrency={currentCurrency}
        onSearchCircuits={handleHeroSearch}
        onOpenCustomPlanner={() => onNavigate('custom-planner')}
        onBookCircuit={onBookCircuit}
      />

      {/* 1.2 Dynamic Text Ticker Slider */}
      <TextSlider onNavigate={onNavigate} />

      {/* 1.4 Promotional Offers & Deals Slider (Requested by user below hero) */}
      <OffersSlider
        onSelectCircuit={onSelectCircuit}
        onBookCircuit={onBookCircuit}
      />

      {/* 1.6 Proper Travel Search Engine (Requested by user) */}
      <div id="travel-search-engine" className="my-8 scroll-mt-28">
        <TravelSearchEngine
          currentCurrency={currentCurrency}
          onFilterChange={handleSearchEngineFilters}
          onSelectCircuit={onSelectCircuit}
        />
      </div>

      {/* 1.8 Quick Action Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-20">
        <QuickActionLinks variant="cards" onNavigate={onNavigate} />
      </div>

      {/* 2. Travexa-Inspired Tour Card Grid */}
      <div id="tours-grid-section" className="scroll-mt-24">
        <ThreeDPerspectiveWrapper intensity="subtle" direction="up">
          <TourCardGrid
            key={`${heroSearchFilters.region}-${heroSearchFilters.duration}-${heroSearchFilters.activity}`}
            currentCurrency={currentCurrency}
            onSelectCircuit={onSelectCircuit}
            onBookCircuit={onBookCircuit}
            initialFilters={heroSearchFilters}
          />
        </ThreeDPerspectiveWrapper>
      </div>

      {/* 2.2 Quick Action Links Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <QuickActionLinks variant="banner" onNavigate={onNavigate} />
      </div>

      {/* 2.5 Real Expeditions Gallery (Authentic Client Photos) */}
      <ThreeDPerspectiveWrapper intensity="subtle" direction="up">
        <RealExpeditionsGallery />
      </ThreeDPerspectiveWrapper>

      {/* 3. Interactive Custom AI Itinerary Planner */}
      <ThreeDPerspectiveWrapper intensity="subtle" direction="up">
        <div className="border-t border-[#E2E8F0]">
          <CustomItineraryPlanner currentCurrency={currentCurrency} />
        </div>
      </ThreeDPerspectiveWrapper>

      {/* 4. Interactive Geographic Map of Madagascar */}
      <ThreeDPerspectiveWrapper intensity="medium" direction="up">
        <MadagascarMap3D onSelectCircuit={onSelectCircuit} />
      </ThreeDPerspectiveWrapper>

      {/* 5. Fleet & Untamed Comfort Showcase */}
      <ThreeDPerspectiveWrapper intensity="subtle" direction="up">
        <ExperienceShowcase />
      </ThreeDPerspectiveWrapper>

      {/* 6. Guest Reviews & Testimonials */}
      <ThreeDPerspectiveWrapper intensity="subtle" direction="up">
        <Testimonials3D />
      </ThreeDPerspectiveWrapper>

      {/* 6.5 Comprehensive SEO FAQ Section */}
      <ThreeDPerspectiveWrapper intensity="subtle" direction="up">
        <FAQSection />
      </ThreeDPerspectiveWrapper>

      {/* 6.8 Pre-Footer Trust & Guarantee Slider (Requested by user above footer) */}
      <PreFooterTrustSlider onNavigate={onNavigate} />

      {/* 7. Floating Sticky Booking Bar */}
      <FloatingStickyBar
        currentCurrency={currentCurrency}
        onOpenBooking={onBookCircuit}
        onNavigate={onNavigate}
      />
    </div>
  );
};
