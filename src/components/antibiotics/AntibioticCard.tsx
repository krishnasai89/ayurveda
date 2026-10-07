"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, Dna, Activity, ChevronRight } from "lucide-react";

export interface AntibioticItem {
  id: string;
  name: string;
  generic_names?: string[];
  category?: string[] | string;
  sub_category?: string;
  drug_class?: string;
  company_name?: string;
  amount?: string;
  main_cause?: string;
  main_action?: string;
  pk_pd_index?: string;
  who_aware_classification?: "Access" | "Watch" | "Reserve" | string;
  antimicrobial_spectrum?: {
    gram_positive?: string[];
    gram_negative?: string[];
    anaerobic?: boolean;
    atypical?: boolean;
    pseudomonal?: boolean;
    mrsa_active?: boolean;
  };
}

export default function AntibioticCard({
  antibiotic,
}: {
  antibiotic: AntibioticItem;
}) {
  const awareColor =
    {
      Access: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      Watch: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      Reserve: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    }[antibiotic.who_aware_classification || "Watch"] ||
    "text-stone-400 border-stone-500/30 bg-stone-500/10";

  return (
    <Link
      href={`/antibiotics/${antibiotic.id}`}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-400/40 hover:bg-white/[0.04] transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/30"
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider border uppercase font-medium ${awareColor}`}
          >
            WHO {antibiotic.who_aware_classification || "Watch"}
          </span>
          <span className="text-[11px] font-mono text-stone-500">
            {antibiotic.amount || "Formulary"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-light text-stone-100 group-hover:text-emerald-200 transition-colors leading-snug">
          {antibiotic.name}
        </h3>

        {/* Subtitle / Drug Class */}
        <p className="font-sans text-xs text-stone-400 mt-1 line-clamp-1">
          {antibiotic.sub_category || antibiotic.drug_class}
        </p>

        {/* Clinical Indication */}
        <p className="font-sans text-xs text-stone-300/80 mt-3 line-clamp-2 leading-relaxed">
          {antibiotic.main_cause}
        </p>

        {/* Resistance Spectrum Tags */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-white/[0.06]">
          {antibiotic.antimicrobial_spectrum?.mrsa_active && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20">
              MRSA
            </span>
          )}
          {antibiotic.antimicrobial_spectrum?.pseudomonal && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/20">
              Pseudomonas
            </span>
          )}
          {antibiotic.antimicrobial_spectrum?.anaerobic && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Anaerobes
            </span>
          )}
          {antibiotic.antimicrobial_spectrum?.atypical && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
              Atypicals
            </span>
          )}
          {antibiotic.pk_pd_index && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-stone-800 text-stone-400 border border-stone-700">
              {antibiotic.pk_pd_index.split("(")[0].trim()}
            </span>
          )}
        </div>
      </div>

      {/* Footer Link Prompt */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.04] text-[11px] text-stone-500 group-hover:text-emerald-300 font-mono transition-colors">
        <span>View full antimicrobial protocol</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
