"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Building2,
  Tag,
  X,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Droplets,
  Activity,
  TrendingDown,
  Layers,
  Sparkles,
} from "lucide-react";

export interface CholesterolItem {
  id: string;
  name: string;
  generic_names: string[];
  category: string[] | string;
  sub_category?: string;
  company_name?: string;
  amount?: string;
  routes_of_administration: string[];
  intensity_tier?: string;
  lipid_profile_impact?: {
    ldl_reduction?: string;
    tg_reduction?: string;
    hdl_elevation?: string;
    lpa_reduction?: string;
  };
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

interface CholesterolCardProps {
  cholesterolItem: CholesterolItem;
}

export default function CholesterolCard({
  cholesterolItem,
}: CholesterolCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const intensityBadge =
    {
      "High-Intensity (≥50% LDL Drop)":
        "bg-rose-500/15 border-rose-400/30 text-rose-300",
      "Moderate-Intensity (30–49% LDL Drop)":
        "bg-amber-500/15 border-amber-400/30 text-amber-300",
      "Low-Intensity (<30% LDL Drop)":
        "bg-sky-500/15 border-sky-400/30 text-sky-300",
      "Add-on Non-Statin":
        "bg-purple-500/15 border-purple-400/30 text-purple-300",
    }[cholesterolItem.intensity_tier || ""] ||
    "bg-rose-500/15 border-rose-400/30 text-rose-300";

  const routes = Array.isArray(cholesterolItem.routes_of_administration)
    ? cholesterolItem.routes_of_administration
    : [];

  return (
    <>
      {/* Primary Grid Card */}
      <div className="flex flex-col justify-between p-6 rounded-3xl bg-white/[0.03] border border-rose-500/20 backdrop-blur-xl hover:border-rose-400/50 hover:bg-white/[0.05] transition-all duration-300 shadow-xl group">
        <div className="space-y-4">
          {/* Top Row: Class & Price/Tier */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest font-mono uppercase text-rose-400/80">
                  {cholesterolItem.drug_class || cholesterolItem.sub_category}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-stone-100 group-hover:text-rose-200 transition-colors mt-0.5">
                {cholesterolItem.name}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              {cholesterolItem.intensity_tier && (
                <div
                  className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${intensityBadge}`}
                >
                  {cholesterolItem.intensity_tier.split("(")[0].trim()}
                </div>
              )}
              <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-rose-400/30 text-rose-300 font-mono text-xs font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3 text-rose-400" />
                <span>{cholesterolItem.amount || "Institutional"}</span>
              </div>
            </div>
          </div>

          {/* Lipid Impact Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {cholesterolItem.lipid_profile_impact?.ldl_reduction && (
              <span className="px-2.5 py-0.5 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-200 text-[10px] font-mono tracking-wider uppercase">
                LDL ↓ {cholesterolItem.lipid_profile_impact.ldl_reduction}
              </span>
            )}
            {cholesterolItem.lipid_profile_impact?.tg_reduction && (
              <span className="px-2.5 py-0.5 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[10px] font-mono tracking-wider uppercase">
                TG ↓ {cholesterolItem.lipid_profile_impact.tg_reduction}
              </span>
            )}
            {cholesterolItem.lipid_profile_impact?.hdl_elevation && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-[10px] font-mono tracking-wider uppercase">
                HDL ↑ {cholesterolItem.lipid_profile_impact.hdl_elevation}
              </span>
            )}
            {cholesterolItem.lipid_profile_impact?.lpa_reduction && (
              <span className="px-2.5 py-0.5 rounded-md bg-purple-950/40 border border-purple-500/30 text-purple-200 text-[10px] font-mono tracking-wider uppercase">
                Lp(a) ↓ {cholesterolItem.lipid_profile_impact.lpa_reduction}
              </span>
            )}
          </div>

          {/* Manufacturer / Batch */}
          {cholesterolItem.company_name && (
            <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
              <Building2 className="w-3.5 h-3.5 text-rose-400/70" />
              <span>Cardiovascular Batch:</span>
              <span className="text-stone-200 font-medium">
                {cholesterolItem.company_name}
              </span>
            </div>
          )}

          {/* Primary Indication */}
          <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20">
            <div className="flex items-center gap-1.5 text-xs text-rose-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              <span>Cardiovascular & Lipid Indication:</span>
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {cholesterolItem.main_cause}
            </p>
          </div>
        </div>

        {/* Read Cardioprotective Protocol Button */}
        <div className="pt-6 mt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500/20 to-rose-600/30 border border-rose-400/40 text-rose-200 hover:text-stone-950 hover:bg-rose-400 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Lipid Protocol & Statin Dosage</span>
          </button>
        </div>
      </div>

      {/* Modal View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d10] border border-rose-400/30 p-6 md:p-8 text-stone-200 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-widest">
                    {cholesterolItem.drug_class || cholesterolItem.sub_category}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs font-mono text-stone-400">
                    {cholesterolItem.intensity_tier || "Lipid-Lowering Agent"}
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-rose-100 mt-1">
                  {cholesterolItem.name}
                </h2>
                <p className="text-xs text-stone-400 font-mono mt-0.5">
                  Brands / Synonyms:{" "}
                  {Array.isArray(cholesterolItem.generic_names)
                    ? cholesterolItem.generic_names.join(", ")
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

            {/* Lipid Profile Modulatory Impact Grid */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-rose-300 uppercase">
                <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                Atherogenic Lipoprotein & Lipid Biomarker Target Shift
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    LDL-C Drop
                  </span>
                  <span className="text-sm font-semibold text-rose-300">
                    {cholesterolItem.lipid_profile_impact?.ldl_reduction || "—"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Triglycerides
                  </span>
                  <span className="text-sm font-semibold text-amber-300">
                    {cholesterolItem.lipid_profile_impact?.tg_reduction || "—"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    HDL-C Rise
                  </span>
                  <span className="text-sm font-semibold text-emerald-300">
                    {cholesterolItem.lipid_profile_impact?.hdl_elevation || "—"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Lp(a) Change
                  </span>
                  <span className="text-sm font-semibold text-purple-300">
                    {cholesterolItem.lipid_profile_impact?.lpa_reduction ||
                      "Neutral"}
                  </span>
                </div>
              </div>
            </div>

            {/* Routes & Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-rose-300 uppercase">
                  <Layers className="w-3.5 h-3.5 text-rose-400" />
                  Routes of Administration
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {routes.map((r, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-100 text-xs font-mono font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-rose-400" />
                  Administration Timing & Circadian Kinetics
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {cholesterolItem.infusion_rate_and_timing ||
                    "Standard oral daily dosing protocol applies."}
                </p>
              </div>
            </div>

            {/* Formulation & Chemistry */}
            {cholesterolItem.reconstitution_and_dilution && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-rose-400" />
                  Formulation, Metabolism & Pharmacokinetics
                </h4>
                <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
                  {cholesterolItem.reconstitution_and_dilution}
                </p>
              </div>
            )}

            {/* Cellular Mechanism */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                HMG-CoA Reductase / Hepatic Receptor Target Mechanism
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {cholesterolItem.main_action}
              </p>
            </div>

            {/* Clinical Suitability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h5 className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px]">
                  Clinical Suitability & Indications
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {cholesterolItem.patient_suitability.who_can_use_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <h5 className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">
                  Cardiovascular Contraindications
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {cholesterolItem.patient_suitability.who_should_avoid_or_limit_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* Critical Cautions & Myopathy Warnings */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <h5 className="font-mono text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Rhabdomyolysis, Transaminase Monitoring & Safety Warnings
              </h5>
              <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                {cholesterolItem.important_cautions.map((caution, i) => (
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
