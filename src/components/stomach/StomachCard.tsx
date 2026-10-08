"use client";

import React, { useState } from "react";
import {
  X,
  Tag,
  Clock,
  Layers,
  Sparkles,
  Building2,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Flame,
} from "lucide-react";

export interface StomachDrugItem {
  id: string;
  name: string;
  generic_names: string[];
  category: string[] | string;
  sub_category?: string;
  company_name?: string;
  amount?: string;
  routes_of_administration: string[];
  anatomical_region:
    | "Cardia"
    | "Fundus"
    | "Corpus (Body)"
    | "Pylorus / Antrum"
    | "Small Intestine"
    | "Large Intestine / Colon"
    | "Pan-GI Tract"
    | string;
  histological_layer:
    | "Mucosa & Epithelium"
    | "Submucosa & Enteric Plexus"
    | "Muscularis Externa (Motility)"
    | "Serosa & Peritoneal"
    | string;
  primary_gi_symptom:
    | "Antacids & Acid Suppression"
    | "Stomach Pain & Cramping"
    | "Trapped Gas & Bloating"
    | "Nausea & Delayed Gastric Emptying"
    | "Diarrhea & Hyper-Motility"
    | "Constipation & Bowel Prep"
    | "Intestinal Parasites"
    | "Microbiome & Barrier Repair"
    | string;
  hemodynamic_or_secretory_impact?: {
    acid_secretion_reduction?: string;
    gastric_emptying_acceleration?: boolean;
    spasmolytic_tone_reduction?: string;
    mucosal_cytoprotection?: boolean;
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

interface StomachCardProps {
  drug: StomachDrugItem;
}

export default function StomachCard({ drug }: StomachCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const symptomBadge =
    {
      "Antacids & Acid Suppression":
        "bg-amber-500/15 border-amber-400/30 text-amber-300",
      "Stomach Pain & Cramping":
        "bg-rose-500/15 border-rose-400/30 text-rose-300",
      "Trapped Gas & Bloating": "bg-sky-500/15 border-sky-400/30 text-sky-300",
      "Nausea & Delayed Gastric Emptying":
        "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
      "Diarrhea & Hyper-Motility":
        "bg-orange-500/15 border-orange-400/30 text-orange-300",
      "Constipation & Bowel Prep":
        "bg-purple-500/15 border-purple-400/30 text-purple-300",
      "Microbiome & Barrier Repair":
        "bg-teal-500/15 border-teal-400/30 text-teal-300",
      "Intestinal Parasites":
        "bg-yellow-500/15 border-yellow-400/30 text-yellow-300",
    }[drug.primary_gi_symptom] ||
    "bg-amber-500/15 border-amber-400/30 text-amber-300";

  return (
    <>
      <div className="flex flex-col justify-between p-6 rounded-3xl bg-white/[0.03] border border-amber-500/20 backdrop-blur-xl hover:border-amber-400/50 hover:bg-white/[0.05] transition-all duration-300 shadow-xl group">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] tracking-widest font-mono uppercase text-amber-400/80">
                {drug.drug_class || drug.sub_category}
              </span>
              <h3 className="font-serif text-2xl text-stone-100 group-hover:text-amber-200 transition-colors mt-0.5">
                {drug.name}
              </h3>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span
                className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold ${symptomBadge}`}
              >
                {drug.primary_gi_symptom}
              </span>
              <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-amber-400/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3 text-amber-400" />
                <span>{drug.amount || "Formulary"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-300 text-[10px] font-mono tracking-wider uppercase">
              Locus: {drug.anatomical_region}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[10px] font-mono tracking-wider uppercase">
              Layer: {drug.histological_layer}
            </span>
            {drug.hemodynamic_or_secretory_impact?.acid_secretion_reduction && (
              <span className="px-2.5 py-0.5 rounded-md bg-rose-950/40 border border-rose-500/30 text-rose-200 text-[10px] font-mono tracking-wider uppercase">
                Acid ↓{" "}
                {drug.hemodynamic_or_secretory_impact.acid_secretion_reduction}
              </span>
            )}
            {drug.hemodynamic_or_secretory_impact
              ?.spasmolytic_tone_reduction && (
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-[10px] font-mono tracking-wider uppercase">
                Tone:{" "}
                {
                  drug.hemodynamic_or_secretory_impact
                    .spasmolytic_tone_reduction
                }
              </span>
            )}
          </div>

          {drug.company_name && (
            <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
              <Building2 className="w-3.5 h-3.5 text-amber-400/70" />
              <span>Gastro Batch:</span>
              <span className="text-stone-200 font-medium">
                {drug.company_name}
              </span>
            </div>
          )}

          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>Primary Gastrointestinal Indication:</span>
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {drug.main_cause}
            </p>
          </div>
        </div>

        <div className="pt-6 mt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-400/40 text-amber-200 hover:text-stone-950 hover:bg-amber-400 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Cellular Protocol & Gut Pharmacology</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090d10] border border-amber-400/30 p-6 md:p-8 text-stone-200 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                    {drug.drug_class || drug.sub_category}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs font-mono text-stone-400">
                    {drug.primary_gi_symptom}
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-amber-100 mt-1">
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

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 uppercase">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                Anatomical & Histological Target Coordinates
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Anatomical Region
                  </span>
                  <span className="text-xs font-semibold text-amber-300">
                    {drug.anatomical_region}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Histological Layer
                  </span>
                  <span className="text-xs font-semibold text-emerald-300">
                    {drug.histological_layer}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Acid Secretion
                  </span>
                  <span className="text-xs font-semibold text-rose-300">
                    {drug.hemodynamic_or_secretory_impact
                      ?.acid_secretion_reduction || "Neutral"}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-stone-400 block">
                    Mucosal Barrier
                  </span>
                  <span className="text-xs font-semibold text-sky-300">
                    {drug.hemodynamic_or_secretory_impact
                      ?.mucosal_cytoprotection
                      ? "Protective Barrier"
                      : "Systemic / Motility"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 uppercase">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  Routes & Pharmaceutical Form
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {drug.routes_of_administration.map((r, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-100 text-xs font-mono font-medium"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400 uppercase">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Meal Timing & Dosing Protocol
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {drug.infusion_rate_and_timing ||
                    "Standard oral post-prandial or pre-prandial administration protocol applies."}
                </p>
              </div>
            </div>

            {drug.reconstitution_and_dilution && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Formulation, Coating & Storage Mandates
                </h4>
                <p className="text-xs md:text-sm text-stone-300 font-sans leading-relaxed">
                  {drug.reconstitution_and_dilution}
                </p>
              </div>
            )}

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Cellular Target, Receptor Bioactivation & Action
              </h4>
              <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {drug.main_action}
              </p>
            </div>

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
                  Clinical Contraindications & Risks
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

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 space-y-2">
              <h5 className="font-mono text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Critical Toxicities, Motility Cautions & Black Box Warnings
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
