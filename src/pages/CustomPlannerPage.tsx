import React from 'react';
import { CustomItineraryPlanner } from '../components/CustomItineraryPlanner';
import { SEOHead } from '../components/SEOHead';
import { CurrencyConfig, siteConfig } from '../data/siteConfig';
import { ArrowLeft, ShieldCheck, Compass, MessageSquare, Phone, Award } from 'lucide-react';

interface CustomPlannerPageProps {
  currentCurrency: CurrencyConfig;
  onNavigate: (page: string) => void;
}

export const CustomPlannerPage: React.FC<CustomPlannerPageProps> = ({
  currentCurrency,
  onNavigate,
}) => {
  return (
    <div className="pt-24 bg-[#F8FAFC] min-h-screen text-[#0F172A]">
      <SEOHead
        title="Custom Safari Planner | Madagascar Ernest Travel Tours"
        description="Build and customize your bespoke private Madagascar overland itinerary. Select party size, wildlife focus, pace, and luxury eco-lodges with instant PDF proposal generation."
      />

      {/* Breadcrumbs & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#0D9488] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <div className="text-xs text-[#64748B]">
            Direct Concierge: <strong className="text-[#0D9488]">{siteConfig.contacts.whatsappDisplay}</strong>
          </div>
        </div>
      </div>

      {/* Main Interactive Custom Itinerary Planner */}
      <CustomItineraryPlanner currentCurrency={currentCurrency} />

      {/* Why Choose a Custom Private Safari With Ernest Tours */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#E2E8F0]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#0D9488] font-bold block mb-2">
            The Bespoke Standard
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#0F172A]">
            Why Travelers Choose a Tailor-Made Madagascar Route
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="travexa-card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-[#0D9488]" />
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-2">100% Private & Paced to You</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              No shared tour buses or rigid schedules. If you wish to linger with a family of dancing
              Sifakas or wait for the golden hour over the baobabs, the day is entirely yours.
            </p>
          </div>

          <div className="travexa-card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#D97706]" />
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-2">Direct Operator Pricing</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Booking directly with Ernest in Antsirabe eliminates international agency markups while guaranteeing
              well-maintained private 4x4 vehicles and hand-picked eco-lodges.
            </p>
          </div>

          <div className="travexa-card p-6 bg-white">
            <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
              <Award className="w-5 h-5 text-[#0D9488]" />
            </div>
            <h4 className="text-base font-bold text-[#0F172A] mb-2">Native Guide Network</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Partner with licensed park rangers and indigenous trackers who know every chameleon branch,
              lemur canopy, and hidden river waterfall throughout the island.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
