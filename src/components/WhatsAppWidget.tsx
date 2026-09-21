import React, { useState, useEffect } from 'react';
import { X, Send, PhoneCall, Check, ExternalLink } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useLanguage } from '../context/LanguageContext';

interface WhatsAppWidgetProps {
  onOpenBooking?: (circuitId?: string) => void;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [customMsg, setCustomMsg] = useState('');
  const [isDismissedByUser, setIsDismissedByUser] = useState(false);

  const messagesByLang: Record<string, string[]> = {
    es: [
      '¡Hola! ¿En qué puedo ayudarte hoy a planear tu viaje a Madagascar? 🇲🇬',
      '¡Habla directamente con Ernest (+261 32 57 004 05) por WhatsApp! 🌿',
      '¿Buscas 4x4 privado para Tsingy, Baobabs o la RN7? ¡Pregúntame!',
      '¿Quieres una cotización inmediata sin intermediarios? Escríbeme aquí.',
    ],
    fr: [
      'Bonjour ! Comment puis-je vous aider pour votre safari à Madagascar ? 🇲🇬',
      'Discutez en direct avec Soa Ernest (+261 32 57 004 05) sur WhatsApp ! 🌿',
      'Vous cherchez un 4x4 privé pour les Grands Tsingy ou l\'Isalo ? Contactez-moi !',
      'Besoin d\'un devis immédiat et personnalisé ? Écrivez-nous directement.',
    ],
    en: [
      'Hello! How can I help you plan your bespoke Madagascar safari? 🇲🇬',
      'Chat directly with Ernest Soa (+261 32 57 004 05) on WhatsApp! 🌿',
      'Looking for a private 4x4 for Tsingy, Baobabs or RN7? Ask anytime!',
      'Need an instant quote directly from our Antsirabe HQ? Tap here.',
    ],
  };

  const activeMessages = messagesByLang[language] || messagesByLang.en;

