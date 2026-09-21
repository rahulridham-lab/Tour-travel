import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Compass, ShieldCheck } from 'lucide-react';
import { siteConfig, CurrencyConfig } from '../data/siteConfig';
import { circuitsData } from '../data/circuits';
import { useLanguage } from '../context/LanguageContext';

interface FloatingStickyBarProps {
  currentCurrency: CurrencyConfig;
  onOpenBooking: (circuitId?: string) => void;
  onNavigate: (page: string) => void;
}

export const FloatingStickyBar: React.FC<FloatingStickyBarProps> = ({
  currentCurrency,
  onOpenBooking,
  onNavigate,
}) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>(circuitsData[0].id);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  const handleWhatsAppQuickQuote = () => {
    const selectedCircuit = circuitsData.find((c) => c.id === selectedCircuitId) || circuitsData[0];
    const message = language === 'es'
      ? `Hola Ernest! Estoy viendo la web y deseo una cotización directa para "${selectedCircuit.title}" (${selectedCircuit.durationDays} Días). Moneda: ${currentCurrency.code}. ¿Tienen 4x4 privado disponible?`
      : language === 'fr'
      ? `Bonjour Ernest ! Je navigue sur votre site et souhaite un devis direct pour "${selectedCircuit.title}" (${selectedCircuit.durationDays} Jours). Devise: ${currentCurrency.code}. Avez-vous un 4x4 disponible ?`
      : `Hello Ernest! I am browsing the website and would like a direct quote for "${selectedCircuit.title}" (${selectedCircuit.durationDays} Days). My preferred currency is ${currentCurrency.code}. Are your private 4x4 vehicles available?`;
    const url = `https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      aria-label="Instant Booking Dispatch Bar"
      className="fixed bottom-0 left-0 right-0 z-40 px-2 sm:px-6 pb-2 sm:pb-3 pointer-events-none"
    >
      <div className="max-w-4xl mx-auto pointer-events-auto bg-white/95 backdrop-blur-md border border-[#CBD5E1] shadow-2xl rounded-2xl sm:rounded-full p-2 sm:p-2.5 flex flex-row items-center justify-between gap-2 animate-in slide-in-from-bottom-5 duration-300">
        {/* Left: Circuit Selector */}
        <div className="flex items-center gap-2 min-w-0 flex-1 sm:flex-initial">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shrink-0">
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>

          <div className="min-w-0">
            <span className="text-[9px] uppercase font-bold text-[#64748B] block leading-none mb-0.5 truncate">
              {language === 'es' ? 'Cotización Directa • 4x4' : language === 'fr' ? 'Devis Direct • 4x4' : 'Instant Quote • Private 4x4'}
            </span>
            <select
              value={selectedCircuitId}
              onChange={(e) => setSelectedCircuitId(e.target.value)}
              className="text-[11px] sm:text-xs font-semibold text-[#0F172A] bg-transparent border-0 p-0 focus:ring-0 cursor-pointer max-w-[120px] sm:max-w-[240px] truncate"
            >
              {circuitsData.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.durationDays}D: {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Live Currency Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#64748B] border-x border-[#E2E8F0] px-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
          <span>Antsirabe HQ &bull; Direct Driver-Guide Rates</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('custom-planner')}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-[#0F172A] hover:bg-[#F1F5F9] transition-all hidden md:flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
            <span>{language === 'es' ? 'Plan a Medida' : language === 'fr' ? 'Sur Mesure' : 'Bespoke Plan'}</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppQuickQuote}
            className="px-3 sm:px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#25D366]/20 transition-all transform active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current shrink-0" />
            <span className="whitespace-nowrap">
              {language === 'es' ? 'Cotizar WhatsApp' : language === 'fr' ? 'Devis WhatsApp' : 'Direct WhatsApp Quote'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-all cursor-pointer"
            aria-label="Dismiss quick bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
