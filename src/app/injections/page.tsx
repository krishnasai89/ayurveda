"use client";

import React, { useMemo, useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import {
  Syringe,
  Search,
  Activity,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import injectionsData from "@/data/injectionsdata.json";
import InjectionCard, {
  InjectionItem,
} from "@/components/injections/InjectionCard";

export default function InjectionsPage() {
  const injections = useMemo(() => {
    if (!Array.isArray(injectionsData)) return [];
    return injectionsData as unknown as InjectionItem[];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRoute, setSelectedRoute] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Unique categories
  const categories = useMemo(() => {
    const tags = injections.flatMap((inj) =>
      Array.isArray(inj.category) ? inj.category : [inj.category],
    );
    return ["All", ...Array.from(new Set(tags.filter(Boolean)))];
  }, [injections]);

  // Unique administration routes (e.g. IV, IM, SC)
  const routes = useMemo(() => {
    const allRoutes = injections.flatMap((inj) =>
      Array.isArray(inj.routes_of_administration)
        ? inj.routes_of_administration
        : [],
    );
    return ["All", ...Array.from(new Set(allRoutes.filter(Boolean)))];
  }, [injections]);

  // Filtering engine
  const filteredInjections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return injections.filter((inj) => {
      if (!inj) return false;

      // Category match
      const injCategories = Array.isArray(inj.category)
        ? inj.category
        : [inj.category];
      const matchesCategory =
        selectedCategory === "All" || injCategories.includes(selectedCategory);

      // Route match
      const matchesRoute =
        selectedRoute === "All" ||
        (Array.isArray(inj.routes_of_administration) &&
          inj.routes_of_administration.includes(selectedRoute));

      if (!matchesCategory || !matchesRoute) return false;
      if (query === "") return true;

      // Text search
      const nameMatch = inj.name?.toLowerCase().includes(query) ?? false;
      const classMatch = inj.drug_class?.toLowerCase().includes(query) ?? false;
      const causeMatch = inj.main_cause?.toLowerCase().includes(query) ?? false;
      const companyMatch =
        inj.company_name?.toLowerCase().includes(query) ?? false;
      const amountMatch = inj.amount?.toLowerCase().includes(query) ?? false;
      const genericMatch = Array.isArray(inj.generic_names)
        ? inj.generic_names.some((g) => g?.toLowerCase().includes(query))
        : false;

      return (
        nameMatch ||
        classMatch ||
        causeMatch ||
        companyMatch ||
        amountMatch ||
        genericMatch
      );
    });
  }, [injections, selectedCategory, selectedRoute, searchQuery]);

  return (
    <main className="min-h-screen bg-[#07090b] text-stone-100 overflow-x-hidden selection:bg-cyan-300 selection:text-stone-950">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-12 px-6 md:px-16 border-b border-cyan-500/10 bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs tracking-[0.25em] uppercase font-sans">
            <Syringe className="w-3.5 h-3.5 text-cyan-400" />
            Parenteral Therapeutics & Critical Infusions
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-cyan-100 to-cyan-400">
            Injections Formulary
          </h1>

          <p className="font-sans text-stone-300/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Clinical protocols, reconstitution parameters, infusion rates, and
            sterile administration criteria for acute hospital care.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search injection, indication, or route (e.g. Ondansetron, IV push)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white/[0.04] border border-cyan-400/20 text-xs md:text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-cyan-400/60 transition"
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
                      ? "bg-cyan-400 text-stone-950 font-semibold shadow-md shadow-cyan-400/20 scale-105"
                      : "bg-white/[0.03] text-stone-400 hover:text-stone-200 border border-white/10 hover:border-cyan-400/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Route Filter Selector */}
          <div className="flex items-center justify-center gap-2 pt-2 text-xs font-mono">
            <span className="text-stone-500">Route Filter:</span>
            {routes.map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => setSelectedRoute(rt)}
                className={`px-2.5 py-1 rounded-md text-[11px] transition ${
                  selectedRoute === rt
                    ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/40"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {rt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        {filteredInjections.length === 0 ? (
          <div className="text-center py-20 text-stone-500 font-sans text-sm">
            No parenteral therapeutics found matching your selected filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInjections.map((inj, index) => (
              <InjectionCard
                key={inj.id || inj.name || index}
                injection={inj}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
