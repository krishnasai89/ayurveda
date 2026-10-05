"use client";

import React, { useState } from "react";
import {
  Syringe,
  Building2,
  Tag,
  X,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Droplets,
  Activity,
  Workflow,
} from "lucide-react";

export interface InjectionItem {
  id: string;
  name: string;
  generic_names: string[];
  category: string[] | string;
  sub_category?: string;
  company_name?: string;
  amount?: string;
  routes_of_administration: string[];
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

interface InjectionCardProps {
  injection: InjectionItem;
}

export default function InjectionCard({ injection }: InjectionCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Primary Card */}
      <div className="flex flex-col justify-between p-6 rounded-3xl bg-white/[0.03] border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-400/50 hover:bg-white/[0.05] transition-all duration-300 shadow-xl group">
        <div className="space-y-4">
          {/* Top Row: Class & Price */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] tracking-widest font-mono uppercase text-cyan-400/80">
                {injection.drug_class}
              </span>
              <h3 className="font-serif text-2xl text-stone-100 group-hover:text-cyan-200 transition-colors mt-0.5">
                {injection.name}
              </h3>
            </div>

            <div className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-semibold flex items-center gap-1 shrink-0">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>{injection.amount || "Institutional"}</span>
            </div>
          </div>

          {/* Delivery Routes Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {injection.routes_of_administration.map((route, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-[10px] font-mono tracking-wider uppercase"
              >
                {route}
              </span>
            ))}
          </div>

          {/* Manufacturer / Batch */}
          {injection.company_name && (
            <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
              <Building2 className="w-3.5 h-3.5 text-cyan-400/70" />
              <span>Parenteral Batch:</span>
              <span className="text-stone-200 font-medium">
                {injection.company_name}
              </span>
            </div>
          )}

          {/* Primary Indication */}
          <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clinical Indication:</span>
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {injection.main_cause}
            </p>
          </div>
        </div>

        {/* Read Parenteral Protocol Button */}
        <div className="pt-6 mt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyan-600/30 border border-cyan-400/40 text-cyan-200 hover:text-stone-950 hover:bg-cyan-400 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>Parenteral Protocol & Dosage</span>
          </button>
        </div>
      </div>

      {/* Modal View */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d10] border border-cyan-400/30 p-6 md:p-8 text-stone-200 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    {injection.drug_class}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs font-mono text-stone-400">
                    Parenteral Monograph
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-cyan-100 mt-1">
                  {injection.name}
                </h2>
                <p className="text-xs text-stone-400 font-mono">
                  Synonyms / Brands: {injection.generic_names.join(", ")}
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

            {/* Parenteral Routes & Rate Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 uppercase">
                  <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                  Routes of Administration
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {injection.routes_of_administration.map((r, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-100 text-xs font-mono font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Infusion Rate & Timing
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {injection.infusion_rate_and_timing ||
                    "Standard slow parenteral administration protocol applies."}
                </p>
              </div>
            </div>

            {/* Dilution & Compatibility */}
            {injection.reconstitution_and_dilution && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  Reconstitution, Dilution & Compatibility
                </h4>
                <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
                  {injection.reconstitution_and_dilution}
                </p>
              </div>
            )}

            {/* Mechanism */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Cellular Target & Pharmacodynamics
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {injection.main_action}
              </p>
            </div>

            {/* Suitability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h5 className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px]">
                  Clinical Eligibility
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {injection.patient_suitability.who_can_use_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <h5 className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">
                  Parenteral Contraindications
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {injection.patient_suitability.who_should_avoid_or_limit_it.map(
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
                Sterile Precautions & Extravasation Alerts
              </h5>
              <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                {injection.important_cautions.map((caution, i) => (
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
