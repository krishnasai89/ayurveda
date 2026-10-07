"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  ShieldAlert,
  Search,
  Activity,
  Dna,
  Zap,
  Filter,
  Sparkles,
} from "lucide-react";
import antibioticsData from "@/data/antibiotics.json";
import AntibioticCard, {
  AntibioticItem,
} from "@/components/antibiotics/AntibioticCard";

export default function AntibioticsPage() {
  const antibiotics = useMemo(() => {
    if (!Array.isArray(antibioticsData)) return [];
    return antibioticsData as unknown as AntibioticItem[];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedAWaRe, setSelectedAWaRe] = useState<string>("All");
  const [selectedSpectrumFilter, setSelectedSpectrumFilter] =
    useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Unique drug categories/classes
  const categories = useMemo(() => {
    const tags = antibiotics.flatMap((abx) =>
      Array.isArray(abx.category) ? abx.category : [abx.category],
    );
    return ["All", ...Array.from(new Set(tags.filter(Boolean)))];
  }, [antibiotics]);

  // WHO AWaRe Classifications
  const awareFilters = ["All", "Access", "Watch", "Reserve"];

  // Key resistance/spectrum filters
  const spectrumFilters = [
    "All",
    "MRSA",
    "Pseudomonas",
    "Anaerobes",
    "Atypicals",
  ];

  // Filtering engine
  const filteredAntibiotics = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return antibiotics.filter((abx) => {
      if (!abx) return false;

      // Category match
      const abxCategories = Array.isArray(abx.category)
        ? abx.category
        : [abx.category];
      const matchesCategory =
        selectedCategory === "All" || abxCategories.includes(selectedCategory);

      // WHO AWaRe match
      const matchesAWaRe =
        selectedAWaRe === "All" ||
        abx.who_aware_classification === selectedAWaRe;

      // Resistance Spectrum match
      let matchesSpectrum = true;
      if (selectedSpectrumFilter === "MRSA") {
        matchesSpectrum = Boolean(abx.antimicrobial_spectrum?.mrsa_active);
      } else if (selectedSpectrumFilter === "Pseudomonas") {
        matchesSpectrum = Boolean(abx.antimicrobial_spectrum?.pseudomonal);
      } else if (selectedSpectrumFilter === "Anaerobes") {
        matchesSpectrum = Boolean(abx.antimicrobial_spectrum?.anaerobic);
      } else if (selectedSpectrumFilter === "Atypicals") {
        matchesSpectrum = Boolean(abx.antimicrobial_spectrum?.atypical);
      }

      if (!matchesCategory || !matchesAWaRe || !matchesSpectrum) return false;
      if (query === "") return true;

      // Text search
      const nameMatch = abx.name?.toLowerCase().includes(query) ?? false;
      const classMatch = abx.drug_class?.toLowerCase().includes(query) ?? false;
      const subCatMatch =
        abx.sub_category?.toLowerCase().includes(query) ?? false;
      const causeMatch = abx.main_cause?.toLowerCase().includes(query) ?? false;
      const companyMatch =
        abx.company_name?.toLowerCase().includes(query) ?? false;
      const pkPdMatch = abx.pk_pd_index?.toLowerCase().includes(query) ?? false;
      const genericMatch = Array.isArray(abx.generic_names)
        ? abx.generic_names.some((g) => g?.toLowerCase().includes(query))
        : false;

      return (
        nameMatch ||
        classMatch ||
        subCatMatch ||
        causeMatch ||
        companyMatch ||
        pkPdMatch ||
        genericMatch
      );
    });
  }, [
    antibiotics,
    selectedCategory,
    selectedAWaRe,
    selectedSpectrumFilter,
    searchQuery,
  ]);

  return (
    <main className="min-h-screen bg-[#07090b] text-stone-100 overflow-x-hidden selection:bg-emerald-300 selection:text-stone-950">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-6 md:px-16 border-b border-emerald-500/10 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs tracking-[0.25em] uppercase font-sans">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            Antimicrobial Stewardship & Critical Infectious Disease
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-emerald-100 to-emerald-400">
            Antibiotics Formulary
          </h1>

          <p className="font-sans text-stone-300/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Pathogen coverage profiles, WHO AWaRe stewardship tiers, PK/PD
            targets, and intravenous infusion protocols for acute hospital
            infection care.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search antibiotic, bug, or class (e.g. Meropenem, MRSA, ESBL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-emerald-400/20 text-xs md:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-emerald-400/60 transition"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-400 text-stone-950 font-semibold shadow-md shadow-emerald-400/20 scale-105"
                      : "bg-white/[0.03] text-stone-400 hover:text-stone-200 border border-white/10 hover:border-emerald-400/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Dual Multi-Filter Row: WHO AWaRe & Target Pathogen Resistance */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-3 text-xs font-mono">
            {/* WHO AWaRe Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-[11px]">WHO AWaRe:</span>
              {awareFilters.map((aware) => {
                const isSelected = selectedAWaRe === aware;
                return (
                  <button
                    key={aware}
                    type="button"
                    onClick={() => setSelectedAWaRe(aware)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                      isSelected
                        ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {aware}
                  </button>
                );
              })}
            </div>

            {/* Pathogen Resistance Spectrum Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 text-[11px]">Coverage:</span>
              {spectrumFilters.map((spec) => {
                const isSelected = selectedSpectrumFilter === spec;
                return (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSpectrumFilter(spec)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                      isSelected
                        ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
                        : "text-stone-400 hover:text-stone-200"
                    }`}
                  >
                    {spec}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        {filteredAntibiotics.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-sans text-sm">
            No antibiotics found matching your selected antimicrobial criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAntibiotics.map((abx, index) => (
              <AntibioticCard
                key={abx.id || abx.name || index}
                antibiotic={abx}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
