export const metadata = {
  title: "Terms of Service | Singabyte",
  description: "Terms and conditions for using Singabyte services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">

        {/* Header */}
        <header className="mt-6 mb-6 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-zinc-500">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </header>

        {/* Content */}
        <article className="prose prose-invert prose-zinc max-w-none space-y-12">
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="leading-relaxed text-zinc-400">
              Welcome to singabyte.sg. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Use of Services</h2>
            <p className="leading-relaxed text-zinc-400 mb-4">
              You may use our services only as permitted by these Terms and any applicable laws. You may not use our services:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400 marker:text-blue-500">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate singabyte.sg, a singabyte.sg employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the services, or which, as determined by us, may harm singabyte.sg or users of the services or expose them to liability.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property Rights</h2>
            <p className="leading-relaxed text-zinc-400">
              The services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by singabyte.sg, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Contributions</h2>
            <p className="leading-relaxed text-zinc-400 mb-4">
              Any content that you post, upload, share, store, or otherwise provide through our services is your "User Content." You are solely responsible for your User Content. You agree that you will not post, upload, share, store, or otherwise provide through our services any User Content that:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400 marker:text-blue-500">
              <li>Violates the rights of any third party, including intellectual property rights and privacy rights.</li>
              <li>Is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, or otherwise objectionable.</li>
              <li>Contains viruses, trojan horses, worms, or any other malicious code.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Disclaimer of Warranties</h2>
            <div className="p-6 border border-zinc-800 bg-zinc-900/30 rounded-lg">
                <p className="leading-relaxed text-zinc-300 uppercase text-sm tracking-wide">
                  YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. SINGABYTE.SG EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <div className="p-6 border border-zinc-800 bg-zinc-900/30 rounded-lg">
                <p className="leading-relaxed text-zinc-300 uppercase text-sm tracking-wide">
                  IN NO EVENT WILL SINGABYTE.SG, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
            <p className="leading-relaxed text-zinc-400">
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them. Your continued use of the services following the posting of revised Terms means that you accept and agree to the changes.
            </p>
          </section>

        </article>
      </div>
    </main>
  );
}