import SectionHero from "@/components/landing/section-hero";
import SectionOne from "@/components/landing/section-1";
import SectionTwo from "@/components/landing/section-2";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <SectionHero />
      <SectionOne />
      <SectionTwo />
    </main>
  );
}