import React, { useState } from 'react';
import { TourCardGrid } from '../components/TourCardGrid';
import { RealExpeditionsGallery } from '../components/RealExpeditionsGallery';
import { TravelSearchEngine, SearchFilterState } from '../components/TravelSearchEngine';
import { PreFooterTrustSlider } from '../components/PreFooterTrustSlider';
import { SEOHead } from '../components/SEOHead';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';
import { Circuit } from '../data/circuits';
import { ArrowLeft, ShieldCheck, Compass, MessageSquare, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ToursPageProps {
  currentCurrency: CurrencyConfig;
  onSelectCircuit: (circuit: Circuit) => void;
  onBookCircuit: (circuitId: string) => void;
  onNavigate: (page: string) => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({
  currentCurrency,
  onSelectCircuit,
  onBookCircuit,
  onNavigate,
}) => {
  const { t } = useLanguage();
  const [filterState, setFilterState] = useState<{
    region?: string;
    duration?: string;
    activity?: string;
  }>({
    region: 'all',
    duration: 'all',
    activity: 'all',
  });

  const handleFilterChange = (filters: SearchFilterState) => {
    setFilterState({
      region: filters.region,
      duration: filters.duration,
      activity: filters.keyword || 'all',
    });
  };

  return (
    <div className="pt-24 bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      <SEOHead
        title="Madagascar Private Safari Circuits & Packages | Ernest Travel Tours"
        description="Browse our collection of private 4x4 overland safaris, Tsiribihina river expeditions, Grand Tsingy treks, and Sainte-Marie island getaways with live multi-currency pricing."
      />

      {/* Breadcrumbs & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0D9488] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('nav.home', 'Home')}</span>
          </button>
          <div className="flex items-center gap-3 text-xs text-[#64748B]">
            <button
              onClick={() => onNavigate('custom-planner')}
              className="px-3.5 py-1.5 rounded-xl bg-[#0D9488]/10 text-[#0D9488] font-bold hover:bg-[#0D9488]/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{t('nav.planner', 'Custom Trip Planner')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Travel Search Engine */}
      <div className="my-6">
        <TravelSearchEngine
          currentCurrency={currentCurrency}
          onFilterChange={handleFilterChange}
          onSelectCircuit={onSelectCircuit}
        />
      </div>

      {/* Travexa-Style Tour Card Grid with Full Filtering & Search */}
      <div id="tours-grid-section">
        <TourCardGrid
          key={`${filterState.region}-${filterState.duration}-${filterState.activity}`}
          currentCurrency={currentCurrency}
          onSelectCircuit={onSelectCircuit}
          onBookCircuit={onBookCircuit}
          initialFilters={filterState}
        />
      </div>

      {/* Pre-Footer Trust & Guarantees Slider */}
      <PreFooterTrustSlider onNavigate={onNavigate} />

      {/* Real Expeditions Gallery */}
      <RealExpeditionsGallery />
    </div>
  );
};
