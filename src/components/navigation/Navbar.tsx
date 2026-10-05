"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { name: "HOME", href: "/" },
  { name: "DOSHAS", href: "#doshas" },
  { name: "MEDICINE", href: "/meditation" },
  { name: "INJECTIONS", href: "/injections" },
  { name: "APOTHECARY", href: "#apothecary" },
  { name: "TREATMENTS", href: "#treatments" },
  { name: "ABOUT", href: "#about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out px-6 md:px-16 ${
          isScrolled
            ? "py-3 bg-stone-950/75 backdrop-blur-xl border-b border-amber-400/15 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* 1. Brand Logo & Sacred Monogram */}
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
                  isScrolled ? "text-stone-100" : "text-stone-900"
                }`}
              >
                AYURVEDA
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-amber-500/80 font-sans font-medium">
                Vedic Science
              </span>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs font-sans tracking-[0.22em] uppercase font-medium transition-colors group py-1 ${
                  isScrolled
                    ? "text-stone-300 hover:text-amber-200"
                    : "text-stone-900/90 hover:text-stone-950"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
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
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={`p-2 rounded-xl md:hidden transition-colors border ${
                isScrolled
                  ? "bg-white/5 border-white text-stone-200 hover:bg-white/10"
                  : "bg-black/5 border-white text-stone-200 hover:bg-black/10"
              }`}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-[#090807]/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-amber-400/60">
            Navigation
          </span>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl tracking-wider text-stone-200 hover:text-amber-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10">
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
