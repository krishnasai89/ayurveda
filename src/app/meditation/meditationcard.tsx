"use client";

import React, { useState } from "react";
import {
  Pill,
  Building2,
  Flame,
  Tag,
  X,
  AlertTriangle,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

export interface Medicine {
  id: string;
  name: string;
  generic_names: string[];
  company_name: string;
  amount: string;
  main_cause: string;
  drug_class: string;
  main_action: string;
  diseases_and_conditions_it_may_be_used_for: string[];
  how_patients_describe_symptoms: string[];
  patient_suitability: {
    who_can_use_it: string[];
    who_should_avoid_or_limit_it: string[];
  };
  common_side_effects: string[];
  important_cautions: string[];
}

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The Medicine Card */}
      <div className="flex flex-col justify-between p-6 rounded-3xl bg-white/[0.03] border border-amber-400/20 backdrop-blur-xl hover:border-amber-400/50 hover:bg-white/[0.05] transition-all duration-300 shadow-xl group">
        <div className="space-y-4">
          {/* Top Row: Name and Price Badge */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] tracking-widest font-mono uppercase text-amber-400/80">
                {medicine.drug_class}
              </span>
              <h3 className="font-serif text-2xl text-stone-100 group-hover:text-amber-200 transition-colors mt-0.5">
                {medicine.name}
              </h3>
            </div>

            {/* Price Tag */}
            <div className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-mono text-sm font-semibold flex items-center gap-1 shrink-0">
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              <span>{medicine.amount}</span>
            </div>
          </div>

          {/* Company Name */}
          <div className="flex items-center gap-2 text-xs text-stone-400 font-sans">
            <Building2 className="w-3.5 h-3.5 text-amber-400/70" />
            <span>Mfg / Batch:</span>
            <span className="text-stone-200 font-medium">
              {medicine.company_name}
            </span>
          </div>

          {/* Main Cause */}
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Main Indication:</span>
            </div>
            <p className="text-xs text-stone-300 font-sans line-clamp-2 leading-relaxed">
              {medicine.main_cause}
            </p>
          </div>
        </div>

        {/* Read More Button */}
        <div className="pt-6 mt-4 border-t border-white/10">
          <button
            onClick={() => setIsOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/30 border border-amber-400/40 text-amber-200 hover:text-stone-950 hover:bg-amber-400 font-sans font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Read Complete Details</span>
          </button>
        </div>
      </div>

      {/* Read More Detailed Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0e0d0b] border border-amber-400/30 p-6 md:p-8 text-stone-200 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                    {medicine.drug_class}
                  </span>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs font-mono text-stone-400">
                    Mfg: {medicine.company_name}
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-amber-100 mt-1">
                  {medicine.name}
                </h2>
                <p className="text-xs text-stone-400 font-mono">
                  Also known as: {medicine.generic_names.join(", ")}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-stone-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Price & Primary Cause */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div>
                <div className="text-xs text-amber-400 font-sans uppercase">
                  Primary Indication
                </div>
                <div className="text-sm font-medium text-stone-100">
                  {medicine.main_cause}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-stone-400 font-sans uppercase">
                  Cost
                </div>
                <div className="text-lg font-mono font-bold text-amber-300">
                  {medicine.amount}
                </div>
              </div>
            </div>

            {/* Mechanism of Action */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Mechanism of Action
              </h4>
              <p className="text-xs md:text-sm text-stone-300/90 leading-relaxed font-sans bg-white/[0.02] p-3.5 rounded-xl border border-white/5">
                {medicine.main_action}
              </p>
            </div>

            {/* How Patients Describe Symptoms */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-rose-400" />
                How Patients Describe This:
              </h4>
              <ul className="space-y-1.5">
                {medicine.how_patients_describe_symptoms.map((symptom, idx) => (
                  <li
                    key={idx}
                    className="text-xs italic text-stone-300 bg-white/[0.02] px-3 py-2 rounded-lg border-l-2 border-amber-400"
                  >
                    &ldquo;{symptom}&rdquo;
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitability Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
                <h5 className="font-semibold text-emerald-300 uppercase tracking-wider text-[11px]">
                  Who Can Use It
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {medicine.patient_suitability.who_can_use_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                <h5 className="font-semibold text-rose-300 uppercase tracking-wider text-[11px]">
                  Who Should Avoid It
                </h5>
                <ul className="space-y-1 list-disc list-inside text-stone-300">
                  {medicine.patient_suitability.who_should_avoid_or_limit_it.map(
                    (item, i) => (
                      <li key={i}>{item}</li>
                    ),
                  )}
                </ul>
              </div>
            </div>

            {/* Important Cautions */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-400/20 space-y-2">
              <h5 className="font-mono text-xs text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Critical Clinical Cautions
              </h5>
              <ul className="space-y-1 text-xs text-stone-300 list-disc list-inside">
                {medicine.important_cautions.map((caution, i) => (
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
