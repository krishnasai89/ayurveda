"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  HeartPulse,
  Search,
  Activity,
  ShieldCheck,
  TrendingDown,
  Layers,
  Sparkles,
} from "lucide-react";
import cholesterolData from "@/data/cholesterol.json";
import CholesterolCard, {
  CholesterolItem,
} from "@/components/cholesterol/CholesterolCard";

export default function CholesterolPage() {
  const therapeutics: CholesterolItem[] = useMemo(() => {
    if (!Array.isArray(cholesterolData)) return [];
    return cholesterolData as unknown as CholesterolItem[];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("All");
  const [selectedLipidTarget, setSelectedLipidTarget] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Unique drug classes (Statins, Fibrates, PCSK9 Inhibitors, etc.)
  const categories: string[] = useMemo(() => {
    const allTags: string[] = [];
    therapeutics.forEach((drug) => {
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
  }, [therapeutics]);

  // Statin Intensity / CV Risk Tier Filters
  const intensityFilters = [
    "All",
    "High-Intensity (≥50% LDL Drop)",
    "Moderate-Intensity (30–49% LDL Drop)",
    "Low-Intensity (<30% LDL Drop)",
    "Add-on Non-Statin",
  ];

  // Primary Lipid Targets
  const targetFilters = [
    "All",
    "LDL-C Reduction",
    "Triglyceride Lowering",
    "HDL-C Elevation",
    "Lp(a) Modulation",
  ];

  // Filtering engine
  const filteredTherapeutics = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return therapeutics.filter((drug: CholesterolItem) => {
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

      // 2. Intensity match
      const matchesIntensity =
        selectedIntensity === "All" ||
        drug.intensity_tier === selectedIntensity;

      // 3. Target Lipid match
      let matchesTarget = true;
      if (selectedLipidTarget === "LDL-C Reduction") {
        matchesTarget = Boolean(drug.lipid_profile_impact?.ldl_reduction);
      } else if (selectedLipidTarget === "Triglyceride Lowering") {
        matchesTarget = Boolean(drug.lipid_profile_impact?.tg_reduction);
      } else if (selectedLipidTarget === "HDL-C Elevation") {
        matchesTarget = Boolean(drug.lipid_profile_impact?.hdl_elevation);
      } else if (selectedLipidTarget === "Lp(a) Modulation") {
        matchesTarget = Boolean(drug.lipid_profile_impact?.lpa_reduction);
      }

      if (!matchesCategory || !matchesIntensity || !matchesTarget) return false;
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
    therapeutics,
    selectedCategory,
    selectedIntensity,
    selectedLipidTarget,
    searchQuery,
  ]);

  return (
    <main className="min-h-screen bg-[#07090b] text-stone-100 overflow-x-hidden selection:bg-rose-400 selection:text-stone-950">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-6 md:px-16 border-b border-rose-500/10 bg-gradient-to-b from-rose-950/20 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs tracking-[0.25em] uppercase font-sans">
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            Lipidology, Atherosclerosis & Preventive Cardiology
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-rose-100 to-rose-400">
            Cholesterol & Lipid Formulary
          </h1>

          <p className="font-sans text-stone-300/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Statins, cholesterol absorption inhibitors, PCSK9 targeted
            therapies, and fibrates for acute coronary syndrome, primary
            prevention, and dyslipidemia.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search statin, ezetimibe, or indication (e.g. Atorvastatin, ASCVD)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-rose-400/20 text-xs md:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-rose-400/60 transition"
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
                      ? "bg-rose-500 text-stone-950 font-semibold shadow-md shadow-rose-500/20 scale-105"
                      : "bg-white/[0.03] text-stone-400 hover:text-stone-200 border border-white/10 hover:border-rose-400/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dual Multi-Filter Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-3 text-xs font-mono">
            {/* Statin Intensity Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-[11px]">Intensity:</span>
              {intensityFilters.map((lvl) => {
                const isSelected = selectedIntensity === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedIntensity(lvl)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                      isSelected
                        ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {lvl.includes("(") ? lvl.split("(")[0].trim() : lvl}
                  </button>
                );
              })}
            </div>

            {/* Target Lipid Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-[11px]">
                Primary Target:
              </span>
              {targetFilters.map((tgt) => {
                const isSelected = selectedLipidTarget === tgt;
                return (
                  <button
                    key={tgt}
                    type="button"
                    onClick={() => setSelectedLipidTarget(tgt)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                      isSelected
                        ? "bg-rose-500/20 text-rose-200 border border-rose-400/40"
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
        {filteredTherapeutics.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-sans text-sm">
            No lipid-lowering therapeutics found matching your selected
            criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTherapeutics.map((drug, index) => (
              <CholesterolCard
                key={drug.id || drug.name || index}
                cholesterolItem={drug}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
