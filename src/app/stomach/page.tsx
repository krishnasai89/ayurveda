"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  Flame,
  Search,
  Layers,
  Sparkles,
  MapPin,
  Shield,
  Activity,
} from "lucide-react";
import stomachData from "@/data/stomach.json";
import StomachCard, { StomachDrugItem } from "@/components/stomach/StomachCard";

export default function StomachPage() {
  const medications: StomachDrugItem[] = useMemo(() => {
    if (!Array.isArray(stomachData)) return [];
    return stomachData as unknown as StomachDrugItem[];
  }, []);

  const [selectedSymptom, setSelectedSymptom] = useState<string>("All");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedLayer, setSelectedLayer] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const symptomTabs = [
    "All",
    "Antacids & Acid Suppression",
    "Stomach Pain & Cramping",
    "Trapped Gas & Bloating",
    "Nausea & Delayed Gastric Emptying",
    "Diarrhea & Hyper-Motility",
    "Constipation & Bowel Prep",
    "Intestinal Parasites",
    "Microbiome & Barrier Repair",
  ];

  const anatomicalRegions = [
    "All",
    "Cardia",
    "Fundus",
    "Corpus (Body)",
    "Pylorus / Antrum",
    "Small Intestine",
    "Large Intestine / Colon",
  ];

  const histologicalLayers = [
    "All",
    "Mucosa & Epithelium",
    "Submucosa & Enteric Plexus",
    "Muscularis Externa (Motility)",
  ];

  const filteredMedications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return medications.filter((drug: StomachDrugItem) => {
      if (!drug) return false;

      const matchesSymptom =
        selectedSymptom === "All" ||
        drug.primary_gi_symptom === selectedSymptom;

      const matchesRegion =
        selectedRegion === "All" ||
        drug.anatomical_region === selectedRegion ||
        drug.anatomical_region === "Pan-GI Tract";

      const matchesLayer =
        selectedLayer === "All" || drug.histological_layer === selectedLayer;

      if (!matchesSymptom || !matchesRegion || !matchesLayer) return false;
      if (query === "") return true;

      const nameMatch = drug.name?.toLowerCase().includes(query) ?? false;
      const classMatch =
        drug.drug_class?.toLowerCase().includes(query) ?? false;
      const subCatMatch =
        drug.sub_category?.toLowerCase().includes(query) ?? false;
      const causeMatch =
        drug.main_cause?.toLowerCase().includes(query) ?? false;
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
        actionMatch ||
        genericMatch
      );
    });
  }, [
    medications,
    selectedSymptom,
    selectedRegion,
    selectedLayer,
    searchQuery,
  ]);

  return (
    <main className="min-h-screen bg-[#07090b] text-stone-100 overflow-x-hidden selection:bg-amber-400 selection:text-stone-950">
      <Navbar />

      <section className="relative pt-36 pb-12 px-6 md:px-16 border-b border-amber-500/10 bg-gradient-to-b from-amber-950/20 via-transparent to-transparent">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs tracking-[0.25em] uppercase font-sans">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Gastrointestinal, Peptic & Colonic Therapeutics
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-amber-100 to-amber-400">
            Stomach & Gut Formulary
          </h1>

          <p className="font-sans text-stone-300/80 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            Receptor pharmacology, mucosal barrier protectants,
            potassium-competitive acid blockers (PCABs), enteric antispasmodics,
            and microbiota immunoglobulins across stomach anatomical zones and
            tissue layers.
          </p>

          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search symptom, region, or molecule (e.g. Vonoprazan, Mebeverine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-amber-400/20 text-xs md:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/60 transition"
              />
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-amber-400/70">
              Clinical Symptom & Functional Targets:
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {symptomTabs.map((sym: string) => {
                const isActive = selectedSymptom === sym;
                return (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => setSelectedSymptom(sym)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-amber-400 text-stone-950 font-semibold shadow-md shadow-amber-400/20 scale-105"
                        : "bg-white/[0.03] text-stone-400 hover:text-stone-200 border border-white/10 hover:border-amber-400/30"
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span className="text-stone-500 text-[11px] shrink-0">
                Anatomy:
              </span>
              {anatomicalRegions.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition ${
                    selectedRegion === reg
                      ? "bg-amber-500/20 text-amber-200 border border-amber-400/40"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
              <Shield className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span className="text-stone-500 text-[11px] shrink-0">
                Histological Layer:
              </span>
              {histologicalLayers.map((lay) => (
                <button
                  key={lay}
                  type="button"
                  onClick={() => setSelectedLayer(lay)}
                  className={`px-2.5 py-1 rounded-md text-[11px] whitespace-nowrap transition ${
                    selectedLayer === lay
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/40"
                      : "text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {lay}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        {filteredMedications.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-sans text-sm">
            No gastrointestinal therapeutics found matching your selected
            criteria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedications.map((drug, index) => (
              <StomachCard key={drug.id || drug.name || index} drug={drug} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
