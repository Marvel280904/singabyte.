import SectionHero from "@/components/landing/section-hero";
import SectionOne from "@/components/landing/section-1";
import SectionTwo from "@/components/landing/section-2";
import SectionThree from "@/components/landing/section-3";
import SectionFour from "@/components/landing/section-4";
import SectionFive from "@/components/landing/section-5";
import SectionSix from "@/components/landing/section-6";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <SectionHero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
    </main>
  );
}