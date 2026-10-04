"use client";

import React, { useMemo, useState } from "react";
import {
  Pill,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Activity,
  HeartPulse,
} from "lucide-react";
import MedicineCard, { medicine } from "./meditationcard";
import Navbar from "@/components/navigation/Navbar";
import meditationdata from "@/data/meditationdata.json";

/**
 * Patient Suitability criteria
 */
export interface PatientSuitability {
  who_can_use_it: string[];
  who_should_avoid_or_limit_it: string[];
}

/**
 * High-fidelity Clinical Formulary Record Interface
 * Matches all modern pharmacological entries in medical.json / meditationdata.json
 */
export interface MedicineItem {
  id: string;
  name: string;
  generic_names: string[];
  category: string[] | string;
  sub_category?: string;
  company_name?: string;
  amount?: string;
  main_cause: string;
  why_this_disease_happens: string;
  how_this_medicine_fights_it: string;
  drug_class: string;
  main_action: string;
  diseases_and_conditions_it_may_be_used_for: string[];
  how_patients_describe_symptoms?: string[];
  patient_suitability: PatientSuitability;
  common_side_effects: string[];
  important_cautions: string[];
}

// Backwards-compatibility alias
export type Medicine = MedicineItem;

/**
 * Vedic Botanical Alternative Interface
 */
export interface AyurvedicAlternative {
  sanskrit: string;
  botanical: string;
  action: string;
  advantage: string;
}

/**
 * Allopathic vs. Vedic Botanical Comparative Registry Record
 */
export interface ModernComparativeMedicine {
  id: string;
  name: string;
  chemicalClass: string;
  commonUses: string;
  mechanism: string;
  sideEffects: string[];
  ayurvedicAlternative: AyurvedicAlternative;
}

const COMPARATIVE_REGISTRY: ModernComparativeMedicine[] = [
  {
    id: "paracetamol",
    name: "Paracetamol (Acetaminophen)",
    chemicalClass: "Analgesic & Antipyretic",
    commonUses: "Acute fevers, headaches, mild body pain",
    mechanism:
      "Central COX inhibition and indirect modulation of cannabinoid receptors.",
    sideEffects: [
      "Hepatic toxicity in overdose",
      "Depletion of cellular glutathione",
    ],
    ayurvedicAlternative: {
      sanskrit: "महा सुदर्शन चूर्ण (Maha Sudarshan)",
      botanical: "Swertia chirata (Chirayata) & 52 herbs",
      action: "Pitta-Samana & Jvaraghna (Natural fever reduction)",
      advantage:
        "Reduces core body temperature without depleting liver glutathione stores.",
    },
  },
  {
    id: "ibuprofen",
    name: "Ibuprofen / NSAIDs",
    chemicalClass: "Non-Steroidal Anti-Inflammatory",
    commonUses: "Joint inflammation, acute musculoskeletal injury, cramps",
    mechanism: "Non-selective inhibition of COX-1 and COX-2 enzymes.",
    sideEffects: [
      "Gastric mucosal erosion",
      "Renal strain",
      "Cardiovascular risks",
    ],
    ayurvedicAlternative: {
      sanskrit: "शल्लकी एवं गुग्गुलु (Shallaki & Guggulu)",
      botanical: "Boswellia serrata & Commiphora mukul",
      action: "Inhibits 5-LOX inflammatory pathway and downregulates TNF-alpha",
      advantage:
        "Protects gastric mucosal lining while inhibiting chronic joint pain pathways.",
    },
  },
  {
    id: "omeprazole",
    name: "Omeprazole / PPIs",
    chemicalClass: "Proton Pump Inhibitor (Acid Reducer)",
    commonUses: "Acid reflux (GERD), heartburn, gastric ulcers",
    mechanism: "Irreversible block of the gastric H+/K+-ATPase proton pump.",
    sideEffects: [
      "Hypochlorhydria",
      "B12 & Magnesium malabsorption",
      "Rebound acidity",
    ],
    ayurvedicAlternative: {
      sanskrit: "यष्टिमधु एवं अविपत्तिकर (Yashtimadhu)",
      botanical: "Glycyrrhiza glabra (Licorice) & Avipattikar",
      action: "Mucoprotective barrier coating and Agni modulation",
      advantage:
        "Strengthens esophageal mucosal defense without shutting down digestive enzymes.",
    },
  },
  {
    id: "metformin",
    name: "Metformin",
    chemicalClass: "Biguanide Antidiabetic",
    commonUses: "Type 2 diabetes, insulin resistance, metabolic syndrome",
    mechanism: "Suppresses hepatic gluconeogenesis and activates AMPK.",
    sideEffects: [
      "Lactic acidosis risk",
      "Severe bloating / diarrhea",
      "B12 deficiency",
    ],
    ayurvedicAlternative: {
      sanskrit: "मेषशृङ्गी एवं विजयसार (Gurmar / Meshashringi)",
      botanical: "Gymnema sylvestre & Pterocarpus marsupium",
      action:
        "Sugar-destroying gymnemic acids & pancreatic beta-cell stimulation",
      advantage:
        "Blocks intestinal glucose receptors while assisting natural beta-cell regeneration.",
    },
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin / Statins",
    chemicalClass: "HMG-CoA Reductase Inhibitor",
    commonUses: "Hypercholesterolemia, arterial plaque prevention",
    mechanism:
      "Inhibits cholesterol synthesis enzyme HMG-CoA reductase in the liver.",
    sideEffects: [
      "Myalgia (muscle pain)",
      "CoQ10 depletion",
      "Elevated liver enzymes",
    ],
    ayurvedicAlternative: {
      sanskrit: "अर्जुन एवं मेदोहर विडङ्ग (Arjuna Bark)",
      botanical: "Terminalia arjuna",
      action: "Cardioprotective cardiac glycosides & lipid metabolism",
      advantage:
        "Improves endothelial flexibility and tones myocardium without depleting CoQ10.",
    },
  },
  {
    id: "cetirizine",
    name: "Cetirizine / Antihistamines",
    chemicalClass: "Second-Generation H1 Receptor Antagonist",
    commonUses: "Allergic rhinitis, hives, seasonal pollen allergies",
    mechanism: "Blocks histamine binding to peripheral H1 receptors.",
    sideEffects: [
      "Mild sedation",
      "Dry mouth",
      "Paradoxical anticholinergic effects",
    ],
    ayurvedicAlternative: {
      sanskrit: "हरिद्रा खण्ड (Haridra Khanda)",
      botanical: "Curcuma longa (Activated Curcuminoids)",
      action: "Mast cell stabilization & Kapha pacification",
      advantage:
        "Naturally stabilizes mast cells and prevents histamine cascade without drowsiness.",
    },
  },
];

