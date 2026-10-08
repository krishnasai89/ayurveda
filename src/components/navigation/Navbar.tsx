"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  ChevronDown,
  Pill,
} from "lucide-react";

interface SubLinkItem {
  name: string;
  href: string;
  description?: string;
}

interface NavLinkItem {
  name: string;
  href?: string;
  children?: SubLinkItem[];
}

const NAV_LINKS: NavLinkItem[] = [
  { name: "HOME", href: "/" },
  { name: "DOSHAS", href: "#doshas" },
  {
    name: "MEDICINE",
    children: [
      {
        name: "Painkiller & Inflammation",
        href: "/meditation",
        description: "Analgesics, NSAIDs & antispasmodics",
      },
      {
        name: "INJECTIONS",
        href: "/injections",
        description: "Parenteral therapeutics & infusions",
      },
      {
        name: "ANTIBIOTICS",
        href: "/antibiotics",
        description: "Broad-spectrum antimicrobials",
      },
      {
        name: "CHOLESTEROL",
        href: "/cholesterol",
        description: "Statins & lipid-lowering monographs",
      },
      {
        name: "HYPERTENSION",
        href: "/hypertension",
        description: "Receptor blockers & vasodilators",
      },
      {
        name: "STOMACH",
        href: "/stomach",
        description: "P-CABs, antispasmodics & gut barrier",
      },
    ],
  },
  { name: "APOTHECARY", href: "#apothecary" },
  { name: "TREATMENTS", href: "#treatments" },
  { name: "ABOUT", href: "#about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMedicineOpen, setMobileMedicineOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for navbar background styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-16 ${
          isScrolled
            ? "py-3 bg-stone-950/85 backdrop-blur-xl border-b border-amber-400/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 1. Brand Logo & Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1px] shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <div className="w-full h-full bg-[#0a0705] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-95">
                <span className="font-serif text-base text-amber-300 select-none">
                  ॐ
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif tracking-[0.25em] text-sm md:text-base transition-colors ${
                  isScrolled
                    ? "text-stone-100"
                    : "text-stone-100 md:text-stone-300"
                }`}
              >
                AYURVEDA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500/80 font-sans font-medium">
                Vedic Science
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links & Dropdown */}
          <div className="hidden md:flex items-center gap-8 lg:gap-9">
            {NAV_LINKS.map((link) => {
              // Case A: Link has children -> Render Dropdown
              if (link.children && link.children.length > 0) {
                return (
                  <div
                    key={link.name}
                    ref={dropdownRef}
                    className="relative group py-2"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      aria-expanded={dropdownOpen}
                      className={`relative flex items-center gap-1.5 text-xs font-sans tracking-[0.22em] uppercase font-medium transition-colors ${
                        isScrolled
                          ? "text-stone-300 hover:text-amber-200"
                          : "text-stone-900/90 hover:text-stone-950"
                      } ${dropdownOpen ? "text-amber-300" : ""}`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          dropdownOpen
                            ? "rotate-180 text-amber-400"
                            : "opacity-70"
                        }`}
                      />
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ${
                          dropdownOpen ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu Box */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 transition-all duration-300 ${
                        dropdownOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto visible"
                          : "opacity-0 -translate-y-2 pointer-events-none invisible"
                      }`}
                    >
                      <div className="rounded-2xl bg-[#0c0a09]/95 backdrop-blur-2xl border border-amber-500/25 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.8)] space-y-1">
                        <div className="px-3 py-1.5 border-b border-white/5 flex items-center justify-between text-[10px] font-mono tracking-widest uppercase text-amber-400/70">
                          <span>Therapeutic Formularies</span>
                          <Pill className="w-3 h-3 text-amber-400/60" />
                        </div>

                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() => setDropdownOpen(false)}
                            className="group/item flex flex-col px-3 py-2.5 rounded-xl hover:bg-amber-500/10 transition-colors border border-transparent hover:border-amber-400/20"
                          >
                            <span className="text-xs font-sans font-medium tracking-wide text-stone-200 group-hover/item:text-amber-200 transition-colors">
                              {child.name}
                            </span>
                            {child.description && (
                              <span className="text-[10px] text-stone-400 group-hover/item:text-stone-300 font-sans line-clamp-1 mt-0.5">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              // Case B: Regular Link
              return (
                <Link
                  key={link.name}
                  href={link.href || "#"}
                  className={`relative text-xs font-sans tracking-[0.22em] uppercase font-medium transition-colors group py-2 ${
                    isScrolled
                      ? "text-stone-300 hover:text-amber-200"
                      : "text-stone-900/90 hover:text-stone-950"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            })}
          </div>

          {/* 3. CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="#quiz"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-sans font-medium tracking-wider text-amber-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md shadow-amber-900/20 hover:brightness-110 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>DOSHA QUIZ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={`p-2 rounded-xl md:hidden transition-colors border ${
                isScrolled
                  ? "bg-white/5 border-amber-500/20 text-stone-200 hover:bg-white/10"
                  : "bg-black/10 border-black/10 text-stone-900 hover:bg-black/20"
              }`}
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-amber-300" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#090807]/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col justify-between p-8 pt-24 overflow-y-auto ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-amber-400/60">
            Navigation
          </span>

          {NAV_LINKS.map((link) => {
            // Case A: Mobile Item with Children (Accordion Style)
            if (link.children && link.children.length > 0) {
              return (
                <div
                  key={link.name}
                  className="flex flex-col border-b border-white/5 pb-2"
                >
                  <button
                    type="button"
                    onClick={() => setMobileMedicineOpen(!mobileMedicineOpen)}
                    className="flex items-center justify-between w-full py-2 font-serif text-2xl tracking-wider text-stone-200 hover:text-amber-300 transition-colors text-left"
                  >
                    <span>{link.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${
                        mobileMedicineOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Accordion Sub-Menu */}
                  <div
                    className={`flex flex-col space-y-2 pl-4 pt-2 overflow-hidden transition-all duration-300 ${
                      mobileMedicineOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileMedicineOpen(false);
                        }}
                        className="flex items-center gap-2 text-sm font-sans tracking-wide text-stone-300 hover:text-amber-300 py-1"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                        <span>{child.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // Case B: Regular Mobile Link
            return (
              <Link
                key={link.name}
                href={link.href || "#"}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-2xl tracking-wider text-stone-200 hover:text-amber-300 transition-colors py-1 border-b border-white/5"
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Bottom CTA */}
        <div className="pt-8 border-t border-white/10 mt-6">
          <Link
            href="#quiz"
            onClick={() => setMobileOpen(false)}
            className="w-full py-3.5 rounded-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 font-serif font-medium shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Your Dosha</span>
          </Link>
        </div>
      </div>
    </>
  );
}
