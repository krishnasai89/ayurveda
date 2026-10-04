"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Wind,
  Flame,
  Droplets,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface DoshaData {
  id: "vata" | "pitta" | "kapha";
  sanskrit: string;
  name: string;
  elements: string;
  qualities: string[];
  governs: string;
  balanceHerb: string;
  color: {
    accent: string;
    border: string;
    bgGlow: string;
    badge: string;
  };
  desc: string;
}

const DOSHAS: DoshaData[] = [
  {
    id: "vata",
    sanskrit: "वात",
    name: "Vata",
    elements: "Space & Air (Akasha + Vayu)",
    qualities: ["Light", "Dry", "Mobile", "Cold", "Subtle"],
    governs: "Movement, nerve impulses, breath, and circulation.",
    balanceHerb: "Ashwagandha & Warm Sesame",
    color: {
      accent: "text-amber-200",
      border: "border-amber-400/30",
      bgGlow: "from-amber-900/20 via-sky-950/20 to-transparent",
      badge: "bg-amber-400/10 text-amber-300 border-amber-400/30",
    },
    desc: "The kinetic energy of the cosmos. When balanced, it inspires radiant creativity and effortless vitality.",
  },
  {
    id: "pitta",
    sanskrit: "पित्त",
    name: "Pitta",
    elements: "Fire & Water (Tejas + Jala)",
    qualities: ["Hot", "Sharp", "Penetrating", "Liquid", "Oily"],
    governs:
      "Metabolism, digestion (Agni), intelligence, and body temperature.",
    balanceHerb: "Brahmi, Shatavari & Ghee",
    color: {
      accent: "text-orange-200",
      border: "border-amber-500/40",
      bgGlow: "from-orange-950/25 via-red-950/20 to-transparent",
      badge: "bg-orange-500/10 text-orange-300 border-orange-500/30",
    },
    desc: "The luminous metabolic force of transformation. Balanced Pitta yields keen intellect, warmth, and boundless courage.",
  },
  {
    id: "kapha",
    sanskrit: "कफ",
    name: "Kapha",
    elements: "Water & Earth (Jala + Prithvi)",
    qualities: ["Heavy", "Slow", "Steady", "Solid", "Cool"],
    governs:
      "Structure, immunity (Ojas), lubricated joints, and emotional calm.",
    balanceHerb: "Tulsi, Ginger & Pippali",
    color: {
      accent: "text-emerald-200",
      border: "border-emerald-500/30",
      bgGlow: "from-emerald-950/25 via-teal-950/20 to-transparent",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    },
    desc: "The cohesive ground of physical endurance and emotional equanimity. Balanced Kapha bestows deep immunity and grounded love.",
  },
];

