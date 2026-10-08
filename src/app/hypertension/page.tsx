"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  Heart,
  Search,
  Activity,
  Gauge,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import bpData from "@/data/hypertension.json";
import BpCard, { BpItem } from "@/components/hypertension/BpCard";

export default function HypertensionPage() {
  const medications: BpItem[] = useMemo(() => {
    if (!Array.isArray(bpData)) return [];
    return bpData as unknown as BpItem[];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBlocker, setSelectedBlocker] = useState<string>("All");
  const [selectedTarget, setSelectedTarget] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Unique categories
  const categories: string[] = useMemo(() => {
    const allTags: string[] = [];
    medications.forEach((drug) => {
      if (!drug?.category) return;
      if (Array.isArray(drug.category)) {
        drug.category.forEach((c) => {
          if (typeof c === "string" && c.trim()) allTags.push(c.trim());
        });
      } else if (typeof drug.category === "string" && drug.category.trim()) {
        allTags.push(drug.category.trim());
      }
    });
    return ["All", ...Array.from(new Set(allTags))];
  }, [medications]);

  // Antihypertensive Blocker Types
  const blockerFilters = [
    "All",
    "Beta Blocker",
    "Calcium Channel Blocker (CCB)",
    "Angiotensin Receptor Blocker (ARB)",
    "ACE Inhibitor",
    "Alpha Blocker",
  ];

  // Hemodynamic Mechanism Targets
  const targetFilters = [
    "All",
    "Vasodilation (SVR Drop)",
    "Heart Rate / Inotropy Drop",
    "Renal Protective",
  ];

  // Filtering engine
  const filteredMedications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return medications.filter((drug: BpItem) => {
      if (!drug) return false;

      // 1. Category extraction & matching
      let drugCategories: string[] = [];
      if (Array.isArray(drug.category)) {
        drugCategories = drug.category.filter(
          (c): c is string => typeof c === "string" && Boolean(c),
        );
      } else if (typeof drug.category === "string" && Boolean(drug.category)) {
        drugCategories = [drug.category];
      }

      const matchesCategory =
        selectedCategory === "All" || drugCategories.includes(selectedCategory);

      // 2. Blocker Type match
      const matchesBlocker =
        selectedBlocker === "All" || drug.blocker_type === selectedBlocker;

      // 3. Hemodynamic Target match
      let matchesTarget = true;
      if (selectedTarget === "Vasodilation (SVR Drop)") {
        matchesTarget =
          drug.hemodynamic_impact?.systemic_vascular_resistance === "Decreased";
      } else if (selectedTarget === "Heart Rate / Inotropy Drop") {
        matchesTarget =
          drug.hemodynamic_impact?.heart_rate_effect === "Decreased";
      } else if (selectedTarget === "Renal Protective") {
        matchesTarget = Boolean(drug.hemodynamic_impact?.renal_protective);
      }

      if (!matchesCategory || !matchesBlocker || !matchesTarget) return false;
      if (query === "") return true;

      // 4. Safe text search
      const nameMatch = drug.name?.toLowerCase().includes(query) ?? false;
      const classMatch =
        drug.drug_class?.toLowerCase().includes(query) ?? false;
      const subCatMatch =
        drug.sub_category?.toLowerCase().includes(query) ?? false;
      const causeMatch =
        drug.main_cause?.toLowerCase().includes(query) ?? false;
      const companyMatch =
        drug.company_name?.toLowerCase().includes(query) ?? false;
      const actionMatch =
        drug.main_action?.toLowerCase().includes(query) ?? false;
      const genericMatch =
        Array.isArray(drug.generic_names) &&
        drug.generic_names.some(
          (g) => typeof g === "string" && g.toLowerCase().includes(query),
        );

      return (
        nameMatch ||
        classMatch ||
        subCatMatch ||
        causeMatch ||
        companyMatch ||
        actionMatch ||
        genericMatch
      );
    });
  }, [
    medications,
    selectedCategory,
    selectedBlocker,
    selectedTarget,
    searchQuery,
  ]);

  return (
    <main className="min-h-screen bg-[#07090b] text-stone-100 overflow-x-hidden selection:bg-indigo-400 selection:text-stone-950">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-6 md:px-16 border-b border-indigo-500/10 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs tracking-[0.25em] uppercase font-sans">
            <Gauge className="w-3.5 h-3.5 text-indigo-400" />
            Hypertension & Cardiovascular Hemodynamics
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-indigo-100 to-indigo-400">
            Blood Pressure Formulary
          </h1>

          <p className="font-sans text-stone-300/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Receptor blockers, vasodilators, calcium channel antagonists, and
            RAAS inhibitors for essential hypertension, ischemic heart disease,
            and hypertensive emergencies.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search blocker, generic, or indication (e.g. Telmisartan, Amlodipine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-indigo-400/20 text-xs md:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-indigo-400/60 transition"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat: string) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-500 text-stone-950 font-semibold shadow-md shadow-indigo-500/20 scale-105"
                      : "bg-white/[0.03] text-stone-400 hover:text-stone-200 border border-white/10 hover:border-indigo-400/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dual Multi-Filter Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-3 text-xs font-mono">
            {/* Blocker Type Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-[11px]">Blocker Class:</span>
              {blockerFilters.map((blk) => {
                const isSelected = selectedBlocker === blk;
                return (
                  <button
                    key={blk}
                    type="button"
                    onClick={() => setSelectedBlocker(blk)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                      isSelected
                        ? "bg-indigo-500/20 text-indigo-200 border border-indigo-400/40"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {blk.includes("(") ? blk.split("(")[0].trim() : blk}
                  </button>
                );
              })}
            </div>

            {/* Target Hemodynamic Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-[11px]">Action:</span>
              {targetFilters.map((tgt) => {
                const isSelected = selectedTarget === tgt;
                return (
                  <button
                    key={tgt}
                    type="button"
                    onClick={() => setSelectedTarget(tgt)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                      isSelected
                        ? "bg-indigo-500/20 text-indigo-200 border border-indigo-400/40"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {tgt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        {filteredMedications.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-sans text-sm">
            No antihypertensive therapeutics found matching your selected
            criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedications.map((drug, index) => (
              <BpCard key={drug.id || drug.name || index} drug={drug} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
