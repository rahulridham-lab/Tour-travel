import React from 'react';
import { Compass, ShieldCheck, Car, Anchor, Award, Trees, Droplet } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const ExperienceShowcase: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-xs font-semibold text-[#0D9488] uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>The Ernest Tours Distinction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0F172A] mb-3">
            Private Fleet & Untamed Comfort
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto font-normal">
            In a land where terrain can be demanding, our dedicated expedition fleet and seasoned
            ground team ensure effortless comfort, safety, and exclusivity.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {siteConfig.fleet.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden border border-[#E2E8F0] bg-white shadow-sm flex flex-col justify-between group hover:shadow-xl hover:border-[#CBD5E1] transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold bg-[#0F172A] text-white shadow-sm">
                      {item.capacity}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-[#0F172A] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mb-4">{item.tagline}</p>

                  <div className="space-y-2 border-t border-[#F1F5F9] pt-4">
                    {item.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#475569]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillar Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-11 h-11 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
              <Car className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-[#0F172A] mb-1">Private Chauffeur & Guide</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              No shared buses or fixed schedules. You dictate the pace, photography stops, and daily departures.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-11 h-11 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
              <Anchor className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-[#0F172A] mb-1">Exclusive River Chalands</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Private river barges on the Tsiribihina with personal camp chefs cooking fresh duck and zebu specialties.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-11 h-11 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
              <Trees className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-[#0F172A] mb-1">Certified Park Naturalists</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Decades of experience spotting cryptic camouflaged chameleons, leaf geckos, and rare lemurs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="w-11 h-11 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-semibold text-[#0F172A] mb-1">24/7 Antsirabe Dispatch</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Continuous monitoring, satellite telemetry, and instant mechanical or logistical back-up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

