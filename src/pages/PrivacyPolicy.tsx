import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { siteConfig } from '../data/siteConfig';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 bg-[#F7F5F0] min-h-screen text-[#1A1A1A]">
      <SEOHead
        title="Privacy Policy | Madagascar Ernest Travel Tours"
        description="Official privacy and data protection policy of Madagascar Ernest Travel Tours in Antsirabe. Compliant with international data privacy standards and Malagasy commercial law."
      />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5A655F] hover:text-[#1E3B2B] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="light-luxury-card p-8 sm:p-12 rounded-3xl space-y-8 bg-white">
          <div className="border-b border-black/10 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E3B2B]/10 text-xs font-bold text-[#1E3B2B] uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89758]" />
              Data Protection & Privacy
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1A1A]">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#5A655F] mt-2">
              Last Updated: January 1, 2026 &bull; Madagascar Ernest Travel Tours, Antsirabe
            </p>
          </div>

          <div className="space-y-6 text-xs text-[#5A655F] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                1. Overview & Data Controller
              </h2>
              <p>
                This Privacy Policy outlines how <strong>{siteConfig.companyName}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;Ernest Tours&rdquo;),
                headquartered at {siteConfig.contacts.address}, Antsirabe, Madagascar, collects, uses, and safeguards the
                personal information you provide when planning, booking, or experiencing our private safaris and expeditions.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                2. Information We Collect
              </h2>
              <p>
                To organize and execute seamless private travel within Madagascar, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Personal identifiers (full names, nationalities, passport numbers, and dates of birth required for domestic flight tickets and national park admission permits).</li>
                <li>Contact details (email address, telephone/WhatsApp numbers).</li>
                <li>Dietary preferences, medical alerts, or physical mobility specifications voluntarily provided for safari logistics and private chef preparation.</li>
                <li>Financial details necessary to verify bank transfers or credit processing. Credit card details are never stored on our local servers.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                3. How Your Information Is Used
              </h2>
              <p>
                We use your personal data solely for bona fide travel execution purposes:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Reserving rooms at verified luxury eco-lodges, hotels, and marine resorts.</li>
                <li>Registering entry manifests with Madagascar National Parks (MNP) and community authorities.</li>
                <li>Arranging private river chalands, local trackers, and flight charters.</li>
                <li>Communicating operational safety updates, weather advisories, or schedule confirmations.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                4. Data Confidentiality & Third-Party Disclosure
              </h2>
              <p>
                We never sell, rent, or trade traveler data to commercial marketing third parties. Your data is shared
                strictly with local service partners (e.g. booked lodges, national park ticketing offices, and charter flight operators)
                exclusively to the extent required to execute your confirmed itinerary.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                5. Data Security & Retention
              </h2>
              <p>
                We implement industry-standard administrative and electronic safeguards to protect your records. Passport copies
                are retained only for the duration necessary to satisfy Malagasy regulatory requirements and are archived securely.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                6. Your Rights & Inquiries
              </h2>
              <p>
                You may request access to, correction of, or deletion of your personal contact records at any time by contacting
                our data officer at <a href={`mailto:${siteConfig.contacts.email}`} className="text-[#1E3B2B] font-bold underline">{siteConfig.contacts.email}</a> or
                writing to our Antsirabe head office.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
