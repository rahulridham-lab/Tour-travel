import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Eye, ShieldCheck } from 'lucide-react';
import { circuitsData, Circuit } from '../data/circuits';

interface Waypoint {
  id: string;
  name: string;
  region: 'highlands' | 'west' | 'south' | 'east';
  coords: { x: number; y: number }; // Percentage coordinates on Madagascar island silhouette
  description: string;
  highlight: string;
}

const waypoints: Waypoint[] = [
  {
    id: 'tana',
    name: 'Antananarivo',
    region: 'highlands',
    coords: { x: 53, y: 38 },
    description: 'Historical capital of Madagascar, gateway to the Merina kingdom and high plateaus.',
    highlight: 'Rova of Antananarivo & Haute-Ville',
  },
  {
    id: 'antsirabe',
    name: 'Antsirabe (Ernest Tours HQ)',
    region: 'highlands',
    coords: { x: 50, y: 46 },
    description: 'Thermal spa city, volcanic crater lakes, and operational headquarters of Ernest Tours.',
    highlight: 'Lake Tritriva & Gemstone Ateliers',
  },
  {
    id: 'miandrivazo',
    name: 'Miandrivazo',
    region: 'west',
    coords: { x: 38, y: 45 },
    description: 'Warm valley gateway to the Mahajilo and Tsiribihina river descents.',
    highlight: 'River Chaland Embarkation',
  },
  {
    id: 'bekopaka',
    name: 'Bekopaka (Grand Tsingy)',
    region: 'west',
    coords: { x: 30, y: 36 },
    description: 'UNESCO World Heritage razor-sharp karst limestone spires, rope bridges, and caves.',
    highlight: 'Grand Tsingy Rope Bridges & Decken Sifaka',
  },
  {
    id: 'morondava',
    name: 'Morondava & Baobabs',
    region: 'west',
    coords: { x: 26, y: 52 },
    description: 'Coastal hub famous for the 800-year-old giants at the Avenue of the Baobabs.',
    highlight: 'Sunset at Allée des Baobabs',
  },
  {
    id: 'ranomafana',
    name: 'Ranomafana National Park',
    region: 'south',
    coords: { x: 58, y: 58 },
    description: 'Pristine rainforest with thermal springs, rare Golden Bamboo lemurs, and chameleons.',
    highlight: 'Golden Bamboo Lemur Sanctuary',
  },
  {
    id: 'isalo',
    name: 'Isalo National Park (Ranohira)',
    region: 'south',
    coords: { x: 42, y: 72 },
    description: 'Jurassic sandstone massif, deep slot canyons, and oasis swimming pools.',
    highlight: 'Piscine Naturelle & Sunset Rock Window',
  },
  {
    id: 'toliara',
    name: 'Toliara & Ifaty Lagoon',
    region: 'south',
    coords: { x: 32, y: 84 },
    description: 'Mozambique Channel coral barrier reef, ancient Spiny Forest, and Vezo fishing villages.',
    highlight: 'Octopus Trees & Coral Reef Diving',
  },
  {
    id: 'andasibe',
    name: 'Andasibe-Mantadia',
    region: 'east',
    coords: { x: 62, y: 39 },
    description: 'Cloud rainforest sanctuary where the haunting songs of the Indri lemur reverberate.',
    highlight: 'Indri Indri & Lemur Island',
  },
  {
    id: 'saintemarie',
    name: 'Île Sainte-Marie',
    region: 'east',
    coords: { x: 74, y: 28 },
    description: 'Pirate-legend island, turquoise lagoons, and humpback whale calving haven.',
    highlight: 'Humpback Whale Migration & Pirate Cemetery',
  },
];

interface MadagascarMap3DProps {
  onSelectCircuit: (circuit: Circuit) => void;
}

