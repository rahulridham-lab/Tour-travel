import React from 'react';
import { Compass, MessageSquare, Car, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';

interface QuickActionLinksProps {
  variant?: 'banner' | 'cards' | 'inline';
  onNavigate?: (page: string) => void;
  className?: string;
}

export const QuickActionLinks: React.FC<QuickActionLinksProps> = ({
  variant = 'cards',
  onNavigate,
  className = '',
}) => {
  const { language } = useLanguage();

  const handleWhatsAppQuote = () => {
    const msg = language === 'es'
      ? '¡Hola Soa Ernest! Deseo solicitar una cotización directa e inmediata para un tour privado en 4x4 por Madagascar.'
      : language === 'fr'
      ? 'Bonjour Soa Ernest ! Je souhaite un devis direct et immédiat pour un circuit privé en 4x4 à Madagascar.'
      : 'Hello Soa Ernest! I would like to request an instant direct quote for a private 4x4 tour in Madagascar.';
    window.open(`https://wa.me/261325700405?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const handleBespokePlan = () => {
    if (onNavigate) {
      onNavigate('custom-planner');
    } else {
      const el = document.getElementById('custom-planner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToursView = () => {
    if (onNavigate) {
      onNavigate('tours');
    } else {
      const el = document.getElementById('tours-grid-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (variant === 'banner') {
    return (
      <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white border border-slate-700/70 shadow-xl ${className}`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-[#0D9488]/20 text-[#0D9488] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0D9488] block">
                {language === 'es' ? 'Acceso Rápido y Cotizaciones' : language === 'fr' ? 'Accès Rapide & Devis' : 'Instant Booking & Inquiries'}
              </span>
              <p className="text-sm font-semibold text-white">
                {language === 'es'
                  ? 'Bespoke Plan • Direct WhatsApp Quote • Instant Quote • Private 4x4 Tour'
                  : language === 'fr'
                  ? 'Plan Sur Mesure • Devis Direct WhatsApp • Devis Immédiat • Circuit Privé 4x4'
                  : 'Bespoke Plan • Direct WhatsApp Quote • Instant Quote • Private 4x4 Tour'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto">
            <button
              type="button"
              onClick={handleBespokePlan}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'es' ? 'Bespoke Plan' : language === 'fr' ? 'Plan Sur Mesure' : 'Bespoke Plan'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppQuote}
              className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#25D366]/20 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'es' ? 'Direct WhatsApp Quote' : language === 'fr' ? 'Devis Direct WhatsApp' : 'Direct WhatsApp Quote'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppQuote}
              className="px-3.5 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0f766e] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{language === 'es' ? 'Instant Quote' : language === 'fr' ? 'Devis Immédiat' : 'Instant Quote'}</span>
            </button>

            <button
              type="button"
              onClick={handleToursView}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-all border border-slate-600 cursor-pointer"
            >
              <Car className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{language === 'es' ? 'Private 4x4 Tour' : language === 'fr' ? 'Circuit Privé 4x4' : 'Private 4x4 Tour'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default 'cards' layout - Beautiful 4-column interactive cards
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {/* 1. Bespoke Plan */}
      <div
        onClick={handleBespokePlan}
        className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#0D9488]/50 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#0D9488]/10 text-[#0D9488]">
            Custom
          </span>
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#0D9488] transition-colors flex items-center justify-between">
            <span>Bespoke Plan</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            {language === 'es'
              ? 'Diseña tu ruta día por día según tus fechas, ritmo y presupuesto.'
              : language === 'fr'
              ? 'Concevez votre voyage étape par étape selon vos envies et dates.'
              : 'Handcraft your day-by-day expedition tailored to your exact pace and party.'}
          </p>
        </div>
      </div>

      {/* 2. Direct WhatsApp Quote */}
      <div
        onClick={handleWhatsAppQuote}
        className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#25D366]/60 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#25D366]/15 text-[#1e9f4d]">
            5 Min Reply
          </span>
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1e9f4d] transition-colors flex items-center justify-between">
            <span>Direct WhatsApp Quote</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            {language === 'es'
              ? 'Chatea al instante con Ernest Soa en Antsirabe para presupuestos directos.'
              : language === 'fr'
              ? 'Discutez en direct avec Ernest Soa à Antsirabe pour un tarif immédiat.'
              : 'Connect directly with Ernest Soa on WhatsApp for instant rates & advice.'}
          </p>
        </div>
      </div>

      {/* 3. Instant Quote */}
      <div
        onClick={handleWhatsAppQuote}
        className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
            No Middlemen
          </span>
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-amber-700 transition-colors flex items-center justify-between">
            <span>Instant Quote</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            {language === 'es'
              ? 'Tarifas transparentes de operador local sin recargos de agencias intermediarias.'
              : language === 'fr'
              ? 'Tarifs transparents d\'opérateur direct sans surcoûts d\'agences intermédiaires.'
              : 'Transparent direct-operator pricing with zero international intermediary fees.'}
          </p>
        </div>
      </div>

      {/* 4. Private 4x4 Tour */}
      <div
        onClick={handleToursView}
        className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-sky-400 transition-all cursor-pointer group flex flex-col justify-between"
      >
        <div className="flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Car className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
            100% Private
          </span>
        </div>
        <div className="mt-4">
          <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#0284C7] transition-colors flex items-center justify-between">
            <span>Private 4x4 Tour</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h4>
          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
            {language === 'es'
              ? 'Toyota Land Cruiser con chófer experto exclusivo para tu grupo.'
              : language === 'fr'
              ? 'Toyota Land Cruiser tout-terrain avec chauffeur expérimenté dédié.'
              : 'High-clearance Land Cruisers with seasoned bush chauffeurs for your party.'}
          </p>
        </div>
      </div>
    </div>
  );
};