  // Reliable, polite popup behavior:
  // Shows after 2.5 seconds on both mobile and desktop (so mobile users also get the benefit and notice it!).
  // Changes message every 6 seconds. If closed by user with 'X', it respects dismissal.
  useEffect(() => {
    if (isDismissedByUser || isOpen) {
      setShowBubble(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowBubble(true);
    }, 2500);

    const interval = setInterval(() => {
      setPulseCount((prev) => prev + 1);
      setShowBubble(true);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isDismissedByUser, isOpen]);

  const currentMessage = activeMessages[pulseCount % activeMessages.length];

  const handleSendWhatsApp = (text?: string) => {
    const defaultMsg =
      language === 'es'
        ? 'Hola Ernest, me gustaría consultar sobre la planificación de un tour privado en Madagascar.'
        : language === 'fr'
        ? 'Bonjour Ernest, je souhaite me renseigner pour organiser un circuit privé à Madagascar.'
        : 'Hello Ernest, I would like to inquire about planning a private luxury tour in Madagascar.';
    const messageToSend = text || customMsg || defaultMsg;
    const cleanNumber = siteConfig.contacts.whatsappRaw.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div
      id="whatsapp-concierge-widget"
      className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
      aria-label="Direct WhatsApp Concierge"
    >
      {/* 1. Speech Bubble Popup - Works cleanly on both mobile and desktop */}
      {!isOpen && showBubble && !isDismissedByUser && (
        <div
          key={pulseCount}
          className="mb-2.5 max-w-[280px] sm:max-w-xs bg-white text-[#0F172A] p-3 sm:p-3.5 rounded-2xl rounded-br-sm shadow-[0_12px_35px_rgba(0,0,0,0.2)] border border-[#CBD5E1] animate-in fade-in slide-in-from-bottom-2 duration-300 relative cursor-pointer group transition-all transform hover:scale-102"
          onClick={() => setIsOpen(true)}
        >
          {/* Close mini button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowBubble(false);
              setIsDismissedByUser(true);
            }}
            className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 flex items-center justify-center text-xs shadow-md transition-colors cursor-pointer"
            title="Dismiss bubble"
            aria-label="Dismiss bubble"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Malagasy Concierge Profile preview with REAL Ernest Avatar */}
          <div className="flex items-center gap-2.5 mb-2">
            <div className="relative shrink-0">
              <img
                src="/tours/ernest-isalo.jpg"
                alt="Soa Ernest"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#25D366] shadow-sm"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0F172A] leading-tight">
                {language === 'es' ? 'Ernest Soa • Director de Tours' : language === 'fr' ? 'Ernest Soa • Directeur de Tours' : 'Ernest Soa • Tour Director'}
              </p>
              <p className="text-[10px] text-[#0D9488] font-bold uppercase tracking-wider">
                {language === 'es' ? 'En línea • Sede Antsirabe' : language === 'fr' ? 'En ligne • Siège Antsirabe' : 'Online • Antsirabe HQ'}
              </p>
            </div>
          </div>

          {/* Message Text */}
          <p className="text-xs font-medium text-[#1E293B] leading-relaxed">
            {currentMessage}
          </p>

          {/* Quick CTA hint */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#0D9488] font-bold pt-2 border-t border-slate-100">
            <span>
              {language === 'es' ? 'Toca para abrir WhatsApp' : language === 'fr' ? 'Toucher pour ouvrir WhatsApp' : 'Tap to open WhatsApp'}
            </span>
            <span className="group-hover:translate-x-1 transition-transform text-sm">&rarr;</span>
          </div>

          {/* Little speech tail pointing to WhatsApp button */}
          <div className="absolute -bottom-2 right-6 w-3 h-3 bg-white border-r border-b border-[#CBD5E1] rotate-45" />
        </div>
      )}

      {/* 2. Expanded Interactive Chat Box */}
      {isOpen && (
        <div className="mb-3 w-[300px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#0B1B13] p-4 text-white flex items-center justify-between border-b border-[#1A2E22]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/tours/ernest-isalo.jpg"
                  alt="Soa Ernest"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#25D366] shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#0B1B13]" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">
                  Soa Ernest
                </h3>
                <p className="text-[10px] text-emerald-400 font-medium">
                  {language === 'es' ? 'En línea • Sede Antsirabe' : language === 'fr' ? 'En ligne • Siège Antsirabe' : 'Online • Antsirabe HQ'}
                </p>
                <p className="text-[10px] text-slate-300">
                  {language === 'es' ? 'Responde en ~5 minutos' : language === 'fr' ? 'Répond en ~5 min' : 'Replies in ~5 minutes'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#F8FAFC] space-y-3 max-h-[320px] overflow-y-auto">
            {/* Operator greeting bubble */}
            <div className="flex items-start gap-2.5 max-w-[90%]">
              <img
                src="/tours/ernest-isalo.jpg"
                alt="Soa Ernest"
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-1 border border-emerald-500"
              />
              <div className="p-3 bg-white rounded-2xl rounded-tl-sm border border-[#E2E8F0] shadow-sm text-xs text-[#1E293B] space-y-1">
                <p className="font-semibold text-[#0D9488]">
                  {language === 'es' ? '¡Salama! Bienvenidos a Madagascar 🇲🇬' : language === 'fr' ? 'Salama ! Bienvenue à Madagascar 🇲🇬' : 'Salama! Welcome to Madagascar 🇲🇬'}
                </p>
                <p className="text-[11px] leading-relaxed text-[#475569]">
                  {language === 'es'
                    ? '¿En qué puedo ayudarte hoy? Te respondo personalmente sobre vehículos 4x4, rutas, permisos y cotizaciones directas.'
                    : language === 'fr'
                    ? 'Comment puis-je vous aider ? Je réponds personnellement sur les 4x4, les pistes, les permis et les tarifs directs.'
                    : 'How may I help you today? I can answer directly about private 4x4s, trail conditions, permits, or custom routes.'}
                </p>
              </div>
            </div>

            {/* Quick Question Chips */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
                {language === 'es' ? 'Consultas Frecuentes:' : language === 'fr' ? 'Questions Rapides :' : 'Quick Inquiries:'}
              </p>
              <div className="flex flex-col gap-1.5">
                {(language === 'es'
                  ? [
                      'Hola Ernest, ¿cuál es la mejor época para Grand Tsingy?',
                      '¿Puedes enviarme los precios del safari RN7 Sur?',
                      'Deseo un itinerario privado a medida para mi familia.',
                    ]
                  : language === 'fr'
                  ? [
                      'Bonjour Ernest, quelle est la meilleure saison pour les Grands Tsingy ?',
                      'Pouvez-vous m\'envoyer les tarifs du circuit Sud RN7 ?',
                      'Je souhaite un itinéraire sur mesure pour ma famille.',
                    ]
                  : [
                      "Hi Ernest, what's the best time to visit Grand Tsingy?",
                      "Can you send the complete RN7 Southern Safari pricing?",
                      "I want a customized private itinerary for my family.",
                    ]
                ).map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendWhatsApp(chip)}
                    className="text-left p-2 rounded-xl bg-white hover:bg-[#0D9488]/10 hover:text-[#0D9488] border border-[#E2E8F0] text-[11px] text-[#334155] font-medium transition-all flex items-center justify-between group shadow-2xs cursor-pointer"
                  >
                    <span className="truncate pr-2">{chip}</span>
                    <Send className="w-3 h-3 text-[#0D9488] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#CBD5E1] shadow-inner">
                <input
                  type="text"
                  placeholder={language === 'es' ? 'Escribe a Ernest por WhatsApp...' : language === 'fr' ? 'Écrivez à Ernest...' : 'Type a message to Ernest...'}
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendWhatsApp();
                  }}
                  className="w-full bg-transparent px-2 text-xs text-[#0F172A] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSendWhatsApp()}
                  className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                  title="Send via WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Direct CTA */}
          <div className="p-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between text-[11px]">
            <a
              href={`tel:${siteConfig.contacts.phonePrimary.replace(/\s+/g, '')}`}
              className="text-[#64748B] hover:text-[#0D9488] flex items-center gap-1 font-medium transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Llamar' : language === 'fr' ? 'Appeler' : 'Direct Call'}</span>
            </a>
            <button
              type="button"
              onClick={() => handleSendWhatsApp()}
              className="px-3.5 py-1.5 rounded-xl bg-[#25D366] text-white font-bold flex items-center gap-1.5 hover:bg-[#20bd5a] transition-all shadow-sm cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>{language === 'es' ? 'Abrir WhatsApp' : language === 'fr' ? 'Ouvrir WhatsApp' : 'Open WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Floating WhatsApp Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBubble(false);
        }}
        className="relative group p-3.5 sm:p-4 rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.45)] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
        title="Direct WhatsApp with Ernest (+261 32 57 004 05)"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        {/* Real WhatsApp Icon */}
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-white relative z-10" />

        {/* Online Indicator Badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white shadow-xs z-20" />
      </button>
    </div>
  );
};

// Authentic WhatsApp SVG Logo Component
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6 fill-current' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.877-2.056-.977-.276-.1-.477-.15-.678.15-.2.301-.778.977-.954 1.178-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.631-.929-2.233-.244-.586-.493-.507-.678-.516-.176-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.911 1.229 3.112c.15.2 2.124 3.244 5.146 4.549.719.311 1.281.497 1.719.636.722.23 1.379.197 1.899.12.579-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.351zM12.042 21.879h-.002a9.83 9.83 0 0 1-5.013-1.378l-.359-.213-3.729.978.995-3.636-.234-.372a9.833 9.833 0 0 1-1.508-5.215c0-5.433 4.42-9.853 9.856-9.853a9.805 9.805 0 0 1 6.969 2.889 9.805 9.805 0 0 1 2.885 6.965c0 5.435-4.421 9.855-9.859 9.855zm8.358-18.219A11.782 11.782 0 0 0 12.04 0C5.46 0 .108 5.353.106 11.936a11.9 11.9 0 0 0 1.621 6.002L0 24l6.239-1.636a11.91 11.91 0 0 0 5.8 1.517h.005c6.581 0 11.934-5.353 11.937-11.938a11.83 11.83 0 0 0-3.581-8.435z" />
  </svg>
);
