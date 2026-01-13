import SectionForm from "@/components/contact/section-form";
import SectionFive from "@/components/landing/section-5";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Singabyte",
  description: "Ready to transform your vision into reality? Contact Singabyte today for expert software engineering and digital solutions.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-black">
      <SectionForm />
      <SectionFive />
    </main>
  );
}