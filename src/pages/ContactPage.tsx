import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { siteConfig } from '../data/siteConfig';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Private Safari Inquiry');
  const [travelDates, setTravelDates] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Also offer direct dispatch to email
    const mailtoSubject = encodeURIComponent(`Inquiry from Website: ${subject} (${name})`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nEstimated Travel Dates: ${travelDates}\nSubject: ${subject}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${siteConfig.contacts.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Ernest! I would like to inquire about planning a private tour with Madagascar Ernest Travel Tours.`
    );
    window.open(`https://wa.me/${siteConfig.contacts.whatsappRaw.replace('+', '')}?text=${text}`, '_blank');
  };

  const faqs = [
    {
      q: 'Do I need a tourist visa to enter Madagascar?',
      a: 'Yes, all international visitors require a tourist visa. It is conveniently obtained upon arrival at Ivato International Airport (Antananarivo) or online via the official e-Visa portal. Visas for stays under 30 days are approximately €35 or $37 USD.',
    },
    {
      q: 'What is the best season to visit Madagascar for lemurs & Tsingy?',
      a: 'The dry safari season runs from May through November. For the UNESCO Grand Tsingy and Tsiribihina river, May through October is prime. July to October is also prime for watching migrating humpback whales off Île Sainte-Marie.',
    },
    {
      q: 'Are all your overland vehicles private 4x4s?',
      a: 'Yes, 100% of our safaris are conducted in private, air-conditioned Toyota Land Cruiser Prado/V8 overland vehicles with private chauffeur and naturalist guide. We never combine separate bookings into shared tour buses.',
    },
    {
      q: 'How do payments, deposits, and currency work?',
      a: 'We accept international bank wire transfers, Wise, and on-arrival settlement in major currencies (EUR, USD, MGA). A deposit reserves your private vehicles, river chalands, and boutique eco-lodges.',
    },
  ];

  return (
    <div className="pt-24 bg-[#F7F5F0] min-h-screen text-[#1A1A1A]">
      <SEOHead
        title="Contact Us & Antsirabe Headquarters | Madagascar Ernest Travel Tours"
        description="Contact Ernest Soa directly on WhatsApp (+261 32 57 004 05) or email soa.ernest@gmail.com. Visit our official head office in Antsirabe, Madagascar for 24/7 safari dispatch."
      />

      {/* Hero Header */}
      <div className="bg-[#0A1912] text-[#F4F1EA] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#B89758]/30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1E3B2B]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E3B2B]/70 border border-[#B89758]/40 text-xs font-bold text-[#D4BA82] uppercase tracking-widest mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            24/7 Direct Concierge
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-[#F4F1EA] mb-4">
            Connect With Our Antsirabe Headquarters
          </h1>
          <p className="text-sm sm:text-base text-[#9EACA3] max-w-2xl mx-auto font-light leading-relaxed">
            Whether you need bespoke itinerary advice, immediate guide availability, or logistical support
            across the island, Ernest and our dispatch team are at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards & Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="light-luxury-card p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-2xl font-display font-medium text-[#1A1A1A]">
                Head Office & Dispatch Details
              </h3>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#B89758]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Physical Address</h4>
                  <p className="text-sm font-semibold text-[#1A1A1A] mt-1">{siteConfig.contacts.address}</p>
                  <p className="text-xs text-[#5A655F]">Antsirabe, Vakinankaratra, Madagascar</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Direct WhatsApp</h4>
                  <p className="text-sm font-semibold text-[#1A1A1A] mt-1">{siteConfig.contacts.whatsappDisplay}</p>
                  <p className="text-xs text-[#5A655F]">Direct chat with Soa Ernest (English & French)</p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#B89758]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Telephone Lines</h4>
                  <p className="text-sm font-semibold text-[#1A1A1A] mt-1">{siteConfig.contacts.phonePrimary}</p>
                  <p className="text-xs text-[#5A655F]">Secondary: {siteConfig.contacts.phoneSecondary}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#B89758]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Official Email</h4>
                  <p className="text-sm font-semibold text-[#1A1A1A] mt-1">{siteConfig.contacts.email}</p>
                  <p className="text-xs text-[#5A655F]">Replies within 2 to 4 business hours</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1E3B2B]/10 text-[#1E3B2B] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#B89758]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#B89758] font-bold">Operating Hours</h4>
                  <p className="text-sm font-semibold text-[#1A1A1A] mt-1">{siteConfig.contacts.officeHours}</p>
                </div>
              </div>

              {/* Direct WhatsApp Big CTA */}
              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Start Direct Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="light-luxury-card p-6 sm:p-10 rounded-3xl space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#B89758] font-bold">
                  Direct Inquiries & Quotations
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#1A1A1A] mt-1">
                  Send a Message to Ernest
                </h3>
                <p className="text-xs text-[#5A655F] mt-1">
                  Provide your target travel dates and requirements. We respond promptly with detailed logistics.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#FAF8F5] border border-emerald-500/30 text-center space-y-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-xl font-display font-medium text-[#1A1A1A]">Inquiry Successfully Dispatched</h4>
                  <p className="text-xs text-[#5A655F] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{name}</strong>. Your inquiry has been forwarded to Soa Ernest.
                    For urgent requests, please feel free to message Ernest on WhatsApp directly at{' '}
                    <strong className="text-[#1E3B2B]">{siteConfig.contacts.whatsappDisplay}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-[#1E3B2B] text-white text-xs font-semibold mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Arthur Pendelton"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. arthur@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                        Phone / WhatsApp (With Country Code)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +44 7911 123456"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                        Target Travel Dates or Season
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. July 2026 (12 Days)"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                    >
                      <option value="Private Safari Inquiry">Bespoke Private Safari Quotation</option>
                      <option value="Grand Tsingy & Baobabs">Grand Tsingy & Allée des Baobabs (10D)</option>
                      <option value="Tsiribihina River Cruise">Tsiribihina River Cruise & Camping</option>
                      <option value="Southern RN7 Tour">Grand Southern Odyssey RN7 (13D)</option>
                      <option value="Sainte-Marie Whales">Sainte-Marie Island & Whale Watching</option>
                      <option value="Private Chauffeur Fleet">Private 4x4 Fleet Charter Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#B89758] font-bold block mb-1">
                      Your Message / Specific Wishes *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please mention your party size, preferred accommodation style, physical mobility interests, or flight details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFFFFF] border border-black/15 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#B89758]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1E3B2B] text-[#F7F5F0] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#2A4E39] shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4 text-[#D4BA82]" />
                    <span>Submit Inquiry to Ernest Tours</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-16 pt-16 border-t border-black/5">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B89758] font-bold block mb-2">
              Frequently Asked Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#1A1A1A]">
              Essential Travel Logistics for Madagascar
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="light-luxury-card rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm font-bold text-[#1A1A1A]">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#B89758] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs text-[#5A655F] leading-relaxed border-t border-black/5 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
