import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { siteConfig } from '../data/siteConfig';
import { FileText, ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TermsOfServiceProps {
  onNavigate: (page: string) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 bg-[#F7F5F0] min-h-screen text-[#1A1A1A]">
      <SEOHead
        title="Terms of Service & Booking Conditions | Madagascar Ernest Travel Tours"
        description="Booking terms, payment procedures, cancellation policies, and traveler safety standards for private safaris with Madagascar Ernest Travel Tours."
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
              <FileText className="w-3.5 h-3.5 text-[#B89758]" />
              Contractual Terms & Safari Conditions
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1A1A]">
              Terms of Service
            </h1>
            <p className="text-xs text-[#5A655F] mt-2">
              Governing All Bookings & Overland Expeditions with Madagascar Ernest Travel Tours
            </p>
          </div>

          <div className="space-y-6 text-xs text-[#5A655F] leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                1. Contract & Booking Confirmation
              </h2>
              <p>
                A booking is confirmed when a written travel proposal is accepted by the client and the agreed deposit
                has been received by Madagascar Ernest Travel Tours. Acceptance of a quotation implies acceptance
                of these Terms of Service.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                2. Deposit & Payment Schedules
              </h2>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>A deposit of 30% of the total quotation is required upon booking confirmation to secure private vehicles, river vessels, and lodge reservations.</li>
                <li>The remaining balance of 70% is payable either 30 days prior to arrival via international wire transfer / Wise, or in cash (clean EUR, USD, or MGA banknotes) upon arrival in Antananarivo during your welcome orientation.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                3. Cancellation & Refund Policy
              </h2>
              <p>
                Because Madagascar&apos;s remote luxury eco-lodges enforce strict cancellation policies, client cancellations are subject to the following fees:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>More than 60 days before safari commencement: Deposit refunded minus a 10% administrative and bank handling fee.</li>
                <li>30 to 59 days before commencement: 30% of total expedition cost retained.</li>
                <li>15 to 29 days before commencement: 50% of total expedition cost retained.</li>
                <li>Fewer than 15 days or no-show: 100% of total expedition cost retained.</li>
              </ul>
              <p className="italic text-[#8C6D34]">
                We strongly advise all travelers to purchase comprehensive travel cancellation and interruption insurance upon booking.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                4. Mandatory Medical & Evacuation Insurance
              </h2>
              <p>
                It is a mandatory condition of travel with Ernest Tours that every client holds valid international travel insurance
                covering medical expenses, emergency helicopter/air evacuation, and repatriation. Remote regions such as the Grand Tsingy
                and Tsiribihina River lack advanced hospital facilities.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                5. Overland Route Adjustments & Force Majeure
              </h2>
              <p>
                Madagascar is an adventurous frontier terrain. Heavy rains, river water levels, or unannounced domestic flight schedule changes
                by Madagascar Airlines may necessitate route modifications. Ernest Tours reserves the right to alter itineraries in the interest
                of traveler safety and comfort, always offering equivalent lodging and highlights whenever feasible.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                6. Wildlife & Environmental Code
              </h2>
              <p>
                Travelers are required to adhere to national park regulations at all times:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>No feeding, touching, or harassing lemurs, reptiles, or marine wildlife.</li>
                <li>Always remain on marked trails accompanied by our licensed local trackers.</li>
                <li>Do not harvest orchids, succulents, or natural fossils.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider">
                7. Jurisdiction & Malagasy Law
              </h2>
              <p>
                These terms are governed by the commercial laws of the Republic of Madagascar. Any legal dispute
                shall be subject to the exclusive jurisdiction of the courts of Antsirabe / Antananarivo.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
