"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpRight } from "lucide-react";

// KONFIGURASI LINK
const companyLinks = [
  { name: "Services", href: "/#service" },
  { name: "Work", href: "/#work" },
  { name: "Solution", href: "/#solution" },
  { name: "Insights", href: "/#insights" },
];

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/singabyte" },
  { name: "Instagram", href: "https://instagram.com/singabyte" },
  { name: "LinkedIn", href: "https://linkedin.com/company/singabyte" },
];

export default function Footer() {
  // Ambil tahun
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <footer className="w-full bg-black pt-20 pb-8 border-t border-white/5">
      <div className="px-6 lg:px-8">
        
        {/* TOP SECTION (Logo & CTA Buttons) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-6 mb-6 border-b border-blue/20">
            {/* Logo */}
            <div className="text-3xl font-bold font-display text-white tracking-tighter">
              singabyte<span className="text-blue">.</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Button variant="primary" onClick={() => router.push('/contact')}>
                    start a project
                </Button>
                <Button variant="secondary" onClick={() => router.push('/career')}>
                    careers@singabyte.com
                </Button>     
            </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
            
            {/* LEFT SIDE: Headline & Form */}
            <div className="lg:col-span-8 flex flex-col gap-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-display font-medium text-white leading-[1.1] mb-2 max-w-2xl">
                        Merging your insights with our engineering to build solutions that perform.
                    </h2>
                </div>

                {/* Newsletter Form */}
                <div className="w-full max-w-md">
                    <form className="flex gap-2">
                        <Input 
                            className="border-blue bg-blue/10 py-6"
                            placeholder="Enter your email address"
                        />
                        <Button variant="primary">
                            submit
                        </Button>
                    </form>
                </div>
            </div>

            {/* RIGHT SIDE: Navigation Columns */}
            <div className="lg:col-span-4">
                <div className="grid grid-cols-3 gap-2 md:gap-8">
                    
                    {/* Column 1: Company */}
                    <div className="flex flex-col gap-6">
                        <span className="text-md font-medium text-white tracking-wider">
                            [ company ]
                        </span>
                        <nav className="flex flex-col gap-4">
                            {companyLinks.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={item.href}
                                    className="text-zinc-300 hover:text-blue transition-colors text-sm"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 2: Social */}
                    <div className="flex flex-col gap-6">
                        <span className="text-md font-medium text-white tracking-wider">
                            [ social ]
                        </span>
                        <nav className="flex flex-col gap-4">
                            {socialLinks.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={item.href}
                                    className="flex items-center gap-2 text-zinc-300 hover:text-blue transition-colors text-sm group"
                                >
                                    {item.name} 
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="flex flex-col gap-6">
                        <span className="text-md font-medium text-white tracking-wider">
                            [ contact ]
                        </span>
                        <div className="flex flex-col gap-4 text-sm text-zinc-300">
                            <p>Singapore</p>
                            <Link href="mailto:dev@singabyte.com" className="hover:text-blue transition-colors">
                                dev@singabyte.com
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-md text-white">
            <p>© {currentYear} Singabyte. All rights reserved.</p>
            <div className="flex gap-8">
                <Link href="#" className="hover:text-blue transition-colors">
                    Terms & Conditions
                </Link>
                <Link href="#" className="hover:text-blue transition-colors">
                    Privacy Policy
                </Link>
            </div>
        </div>

      </div>
    </footer>
  );
}