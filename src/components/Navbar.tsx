import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Globe,
  Compass,
  Languages,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Search,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Clock,
  Star,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Car,
  Mountain,
  Trees,
  Waves,
  Info,
  ExternalLink,
} from 'lucide-react';
import { siteConfig, CurrencyConfig } from '../data/siteConfig';
import { useLanguage, supportedLanguages, Language } from '../context/LanguageContext';
import { circuitsData, Circuit } from '../data/circuits';

interface NavbarProps {
  currentCurrency: CurrencyConfig;
  currentPage: string;
  onSelectCurrency: (currency: CurrencyConfig) => void;
  onNavigate: (page: string) => void;
  onOpenBooking: (circuitId?: string) => void;
  onSelectCircuit?: (circuit: Circuit) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  currentPage,
  onSelectCurrency,
  onNavigate,
  onOpenBooking,
  onSelectCircuit,
}) => {
  const { language, setLanguage, currentLanguageOption, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown States
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [circuitsMegaMenuOpen, setCircuitsMegaMenuOpen] = useState(false);
  const [destinationsMenuOpen, setDestinationsMenuOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile Accordion States
  const [mobileAccordion, setMobileAccordion] = useState<string | null>('circuits');

  // References for click-outside detection
  const navContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setCurrencyDropdownOpen(false);
        setLanguageDropdownOpen(false);
        setCircuitsMegaMenuOpen(false);
        setDestinationsMenuOpen(false);
        setAboutMenuOpen(false);
        setSearchOverlayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus search input when opened
  useEffect(() => {
    if (searchOverlayOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOverlayOpen]);

  const closeAllMenus = () => {
    setCircuitsMegaMenuOpen(false);
    setDestinationsMenuOpen(false);
    setAboutMenuOpen(false);
    setCurrencyDropdownOpen(false);
    setLanguageDropdownOpen(false);
    setSearchOverlayOpen(false);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (page: string, anchorId?: string) => {
    closeAllMenus();
    if (currentPage !== page) {
      onNavigate(page);
      if (anchorId) {
        setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (anchorId) {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleCircuitSelect = (circuit: Circuit) => {
    closeAllMenus();
    if (onSelectCircuit) {
      onSelectCircuit(circuit);
    } else {
      onNavigate('tours');
      setTimeout(() => {
        window.location.hash = `circuit/${circuit.id}`;
      }, 100);
    }
  };

  const handleDestinationClick = (destinationName: string) => {
    closeAllMenus();
    onNavigate('tours');
    setTimeout(() => {
      const searchBox = document.getElementById('tour-catalog-search') as HTMLInputElement;
      if (searchBox) {
        searchBox.value = destinationName;
        searchBox.dispatchEvent(new Event('input', { bubbles: true }));
        searchBox.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleSearchShortcut = () => {
    setSearchOverlayOpen((prev) => !prev);
  };

  const formatPrice = (eurAmount: number) => {
    const converted = Math.round(eurAmount * currentCurrency.rateFromEUR);
    return `${currentCurrency.symbol} ${converted.toLocaleString()}`;
  };

  // Filtered circuits for the quick search popup
  const searchResults = searchQuery.trim()
    ? circuitsData.filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.regionLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : circuitsData.slice(0, 4);

  // Group circuits by region for the mega-menu
  const westCircuits = circuitsData.filter(
    (c) => c.region === 'west' || c.id === 'circuits-mixt-sud-west-23-days'
  );
  const southCircuits = circuitsData.filter(
    (c) => c.region === 'south' || c.id === 'circuits-sud-west-15-days'
  );
  const eastCircuits = circuitsData.filter((c) => c.region === 'east');
  const transCircuits = circuitsData.filter(
    (c) => c.region === 'mixed' && c.id !== 'circuits-mixt-sud-west-23-days'
  );

  const topDestinations = [
    {
      name: 'Avenue of the Baobabs',
      region: 'Morondava / Menabe',
      icon: Trees,
      desc: 'Ancient Grandidier baobabs at sunset & Baobab Amoureux',
    },
    {
      name: 'Grand Tsingy de Bemaraha',
      region: 'Bekopaka (UNESCO)',
      icon: Mountain,
      desc: 'Karst limestone needle spires & suspension bridges',
    },
    {
      name: 'Isalo National Park',
      region: 'Ranohira / South',
      icon: Compass,
      desc: 'Jurassic sandstone canyons, natural rock pools & oases',
    },
    {
      name: 'Pangalanes Canal & Palmarium',
      region: 'Lake Rasoabe / East Coast',
      icon: Waves,
      desc: '3-day motor chaland navigation & nocturnal Aye-Aye lemurs',
    },
    {
      name: 'Andasibe Mantadia',
      region: 'Eastern Primary Rainforest',
      icon: Trees,
      desc: 'Misty cloud forests & haunting calls of giant Indri Indri',
    },
    {
      name: 'Ifaty & Mozambique Channel',
      region: 'South-West Coast',
      icon: Waves,
      desc: 'Coral barrier reefs, Vezo sailing canoes & spiny forests',
    },
  ];

  return (
    <header
      ref={navContainerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
    >
      {/* 1. TOP UTILITY BAR (High-end executive contact, currency & language) */}
      <div className="bg-[#07130D] text-slate-200 border-b border-[#14261B] py-1.5 text-[11px] hidden md:block">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          {/* Left: Contact Info & Antsirabe HQ */}
          <div className="flex items-center gap-5 text-slate-300">
            <a
              href={`tel:${siteConfig.contacts.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-[#0D9488] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{siteConfig.contacts.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contacts.email}`}
              className="flex items-center gap-1.5 hover:text-[#0D9488] transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>{siteConfig.contacts.email}</span>
            </a>
            <div className="hidden xl:flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Antsirabe HQ &bull; 24/7 Field Dispatch</span>
            </div>
          </div>

          {/* Center: Operator Certification Badge */}
          <div className="hidden lg:flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-300">
              Licensed Malagasy Operator &bull; 100% Private Toyota 4x4 &bull; Direct Field Pricing
            </span>
          </div>

          {/* Right: Currency, Language & Fast WhatsApp */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLanguageDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-slate-200 hover:text-white px-2 py-0.5 rounded-md hover:bg-white/10 transition-colors font-semibold"
                aria-expanded={currencyDropdownOpen}
              >
                <Globe className="w-3 h-3 text-[#0D9488]" />
                <span>
                  {currentCurrency.code} ({currentCurrency.symbol})
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
                    currencyDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xl z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                    Select Currency
                  </div>
                  {siteConfig.currencies.map((curr) => (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => {
                        onSelectCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        currentCurrency.code === curr.code
                          ? 'text-[#0D9488] font-bold bg-emerald-50/60'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="font-semibold">{curr.code}</span>
                      <span className="text-[#0D9488] font-bold">{curr.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLanguageDropdownOpen(!languageDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1 text-slate-200 hover:text-white px-2 py-0.5 rounded-md hover:bg-white/10 transition-colors font-semibold"
                aria-expanded={languageDropdownOpen}
              >
                <span>{currentLanguageOption.flag}</span>
                <span className="font-bold text-[#0D9488]">
                  {currentLanguageOption.code.toUpperCase()}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${
                    languageDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {languageDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xl z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                    Language / Langue
                  </div>
                  {supportedLanguages.map((opt) => (
                    <button
                      key={opt.code}
                      type="button"
                      onClick={() => {
                        setLanguage(opt.code);
                        setLanguageDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        language === opt.code
                          ? 'text-[#0D9488] font-bold bg-emerald-50/60'
                          : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{opt.flag}</span>
                        <span>{opt.nativeName}</span>
                      </div>
                      {language === opt.code && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct WhatsApp Pill */}
            <a
              href={`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent('Hello Ernest! I would like to inquire about Madagascar private tours.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-0.5 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-emerald-300 hover:text-white transition-all flex items-center gap-1 font-bold text-[10px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <MessageSquare className="w-3 h-3 fill-current" />
              <span>WhatsApp 24/7</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div
        className={`bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all duration-200 ${
          isScrolled ? 'py-2 shadow-md' : 'py-3 shadow-xs'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-3 xl:gap-6">
          {/* Brand Logo & Emblem */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer py-1 shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D9488] to-[#059669] flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform shrink-0">
              <Compass className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-serif text-lg sm:text-xl xl:text-2xl font-extrabold tracking-[0.12em] uppercase text-[#0F172A] group-hover:text-[#0D9488] transition-colors leading-none">
                Madagascar Ernest
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="h-[2px] w-4 bg-[#0D9488] shrink-0" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.22em] text-[#0D9488] uppercase font-bold whitespace-nowrap">
                  Tours & Safaris &bull; Antsirabe HQ
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Menu Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 text-xs xl:text-[13px] 2xl:text-sm font-semibold text-slate-700 shrink-0">
            {/* 1. Home Link */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'home'
                  ? 'text-[#0D9488] font-bold bg-emerald-50/80'
                  : 'text-slate-700 hover:text-[#0D9488] hover:bg-slate-50'
              }`}
            >
              <span className="whitespace-nowrap">{t('nav.home', 'Home')}</span>
            </button>

            {/* 2. Circuits & Safaris MEGA MENU Trigger */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => {
                setCircuitsMegaMenuOpen(true);
                setDestinationsMenuOpen(false);
                setAboutMenuOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setCircuitsMegaMenuOpen(!circuitsMegaMenuOpen);
                  setDestinationsMenuOpen(false);
                  setAboutMenuOpen(false);
                }}
                className={`px-2.5 xl:px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 'tours' || currentPage === 'circuit-detail' || circuitsMegaMenuOpen
                    ? 'text-[#0D9488] font-bold bg-emerald-50/80'
                    : 'text-slate-700 hover:text-[#0D9488] hover:bg-slate-50'
                }`}
                aria-expanded={circuitsMegaMenuOpen}
              >
                <span className="whitespace-nowrap">{t('nav.tours', 'Tours & Circuits')}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#0D9488] text-white text-[10px] font-bold leading-none shrink-0">
                  8
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    circuitsMegaMenuOpen ? 'rotate-180 text-[#0D9488]' : ''
                  }`}
                />
              </button>

              {/* MEGA MENU CONTAINER */}
              {circuitsMegaMenuOpen && (
                <div
                  onMouseLeave={() => setCircuitsMegaMenuOpen(false)}
                  className="absolute top-full -left-20 xl:-left-10 mt-2 w-[780px] xl:w-[880px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800"
                >
                  {/* Mega Menu Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="font-serif text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>Curated Private Madagascar Circuits</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0D9488] text-[10px] font-bold uppercase tracking-wider">
                          100% Private 4x4 & Guide
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Authentic Day-by-Day itineraries with all National Park permits and direct field rates.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNavClick('tours')}
                      className="text-xs font-bold text-[#0D9488] hover:text-[#0A6E64] flex items-center gap-1 group/all cursor-pointer"
                    >
                      <span>View All 8 Circuits</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/all:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* 4 Regions Columns + Featured Card */}
                  <div className="grid grid-cols-12 gap-6 pt-4">
                    {/* Left: 3 Circuit Categories (8 cols) */}
                    <div className="col-span-8 grid grid-cols-2 gap-4">
                      {/* West & Tsingy */}
                      <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <Mountain className="w-3 h-3 text-[#0D9488]" />
                          <span>West & Tsingy Karst</span>
                        </div>
                        <div className="space-y-1.5">
                          {circuitsData
                            .filter(
                              (c) =>
                                c.id === 'circuits-west-8-days' ||
                                c.id === 'circuits-mixt-sud-west-23-days'
                            )
                            .map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleCircuitSelect(c)}
                                className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0D9488] line-clamp-1">
                                    {c.durationDays} Days &bull; {c.title.split('—')[0].replace('Circuits ', '')}
                                  </span>
                                  <span className="text-[10px] font-bold text-[#0D9488] shrink-0 ml-1">
                                    {formatPrice(c.basePriceEUR)}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {c.highlights[0] || c.subtitle}
                                </p>
                              </button>
                            ))}
                        </div>
                      </div>

                      {/* Classic RN7 & South */}
                      <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <Compass className="w-3 h-3 text-[#0D9488]" />
                          <span>Classic RN7 & South</span>
                        </div>
                        <div className="space-y-1.5">
                          {circuitsData
                            .filter(
                              (c) =>
                                c.id === 'circuits-sud-west-15-days' ||
                                c.id === 'circuits-sud-ouest-19-jours'
                            )
                            .map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleCircuitSelect(c)}
                                className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0D9488] line-clamp-1">
                                    {c.durationDays} Days &bull; {c.title.split('—')[0].replace('Circuits ', '')}
                                  </span>
                                  <span className="text-[10px] font-bold text-[#0D9488] shrink-0 ml-1">
                                    {formatPrice(c.basePriceEUR)}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {c.highlights[0] || c.subtitle}
                                </p>
                              </button>
                            ))}
                        </div>
                      </div>

                      {/* East Rainforest & Pangalanes */}
                      <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <Waves className="w-3 h-3 text-[#0D9488]" />
                          <span>East & Pangalanes Canal</span>
                        </div>
                        <div className="space-y-1.5">
                          {circuitsData
                            .filter(
                              (c) =>
                                c.id === 'circuits-est-7-days' ||
                                c.id === 'circuits-est-7-days-comfort'
                            )
                            .map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleCircuitSelect(c)}
                                className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0D9488] line-clamp-1">
                                    {c.durationDays} Days &bull; {c.id.includes('comfort') ? 'Comfort VIP Edition' : 'Standard Chaland'}
                                  </span>
                                  <span className="text-[10px] font-bold text-[#0D9488] shrink-0 ml-1">
                                    {formatPrice(c.basePriceEUR)}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  Pangalanes motor chaland, Lake Rasoabe & Aye-Aye lemurs
                                </p>
                              </button>
                            ))}
                        </div>
                      </div>

                      {/* Grand Trans-Madagascar Odysseys */}
                      <div className="space-y-2">
                        <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#0D9488]" />
                          <span>Grand Trans-Island (20+ Days)</span>
                        </div>
                        <div className="space-y-1.5">
                          {circuitsData
                            .filter(
                              (c) =>
                                c.id === 'circuits-mixt-west-est-sud-24-days' ||
                                c.id === 'circuits-mixt-sud-west-est-21-days'
                            )
                            .map((c) => (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handleCircuitSelect(c)}
                                className="w-full text-left p-2 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group cursor-pointer"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#0D9488] line-clamp-1">
                                    {c.durationDays} Days &bull; {c.title.split('—')[0].replace('Circuits ', '')}
                                  </span>
                                  <span className="text-[10px] font-bold text-[#0D9488] shrink-0 ml-1">
                                    {formatPrice(c.basePriceEUR)}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {c.highlights[0] || c.subtitle}
                                </p>
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Featured Recommendation Card (4 cols) */}
                    <div className="col-span-4 bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0D9488]">
                          <Award className="w-3.5 h-3.5" />
                          <span>Ernest's Top Pick</span>
                        </div>
                        <h5 className="font-serif font-bold text-slate-900 text-sm mt-1">
                          Circuits Est 7 Days — Pangalanes Chaland
                        </h5>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                          Cruise 3 days along calm Pangalanes waterways, stay at Palmarium reserve with nocturnal Aye-Aye lemurs, and hear the Indri Indri in Andasibe.
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs">
                          <span className="text-slate-500">From / person:</span>
                          <span className="font-extrabold text-sm text-[#0D9488]">
                            {formatPrice(circuitsData[0]?.basePriceEUR || 1060)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 space-y-2">
                        <button
                          type="button"
                          onClick={() => handleCircuitSelect(circuitsData[0])}
                          className="w-full py-2 px-3 rounded-lg bg-[#0D9488] hover:bg-[#0A6E64] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Explore This Itinerary</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavClick('custom-planner')}
                          className="w-full py-1.5 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 text-center transition-colors cursor-pointer"
                        >
                          Build Custom 4x4 Route
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Footer Banner */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Flexible duration (reduce or extend days)
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Tiered group discounts (3, 4, 5+ persons)
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent('Hello Ernest! I would like recommendations for which Madagascar circuit fits my dates.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#0D9488] hover:underline flex items-center gap-1"
                    >
                      <span>Ask Ernest on WhatsApp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Destinations & Highlights Dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => {
                setDestinationsMenuOpen(true);
                setCircuitsMegaMenuOpen(false);
                setAboutMenuOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setDestinationsMenuOpen(!destinationsMenuOpen);
                  setCircuitsMegaMenuOpen(false);
                  setAboutMenuOpen(false);
                }}
                className={`px-2.5 xl:px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                  destinationsMenuOpen
                    ? 'text-[#0D9488] font-bold bg-emerald-50/80'
                    : 'text-slate-700 hover:text-[#0D9488] hover:bg-slate-50'
                }`}
                aria-expanded={destinationsMenuOpen}
              >
                <span className="whitespace-nowrap">Destinations</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    destinationsMenuOpen ? 'rotate-180 text-[#0D9488]' : ''
                  }`}
                />
              </button>

              {destinationsMenuOpen && (
                <div
                  onMouseLeave={() => setDestinationsMenuOpen(false)}
                  className="absolute top-full -left-12 mt-2 w-80 bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800"
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                    Iconic Madagascar Highlights
                  </div>
                  <div className="space-y-1 mt-1">
                    {topDestinations.map((dest) => {
                      const IconComp = dest.icon;
                      return (
                        <button
                          key={dest.name}
                          type="button"
                          onClick={() => handleDestinationClick(dest.name)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                        >
                          <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                              {dest.name}
                            </div>
                            <div className="text-[11px] text-slate-500">{dest.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Custom 4x4 Trip Planner */}
            <button
              type="button"
              onClick={() => handleNavClick('custom-planner')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'custom-planner'
                  ? 'text-[#0D9488] font-bold bg-emerald-50/80'
                  : 'text-slate-700 hover:text-[#0D9488] hover:bg-slate-50'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
              <span className="whitespace-nowrap">{t('nav.planner', 'Custom Trip Planner')}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[9px] uppercase tracking-wider whitespace-nowrap shrink-0">
                Custom
              </span>
            </button>

            {/* 5. Why Ernest / About Dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => {
                setAboutMenuOpen(true);
                setCircuitsMegaMenuOpen(false);
                setDestinationsMenuOpen(false);
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setAboutMenuOpen(!aboutMenuOpen);
                  setCircuitsMegaMenuOpen(false);
                  setDestinationsMenuOpen(false);
                }}
                className={`px-2.5 xl:px-3 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 ${
                  currentPage === 'about' || aboutMenuOpen
                    ? 'text-[#0D9488] font-bold bg-emerald-50/80'
                    : 'text-slate-700 hover:text-[#0D9488] hover:bg-slate-50'
                }`}
                aria-expanded={aboutMenuOpen}
              >
                <span className="whitespace-nowrap">{t('nav.about', 'About Ernest')}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                    aboutMenuOpen ? 'rotate-180 text-[#0D9488]' : ''
                  }`}
                />
              </button>

              {aboutMenuOpen && (
                <div
                  onMouseLeave={() => setAboutMenuOpen(false)}
                  className="absolute top-full -left-10 mt-2 w-72 bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-slate-800"
                >
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400 border-b border-slate-100">
                    The Madagascar Ernest Guarantee
                  </div>
                  <div className="space-y-1 mt-1">
                    <button
                      type="button"
                      onClick={() => handleNavClick('about')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                          About Ernest Soa
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Certified MNP guide since 2008 & Founder
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('about', 'fleet-section')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                          Our Private 4x4 Fleet
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Toyota Land Cruiser & Hilux with snorkel
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavClick('about', 'testimonials-section')}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-emerald-50 text-[#0D9488] group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                        <Star className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors">
                          Guest Reviews (4.98/5)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Feedback from over 280+ international guests
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 6. Contact HQ Link */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-2.5 xl:px-3 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                currentPage === 'contact'
                  ? 'text-[#0D9488] font-bold bg-emerald-50/80'
                  : 'text-slate-700 hover:text-[#0D9488] hover:bg-slate-50'
              }`}
            >
              <span className="whitespace-nowrap">{t('nav.contact', 'Contact HQ')}</span>
            </button>
          </nav>

          {/* Right Action Bar (Search, Direct WhatsApp, Bespoke Quote CTA) */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
            {/* Quick Interactive Search Popover Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={handleSearchShortcut}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  searchOverlayOpen
                    ? 'bg-[#0D9488] text-white border-[#0D9488]'
                    : 'border-slate-200 hover:border-[#0D9488] text-slate-700 hover:text-[#0D9488] bg-slate-50'
                }`}
                title="Search circuits & destinations"
                aria-label="Open circuit search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* QUICK SEARCH DROPDOWN OVERLAY */}
              {searchOverlayOpen && (
                <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search circuits (Tsingy, Pangalanes, Baobab, Isalo)..."
                      className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0D9488] focus:bg-white transition-all text-slate-800"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="mt-3 max-h-64 overflow-y-auto space-y-1.5 pr-1">
                    {searchResults.length > 0 ? (
                      searchResults.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleCircuitSelect(c)}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="pr-2">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488] transition-colors line-clamp-1">
                              {c.title}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {c.durationDays} Days &bull; {c.regionLabel}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-[#0D9488] shrink-0">
                            {formatPrice(c.basePriceEUR)}
                          </span>
                        </button>
                      ))
                    ) : (
                      <div className="text-center py-6 text-xs text-slate-400">
                        No circuits matching "{searchQuery}". Try "Tsingy", "East", or "Baobab".
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => handleNavClick('home', 'travel-search-engine')}
                      className="text-[#0D9488] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open Full Travel Search Engine</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-slate-400">8 Official Circuits</span>
                  </div>
                </div>
              )}
            </div>

            {/* Instant WhatsApp Action Pill */}
            <a
              href={`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent('Hello Ernest! I would like to inquire about booking a tour with you.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 xl:px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </a>

            {/* Plan Bespoke Tour Button */}
            <button
              type="button"
              onClick={() => handleNavClick('custom-planner')}
              className="px-3.5 xl:px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-xl bg-[#0F172A] hover:bg-[#0D9488] text-white shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">{t('nav.customPlan', 'Bespoke Quote')}</span>
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleSearchShortcut}
              className="p-2 rounded-xl bg-slate-100 text-slate-700"
              aria-label="Search circuits"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. PROFESSIONAL MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(100%)] max-h-[85vh] overflow-y-auto bg-white border-b border-slate-200 shadow-2xl px-5 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200 text-slate-800">
          {/* Quick Search on Mobile */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search circuits & destinations..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-100 rounded-xl border border-transparent focus:border-[#0D9488] focus:bg-white text-slate-900"
            />
          </div>

          {/* Mobile Navigation List */}
          <div className="space-y-2">
            {/* Home */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-2.5 px-3 rounded-xl font-bold text-sm ${
                currentPage === 'home'
                  ? 'bg-emerald-50 text-[#0D9488]'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Accordion 1: Circuits & Safaris */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'circuits' ? null : 'circuits')
                }
                className="w-full flex items-center justify-between p-3 bg-slate-50 font-bold text-sm text-slate-900"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#0D9488]" />
                  <span>Circuits & Safaris</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0D9488] text-white text-[10px]">
                    8 Tours
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileAccordion === 'circuits' ? 'rotate-180 text-[#0D9488]' : ''
                  }`}
                />
              </button>

              {mobileAccordion === 'circuits' && (
                <div className="p-3 bg-white space-y-2 border-t border-slate-200">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-1">
                    Select a Circuit to View Day-by-Day Itinerary:
                  </div>
                  <div className="space-y-1.5">
                    {circuitsData.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleCircuitSelect(c)}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 flex items-center justify-between group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-[#0D9488]">
                            {c.title.split('—')[0]}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {c.durationDays} Days &bull; {c.regionLabel}
                          </div>
                        </div>
                        <span className="text-xs font-extrabold text-[#0D9488]">
                          {formatPrice(c.basePriceEUR)}
                        </span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavClick('tours')}
                    className="w-full mt-2 py-2 text-center text-xs font-bold text-[#0D9488] bg-emerald-50 rounded-lg hover:bg-emerald-100"
                  >
                    View All Circuits on Tours Page &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Accordion 2: Top Destinations */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() =>
                  setMobileAccordion(mobileAccordion === 'destinations' ? null : 'destinations')
                }
                className="w-full flex items-center justify-between p-3 bg-slate-50 font-bold text-sm text-slate-900"
              >
                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-[#0D9488]" />
                  <span>Destinations & Highlights</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    mobileAccordion === 'destinations' ? 'rotate-180 text-[#0D9488]' : ''
                  }`}
                />
              </button>

              {mobileAccordion === 'destinations' && (
                <div className="p-3 bg-white space-y-1.5 border-t border-slate-200">
                  {topDestinations.map((d) => (
                    <button
                      key={d.name}
                      type="button"
                      onClick={() => handleDestinationClick(d.name)}
                      className="w-full text-left p-2 rounded-lg hover:bg-slate-50 text-xs font-semibold text-slate-800 flex items-center justify-between"
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] text-slate-400">{d.region}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Custom 4x4 Trip Planner */}
            <button
              type="button"
              onClick={() => handleNavClick('custom-planner')}
              className={`w-full text-left py-2.5 px-3 rounded-xl font-bold text-sm flex items-center justify-between ${
                currentPage === 'custom-planner'
                  ? 'bg-emerald-50 text-[#0D9488]'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#0D9488]" />
                <span>Tailor-Made 4x4 Planner</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                Custom
              </span>
            </button>

            {/* About Ernest Soa */}
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-2.5 px-3 rounded-xl font-bold text-sm ${
                currentPage === 'about'
                  ? 'bg-emerald-50 text-[#0D9488]'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About Ernest Soa & Private Fleet
            </button>

            {/* Contact HQ */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left py-2.5 px-3 rounded-xl font-bold text-sm ${
                currentPage === 'contact'
                  ? 'bg-emerald-50 text-[#0D9488]'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Contact HQ & Inquiries
            </button>
          </div>

          {/* Mobile Currency & Language Selector */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Currency
              </label>
              <select
                value={currentCurrency.code}
                onChange={(e) => {
                  const match = siteConfig.currencies.find((c) => c.code === e.target.value);
                  if (match) onSelectCurrency(match);
                }}
                className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-800"
              >
                {siteConfig.currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full bg-white border border-slate-200 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-800"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Direct Action Buttons */}
          <div className="pt-2 space-y-2">
            <a
              href={`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent('Hello Ernest! I would like to inquire about Madagascar tours.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Chat with Ernest on WhatsApp</span>
            </a>
            <a
              href={`tel:${siteConfig.contacts.phoneRaw}`}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-200"
            >
              <Phone className="w-4 h-4 text-[#0D9488]" />
              <span>Call +261 34 52 673 85</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
