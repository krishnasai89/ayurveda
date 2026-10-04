import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import TridoshaSection from "@/components/sections/TridoshaSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#0d0905] overflow-x-hidden selection:bg-amber-300 selection:text-stone-950">
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <TridoshaSection />
      </div>
    </main>
  );
}
