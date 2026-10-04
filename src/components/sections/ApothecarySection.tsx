"use client";

import React, { useState } from "react";
import { Sparkles, Leaf, Eye, ShieldCheck, HeartPulse } from "lucide-react";

interface Herb {
  id: string;
  sanskrit: string;
  name: string;
  botanical: string;
  doshaAffinity: string;
  rasa: string; // Taste
  primaryBenefit: string;
  accentColor: string;
  borderGlow: string;
  description: string;
}

const SACRED_HERBS: Herb[] = [
  {
    id: "ashwagandha",
    sanskrit: "अश्वगन्धा",
    name: "Ashwagandha",
    botanical: "Withania somnifera",
    doshaAffinity: "Pacifies Vata & Kapha",
    rasa: "Bitter, Astringent, Sweet",
    primaryBenefit: "Deep nervous system resilience & adrenal restoration.",
    accentColor: "from-amber-600/30 to-amber-900/40",
    borderGlow: "hover:border-amber-400/50",
    description:
      "The 'Strength of a Stallion.' Renowned rasayana for combating stress, supporting thyroid function, and rebuilding depleted Ojas.",
  },
  {
    id: "brahmi",
    sanskrit: "ब्राह्मी",
    name: "Brahmi",
    botanical: "Bacopa monnieri",
    doshaAffinity: "Balances all 3 Doshas (Tridoshic)",
    rasa: "Bitter, Astringent",
    primaryBenefit: "Higher consciousness, cognitive clarity & calm memory.",
    accentColor: "from-emerald-600/30 to-teal-900/40",
    borderGlow: "hover:border-emerald-400/50",
    description:
      "Named after Brahma, the creator. Anointed for sharpening the intellect (Medhya Rasayana), cooling the mind, and easing insomnia.",
  },
  {
    id: "tulsi",
    sanskrit: "तुलसी",
    name: "Holy Basil (Tulsi)",
    botanical: "Ocimum sanctum",
    doshaAffinity: "Pacifies Vata & Kapha",
    rasa: "Pungent, Bitter",
    primaryBenefit:
      "Cellular longevity, respiratory prana & spiritual elevation.",
    accentColor: "from-green-600/30 to-lime-900/40",
    borderGlow: "hover:border-green-400/50",
    description:
      "The Queen of Herbs. Regarded as an earthly manifestation of the divine, clearing subtle energetic pathways and elevating immunity.",
  },
  {
    id: "shatavari",
    sanskrit: "शतावरी",
    name: "Shatavari",
    botanical: "Asparagus racemosus",
    doshaAffinity: "Pacifies Pitta & Vata",
    rasa: "Sweet, Bitter",
    primaryBenefit: "Hormonal equilibrium, tissue hydration & female vitality.",
    accentColor: "from-rose-600/30 to-pink-950/40",
    borderGlow: "hover:border-rose-400/50",
    description:
      "She Who Possesses a Hundred Husbands. A moistening, cooling root that nurtures vitality, reproductive health, and emotional softness.",
  },
  {
    id: "amla",
    sanskrit: "आमलकी",
    name: "Amalaki",
    botanical: "Phyllanthus emblica",
    doshaAffinity: "Balances all 3 Doshas",
    rasa: "5 Tastes (predominantly Sour)",
    primaryBenefit: "Unrivaled vitamin C, Agni ignition & luminous skin.",
    accentColor: "from-yellow-600/30 to-amber-950/40",
    borderGlow: "hover:border-yellow-400/50",
    description:
      "The Great Mother of Youth. The core ingredient of Chyawanprash, protecting cellular integrity against accelerated oxidative aging.",
  },
  {
    id: "neem",
    sanskrit: "निम्ब",
    name: "Neem",
    botanical: "Azadirachta indica",
    doshaAffinity: "Pacifies Pitta & Kapha",
    rasa: "Intensely Bitter",
    primaryBenefit: "Blood purification (Rakta Shodhana) & radiant skin.",
    accentColor: "from-teal-600/30 to-emerald-950/40",
    borderGlow: "hover:border-teal-400/50",
    description:
      "The Village Pharmacy. Cools systemic heat, cleanses deep tissue layers, and maintains luminous, clear dermatological health.",
  },
];

export default function ApothecarySection() {
  const [selectedHerb, setSelectedHerb] = useState<Herb>(SACRED_HERBS[0]);

  return (
    <section
      id="apothecary"
      className="relative min-h-screen py-24 px-6 md:px-16 bg-[#080706] text-stone-100 overflow-hidden"
    >
      {/* Background ambient sacred haze */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs tracking-[0.25em] uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Dravya Guna Vijnana
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-amber-100 to-amber-400 font-light">
            The Amrit Apothecary
          </h2>

          <p className="font-sans text-stone-300/80 text-sm md:text-base leading-relaxed">
            Sacred wildcrafted botanicals formulated according to classical
            Charaka and Sushruta Samhita principles.
          </p>
        </div>

        {/* 6-Card Interactive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SACRED_HERBS.map((herb) => {
            const isSelected = selectedHerb.id === herb.id;

            return (
              <div
                key={herb.id}
                onClick={() => setSelectedHerb(herb)}
                className={`group relative rounded-3xl p-7 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border ${
                  isSelected
                    ? "border-amber-400/60 bg-white/[0.06] shadow-[0_10px_35px_rgba(217,119,6,0.2)] scale-[1.02]"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04] " +
                      herb.borderGlow
                }`}
              >
                {/* Gradient Wash */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${herb.accentColor} opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10`}
                />

                {/* Card Top: Sanskrit Glyphs & Botanical */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="font-serif text-3xl text-amber-200/40 select-none block">
                      {herb.sanskrit}
                    </span>
                    <h3 className="font-serif text-2xl text-stone-100 group-hover:text-amber-200 transition-colors mt-1">
                      {herb.name}
                    </h3>
                    <p className="font-mono text-xs text-amber-400/80 italic mt-0.5">
                      {herb.botanical}
                    </p>
                  </div>

                  <span className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-amber-300">
                    <Leaf className="w-5 h-5" />
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-300/85 text-xs md:text-sm font-sans leading-relaxed mb-6">
                  {herb.description}
                </p>

                {/* Meta Attributes Chips */}
                <div className="space-y-2 pt-4 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="flex items-center gap-1.5 text-stone-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      Affinity:
                    </span>
                    <span className="font-medium text-amber-200">
                      {herb.doshaAffinity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span className="flex items-center gap-1.5 text-stone-400">
                      <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                      Taste (Rasa):
                    </span>
                    <span className="text-stone-300">{herb.rasa}</span>
                  </div>
                </div>

                {/* View Details Indicator */}
                <div className="mt-5 pt-3 flex items-center gap-2 text-xs font-serif text-amber-300/80 group-hover:text-amber-200">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Botanical Formulation</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