export const MadagascarMap3D: React.FC<MadagascarMap3DProps> = ({ onSelectCircuit }) => {
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint>(waypoints[1]); // Default Antsirabe HQ
  const [activeRegionFilter, setActiveRegionFilter] = useState<'all' | 'west' | 'south' | 'east' | 'mixed'>('all');

  const filteredCircuits = circuitsData.filter(
    (c) => activeRegionFilter === 'all' || c.region === activeRegionFilter
  );

  return (
    <section id="map-section" className="py-20 relative bg-[#F8FAFC] border-t border-[#E2E8F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-xs font-semibold text-[#0D9488] uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>Geographic Expedition Explorer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#0F172A] mb-3">
            Interactive Waypoints of Madagascar
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto font-normal">
            From the thermal volcanic highlands of Antsirabe to the razor spires of Grand Tsingy
            and the coral lagoons of the Mozambique Channel, chart your dream private itinerary.
          </p>

          {/* Region filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {(['all', 'west', 'south', 'east', 'mixed'] as const).map((reg) => (
              <button
                key={reg}
                onClick={() => setActiveRegionFilter(reg)}
                className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeRegionFilter === reg
                    ? 'bg-[#0D9488] text-white shadow-md shadow-[#0D9488]/20 font-bold'
                    : 'bg-white text-[#475569] border border-[#CBD5E1] hover:border-[#0D9488]'
                }`}
              >
                {reg === 'all' ? 'All Expeditions' : `${reg.toUpperCase()} Circuits`}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Map & Destination Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Stylized Map */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-wider text-[#0D9488] font-bold flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5" />
                Madagascar Island Interactive Plot
              </span>
              <span className="text-[11px] text-[#64748B]">Click any beacon to view details</span>
            </div>

            {/* Map Canvas Silhouette (Light Luxury Island Theme) */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.2] bg-gradient-to-b from-[#E0F2FE]/70 via-[#F0FDF4]/80 to-[#F8FAFC] rounded-2xl border border-[#BAE6FD] overflow-hidden flex items-center justify-center p-4 shadow-inner">
              {/* Subtle Nautical Ocean Background Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#0284C7_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

              {/* Watermark Label */}
              <div className="absolute top-3 left-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0369A1]/60 select-none">
                Canal de Mozambique &bull; Indian Ocean
              </div>

              {/* Island Stylized SVG Silhouette */}
              <svg
                viewBox="0 0 500 650"
                className="w-full h-full max-h-[550px] drop-shadow-[0_10px_20px_rgba(13,148,136,0.15)] relative z-10"
              >
                {/* Madagascar Mainland Path */}
                <path
                  d="M 330 35 
                     C 350 70, 365 110, 355 160 
                     C 345 210, 380 250, 360 300 
                     C 340 350, 345 420, 320 480 
                     C 300 530, 290 580, 260 615 
                     C 240 640, 205 640, 195 610 
                     C 180 570, 150 540, 140 480 
                     C 130 420, 115 360, 120 300 
                     C 125 240, 135 180, 175 120 
                     C 210 70, 270 40, 330 35 Z"
                  fill="#CCFBF1"
                  stroke="#0D9488"
                  strokeWidth="2.5"
                  className="transition-all hover:fill-[#99F6E4] duration-300"
                />

                {/* Île Sainte-Marie Island */}
                <path
                  d="M 375 160 C 385 180, 380 220, 370 240 C 365 240, 365 200, 375 160 Z"
                  fill="#0D9488"
                  stroke="#047857"
                  strokeWidth="2"
                />

                {/* Connection Flight & Overland Route Arcs */}
                <path
                  d="M 265 250 Q 200 280, 150 340"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeOpacity="0.8"
                />
                <path
                  d="M 250 300 Q 230 420, 200 480"
                  fill="none"
                  stroke="#0D9488"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeOpacity="0.8"
                />
                <path
                  d="M 265 250 Q 320 230, 370 200"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2"
                  strokeDasharray="5 4"
                  strokeOpacity="0.8"
                />
              </svg>

              {/* Waypoint Interactive Buttons positioned via CSS % */}
              {waypoints.map((wp) => {
                const isSelected = selectedWaypoint.id === wp.id;
                return (
                  <button
                    key={wp.id}
                    onClick={() => setSelectedWaypoint(wp)}
                    style={{ left: `${wp.coords.x}%`, top: `${wp.coords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-30 focus:outline-none transition-transform cursor-pointer ${
                      isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                    }`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Outer pulse */}
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-[#0D9488]/30 animate-ping" />
                      )}
                      {/* Beacon dot */}
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center shadow-md transition-all ${
                          isSelected
                            ? 'bg-[#0F172A] ring-4 ring-[#0D9488]/40 scale-110'
                            : wp.id === 'antsirabe'
                            ? 'bg-amber-500 ring-4 ring-amber-400/50 animate-pulse'
                            : 'bg-[#0D9488] ring-2 ring-[#0D9488]/30'
                        }`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      {/* Tooltip Label */}
                      <div
                        className={`absolute left-5 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-all pointer-events-none shadow-md ${
                          isSelected
                            ? 'bg-[#0F172A] text-white border border-[#0F172A] opacity-100 z-50'
                            : 'bg-white text-[#0F172A] border border-[#CBD5E1] opacity-90 group-hover:opacity-100'
                        }`}
                      >
                        {wp.name.split('(')[0].trim()}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend (Light Theme) */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-[#E2E8F0] text-xs text-[#475569] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-300" />
                <span className="font-bold text-[#0F172A]">Antsirabe (Ernest HQ)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0D9488] ring-2 ring-[#0D9488]/30" />
                <span>Expedition Waypoints</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 border-t-2 border-dashed border-[#D97706]" />
                <span>4x4 Overland Corridors</span>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Waypoint Dossier & Connected Circuits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs uppercase tracking-wider text-[#0D9488] font-bold">
                  Location Dossier
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
                  {selectedWaypoint.region} Madagascar
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#0F172A] mb-2">
                {selectedWaypoint.name}
              </h3>

              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                <p className="text-xs font-semibold text-[#0D9488] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#0D9488]" />
                  Key Attraction:
                </p>
                <p className="text-xs text-[#0F172A] mt-0.5 font-medium">{selectedWaypoint.highlight}</p>
              </div>

              <p className="text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
                {selectedWaypoint.description}
              </p>

              {/* Circuits passing through this region */}
              <div className="border-t border-[#F1F5F9] pt-5">
                <h4 className="text-xs uppercase tracking-wider text-[#0F172A] font-semibold mb-3 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#0D9488]" />
                  Available Circuits Featuring This Region:
                </h4>
                <div className="space-y-2.5">
                  {circuitsData
                    .filter(
                      (c) =>
                        c.routeOverview.some((r) =>
                          r.toLowerCase().includes(selectedWaypoint.name.split(' ')[0].toLowerCase())
                        ) || c.region === 'mixed'
                    )
                    .slice(0, 3)
                    .map((circuit) => (
                      <div
                        key={circuit.id}
                        onClick={() => onSelectCircuit(circuit)}
                        className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0D9488] hover:bg-white transition-all cursor-pointer flex items-center justify-between group shadow-sm"
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#0F172A] group-hover:text-[#0D9488] transition-colors">
                            {circuit.title}
                          </p>
                          <p className="text-[11px] text-[#64748B]">
                            {circuit.durationDays} Days / {circuit.durationNights} Nights &bull; {circuit.regionLabel}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#0D9488] group-hover:translate-x-1 transition-transform">
                          View &rarr;
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Antsirabe Operational Guarantee */}
            <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#166534] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#166534]">Local Antsirabe On-Ground Presence</h4>
                <p className="text-xs text-[#15803D] mt-1 leading-relaxed">
                  Unlike foreign agencies, Ernest Tours is directly rooted in Antsirabe (Vakinankaratra).
                  Our private mechanics, 4x4 spares, and senior guides are deployed from our home base for immediate support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
