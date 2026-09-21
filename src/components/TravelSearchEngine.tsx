import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Users,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Filter,
  Check,
  Compass,
} from 'lucide-react';
import { circuitsData, Circuit } from '../data/circuits';
import { CurrencyConfig } from '../data/siteConfig';

export interface SearchFilterState {
  region: string;
  duration: string;
  partySize: '2' | '3-4' | '5+' | 'all';
  season: string;
  keyword: string;
}

interface TravelSearchEngineProps {
  currentCurrency: CurrencyConfig;
  onFilterChange?: (filters: SearchFilterState) => void;
  onSelectCircuit?: (circuit: Circuit) => void;
}

export const TravelSearchEngine: React.FC<TravelSearchEngineProps> = ({
  currentCurrency,
  onFilterChange,
  onSelectCircuit,
}) => {
  const [region, setRegion] = useState<string>('all');
  const [duration, setDuration] = useState<string>('all');
  const [partySize, setPartySize] = useState<'2' | '3-4' | '5+' | 'all'>('all');
  const [season, setSeason] = useState<string>('all');
  const [keyword, setKeyword] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'all' | 'west' | 'south' | 'east' | 'mixed'>('all');

  const filteredCount = useMemo(() => {
    return circuitsData.filter((c) => {
      if (region !== 'all' && c.region !== region) return false;
      if (activeTab !== 'all' && c.region !== activeTab) return false;
      if (duration === '7-9' && (c.durationDays < 7 || c.durationDays > 9)) return false;
      if (duration === '10-15' && (c.durationDays < 10 || c.durationDays > 15)) return false;
      if (duration === '16+' && c.durationDays < 16) return false;
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchSubtitle = c.subtitle.toLowerCase().includes(q);
        const matchRoute = c.routeOverview.some((r) => r.toLowerCase().includes(q));
        const matchAct = c.activitiesList?.some((a) => a.toLowerCase().includes(q));
        if (!matchTitle && !matchSubtitle && !matchRoute && !matchAct) return false;
      }
      return true;
    }).length;
  }, [region, duration, keyword, activeTab]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        region: activeTab !== 'all' ? activeTab : region,
        duration,
        partySize,
        season,
        keyword,
      });
    }
    const section = document.getElementById('tours-grid-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickTag = (tag: string) => {
    setKeyword(tag);
    if (onFilterChange) {
      onFilterChange({
        region: activeTab !== 'all' ? activeTab : region,
        duration,
        partySize,
        season,
        keyword: tag,
      });
    }
    const section = document.getElementById('tours-grid-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-200/80 p-4 sm:p-7 backdrop-blur-xl">
        {/* Top Header & Fast Category Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#0D9488] font-bold block">
                Madagascar Travel Search Engine
              </span>
              <h3 className="text-lg sm:text-xl font-display font-bold text-[#0F172A]">
                Find Your Ideal Private 4x4 Overland Circuit
              </h3>
            </div>
          </div>

          {/* Quick Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab('all');
                setRegion('all');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#0F172A] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              All Regions (8)
            </button>
            <button
              onClick={() => {
                setActiveTab('west');
                setRegion('west');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'west'
                  ? 'bg-white text-[#0D9488] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              West Tsingy & Baobabs
            </button>
            <button
              onClick={() => {
                setActiveTab('south');
                setRegion('south');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'south'
                  ? 'bg-white text-[#D97706] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              South RN7 & Canyons
            </button>
            <button
              onClick={() => {
                setActiveTab('east');
                setRegion('east');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'east'
                  ? 'bg-white text-[#0284C7] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              East Pangalanes & Lemurs
            </button>
            <button
              onClick={() => {
                setActiveTab('mixed');
                setRegion('mixed');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === 'mixed'
                  ? 'bg-white text-[#7C3AED] shadow-sm font-bold'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              Cross-Island Grand Tours
            </button>
          </div>
        </div>

        {/* Search Engine Form Controls */}
        <form onSubmit={handleSearchSubmit} className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* 1. Destination / Route */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0D9488]/40 transition-all focus-within:border-[#0D9488] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D9488]/10">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
                Destination / Route
              </label>
              <select
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setActiveTab(e.target.value as any);
                }}
                className="w-full bg-transparent text-xs font-semibold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                <option value="all">All Destinations (Islandwide)</option>
                <option value="west">West: Tsingy, Kirindy & Baobabs</option>
                <option value="south">South: RN7, Isalo & Ifaty Beach</option>
                <option value="east">East: Pangalanes Canal & Andasibe</option>
                <option value="mixed">Mixed: Complete Trans-Madagascar</option>
              </select>
            </div>

            {/* 2. Duration */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0D9488]/40 transition-all focus-within:border-[#0D9488] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D9488]/10">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
                Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="7-9">7 – 9 Days (Express Safaris)</option>
                <option value="10-15">10 – 15 Days (Classic Overland)</option>
                <option value="16+">16 – 24 Days (Grand Expeditions)</option>
              </select>
            </div>

            {/* 3. Number of Travelers (Pricing Tier) */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0D9488]/40 transition-all focus-within:border-[#0D9488] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D9488]/10">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-[#0D9488]" />
                Party Size
              </label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value as any)}
                className="w-full bg-transparent text-xs font-semibold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                <option value="all">All Party Sizes</option>
                <option value="2">2 Persons (Private Duo)</option>
                <option value="3-4">3 to 4 Persons (Small Group)</option>
                <option value="5+">5+ Persons (Group Privilege)</option>
              </select>
            </div>

            {/* 4. Travel Season / Month */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0D9488]/40 transition-all focus-within:border-[#0D9488] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0D9488]/10">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-[#0D9488]" />
                Season / Month
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-[#0F172A] focus:outline-none cursor-pointer"
              >
                <option value="all">Any Month (Year-Round)</option>
                <option value="may-oct">May – October (Dry Peak Season)</option>
                <option value="jul-sep">July – September (Whales & Tsingy)</option>
                <option value="oct-dec">October – December (Lemurs & Warm)</option>
                <option value="jan-apr">January – April (Green Rainforest)</option>
              </select>
            </div>

            {/* 5. Search Button with Live Results Count */}
            <div className="flex items-center">
              <button
                type="submit"
                className="w-full h-full min-h-[52px] px-6 py-3 rounded-2xl bg-[#0D9488] hover:bg-[#0F766E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#0D9488]/25 active:scale-[0.98] transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Search ({filteredCount} Circuits)</span>
              </button>
            </div>
          </div>

          {/* Bottom Row: Keyword Filter & Popular Tags */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Filter by keyword: e.g. Tsingy, Pangalanes, Chaland, Aye-Aye, Isalo..."
                className="w-full bg-transparent text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  className="text-slate-400 hover:text-slate-600 text-xs px-1.5"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Popular Shortcut Tags */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-medium">Popular:</span>
              {[
                'Pangalanes Chaland',
                'Grand Tsingy',
                'Aye-Aye Lemurs',
                'Avenue of Baobabs',
                'Isalo Canyons',
                'Mozambique Channel',
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTag(tag)}
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-[#0D9488]/10 hover:text-[#0D9488] text-slate-600 font-medium transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
