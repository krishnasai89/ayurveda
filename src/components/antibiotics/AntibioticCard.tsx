"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  Building2,
  Tag,
  X,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Droplets,
  Activity,
  Dna,
  Bug,
  Sparkles,
} from "lucide-react";

export interface AntibioticItem {
  id: string;
  name: string;
  generic_names: string[];
  category: string[] | string;
  sub_category?: string;
  company_name?: string;
  amount?: string;
  routes_of_administration: string[];
  antimicrobial_spectrum?: {
    gram_positive?: string[];
    gram_negative?: string[];
    anaerobic?: boolean;
    atypical?: boolean;
    pseudomonal?: boolean;
    mrsa_active?: boolean;
  };
  who_aware_classification?: "Access" | "Watch" | "Reserve" | string;
  pk_pd_index?: string;
  main_cause: string;
  drug_class: string;
  main_action: string;
  diseases_and_conditions_it_may_be_used_for: string[];
  how_patients_describe_symptoms?: string[];
  reconstitution_and_dilution?: string;
  infusion_rate_and_timing?: string;
  patient_suitability: {
    who_can_use_it: string[];
    who_should_avoid_or_limit_it: string[];
  };
  common_side_effects: string[];
  important_cautions: string[];
}

interface AntibioticCardProps {
  antibiotic: AntibioticItem;
}

