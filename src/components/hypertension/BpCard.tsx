"use client";

import React, { useState } from "react";
import {
  Heart,
  Building2,
  Tag,
  X,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Droplets,
  Activity,
  Gauge,
  Layers,
  Zap,
} from "lucide-react";

export interface BpItem {
  id: string;
  name: string;
  generic_names: string[];
  category: string[] | string;
  sub_category?: string;
  company_name?: string;
  amount?: string;
  routes_of_administration: string[];
  blocker_type:
    | "Beta Blocker"
    | "Calcium Channel Blocker (CCB)"
    | "Angiotensin Receptor Blocker (ARB)"
    | "ACE Inhibitor"
    | "Alpha Blocker"
    | "Direct Vasodilator"
    | string;
  hemodynamic_impact?: {
    systolic_bp_drop?: string;
    heart_rate_effect?: "Decreased" | "Neutral" | "Reflex Tachycardia" | string;
    systemic_vascular_resistance?: "Decreased" | "Neutral" | string;
    renal_protective?: boolean;
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

interface BpCardProps {
  drug: BpItem;
}

export default function BpCard({ drug }: BpCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const blockerBadge =
    {
      "Beta Blocker": "bg-indigo-500/15 border-indigo-400/30 text-indigo-300",
      "Calcium Channel Blocker (CCB)":
        "bg-violet-500/15 border-violet-400/30 text-violet-300",
      "Angiotensin Receptor Blocker (ARB)":
        "bg-blue-500/15 border-blue-400/30 text-blue-300",
      "ACE Inhibitor": "bg-sky-500/15 border-sky-400/30 text-sky-300",
      "Alpha Blocker": "bg-purple-500/15 border-purple-400/30 text-purple-300",
    }[drug.blocker_type] ||
    "bg-indigo-500/15 border-indigo-400/30 text-indigo-300";

  const routes = Array.isArray(drug.routes_of_administration)
    ? drug.routes_of_administration
    : [];

  return (
    <>
      {/* Primary Card */}
      <div className="flex flex-col justify-between p-6 rounded-3xl bg-white/[0.03] border border-indigo-500/20 backdrop-blur-xl hover:border-indigo-400/50 hover:bg-white/[0.05] transition-all duration-300 shadow-xl group">
        <div className="space-y-4">
          {/* Top Row: Class & Blocker Type */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] tracking-widest font-mono uppercase text-indigo-400/80">
                  {drug.drug_class || drug.sub_category}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-stone-100 group-hover:text-indigo-200 transition-colors mt-0.5">
                {drug.name}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <div
                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${blockerBadge}`}
              >
                {drug.blocker_type}
              </div>
              <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-indigo-400/30 text-indigo-300 font-mono text-xs font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3 text-indigo-400" />
                <span>{drug.amount || "Formulary"}</span>
              </div>
            </div>
          </div>

          {/* Hemodynamic Target Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {drug.hemodynamic_impact?.systolic_bp_drop && (
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-[10px] font-mono tracking-wider uppercase">
                SBP ↓ {drug.hemodynamic_impact.systolic_bp_drop}
              </span>
            )}
            {drug.hemodynamic_impact?.heart_rate_effect && (
              <span className="px-2.5 py-0.5 rounded-md bg-violet-950/40 border border-violet-500/30 text-violet-200 text-[10px] font-mono tracking-wider uppercase">
                HR: {drug.hemodynamic_impact.heart_rate_effect}
              </span>
            )}
            {drug.hemodynamic_impact?.systemic_vascular_resistance && (
              <span className="px-2.5 py-0.5 rounded-md bg-blue-950/40 border border-blue-500/30 text-blue-200 text-[10px] font-mono tracking-wider uppercase">
                SVR: {drug.hemodynamic_impact.systemic_vascular_resistance}
              </span>
            )}
            {drug.hemodynamic_impact?.renal_protective && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-[10px] font-mono tracking-wider uppercase">
                Renal Protective
              </span>
            )}
          </div>

          {/* Manufacturer / Batch */}
          {drug.company_name && (
            <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
              <Building2 className="w-3.5 h-3.5 text-indigo-400/70" />
              <span>Hemodynamic Batch:</span>
              <span className="text-stone-200 font-medium">
                {drug.company_name}
              </span>
            </div>
          )}

          {/* Primary Indication */}
          <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              <span>Cardiovascular & BP Indications:</span>
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {drug.main_cause}
            </p>
          </div>
        </div>

        {/* Read Hemodynamic Protocol Button */}
        <div className="pt-6 mt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-indigo-600/30 border border-indigo-400/40 text-indigo-200 hover:text-stone-950 hover:bg-indigo-400 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Hemodynamic Protocol & Titration</span>
          </button>
        </div>
      </div>

      {/* Modal View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d10] border border-indigo-400/30 p-6 md:p-8 text-stone-200 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                    {drug.drug_class || drug.sub_category}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs font-mono text-stone-400">
                    {drug.blocker_type}
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-indigo-100 mt-1">
                  {drug.name}
                </h2>
                <p className="text-xs text-stone-400 font-mono mt-0.5">
                  Brands / Synonyms:{" "}
                  {Array.isArray(drug.generic_names)
                    ? drug.generic_names.join(", ")
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

            {/* Hemodynamic Profile Grid */}
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 uppercase">
                <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                Hemodynamic Parameters & Vascular Tone
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    SBP Drop
                  </span>
                  <span className="text-sm font-semibold text-indigo-300">
                    {drug.hemodynamic_impact?.systolic_bp_drop || "Significant"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Heart Rate
                  </span>
                  <span className="text-sm font-semibold text-violet-300">
                    {drug.hemodynamic_impact?.heart_rate_effect || "Neutral"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Vascular Resistance
                  </span>
                  <span className="text-sm font-semibold text-blue-300">
                    {drug.hemodynamic_impact?.systemic_vascular_resistance ||
                      "Decreased"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Renal Protection
                  </span>
                  <span className="text-sm font-semibold text-emerald-300">
                    {drug.hemodynamic_impact?.renal_protective
                      ? "Yes (Anti-proteinuric)"
                      : "Neutral"}
                  </span>
                </div>
              </div>
            </div>

            {/* Routes & Timing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-300 uppercase">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Routes of Administration
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {routes.map((r, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-100 text-xs font-mono font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Administration Timing & Dosing
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {drug.infusion_rate_and_timing ||
                    "Standard once-daily oral dosing protocol applies."}
                </p>
              </div>
            </div>

            {/* Formulation & Chemistry */}
            {drug.reconstitution_and_dilution && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-indigo-400" />
                  Formulation, Metabolism & Pharmacokinetics
                </h4>
                <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
                  {drug.reconstitution_and_dilution}
                </p>
              </div>
            )}

            {/* Cellular Mechanism */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Vascular Receptor Blockade & Molecular Mechanism
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {drug.main_action}
              </p>
            </div>

            {/* Clinical Suitability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h5 className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px]">
                  Clinical Eligibility & Indications
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {drug.patient_suitability.who_can_use_it.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <h5 className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">
                  Cardiovascular Contraindications
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {drug.patient_suitability.who_should_avoid_or_limit_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* Cautions & Toxicities */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <h5 className="font-mono text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Hypotension, Bradycardia & Critical Drug Interactions
              </h5>
              <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                {drug.important_cautions.map((caution, i) => (
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
