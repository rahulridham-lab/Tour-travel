import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Heart,
  Globe,
  ArrowUp,
  Compass,
  ExternalLink,
  Instagram,
  Facebook,
  Award,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { circuitsData, Circuit } from '../data/circuits';

interface FooterProps {
  onNavigate?: (page: string) => void;
  onSelectCircuit?: (circuit: Circuit) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCircuit }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, page: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCircuitClick = (circuit: Circuit) => {
    if (onSelectCircuit) {
      onSelectCircuit(circuit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('tours');
    }
  };

  return (
    <footer id="contact" className="bg-[#07130D] text-[#F8FAFC] border-t border-[#14261B] pt-20 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#166534]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Assurance & Licensing Banner */}
        <div className="p-6 rounded-3xl bg-[#0D2418] border border-[#1A3A29] mb-16 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0D9488]/20 text-[#0D9488] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Official Operator License</span>
              <span className="text-[11px] text-slate-300">Licence Cat. B N° 042-MINTOUR/DG</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">National Parks Partner</span>
              <span className="text-[11px] text-slate-300">Accredited MNP Madagascar Guide</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">24/7 Field Dispatch</span>
              <span className="text-[11px] text-slate-300">Antsirabe & Tana Real-Time Watch</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">100% Private Expeditions</span>
              <span className="text-[11px] text-slate-300">Zero Agency Middleman Markup</span>
            </div>
          </div>
        </div>

        {/* Main Footer 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#1A3A29]">
          {/* Column 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="block font-serif text-2xl font-bold tracking-wider text-white">
                MADAGASCAR ERNEST
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-[#0D9488] uppercase font-bold mt-0.5">
                TRAVEL TOURS &bull; ANTSIRABE HQ
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
              Official certified Malagasy tour operator founded and personally led by Ernest Soa.
              Specializing in bespoke private Toyota 4x4 overland safaris, Tsiribihina river chaland
              descents, UNESCO Grand Tsingy spires, and Indian Ocean coastal sanctuaries.
            </p>

            <div className="p-4 rounded-2xl bg-[#0B1E14] border border-[#163523] space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-wider text-[#0D9488] font-bold block">
                Antsirabe Operational Headquarters:
              </span>
              <p className="text-slate-300 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                <span>{siteConfig.contacts.address}</span>
              </p>
              <p className="text-slate-400 text-[11px]">
                Antananarivo Airport Operations: Ivato International Terminal Meet & Greet
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs text-[#94A3B8]">Follow our field expeditions:</span>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0B1E14] border border-[#163523] text-[#94A3B8] hover:text-[#E1306C] hover:border-[#E1306C]/50 flex items-center justify-center transition-all"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#0B1E14] border border-[#163523] text-[#94A3B8] hover:text-[#1877F2] hover:border-[#1877F2]/50 flex items-center justify-center transition-all"
                aria-label="Follow on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Our 8 Official Circuits (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="text-xs uppercase tracking-widest text-[#0D9488] font-bold">
              Our 8 Official Circuits
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              {circuitsData.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => handleCircuitClick(c)}
                    className="hover:text-white transition-colors text-left flex items-start gap-1.5 group cursor-pointer"
                  >
                    <span className="text-[#0D9488] text-[10px] group-hover:translate-x-0.5 transition-transform">
                      &rsaquo;
                    </span>
                    <span className="line-clamp-1">{c.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Madagascar Traveler Guide (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="text-xs uppercase tracking-widest text-[#0D9488] font-bold">
              Traveler Info
            </h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>Best Time to Visit</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>Tourist Visa ($35 On Arrival)</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>Health & Malaria Advice</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>4x4 Safari Packing Tips</span>
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'home')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>Ariary (MGA) Currency FAQ</span>
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => handleLinkClick(e, 'terms')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>Terms & Booking Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => handleLinkClick(e, 'privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#0D9488]">&rsaquo;</span>
                  <span>Privacy Charter</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: 24/7 Field Support & Payments (3 cols) */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <h4 className="text-xs uppercase tracking-widest text-[#0D9488] font-bold">
              Direct Contact & Dispatch
            </h4>

            <div className="space-y-2.5">
              <a
                href={`tel:${siteConfig.contacts.phoneRaw}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0B1E14] border border-[#163523] text-white hover:border-[#0D9488] transition-all"
              >
                <Phone className="w-4 h-4 text-[#0D9488] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Direct Phone</span>
                  <span className="font-bold text-xs">{siteConfig.contacts.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${encodeURIComponent('Hello Ernest! I would like to inquire about Madagascar tours.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0B1E14] border border-[#163523] text-white hover:border-[#25D366] transition-all"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">WhatsApp Direct Desk</span>
                  <span className="font-bold text-xs text-[#25D366]">{siteConfig.contacts.whatsapp}</span>
                </div>
              </a>

              <a
                href={`mailto:${siteConfig.contacts.email}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0B1E14] border border-[#163523] text-white hover:border-[#0D9488] transition-all"
              >
                <Mail className="w-4 h-4 text-[#0D9488] shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Email Inquiries</span>
                  <span className="font-bold text-[11px] truncate max-w-[180px] block">{siteConfig.contacts.email}</span>
                </div>
              </a>
            </div>

            {/* Accepted Currencies & Payment Methods */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
                Accepted Currencies & Payment:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {['EUR (€)', 'USD ($)', 'GBP (£)', 'CHF', 'CAD', 'Ariary (MGA)'].map((curr) => (
                  <span
                    key={curr}
                    className="px-2 py-0.5 rounded-md bg-[#0B1E14] border border-[#163523] text-slate-300 font-semibold"
                  >
                    {curr}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Payment options: International SWIFT/IBAN Bank Wire, Local Mobile Money (MVola/Orange Money), or Cash on Arrival.
              </p>
            </div>
          </div>
        </div>

        {/* Eco-Tourism & Ethical Charter Notice */}
        <div className="py-6 border-b border-[#1A3A29] text-[11px] text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Responsible Malagasy Tourism:</strong> We support local village associations, pay fair wages to regional trackers, and adhere to strict wildlife welfare protocols in all national parks.
            </span>
          </div>
          <span className="text-slate-400 shrink-0">
            Languages spoken: Malagasy, French, English, Spanish
          </span>
        </div>

        {/* Bottom Copyright & Back-to-Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <p className="font-light">
            &copy; {new Date().getFullYear()} Madagascar Ernest Travel Tours. All rights reserved. Registered Tour Operator, Antsirabe, Madagascar.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-[#0B1E14] border border-[#163523] flex items-center justify-center group-hover:border-[#0D9488] group-hover:text-[#0D9488] transition-all">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