export default function AntibioticCard({ antibiotic }: AntibioticCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const awareStyles = {
    Access: {
      badge: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
      tag: "bg-emerald-950/40 border-emerald-500/30 text-emerald-200",
    },
    Watch: {
      badge: "bg-amber-500/15 border-amber-400/30 text-amber-300",
      tag: "bg-amber-950/40 border-amber-500/30 text-amber-200",
    },
    Reserve: {
      badge: "bg-rose-500/15 border-rose-400/30 text-rose-300",
      tag: "bg-rose-950/40 border-rose-500/30 text-rose-200",
    },
  }[antibiotic.who_aware_classification || "Watch"] || {
    badge: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
    tag: "bg-emerald-950/40 border-emerald-500/30 text-emerald-200",
  };

  const routes = Array.isArray(antibiotic.routes_of_administration)
    ? antibiotic.routes_of_administration
    : [];

  return (
    <>
      {/* Primary Grid Card */}
      <div className="flex flex-col justify-between p-6 rounded-3xl bg-white/[0.03] border border-emerald-500/20 backdrop-blur-xl hover:border-emerald-400/50 hover:bg-white/[0.05] transition-all duration-300 shadow-xl group">
        <div className="space-y-4">
          {/* Top Row: Class & Price/AWaRe */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest font-mono uppercase text-emerald-400/80">
                  {antibiotic.drug_class || antibiotic.sub_category}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-stone-100 group-hover:text-emerald-200 transition-colors mt-0.5">
                {antibiotic.name}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div
                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${awareStyles.badge}`}
              >
                WHO {antibiotic.who_aware_classification || "Watch"}
              </div>
              <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-emerald-400/30 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3 text-emerald-400" />
                <span>{antibiotic.amount || "Formulary"}</span>
              </div>
            </div>
          </div>

          {/* Spectrum Coverage Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {antibiotic.antimicrobial_spectrum?.mrsa_active && (
              <span className="px-2.5 py-0.5 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-200 text-[10px] font-mono tracking-wider uppercase">
                MRSA Active
              </span>
            )}
            {antibiotic.antimicrobial_spectrum?.pseudomonal && (
              <span className="px-2.5 py-0.5 rounded-md bg-sky-950/40 border border-sky-500/30 text-sky-200 text-[10px] font-mono tracking-wider uppercase">
                Pseudomonas
              </span>
            )}
            {antibiotic.antimicrobial_spectrum?.anaerobic && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-[10px] font-mono tracking-wider uppercase">
                Anaerobes
              </span>
            )}
            {antibiotic.antimicrobial_spectrum?.atypical && (
              <span className="px-2.5 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-200 text-[10px] font-mono tracking-wider uppercase">
                Atypicals
              </span>
            )}
            {antibiotic.pk_pd_index && (
              <span className="px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-stone-300 text-[10px] font-mono tracking-wider uppercase">
                {antibiotic.pk_pd_index.split("(")[0].trim()}
              </span>
            )}
          </div>

          {/* Manufacturer / Formulary Code */}
          {antibiotic.company_name && (
            <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
              <Building2 className="w-3.5 h-3.5 text-emerald-400/70" />
              <span>Antimicrobial Batch:</span>
              <span className="text-stone-200 font-medium">
                {antibiotic.company_name}
              </span>
            </div>
          )}

          {/* Primary Indication */}
          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Infections:</span>
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {antibiotic.main_cause}
            </p>
          </div>
        </div>

        {/* Read Antibiotic Protocol Button */}
        <div className="pt-6 mt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/30 border border-emerald-400/40 text-emerald-200 hover:text-stone-950 hover:bg-emerald-400 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Antimicrobial Protocol & Regimen</span>
          </button>
        </div>
      </div>

      {/* Modal View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d10] border border-emerald-400/30 p-6 md:p-8 text-stone-200 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                    {antibiotic.drug_class || antibiotic.sub_category}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs font-mono text-stone-400">
                    WHO {antibiotic.who_aware_classification || "Watch"}
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-emerald-100 mt-1">
                  {antibiotic.name}
                </h2>
                <p className="text-xs text-stone-400 font-mono mt-0.5">
                  Brands / Synonyms:{" "}
                  {Array.isArray(antibiotic.generic_names)
                    ? antibiotic.generic_names.join(", ")
                    : "Standard formulation"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pathogen Resistance Spectrum Breakdown */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 uppercase">
                <Bug className="w-3.5 h-3.5 text-emerald-400" />
                Antimicrobial Spectrum & Resistance Profile
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono ${
                    antibiotic.antimicrobial_spectrum?.mrsa_active
                      ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
                      : "bg-white/[0.03] text-stone-500 border border-white/5 line-through"
                  }`}
                >
                  MRSA
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono ${
                    antibiotic.antimicrobial_spectrum?.pseudomonal
                      ? "bg-sky-500/20 text-sky-200 border border-sky-400/40"
                      : "bg-white/[0.03] text-stone-500 border border-white/5 line-through"
                  }`}
                >
                  Pseudomonas
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono ${
                    antibiotic.antimicrobial_spectrum?.anaerobic
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
                      : "bg-white/[0.03] text-stone-500 border border-white/5 line-through"
                  }`}
                >
                  Anaerobes
                </span>
                <span
                  className={`px-2.5 py-1 rounded text-xs font-mono ${
                    antibiotic.antimicrobial_spectrum?.atypical
                      ? "bg-purple-500/20 text-purple-200 border border-purple-400/40"
                      : "bg-white/[0.03] text-stone-500 border border-white/5 line-through"
                  }`}
                >
                  Atypicals
                </span>
              </div>

              {(antibiotic.antimicrobial_spectrum?.gram_positive?.length ||
                antibiotic.antimicrobial_spectrum?.gram_negative?.length) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2 border-t border-emerald-500/20 font-sans">
                  {antibiotic.antimicrobial_spectrum?.gram_positive && (
                    <div>
                      <span className="text-emerald-400 font-semibold block mb-0.5">
                        Gram-Positive Targets:
                      </span>
                      <p className="text-stone-300">
                        {antibiotic.antimicrobial_spectrum.gram_positive.join(
                          ", ",
                        )}
                      </p>
                    </div>
                  )}
                  {antibiotic.antimicrobial_spectrum?.gram_negative && (
                    <div>
                      <span className="text-emerald-400 font-semibold block mb-0.5">
                        Gram-Negative Targets:
                      </span>
                      <p className="text-stone-300">
                        {antibiotic.antimicrobial_spectrum.gram_negative.join(
                          ", ",
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Routes & PK/PD Regimen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 uppercase">
                  <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
                  Routes of Administration
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {routes.map((r, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-100 text-xs font-mono font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  Administration Timing & Dosing
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {antibiotic.infusion_rate_and_timing ||
                    "Standard oral or parenteral antimicrobial regimen applies."}
                </p>
              </div>
            </div>

            {/* Reconstitution & Preparation */}
            {antibiotic.reconstitution_and_dilution && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                  Formulation, Reconstitution & Storage
                </h4>
                <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
                  {antibiotic.reconstitution_and_dilution}
                </p>
              </div>
            )}

            {/* Cellular Mechanism */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Antimicrobial Mechanism & PK/PD Target
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {antibiotic.main_action}
              </p>
            </div>

            {/* Suitability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h5 className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px]">
                  Clinical Suitability
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {antibiotic.patient_suitability.who_can_use_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <h5 className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">
                  Contraindications & Stewardship Restrictions
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {antibiotic.patient_suitability.who_should_avoid_or_limit_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* Cautions */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <h5 className="font-mono text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Critical Cautions, Toxicities & Drug Interactions
              </h5>
              <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                {antibiotic.important_cautions.map((caution, i) => (
                  <li key={i}>{caution}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
