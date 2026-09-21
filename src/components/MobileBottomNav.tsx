import React from 'react';
import { Home, Compass, MapPin, Info, PhoneCall } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { WhatsAppIcon } from './WhatsAppWidget';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const { language, t } = useLanguage();

  const navItems = [
    {
      id: 'home',
      label: language === 'es' ? 'Inicio' : language === 'fr' ? 'Accueil' : 'Home',
      icon: Home,
    },
    {
      id: 'tours',
      label: language === 'es' ? 'Circuitos' : language === 'fr' ? 'Circuits' : 'Tours',
      icon: Compass,
    },
    {
      id: 'custom-planner',
      label: language === 'es' ? 'Planificar' : language === 'fr' ? 'Sur-Mesure' : 'Plan Safari',
      icon: MapPin,
    },
    {
      id: 'about',
      label: language === 'es' ? 'Nosotros' : language === 'fr' ? 'À Propos' : 'About',
      icon: Info,
    },
  ];

  const handleWhatsAppDirect = () => {
    const cleanNumber = siteConfig.contacts.whatsappRaw.replace(/[^0-9]/g, '');
    const text =
      language === 'es'
        ? encodeURIComponent("Hola Ernest, estoy viendo tus tours en el móvil y me gustaría hacer una consulta.")
        : language === 'fr'
        ? encodeURIComponent("Bonjour Ernest, je consulte vos circuits sur mobile et je souhaite poser des questions.")
        : encodeURIComponent("Hello Ernest, I am browsing your tours on mobile and would like to ask some questions.");
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav
      id="mobile-bottom-app-bar"
      aria-label="Mobile Application Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive
                  ? 'text-[#0D9488] font-bold scale-105'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0D9488]" />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* WhatsApp Mobile App Quick Action */}
        <button
          onClick={handleWhatsAppDirect}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[#25D366] active:scale-95 transition-transform"
          aria-label="Chat on WhatsApp"
        >
          <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center shadow-sm">
            <WhatsAppIcon className="w-4 h-4 fill-white" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold text-[#16A34A]">
            Chat
          </span>
        </button>
      </div>
    </nav>
  );
};
