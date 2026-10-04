import Image from "next/image";
import Link from "next/link";
import React from "react";

/* --- High-Contrast Blush Pink & Ruby Lotus Blossom --- */
function LotusBlossom({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 80"
      className={`${className} filter drop-shadow-[0_6px_16px_rgba(190,24,93,0.45)]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sacred Rose/Pink Petal Gradient */}
        <linearGradient id="pinkLotusPetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#FB7185" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#BE123C" stopOpacity="0.85" />
        </linearGradient>

        {/* Center Pistil Gradient */}
        <linearGradient id="lotusCenterCore" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#9F1239" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
      </defs>

      {/* Back layer outer petals */}
      <path
        d="M20 50 C22 25, 38 18, 50 8 C62 18, 78 25, 80 50 C65 52, 35 52, 20 50 Z"
        fill="url(#pinkLotusPetal)"
        opacity="0.9"
      />
      {/* Outer Left Petal */}
      <path
        d="M10 52 C15 32, 32 30, 48 38 C35 52, 22 56, 10 52 Z"
        fill="url(#pinkLotusPetal)"
      />
      {/* Outer Right Petal */}
      <path
        d="M90 52 C85 32, 68 30, 52 38 C65 52, 78 56, 90 52 Z"
        fill="url(#pinkLotusPetal)"
      />
      {/* Inner Left Petal */}
      <path
        d="M24 55 C28 35, 42 32, 50 22 C44 40, 36 54, 24 55 Z"
        fill="url(#pinkLotusPetal)"
      />
      {/* Inner Right Petal */}
      <path
        d="M76 55 C72 35, 58 32, 50 22 C56 40, 64 54, 76 55 Z"
        fill="url(#pinkLotusPetal)"
      />
      {/* Center Dominant Petal */}
      <path
        d="M50 12 C42 28, 40 48, 50 60 C60 48, 58 28, 50 12 Z"
        fill="url(#pinkLotusPetal)"
      />
      {/* Center Pistil */}
      <ellipse cx="50" cy="54" rx="10" ry="4" fill="url(#lotusCenterCore)" />
    </svg>
  );
}

/* --- High-Contrast Drifting Rose Petal --- */
function LotusPetal({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 50"
      className={`${className} filter drop-shadow-[0_4px_10px_rgba(159,18,57,0.35)]`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2 C10 16, 4 30, 20 48 C36 30, 30 16, 20 2 Z"
        fill="url(#rosePetalGradient)"
      />
      <defs>
        <linearGradient id="rosePetalGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F43F5E" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#9F1239" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
      {/* 1. Responsive Background Images */}
      {/* Desktop (16:9 / Landscape) */}
      <div className="hidden md:block absolute inset-0 -z-20">
        <Image
          src="/Desktop.jpg"
          alt="Lord Dhanvantari - Ayurveda Desktop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
      </div>

      {/* Mobile (9:16 / Portrait) */}
      <div className="block md:hidden absolute inset-0 -z-20">
        <Image
          src="/Mobile.jpg"
          alt="Lord Dhanvantari - Ayurveda Mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
          quality={90}
        />
      </div>

      {/* Subtle Darkening Veil */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 via-stone-900/10 to-stone-950/20 pointer-events-none -z-10" />

      {/* 2. Flowing Lotus Layer (Top to Bottom Descending) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Floating Pink Blossoms - Negative delays ensure immediate pre-rendered flow */}
        <div
          className="absolute left-[8%] animate-fall-slow"
          style={{ animationDelay: "-2s" }}
        >
          <LotusBlossom className="w-16 h-16 md:w-22 md:h-22" />
        </div>

        <div
          className="absolute left-[36%] animate-fall-medium hidden md:block"
          style={{ animationDelay: "-7s" }}
        >
          <LotusBlossom className="w-14 h-14" />
        </div>

        <div
          className="absolute right-[10%] animate-fall-slow"
          style={{ animationDelay: "-11s" }}
        >
          <LotusBlossom className="w-18 h-18 md:w-24 md:h-24" />
        </div>

        <div
          className="absolute right-[28%] animate-fall-fast"
          style={{ animationDelay: "-4.5s" }}
        >
          <LotusBlossom className="w-12 h-12 md:w-16 md:h-16" />
        </div>

        {/* Floating Rose Petals */}
        <div
          className="absolute left-[20%] animate-fall-medium"
          style={{ animationDelay: "-3.5s" }}
        >
          <LotusPetal className="w-7 h-7" />
        </div>

        <div
          className="absolute left-[52%] animate-fall-fast hidden sm:block"
          style={{ animationDelay: "-8s" }}
        >
          <LotusPetal className="w-6 h-6" />
        </div>

        <div
          className="absolute right-[6%] animate-fall-medium"
          style={{ animationDelay: "-1.5s" }}
        >
          <LotusPetal className="w-8 h-8" />
        </div>

        <div
          className="absolute left-[75%] animate-fall-slow hidden md:block"
          style={{ animationDelay: "-13s" }}
        >
          <LotusPetal className="w-6 h-6" />
        </div>
      </div>

      {/* 3. Navigation Bar */}
      <header className="relative z-10 w-full px-6 md:px-16 pt-8 flex items-center justify-between"></header>

      {/* 4. Hero Editorial Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 flex items-center">
        <div className="max-w-xl space-y-6">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-stone-900 tracking-tight leading-[1.08] uppercase">
            Ayurveda: <br />
            <span className="font-normal">The Science</span> <br />
            Of Vitality
          </h1>

          <p className="font-sans text-stone-800 text-sm md:text-lg font-normal leading-relaxed max-w-md">
            Connect with your inner wisdom through ancient healing.
          </p>

          <div className="pt-2">
            <Link
              href="#explore"
              className="inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-[#B47C35] to-[#8C5E22] text-[#FFFDF8] font-sans font-medium text-sm md:text-base tracking-wide shadow-lg shadow-amber-950/25 hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      <div className="h-6 md:h-12" />
    </section>
  );
}