export default function TridoshaSection() {
  const [activeDosha, setActiveDosha] = useState<"vata" | "pitta" | "kapha">(
    "pitta",
  );
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".bento-item", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = DOSHAS.find((d) => d.id === activeDosha)!;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 md:px-16 bg-[#090b0e] text-[#F9F6F0] overflow-hidden"
    >
      {/* Ambient background glow matching sacred golden-bronze aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-amber-600/10 via-amber-800/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="reveal-header inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs tracking-[0.25em] uppercase font-sans">
            <Sparkles className="w-3.5 h-3.5" />
            The Foundation of Sacred Healing
          </div>

          <h2 className="reveal-header font-serif text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 font-normal leading-tight">
            Prakriti & The Tridoshas
          </h2>

          <p className="reveal-header font-sans text-stone-300/80 text-sm md:text-base leading-relaxed">
            Every human soul is a unique synthesis of nature&apos;s primary
            archetypes. Understanding your biological constitution reveals the
            precise path to eternal vitality.
          </p>
        </div>

        {/* Dosha Selector Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-amber-200/15 shadow-2xl">
            {DOSHAS.map((d) => {
              const isActive = activeDosha === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDosha(d.id)}
                  className={`px-6 py-3 rounded-xl font-serif text-sm tracking-widest transition-all duration-300 flex items-center gap-2.5 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500/30 to-amber-700/40 text-amber-100 border border-amber-400/40 shadow-lg shadow-amber-500/10"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  <span className="text-xs opacity-60 font-sans">
                    {d.sanskrit}
                  </span>
                  <span>{d.name.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Focus Card (7 cols) */}
          <div className="bento-item md:col-span-7 rounded-3xl p-8 md:p-10 relative overflow-hidden backdrop-blur-xl border border-amber-300/20 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent shadow-2xl">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${current.color.bgGlow} transition-all duration-700`}
            />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono border ${current.color.badge}`}
                >
                  {current.elements}
                </span>
                <span className="text-4xl font-serif text-amber-300/40 select-none">
                  {current.sanskrit}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl md:text-4xl text-amber-100 tracking-wide">
                  {current.name} Dosha
                </h3>
                <p className="mt-2 text-stone-300/90 font-sans text-sm md:text-base leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Qualities / Gunas */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-amber-300/70 mb-3 font-sans">
                  Inherent Gunas (Attributes)
                </p>
                <div className="flex flex-wrap gap-2">
                  {current.qualities.map((q) => (
                    <span
                      key={q}
                      className="px-3.5 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-stone-200 backdrop-blur-sm"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Governing Action */}
              <div className="bg-black/30 rounded-2xl p-4 border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-amber-300 font-sans">
                      Physiological Governance
                    </h4>
                    <p className="text-sm text-stone-300 mt-1 font-sans">
                      {current.governs}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Bento 1: Balancer & Rasayana Herb (5 cols) */}
          <div className="bento-item md:col-span-5 rounded-3xl p-8 backdrop-blur-xl border border-amber-300/20 bg-gradient-to-b from-white/[0.04] to-black/40 flex flex-col justify-between shadow-2xl">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-amber-300/70 font-sans flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Vedic Herbology (Dravya Guna)
              </span>
              <h3 className="font-serif text-2xl text-amber-100">
                Primary Rasayana Companion
              </h3>
              <p className="text-stone-300/80 text-sm leading-relaxed font-sans">
                Formulated to harmonise {current.name} aggravations and elevate
                primal digestive fire (Agni).
              </p>

              <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 mt-4">
                <div className="text-xs text-amber-300/80 font-mono uppercase">
                  Rebalancing Herb
                </div>
                <div className="text-lg font-serif text-amber-200 mt-0.5">
                  {current.balanceHerb}
                </div>
              </div>
            </div>

            <button className="mt-8 group w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-serif font-medium flex items-center justify-center gap-2 hover:brightness-110 transition shadow-lg shadow-amber-500/20">
              <span>View Recommended Protocol</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bottom Bento: The 5 Mahabhutas (Elements) Quick Matrix (12 cols) */}
          <div className="bento-item md:col-span-12 rounded-3xl p-8 backdrop-blur-xl border border-amber-300/20 bg-black/40 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-serif text-xl text-amber-100">
                  The Panchamahabhuta Synthesis
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Space, Air, Fire, Water, and Earth coalescing in divine order.
                </p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {[
                  { name: "Akasha", label: "Space", icon: Sparkles },
                  { name: "Vayu", label: "Air", icon: Wind },
                  { name: "Tejas", label: "Fire", icon: Flame },
                  { name: "Jala", label: "Water", icon: Droplets },
                  { name: "Prithvi", label: "Earth", icon: ShieldCheck },
                ].map((elem) => {
                  const Icon = elem.icon;
                  return (
                    <div
                      key={elem.name}
                      className="px-4 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-amber-400/40 text-center transition group"
                    >
                      <Icon className="w-4 h-4 mx-auto text-amber-400/70 group-hover:text-amber-300 group-hover:scale-110 transition" />
                      <div className="text-xs font-serif text-amber-100 mt-1">
                        {elem.name}
                      </div>
                      <div className="text-[10px] text-stone-400 uppercase font-sans">
                        {elem.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