export default function MedicalPage() {
  // Safe cast with fallback array to prevent crashes
  const medicines = useMemo(() => {
    if (!Array.isArray(meditationdata)) return [];
    return meditationdata as unknown as MedicineItem[];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedComparativeMed, setSelectedComparativeMed] =
    useState<ModernComparativeMedicine>(COMPARATIVE_REGISTRY[0]);

  // 1. Flatten all categories and extract unique distinct tags safely
  const categories = useMemo(() => {
    const allTags = medicines.flatMap((m) => {
      if (Array.isArray(m?.category)) return m.category;
      if (typeof m?.category === "string" && m.category.trim() !== "") {
        return [m.category];
      }
      return [];
    });
    return ["All", ...Array.from(new Set(allTags))];
  }, [medicines]);

  // 2. Filter medicines by Category and Search (Name, Company, Amount, Symptoms, Causes)
  const filteredMedicines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return medicines.filter((med) => {
      if (!med) return false;

      const medCategories: string[] = Array.isArray(med.category)
        ? med.category
        : typeof med.category === "string"
          ? [med.category]
          : [];

      const matchesCategory =
        selectedCategory === "All" || medCategories.includes(selectedCategory);

      if (!matchesCategory) return false;
      if (query === "") return true;

      // Targeted search matches:
      const nameMatch = med.name?.toLowerCase().includes(query) ?? false;
      const companyMatch =
        med.company_name?.toLowerCase().includes(query) ?? false;
      const amountMatch = med.amount?.toLowerCase().includes(query) ?? false;
      const causeMatch = med.main_cause?.toLowerCase().includes(query) ?? false;
      const genericMatch = Array.isArray(med.generic_names)
        ? med.generic_names.some((g) => g?.toLowerCase().includes(query))
        : false;
      const symptomMatch = Array.isArray(med.how_patients_describe_symptoms)
        ? med.how_patients_describe_symptoms.some((s) =>
            s?.toLowerCase().includes(query),
          )
        : false;

      return (
        nameMatch ||
        companyMatch ||
        amountMatch ||
        causeMatch ||
        genericMatch ||
        symptomMatch
      );
    });
  }, [medicines, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#080706] text-stone-100 overflow-x-hidden selection:bg-amber-300 selection:text-stone-950">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-6 md:px-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs tracking-[0.25em] uppercase font-sans">
            <Pill className="w-3.5 h-3.5 text-amber-400" />
            Clinical Therapeutics & Pathology
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-amber-100 to-amber-400">
            Formulary & Disease Index
          </h1>

          <p className="font-sans text-stone-300/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Filter by therapeutic goal to explore physiological mechanisms,
            pricing, and patient indications.
          </p>

          {/* Search Input (Searches name, company_name, amount, symptoms) */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search drug, company (e.g. MX1), amount (e.g. 180/-), or symptom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-amber-400/20 text-xs md:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/60 transition"
              />
            </div>
          </div>

          {/* Independent Category Filter Buttons */}
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
                      ? "bg-amber-400 text-stone-950 font-semibold shadow-md shadow-amber-400/20 scale-105"
                      : "bg-white/[0.03] text-stone-400 hover:text-stone-200 border border-white/10 hover:border-amber-400/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 1. Main JSON Medicines Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        {filteredMedicines.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-sans text-sm">
            No therapeutics found matching your selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((med, index) => (
              <MedicineCard key={med.id || med.name || index} medicine={med} />
            ))}
          </div>
        )}
      </section>

      {/* 2. Comparative Allopathic vs. Vedic Botanical Explorer */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-amber-400">
            Integrative Pharmacology
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-100">
            Allopathic vs. Vedic Botanical Equivalents
          </h2>
          <p className="text-stone-400 text-xs md:text-sm font-sans">
            Compare biochemical targets and side-effect profiles with classical
            ayurvedic phytochemical alternatives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Comparative Drug Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs uppercase font-sans tracking-[0.25em] text-amber-400/80 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" /> Reference
              Molecules
            </h3>

            {COMPARATIVE_REGISTRY.map((med) => {
              const isSelected = selectedComparativeMed.id === med.id;
              return (
                <div
                  key={med.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedComparativeMed(med)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedComparativeMed(med);
                    }
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border focus:outline-none focus:ring-1 focus:ring-amber-400/50 ${
                    isSelected
                      ? "bg-amber-400/10 border-amber-400/50 shadow-lg shadow-amber-500/10 translate-x-1"
                      : "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-serif text-lg ${
                          isSelected ? "text-amber-200" : "text-stone-200"
                        }`}
                      >
                        {med.name}
                      </h4>
                      <p className="text-xs font-mono text-amber-400/70 mt-0.5">
                        {med.chemicalClass}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? "text-amber-300 translate-x-1"
                          : "text-stone-600"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-stone-400 mt-2 font-sans line-clamp-1">
                    Indication: {med.commonUses}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Comparative Detail Dashboard (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 rounded-3xl p-8 bg-gradient-to-br from-white/[0.04] via-stone-900/60 to-black/80 border border-amber-400/25 backdrop-blur-2xl shadow-2xl space-y-8">
              {/* Molecule Header */}
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">
                  {selectedComparativeMed.chemicalClass}
                </span>
                <h3 className="font-serif text-3xl text-stone-100 mt-3">
                  {selectedComparativeMed.name}
                </h3>
                <p className="text-sm text-stone-300/80 font-sans mt-1">
                  {selectedComparativeMed.commonUses}
                </p>
              </div>

              {/* Mechanism & Known Liabilities */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                  <h4 className="text-xs font-mono uppercase text-amber-400 mb-1.5 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5" /> Biochemical Target
                  </h4>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    {selectedComparativeMed.mechanism}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
                  <h4 className="text-xs font-mono uppercase text-rose-300 mb-1.5 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                    Documented Side Effects
                  </h4>
                  <ul className="text-xs text-stone-300 space-y-1 list-disc list-inside">
                    {selectedComparativeMed.sideEffects.map((side) => (
                      <li key={side}>{side}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* The Botanical Counterpart Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-900/10 to-transparent border border-amber-400/30 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-400/20 pb-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-300 font-sans font-medium">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Vedic Botanical Substitute
                  </div>
                  <span className="text-xs font-mono text-amber-200/60">
                    Phytochemical
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-2xl text-amber-100">
                    {selectedComparativeMed.ayurvedicAlternative.sanskrit}
                  </h4>
                  <p className="text-xs font-mono text-amber-400/80 italic mt-0.5">
                    {selectedComparativeMed.ayurvedicAlternative.botanical}
                  </p>
                </div>

                <div className="space-y-3 text-xs md:text-sm font-sans">
                  <div>
                    <span className="text-stone-400 font-medium block text-xs uppercase tracking-wider mb-0.5">
                      Bio-Action (Karma):
                    </span>
                    <p className="text-stone-200">
                      {selectedComparativeMed.ayurvedicAlternative.action}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20">
                    <span className="text-amber-300 font-medium block text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      Clinical Advantage:
                    </span>
                    <p className="text-stone-300 text-xs leading-relaxed">
                      {selectedComparativeMed.ayurvedicAlternative.advantage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
