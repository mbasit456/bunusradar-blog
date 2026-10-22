const fs = require('fs');
const path = require('path');
const { wrapPage, renderMarquee } = require('./page_layout');

// Helper to render standard Avista breadcrumbs and page hero
function renderPageHero({ badge, title, highlight, description, actions = [] }) {
  return `  <!-- Page Hero (Avista Signature Layout) -->
  <section class="relative pt-16 pb-20 overflow-hidden bg-[#0c0d12] border-b border-white/[0.08]">
    <!-- Ambient ambient glow -->
    <div class="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#fd3f00]/10 blur-[130px] pointer-events-none"></div>
    <div class="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-[#7A5AF8]/15 blur-[130px] pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-[#fd3f00] text-xs font-mono font-bold tracking-widest uppercase mb-6">
        <span class="w-2 h-2 rounded-full bg-[#fd3f00] animate-ping"></span>
        ✦ ${badge}
      </div>
      <h1 class="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[1.12] max-w-4xl mx-auto mb-6">
        ${title} <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#fd3f00] via-[#ff7300] to-[#7A5AF8]">${highlight}</span>
      </h1>
      <p class="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">
        ${description}
      </p>
      
      <div class="flex flex-wrap items-center justify-center gap-4">
        ${actions.map(a => `<a href="${a.href}" ${a.target ? 'target="' + a.target + '"' : ''} class="${a.primary ? 'px-8 py-4 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-display font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(253,63,0,0.4)] hover:scale-105 transition-all flex items-center gap-2' : 'px-8 py-4 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white font-mono text-xs font-bold border border-white/10 hover:border-[#fd3f00]/50 transition-all flex items-center gap-2'}">${a.text} ${a.primary ? '<span>↗</span>' : ''}</a>`).join('')}
      </div>

      <!-- Trust Badges -->
      <div class="pt-8 mt-10 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-300">
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded-full bg-[#fd3f00]/20 text-[#fd3f00] flex items-center justify-center text-[10px]">✓</span> 100% Real Vetted Websites</span>
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded-full bg-[#fd3f00]/20 text-[#fd3f00] flex items-center justify-center text-[10px]">✓</span> Zero PBNs or Spun Content</span>
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded-full bg-[#fd3f00]/20 text-[#fd3f00] flex items-center justify-center text-[10px]">✓</span> 90-Day Replacement Guarantee</span>
        <span class="flex items-center gap-2"><span class="w-4 h-4 rounded-full bg-[#fd3f00]/20 text-[#fd3f00] flex items-center justify-center text-[10px]">✓</span> Live Transparent Reporting</span>
      </div>
    </div>
  </section>

  ${renderMarquee()}`;
}

// -------------------------------------------------------------
// PAGE 1: Guest Posting Service (guest-posting.html)
// -------------------------------------------------------------
function buildGuestPosting() {
  const content = `
${renderPageHero({
  badge: "High-Authority Outreach",
  title: "Premium Blogger Outreach &",
  highlight: "Guest Posting Service",
  description: "Secure contextual in-content backlinks on genuine websites with verified monthly organic traffic, pristine backlink profiles, and high Domain Rating (DR 25+ to DR 80+).",
  actions: [
    { text: "View Packages & Pricing", href: "#pricing-table", primary: true },
    { text: "Chat on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Vetting Criteria -->
  <section class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-widest">// QUALITY CONTROL</span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-2">
          How We Vet Every Publisher Domain
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-3">
          Zero public blog networks (PBNs), zero link farms. Our manual outreach team runs comprehensive metric audits on every candidate domain.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-8 rounded-3xl bg-[#14151e] border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-[#fd3f00]/10 text-[#fd3f00] flex items-center justify-center font-display font-black text-xl mb-6 border border-[#fd3f00]/30">01</div>
          <h3 class="font-display font-black text-xl text-white mb-3">Verified Organic Traffic</h3>
          <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Every site must pass strict Ahrefs & Semrush traffic checks with a minimum of 1,000+ to 50,000+ real monthly visitors ranking for commercial keywords.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-[#14151e] border border-white/[0.08] hover:border-[#7A5AF8]/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-[#7A5AF8]/10 text-[#7A5AF8] flex items-center justify-center font-display font-black text-xl mb-6 border border-[#7A5AF8]/30">02</div>
          <h3 class="font-display font-black text-xl text-white mb-3">Native Content Included</h3>
          <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Our US/UK native copywriters create comprehensive 1,000+ word editorial articles tailored to the publication's audience, embedding your target link naturally.
          </p>
        </div>

        <div class="p-8 rounded-3xl bg-[#14151e] border border-white/[0.08] hover:border-emerald-500/50 transition-all">
          <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-display font-black text-xl mb-6 border border-emerald-500/30">03</div>
          <h3 class="font-display font-black text-xl text-white mb-3">90-Day Stick Warranty</h3>
          <p class="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Links are permanent, contextual, and dofollow. Backed by our 90-day unconditional replacement warranty: if a link drops, we replace it at zero charge.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Official Packages & Pricing (Exact Verbatim starseo78.com Catalog) -->
  <section id="pricing-table" class="py-20 bg-[#0f1017] border-y border-white/[0.08]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official Guest Posting Packages
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Select between individual placements or save significantly with bundled 5-pack and 10-pack volume orders.
        </p>
      </div>

      <!-- Single Pack Tiers -->
      <div class="mb-16">
        <div class="flex items-center gap-3 mb-8">
          <span class="w-8 h-8 rounded-full bg-[#fd3f00] text-white flex items-center justify-center font-mono font-bold text-xs">1</span>
          <h3 class="font-display font-black text-2xl text-white uppercase">Single Placement Tiers (1 Pack)</h3>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- DR 25+ -->
          <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
            <div>
              <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Ahrefs DR 25+</span>
              <h4 class="font-display font-black text-2xl text-white mt-1">1 DR 25+ Post</h4>
              <div class="my-6">
                <span class="text-5xl font-display font-black text-white">$120</span>
                <span class="text-xs text-slate-400 font-mono">/ placement</span>
              </div>
              <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Domain Rating: 25 - 39</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 1,000+ Word Editorial Content</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Real Organic Search Traffic</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Contextual In-Content Link</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
              </ul>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
          </div>

          <!-- DR 40+ -->
          <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all flex flex-col justify-between relative">
            <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Popular</span>
            <div>
              <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Ahrefs DR 40+</span>
              <h4 class="font-display font-black text-2xl text-white mt-1">1 DR 40+ Post</h4>
              <div class="my-6">
                <span class="text-5xl font-display font-black text-white">$240</span>
                <span class="text-xs text-slate-400 font-mono">/ placement</span>
              </div>
              <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Domain Rating: 40 - 49</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 1,000+ Word Native Content</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 2,500+ Monthly Organic Traffic</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> High Authority Industry Blog</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
              </ul>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order on Skype</a>
          </div>

          <!-- DR 50+ -->
          <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#7A5AF8]/50 transition-all flex flex-col justify-between">
            <div>
              <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Ahrefs DR 50+</span>
              <h4 class="font-display font-black text-2xl text-white mt-1">1 DR 50+ Post</h4>
              <div class="my-6">
                <span class="text-5xl font-display font-black text-white">$320</span>
                <span class="text-xs text-slate-400 font-mono">/ placement</span>
              </div>
              <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Domain Rating: 50 - 59</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> High Organic Authority & Traffic</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Native US/UK Copywriter</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Natural Dofollow Anchor Link</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
              </ul>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#7A5AF8] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
          </div>

          <!-- DR 60+ -->
          <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all flex flex-col justify-between relative">
            <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Elite</span>
            <div>
              <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Ahrefs DR 60+</span>
              <h4 class="font-display font-black text-2xl text-white mt-1">1 DR 60+ Post</h4>
              <div class="my-6">
                <span class="text-5xl font-display font-black text-white">$400</span>
                <span class="text-xs text-slate-400 font-mono">/ placement</span>
              </div>
              <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Domain Rating: 60 - 75+</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Massive Organic Traffic (10k+)</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Premium Authority Publication</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Maximum Link Juice Transmission</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
              </ul>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order on Skype</a>
          </div>
        </div>
      </div>

      <!-- 5-Pack & 10-Pack Bundles Table -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <span class="w-8 h-8 rounded-full bg-[#7A5AF8] text-white flex items-center justify-center font-mono font-bold text-xs">2</span>
          <h3 class="font-display font-black text-2xl text-white uppercase">Outreach Volume Bundles (5 Pack & 10 Pack)</h3>
        </div>

        <div class="bg-[#14151e] rounded-3xl border border-white/[0.08] overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs sm:text-sm">
              <thead class="bg-white/[0.04] border-b border-white/[0.08] text-white font-display font-black uppercase">
                <tr>
                  <th class="p-5">Outreach Tier</th>
                  <th class="p-5">Included Specs</th>
                  <th class="p-5">5 Pack Price</th>
                  <th class="p-5">10 Pack Price</th>
                  <th class="p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/[0.06] text-slate-300 font-medium">
                <tr class="hover:bg-white/[0.02] transition-colors">
                  <td class="p-5 font-bold text-[#fd3f00]">DR 25+ Outreach</td>
                  <td class="p-5 text-slate-400">Real traffic, 1,000+ words native writing, Dofollow</td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$550</span> <span class="text-xs text-emerald-400 font-bold">(Save $50)</span></td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$1,050</span> <span class="text-xs text-emerald-400 font-bold">(Save $150)</span></td>
                  <td class="p-5 text-right">
                    <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="inline-block px-5 py-2.5 rounded-full bg-[#fd3f00] text-white text-xs font-mono font-bold hover:opacity-90">Order Bundle</a>
                  </td>
                </tr>
                <tr class="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                  <td class="p-5 font-bold text-[#fd3f00]">DR 40+ Outreach</td>
                  <td class="p-5 text-slate-400">Authority blogs, 2,500+ traffic, full warranty</td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$1,050</span> <span class="text-xs text-emerald-400 font-bold">(Save $150)</span></td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$1,990</span> <span class="text-xs text-emerald-400 font-bold">(Save $410)</span></td>
                  <td class="p-5 text-right">
                    <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="inline-block px-5 py-2.5 rounded-full bg-[#fd3f00] text-white text-xs font-mono font-bold hover:opacity-90">Order Bundle</a>
                  </td>
                </tr>
                <tr class="hover:bg-white/[0.02] transition-colors">
                  <td class="p-5 font-bold text-[#7A5AF8]">DR 50+ Outreach</td>
                  <td class="p-5 text-slate-400">High impact industry publications, verified keywords</td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$1,475</span> <span class="text-xs text-emerald-400 font-bold">(Save $125)</span></td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$2,875</span> <span class="text-xs text-emerald-400 font-bold">(Save $325)</span></td>
                  <td class="p-5 text-right">
                    <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="inline-block px-5 py-2.5 rounded-full bg-[#7A5AF8] text-white text-xs font-mono font-bold hover:opacity-90">Order Bundle</a>
                  </td>
                </tr>
                <tr class="hover:bg-white/[0.02] transition-colors bg-white/[0.01]">
                  <td class="p-5 font-bold text-[#fd3f00]">DR 60+ Outreach</td>
                  <td class="p-5 text-slate-400">Elite tier domains, 10,000+ organic traffic</td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$1,800</span> <span class="text-xs text-emerald-400 font-bold">(Save $200)</span></td>
                  <td class="p-5"><span class="font-display font-black text-lg text-white">$3,450</span> <span class="text-xs text-emerald-400 font-bold">(Save $550)</span></td>
                  <td class="p-5 text-right">
                    <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="inline-block px-5 py-2.5 rounded-full bg-[#fd3f00] text-white text-xs font-mono font-bold hover:opacity-90">Order Bundle</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Guest Posting Service - Secure Permanent DR 25+ to DR 80+ Backlinks | Star SEO",
    description: "Manual guest posting service and blogger outreach on 100% real sites with verified traffic. High quality native content included. 90-day replacement guarantee.",
    activePage: "guest-posting",
    content
  });
}

// -------------------------------------------------------------
// PAGE 2: Niche Edit Backlinks (niche-edit-backlinks.html)
// -------------------------------------------------------------
function buildNicheEdits() {
  const content = `
${renderPageHero({
  badge: "Curated In-Content Links",
  title: "High-Authority Contextual",
  highlight: "Niche Edit Backlinks",
  description: "Gain rapid link juice by inserting your contextual anchor link into aged, established blog articles that already boast authority, social shares, and Google rankings.",
  actions: [
    { text: "View DA & DR Pricing Tiers", href: "#niche-pricing", primary: true },
    { text: "Consult on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Official Packages & Pricing (Verbatim starseo78.com Catalog) -->
  <section id="niche-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Niche Edit Backlinks Packages
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Choose packages priced either by Moz Domain Authority (DA) or Ahrefs Domain Rating (DR).
        </p>
      </div>

      <!-- Moz DA Tiers -->
      <div class="mb-16">
        <h3 class="font-display font-black text-2xl text-white uppercase mb-8 flex items-center gap-3">
          <span class="w-8 h-8 rounded-full bg-[#fd3f00] text-white flex items-center justify-center font-mono font-bold text-xs">DA</span>
          Priced by Moz Domain Authority (DA)
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- DA 20-40 -->
          <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Moz DA 20 - 40</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">DA 20 - 40 Placements</h4>
            <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
              <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$80</span></div>
              <div class="flex justify-between items-center"><span>3 Sites:</span> <span class="font-black text-lg text-white">$240</span></div>
              <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$400</span></div>
              <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$800</span></div>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Established, indexed articles</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Real organic search visitors</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Contextual paragraph rewrite</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
            </ul>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order DA 20-40 on Skype</a>
          </div>

          <!-- DA 40-50 -->
          <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all relative">
            <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Popular</span>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Moz DA 40 - 50</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">DA 40 - 50 Placements</h4>
            <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
              <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$175</span></div>
              <div class="flex justify-between items-center"><span>3 Sites:</span> <span class="font-black text-lg text-white">$525</span></div>
              <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$875</span></div>
              <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$1,750</span></div>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> High authority trusted domains</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Proven Google ranking boost</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Contextual paragraph rewrite</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
            </ul>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order DA 40-50 on Skype</a>
          </div>

          <!-- DA 50+ -->
          <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] transition-all relative">
            <span class="absolute -top-3 right-6 bg-[#7A5AF8] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Authority</span>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Moz DA 50+</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">DA 50+ Placements</h4>
            <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
              <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$280</span></div>
              <div class="flex justify-between items-center"><span>3 Sites:</span> <span class="font-black text-lg text-white">$840</span></div>
              <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$1,400</span></div>
              <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$2,800</span></div>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Exceptional domain power</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Strong referring domain profile</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Rapid rank movement for target keywords</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
            </ul>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order DA 50+ on Skype</a>
          </div>
        </div>
      </div>

      <!-- Ahrefs DR Tiers -->
      <div>
        <h3 class="font-display font-black text-2xl text-white uppercase mb-8 flex items-center gap-3">
          <span class="w-8 h-8 rounded-full bg-[#7A5AF8] text-white flex items-center justify-center font-mono font-bold text-xs">DR</span>
          Priced by Ahrefs Domain Rating (DR)
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- DR 20-35 -->
          <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Ahrefs DR 20 - 35</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">DR 20 - 35 Placements</h4>
            <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
              <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$99</span></div>
              <div class="flex justify-between items-center"><span>3 Sites:</span> <span class="font-black text-lg text-white">$290</span></div>
              <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$480</span></div>
              <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$960</span></div>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order DR 20-35 on Skype</a>
          </div>

          <!-- DR 35-50 -->
          <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all">
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Ahrefs DR 35 - 50</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">DR 35 - 50 Placements</h4>
            <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
              <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$189</span></div>
              <div class="flex justify-between items-center"><span>3 Sites:</span> <span class="font-black text-lg text-white">$565</span></div>
              <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$940</span></div>
              <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$1,920</span></div>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order DR 35-50 on Skype</a>
          </div>

          <!-- DR 50-75 -->
          <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] transition-all">
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Ahrefs DR 50 - 75</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">DR 50 - 75 Placements</h4>
            <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
              <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$285</span></div>
              <div class="flex justify-between items-center"><span>3 Sites:</span> <span class="font-black text-lg text-white">$850</span></div>
              <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$1,415</span></div>
              <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$2,800</span></div>
            </div>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order DR 50-75 on Skype</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Niche Edit Backlinks - Curated In-Content Links DA 20+ to DA 50+ | Star SEO",
    description: "Get contextual backlinks inserted into aged, indexed articles with real organic traffic. Choose by Moz DA or Ahrefs DR. 90-day replacement warranty.",
    activePage: "niche-edits",
    content
  });
}

// -------------------------------------------------------------
// PAGE 3: Foreign Link Placements (foreign-links.html)
// -------------------------------------------------------------
function buildForeignLinks() {
  const content = `
${renderPageHero({
  badge: "International SEO Outreach",
  title: "Multilingual & International",
  highlight: "Foreign Link Placements",
  description: "Rank in global Google indices with authentic, high-authority native language backlinks across Germany, France, Spain, Italy, the Netherlands, Sweden, and Latin America.",
  actions: [
    { text: "View Foreign Pricing by RD", href: "#foreign-pricing", primary: true },
    { text: "Inquire on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Pricing Table by RD (Verbatim starseo78.com Catalog) -->
  <section id="foreign-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Foreign Link Placement Packages (by Referring Domains)
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          All packages include native content written by in-country speakers, permanent dofollow links, and full live reports.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- RD 100+ -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Quality Baseline</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">RD 100+ Placements</h4>
          <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
            <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$100</span></div>
            <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$450</span></div>
            <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$850</span></div>
          </div>
          <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 100+ Referring Domains</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Native language 800+ word article</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Authentic ccTLD or localized domain</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order RD 100+ on Skype</a>
        </div>

        <!-- RD 200+ -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all relative">
          <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Popular</span>
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Strong Authority</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">RD 200+ Placements</h4>
          <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
            <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$175</span></div>
            <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$790</span></div>
            <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$1,575</span></div>
          </div>
          <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 200+ Referring Domains</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> High localized organic search authority</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Contextual in-content placement</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order RD 200+ on Skype</a>
        </div>

        <!-- RD 400+ -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] transition-all relative">
          <span class="absolute -top-3 right-6 bg-[#7A5AF8] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Elite</span>
          <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Top-Tier Authority</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">RD 400+ Placements</h4>
          <div class="my-6 p-4 rounded-2xl bg-white/[0.03] space-y-2 text-xs font-mono font-bold text-slate-300">
            <div class="flex justify-between items-center"><span>1 Site:</span> <span class="font-black text-lg text-white">$275</span></div>
            <div class="flex justify-between items-center"><span>5 Sites:</span> <span class="font-black text-lg text-white">$1,250</span></div>
            <div class="flex justify-between items-center"><span>10 Sites:</span> <span class="font-black text-lg text-white">$2,450</span></div>
          </div>
          <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 400+ Referring Domains</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Major regional news & industry portals</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Maximum regional organic ranking boost</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order RD 400+ on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Foreign Link Placements - International Backlinks in German, Spanish, French, etc. | Star SEO",
    description: "Multilingual outreach and foreign link placements across German, French, Spanish, Italian, and Nordic publications. Genuine ccTLD domains.",
    activePage: "foreign-links",
    content
  });
}

// -------------------------------------------------------------
// PAGE 4: White Hat Link Building (white-hat-links.html)
// -------------------------------------------------------------
function buildWhiteHatLinks() {
  const content = `
${renderPageHero({
  badge: "Complete All-In-One Packages",
  title: "Comprehensive White Hat",
  highlight: "Link Building Packages",
  description: "Balanced, multi-tiered link equity packages engineered to safely scale your domain authority using vetted niche edits, guest posts, and tier-1 branded web assets.",
  actions: [
    { text: "View Silver, Gold & Platinum Packs", href: "#packages", primary: true },
    { text: "Discuss Custom Strategy on Skype", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Packages Section (Verbatim starseo78.com Catalog) -->
  <section id="packages" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official White Hat Link Bundles
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Verbatim pricing matching starseo78.com: Silver ($350), Gold ($700), and Platinum ($1,450).
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Silver Pack: $350 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Starter Tier</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Silver Pack</h3>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$350</span>
              <span class="text-xs text-slate-400 font-mono">/ one-time</span>
            </div>
            <ul class="space-y-3.5 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>3 Niche Edits</strong> (DA 15+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>2 Guest Posts</strong> (DA 15+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>Medium.com Post</strong> (High Authority)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Natural Anchor Text Mix</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Live Link Spreadsheet Report</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order Silver Pack on Skype</a>
        </div>

        <!-- Gold Pack: $700 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#fd3f00]/50 shadow-[0_0_35px_rgba(253,63,0,0.2)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3.5 right-8 bg-[#fd3f00] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Most Popular</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Growth Tier</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Gold Pack</h3>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$700</span>
              <span class="text-xs text-slate-400 font-mono">/ one-time</span>
            </div>
            <ul class="space-y-3.5 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>5 Niche Edits</strong> (DA 20+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>3 Guest Posts</strong> (DA 15+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>18 High DA Profile Links</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>Medium Post</strong> (Brand Citation)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>Blogger Post</strong> (Contextual Buffer)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Complete White-Label Excel Report</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order Gold Pack on Skype</a>
        </div>

        <!-- Platinum Pack: $1,450 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#7A5AF8]/50 shadow-[0_0_35px_rgba(122,90,248,0.2)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3.5 right-8 bg-[#7A5AF8] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">High Authority</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Dominance Tier</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Platinum Pack</h3>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$1,450</span>
              <span class="text-xs text-slate-400 font-mono">/ one-time</span>
            </div>
            <ul class="space-y-3.5 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>10 Niche Edits</strong> (DA 40+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>5 Guest Posts</strong> (DA 20+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Dedicated Link Strategist Assigned</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> In-depth Competitor Link Gap Analysis</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Customized Anchor Text Mapping</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Full Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order Platinum Pack on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "White Hat Link Building Packages - Silver, Gold & Platinum Bundles | Star SEO",
    description: "Complete white hat link building packages: Silver ($350), Gold ($700), and Platinum ($1,450). Niche edits, guest posts, and tier-1 brand assets.",
    activePage: "white-hat-links",
    content
  });
}

// -------------------------------------------------------------
// PAGE 5: Wikipedia Backlinks (wikipedia-backlinks.html)
// -------------------------------------------------------------
function buildWikipediaBacklinks() {
  const content = `
${renderPageHero({
  badge: "Ultimate Trust & Citation",
  title: "Real Contextual Reference",
  highlight: "Wikipedia Backlinks",
  description: "Secure genuine Wikipedia citation references on established, relevant articles. Signal unmatched topical authority and domain trust to Google search algorithms.",
  actions: [
    { text: "View All Wikipedia Pricing Tiers", href: "#wiki-pricing", primary: true },
    { text: "Order via Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Wikipedia Pricing Tiers (Exact Live Catalog from starseo78.com: $89 to $8,900) -->
  <section id="wiki-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official Wikipedia Backlinks Packages
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Exact pricing matching the live catalog on starseo78.com.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 1 Link: $89 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Single Citation</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">1 Wikipedia Link</h4>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$89</span>
              <span class="text-xs text-slate-400 font-mono">/ one-time</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 1 Contextual Wikipedia Link</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Relevant Niche Article Selected</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> High Authority Page Selection</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 1 Link on Skype</a>
        </div>

        <!-- 5 Links: $445 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Popular</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Authority Cluster</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">5 Wikipedia Links</h4>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$445</span>
              <span class="text-xs text-slate-400 font-mono">/ one-time</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 5 Contextual Wikipedia Links</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Multiple Diverse Wikipedia Pages</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Unmatched Entity Trust Signals</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order 5 Links on Skype</a>
        </div>

        <!-- 10 Links: $890 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3 right-6 bg-[#7A5AF8] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Best Value</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Scale Brand</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">10 Wikipedia Links</h4>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$890</span>
              <span class="text-xs text-slate-400 font-mono">/ one-time</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 10 Contextual Wikipedia Links</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Complete Wikipedia Footprint</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Powerful Referral Traffic Potential</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order 10 Links on Skype</a>
        </div>

        <!-- 20 Links: $1,780 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Enterprise Pack</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">20 Wikipedia Links</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$1,780</span></div>
            <p class="text-xs text-slate-400 mb-6">Massive tier-1 citation blast across 20 distinct high-authority Wikipedia articles.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 20 Links on Skype</a>
        </div>

        <!-- 50 Links: $4,450 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Agency Bulk</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">50 Wikipedia Links</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$4,450</span></div>
            <p class="text-xs text-slate-400 mb-6">Designed for enterprise brands seeking dominant knowledge graph and authority footprint.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 50 Links on Skype</a>
        </div>

        <!-- 100 Links: $8,900 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Maximum Domination</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">100 Wikipedia Links</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$8,900</span></div>
            <p class="text-xs text-slate-400 mb-6">Comprehensive Wikipedia saturation across 100 high-power topical nodes.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 100 Links on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Wikipedia Backlinks - Permanent Contextual Citations ($89 - $8,900) | Star SEO",
    description: "High authority Wikipedia contextual backlinks from seasoned editors. Guaranteed 90-day stick warranty. Verified pricing from $89 to $8,900.",
    activePage: "wikipedia",
    content
  });
}

// -------------------------------------------------------------
// PAGE 6: EDU Backlinks (edu-backlinks.html)
// -------------------------------------------------------------
function buildEduBacklinks() {
  const content = `
${renderPageHero({
  badge: "Academic Authority",
  title: "High Domain Authority",
  highlight: ".EDU Backlinks Service",
  description: "Secure ultra-rare permanent backlinks on accredited college and university .edu domains with DR 50+ to DR 85+. Instantly elevate your site’s trust score.",
  actions: [
    { text: "View EDU Package Catalog", href: "#edu-pricing", primary: true },
    { text: "Chat on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Packages Section (Verbatim starseo78.com Catalog: $60 to $2,700) -->
  <section id="edu-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official .EDU Backlinks Packages
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Genuine university domain placements with permanent in-content links and complete live reporting.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 1 EDU Post: $60 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Single Post</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">1 .Edu Post</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$60</span> <span class="text-xs text-slate-400 font-mono">/ placement</span></div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 1 High DR .EDU Domain</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Contextual educational article</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Dofollow in-content link</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 1 Post on Skype</a>
        </div>

        <!-- 3 EDU Posts: $175 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Trio Pack</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">3 .Edu Posts</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$175</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 3 Unique .EDU Domains</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> DR 50+ Guaranteed</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Natural contextual integration</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Full live URL report</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 3 Posts on Skype</a>
        </div>

        <!-- 5 EDU Posts: $290 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Popular</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">High Trust</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">5 .Edu Posts</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$290</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 5 Unique .EDU Domains</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Extreme domain trust boost</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Permanent Dofollow links</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-day replacement warranty</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order 5 Posts on Skype</a>
        </div>

        <!-- 10 EDU Posts: $565 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3 right-6 bg-[#7A5AF8] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Best Value</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Authority Powerhouse</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">10 .Edu Posts</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$565</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <p class="text-xs text-slate-400 mb-6">10 distinct university backlink placements across verified .edu resources.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order 10 Posts on Skype</a>
        </div>

        <!-- 25 EDU Posts: $1,400 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Agency Bulk</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">25 .Edu Posts</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$1,400</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <p class="text-xs text-slate-400 mb-6">25 verified .edu placements for substantial institutional link equity.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 25 Posts on Skype</a>
        </div>

        <!-- 50 EDU Posts: $2,700 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Enterprise Scale</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">50 .Edu Posts</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$2,700</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <p class="text-xs text-slate-400 mb-6">50 high-power college and university placements across top accredited faculties.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 50 Posts on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "EDU Backlinks - College & University Permanent Placements ($60 - $2,700) | Star SEO",
    description: "High authority .EDU domain backlinks with DR 50+ guaranteed. Verbatim pricing from 1 post ($60) to 50 posts ($2,700). 90-day replacement warranty.",
    activePage: "edu-links",
    content
  });
}

// -------------------------------------------------------------
// PAGE 7: GMB Verified Listing (gmb-verification.html)
// -------------------------------------------------------------
function buildGmbVerification() {
  const content = `
${renderPageHero({
  badge: "Google Business Profiles",
  title: "100% Phone & Postcard",
  highlight: "GMB Verified Listings",
  description: "Get verified, fully functional Google Business Profiles in any location or category. Ownership transferred safely to your own client Gmail account with a 30-day replacement guarantee.",
  actions: [
    { text: "View Official GMB Verification Tiers", href: "#gmb-pricing", primary: true },
    { text: "Order via Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Pricing Table (Verbatim starseo78.com Catalog: $400 to $20,000) -->
  <section id="gmb-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official GMB Verified Listing Packages
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Exact pricing matching the live catalog on starseo78.com.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 1 GMB: $400 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Single Listing</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">1 GMB Listing</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$400</span> <span class="text-xs text-slate-400 font-mono">/ listing</span></div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 100% Fully Verified GMB Profile</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Google Login Credentials Provided</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Primary & Secondary Categories Set</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 30-Day Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 1 Listing on Skype</a>
        </div>

        <!-- 5 GMB: $2,000 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Multi-Location</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Growth Pack</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">5 GMB Listings</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$2,000</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <ul class="space-y-2.5 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 5 Verified Google Business Profiles</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Target 5 Distinct Cities / Suburbs</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Seamless Safe Ownership Handover</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 30-Day Replacement Warranty</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order 5 Listings on Skype</a>
        </div>

        <!-- 10 GMB: $4,000 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3 right-6 bg-[#7A5AF8] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Scale Local</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Regional Domination</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">10 GMB Listings</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$4,000</span> <span class="text-xs text-slate-400 font-mono">/ package</span></div>
            <p class="text-xs text-slate-400 mb-6">10 fully verified Google Maps listings to blanket an entire metropolitan region.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order 10 Listings on Skype</a>
        </div>

        <!-- 20 GMB: $8,000 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Enterprise Scale</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">20 GMB Listings</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$8,000</span></div>
            <p class="text-xs text-slate-400 mb-6">20 verified listings for large multi-state franchise networks.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 20 Listings on Skype</a>
        </div>

        <!-- 30 GMB: $12,000 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">National Expansion</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">30 GMB Listings</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$12,000</span></div>
            <p class="text-xs text-slate-400 mb-6">30 verified Google Business profiles with full white-label reporting.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 30 Listings on Skype</a>
        </div>

        <!-- 50 GMB: $20,000 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Franchise Domination</span>
            <h4 class="font-display font-black text-2xl text-white mt-1">50 GMB Listings</h4>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$20,000</span></div>
            <p class="text-xs text-slate-400 mb-6">50 verified Google Maps profiles nationwide for enterprise scale.</p>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order 50 Listings on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "GMB Verified Listings - 100% Phone & Postcard Verified Google Maps Profiles | Star SEO",
    description: "Verified Google Business Profiles from 1 listing ($400) to 50 listings ($20,000). Google login credentials provided with a 30-day replacement warranty.",
    activePage: "gmb-verification",
    content
  });
}

// -------------------------------------------------------------
// PAGE 8: GMB Accelerated SEO (gmb-accelerated-seo.html)
// -------------------------------------------------------------
function buildGmbAcceleratedSeo() {
  const content = `
${renderPageHero({
  badge: "Google 3-Pack Optimization",
  title: "Multi-Phased Local Rank Boost",
  highlight: "GMB Accelerated SEO",
  description: "Proprietary multi-phase local optimization engineered to push your Google Business Profile into the coveted top 3 map pack rankings across wide geographic geo-grids.",
  actions: [
    { text: "View Single Phases & Bundled Savings", href: "#gmb-acc-pricing", primary: true },
    { text: "Chat on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Pricing Catalog (Verbatim starseo78.com Catalog: $459 to $1,628) -->
  <section id="gmb-acc-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          GMB Accelerated SEO Pricing
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Order individual phases or save $198 by selecting the All 3 Phases complete bundle.
        </p>
      </div>

      <!-- Single Phase Options -->
      <div class="mb-16">
        <h3 class="font-display font-black text-2xl text-white uppercase mb-8">Single Phase Options</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#14151e] rounded-3xl p-6 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <h4 class="font-display font-black text-lg text-white">Option 1</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-white">$459</span></div>
            <p class="text-xs text-slate-400 mb-6">Phase 1 core local optimization and baseline listing enhancements.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
          </div>

          <div class="bg-[#14151e] rounded-3xl p-6 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <h4 class="font-display font-black text-lg text-white">Option 2</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-white">$488</span></div>
            <p class="text-xs text-slate-400 mb-6">Enhanced geo-tagging, map stack creation, and directory citations.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
          </div>

          <div class="bg-[#14151e] rounded-3xl p-6 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <h4 class="font-display font-black text-lg text-white">Option 3</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-white">$516</span></div>
            <p class="text-xs text-slate-400 mb-6">Full driving directions stack, geo-grid expansion, and map embeds.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
          </div>

          <div class="bg-[#14151e] rounded-3xl p-6 border-2 border-[#fd3f00]/50 relative">
            <span class="absolute -top-3 right-4 bg-[#fd3f00] text-white text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full">Boosted</span>
            <h4 class="font-display font-black text-lg text-white">Option 4 (Boosted)</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-[#fd3f00]">$569</span></div>
            <p class="text-xs text-slate-400 mb-6">Includes high-authority contextual link boost to accelerate indexation.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg transition-all">Order on Skype</a>
          </div>
        </div>
      </div>

      <!-- All 3 Phases Complete Bundle (Save $198) -->
      <div>
        <div class="flex items-center gap-3 mb-8">
          <span class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs uppercase border border-emerald-500/30">Save $198</span>
          <h3 class="font-display font-black text-2xl text-white uppercase">All 3 Phases Complete Bundle</h3>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-[#14151e] rounded-3xl p-6 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <h4 class="font-display font-black text-lg text-white">Bundle Option 1</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-white">$1,299</span></div>
            <p class="text-xs text-slate-400 mb-6">Complete 3-phase execution for standard local business markets.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-[#fd3f00] text-white font-mono font-bold text-xs text-center hover:opacity-90">Order Bundle</a>
          </div>

          <div class="bg-[#14151e] rounded-3xl p-6 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <h4 class="font-display font-black text-lg text-white">Bundle Option 2</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-white">$1,378</span></div>
            <p class="text-xs text-slate-400 mb-6">Complete 3-phase execution with expanded geo-radius coverage.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-[#fd3f00] text-white font-mono font-bold text-xs text-center hover:opacity-90">Order Bundle</a>
          </div>

          <div class="bg-[#14151e] rounded-3xl p-6 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
            <h4 class="font-display font-black text-lg text-white">Bundle Option 3</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-white">$1,448</span></div>
            <p class="text-xs text-slate-400 mb-6">Complete 3-phase execution with advanced driving direction stacks.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-[#fd3f00] text-white font-mono font-bold text-xs text-center hover:opacity-90">Order Bundle</a>
          </div>

          <div class="bg-[#14151e] rounded-3xl p-6 border-2 border-[#fd3f00] shadow-[0_0_35px_rgba(253,63,0,0.25)] relative">
            <span class="absolute -top-3 right-4 bg-[#fd3f00] text-white text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full">Top Choice</span>
            <h4 class="font-display font-black text-lg text-white">Bundle Option 4</h4>
            <div class="my-4"><span class="text-4xl font-display font-black text-[#fd3f00]">$1,628</span></div>
            <p class="text-xs text-slate-400 mb-6">All 3 phases + Authority Link Boost for tough metropolitan areas.</p>
            <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block w-full py-3 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg">Order Bundle</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "GMB Accelerated SEO - Google 3-Pack Map Optimization ($459 - $1,628) | Star SEO",
    description: "Dominate Google Maps 3-Pack rankings. Individual phase options from $459 to $569, and All 3 Phases bundled from $1,299 to $1,628 (Save $198).",
    activePage: "gmb-accelerated",
    content
  });
}

// -------------------------------------------------------------
// PAGE 9: High Quality Local Citations (local-citations.html)
// -------------------------------------------------------------
function buildLocalCitations() {
  const content = `
${renderPageHero({
  badge: "Local SEO Foundations",
  title: "100% NAP Consistent",
  highlight: "High Quality Local Citations",
  description: "Manual business citation building on the web’s most authoritative local and national business directories. Clean, consistent Name, Address, and Phone numbers.",
  actions: [
    { text: "View Citation Packages ($25 - $500)", href: "#citation-pricing", primary: true },
    { text: "Order on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Packages Section (Verbatim starseo78.com Catalog: $25 to $500) -->
  <section id="citation-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official Local Citations Packages
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          From 10 citations ($25) to 200 comprehensive citations ($500) with full login credentials provided.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 10 Citations: $25 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Package 1</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">10 Local Citations</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$25</span></div>
          <ul class="space-y-2 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 10 Top Tier Local Citations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 100% NAP Consistency Guaranteed</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Complete Login Credentials Spreadsheet</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
        </div>

        <!-- 20 Citations: $50 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Package 2</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">20 Local Citations</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$50</span></div>
          <ul class="space-y-2 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 20 High DA Directory Citations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Geo-tagged photo uploads</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Full account access credentials</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
        </div>

        <!-- 30 Citations: $75 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Package 3</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">30 Local Citations</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$75</span></div>
          <ul class="space-y-2 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 30 Verified Citations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Industry specific directories</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Complete login report</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
        </div>

        <!-- 50 Citations: $125 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#fd3f00]/40 shadow-[0_0_30px_rgba(253,63,0,0.15)] relative">
          <span class="absolute -top-3 right-6 bg-[#fd3f00] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Popular</span>
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Package 4</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">50 Local Citations</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$125</span></div>
          <ul class="space-y-2 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 50 Authority Directory Citations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Multi-tier directory coverage</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Detailed Excel report</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg">Order on Skype</a>
        </div>

        <!-- 100 Citations: $250 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border-2 border-[#7A5AF8]/40 shadow-[0_0_30px_rgba(122,90,248,0.15)] relative">
          <span class="absolute -top-3 right-6 bg-[#7A5AF8] text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">Best Value</span>
          <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Package 5</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">100 Local Citations</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$250</span></div>
          <ul class="space-y-2 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 100 Comprehensive Citations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Full national & local footprint</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> All logins & live links provided</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg">Order on Skype</a>
        </div>

        <!-- 200 Citations: $500 -->
        <div class="bg-[#14151e] rounded-3xl p-7 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Package 6</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">200 Local Citations</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$500</span></div>
          <ul class="space-y-2 text-xs text-slate-400 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 200 Total Directory Citations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Maximum local directory saturation</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Complete white-label report</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "High Quality Local Citations - 100% NAP Consistent ($25 - $500) | Star SEO",
    description: "Manual high-quality local citation building from 10 citations ($25) to 200 citations ($500). Full login credentials and live links spreadsheet provided.",
    activePage: "local-citations",
    content
  });
}

// -------------------------------------------------------------
// PAGE 10: Mini Networks (mini-networks.html)
// -------------------------------------------------------------
function buildMiniNetworks() {
  const content = `
${renderPageHero({
  badge: "Supporting Link Architecture",
  title: "Turnkey Tier-1 Buffer",
  highlight: "Mini Networks Package",
  description: "A complete mini supporting authority network featuring 30 niche-relevant articles, 10 GMB map embeds, and balanced anchor text to supercharge your local and organic rankings.",
  actions: [
    { text: "View Turnkey Mini Network ($167)", href: "#mini-network-package", primary: true },
    { text: "Order on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Package Section (Verbatim starseo78.com Catalog: $167) -->
  <section id="mini-network-package" class="py-20 bg-[#0c0d12]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-[#14151e] rounded-3xl p-8 sm:p-12 border-2 border-[#fd3f00]/50 shadow-[0_0_40px_rgba(253,63,0,0.2)] relative">
        <span class="absolute -top-4 right-8 bg-[#fd3f00] text-white text-xs font-mono font-bold uppercase px-4 py-1.5 rounded-full">Turnkey Package</span>
        
        <div class="text-center sm:text-left mb-8 pb-8 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Complete Turnkey Network</span>
            <h3 class="font-display font-black text-3xl sm:text-4xl text-white mt-1">Turnkey Mini Network</h3>
            <p class="text-slate-400 text-xs sm:text-sm mt-2">Engineered specifically to power up local landing pages and GMB profiles.</p>
          </div>
          <div class="text-center sm:text-right">
            <span class="text-6xl font-display font-black text-white">$167</span>
            <span class="block text-xs text-slate-400 font-mono mt-1">one-time investment</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 class="font-display font-black text-base text-white mb-4 uppercase">Included Deliverables:</h4>
            <ul class="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> <strong>(30) 500-Word Niche Articles</strong></li>
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> <strong>(10) Google Map Embeds</strong> with links</li>
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> Brand, URL & LSI anchor variations</li>
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> Tier-1 and Tier-2 network linking structure</li>
            </ul>
          </div>
          <div>
            <h4 class="font-display font-black text-base text-white mb-4 uppercase">Quality Standards:</h4>
            <ul class="space-y-3 text-xs sm:text-sm text-slate-300 font-medium">
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> Pings and RSS submissions for indexing</li>
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> 100% Google algorithmic penalty safe</li>
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> Comprehensive Excel report with live URLs</li>
              <li class="flex items-center gap-2.5"><span class="text-emerald-400 font-bold">✓</span> 5-7 business days turnaround</li>
            </ul>
          </div>
        </div>

        <div class="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-400 font-mono text-center sm:text-left">
            Have multiple sites? Inquire on Skype for custom volume agency rates.
          </p>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs uppercase tracking-wider text-center shadow-lg hover:opacity-95 transition-all">Order Mini Network ($167)</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Mini Networks - Turnkey Supporting Network Package ($167) | Star SEO",
    description: "Turnkey Mini Network package ($167) featuring (30) 500-word niche articles and (10) Google Map embeds with backlinks. Perfect local rank booster.",
    activePage: "mini-networks",
    content
  });
}

// -------------------------------------------------------------
// PAGE 11: SEO Plans (seo-plans.html)
// -------------------------------------------------------------
function buildSeoPlans() {
  const content = `
${renderPageHero({
  badge: "Monthly Growth Retainers",
  title: "All-Inclusive Monthly",
  highlight: "SEO Retainer Plans",
  description: "Comprehensive monthly link development packages combining Web 2.0 blogs, high-DA profile links, article submissions, social bookmarks, document shares, and DA 50+ PBN assets.",
  actions: [
    { text: "View Package 1, 2 & 3 Retainers", href: "#monthly-plans", primary: true },
    { text: "Custom Strategy on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Packages Section (Verbatim starseo78.com Catalog: $65 to $170/mo) -->
  <section id="monthly-plans" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Official Monthly SEO Retainer Plans
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Exact deliverables and pricing matching the live catalog on starseo78.com.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Package 1: $65 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Starter Retainer</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Package 1</h3>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$65</span>
              <span class="text-xs text-slate-400 font-mono">/ month</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>13 Web 2.0 Blogs</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>17 High DA Profile Links</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>10 Article Submissions</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>15 Social Bookmarks</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>15 High PR Comments</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 3 PDF + 2 Image + 2 Video Submissions</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>5 PBNs DA 50+</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Blogger, Medium, Weebly Included</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order Package 1 on Skype</a>
        </div>

        <!-- Package 2: $110 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#fd3f00]/50 shadow-[0_0_35px_rgba(253,63,0,0.2)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3.5 right-8 bg-[#fd3f00] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Popular</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Growth Retainer</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Package 2</h3>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$110</span>
              <span class="text-xs text-slate-400 font-mono">/ month</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>25 Web 2.0 Blogs</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>25 High DA Profile Links</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>15 Article Submissions</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>20 Social Bookmarks</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>20 High PR Comments</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 3 PDF + 2 Image + 2 Video Submissions</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>10 PBNs DA 50+</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> WordPress, Blogger, Medium, Weebly</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order Package 2 on Skype</a>
        </div>

        <!-- Package 3: $170 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#7A5AF8]/50 shadow-[0_0_35px_rgba(122,90,248,0.2)] transition-all flex flex-col justify-between relative">
          <span class="absolute -top-3.5 right-8 bg-[#7A5AF8] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Scale Power</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Domination Retainer</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Package 3</h3>
            <div class="my-6">
              <span class="text-5xl font-display font-black text-white">$170</span>
              <span class="text-xs text-slate-400 font-mono">/ month</span>
            </div>
            <ul class="space-y-2.5 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>35 Web 2.0 Blogs</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>35 High DA Profile Links</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>25 Article Submissions</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>30 Social Bookmarks</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>35 High PR Comments</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 5 PDF + 3 Image + 3 Video Submissions</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>15 PBNs DA 50+</strong></li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> WordPress, Blogger, Medium, Weebly</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order Package 3 on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Monthly SEO Plans - All-In-One SEO Retainers ($65 - $170/mo) | Star SEO",
    description: "Affordable monthly SEO retainers: Package 1 ($65), Package 2 ($110), Package 3 ($170). Web 2.0s, profile links, article submissions, and high DA PBNs.",
    activePage: "seo-plans",
    content
  });
}

// -------------------------------------------------------------
// PAGE 12: Premium Press Releases (press-releases.html)
// -------------------------------------------------------------
function buildPressReleases() {
  const content = `
${renderPageHero({
  badge: "Media Syndication",
  title: "Guaranteed Global Media",
  highlight: "Premium Press Releases",
  description: "Distribute journalistic brand announcements across major national wires, Google News, Bloomberg, Yahoo Finance, AP News, and 400+ television network affiliate stations.",
  actions: [
    { text: "View PR Syndication Packages", href: "#pr-pricing", primary: true },
    { text: "Order via Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Pricing (Verbatim: $199 to $899) -->
  <section id="pr-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Verbatim Catalog & Pricing
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Press Release Distribution Packages
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Standard: $199 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all">
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Standard Wire</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">Standard Distribution</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$199</span></div>
          <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Syndication to 250+ News Outlets</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> FOX, NBC, CBS, ABC Affiliate Stations</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 600-word journalistic writing included</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> White-label PDF distribution report</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Order on Skype</a>
        </div>

        <!-- Authority: $499 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#fd3f00]/50 shadow-[0_0_35px_rgba(253,63,0,0.2)] relative">
          <span class="absolute -top-3.5 right-8 bg-[#fd3f00] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Financial Media</span>
          <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">Authority Wire</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">Authority Financial Syndication</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$499</span></div>
          <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>Yahoo! Finance, Yahoo! News & AP News</strong></li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 400+ High Authority News Outlets</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Bloomberg & MarketWatch Pickups</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Complete interactive live link report</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order on Skype</a>
        </div>

        <!-- Enterprise: $899 -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#7A5AF8]/50 shadow-[0_0_35px_rgba(122,90,248,0.2)] relative">
          <span class="absolute -top-3.5 right-8 bg-[#7A5AF8] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Maximum Viral</span>
          <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">Enterprise Domination</span>
          <h4 class="font-display font-black text-2xl text-white mt-1">Enterprise Multi-Wire</h4>
          <div class="my-6"><span class="text-5xl font-display font-black text-white">$899</span></div>
          <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Syndication across 600+ Global Portals</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Guaranteed Google News Inclusion</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> In-depth PR Strategy and Executive Interview</li>
            <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Permanent DoFollow Links Included</li>
          </ul>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-6 block w-full py-3.5 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Order on Skype</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Premium Press Releases - Guaranteed Major Media Syndication | Star SEO",
    description: "Get published on Yahoo Finance, Bloomberg, AP News, FOX, and 400+ media networks. Packages from $199 to $899 with live link reports.",
    activePage: "press-releases",
    content
  });
}

// -------------------------------------------------------------
// PAGE 13: Managed Linkbuilding (managed-link-building.html)
// -------------------------------------------------------------
function buildManagedLinkBuilding() {
  const content = `
${renderPageHero({
  badge: "Hands-Off Agency Solution",
  title: "End-to-End Strategic",
  highlight: "Managed Link Building",
  description: "Put your link acquisition on autopilot. Our senior strategists handle competitor reverse engineering, target page anchor mapping, custom blogger outreach, and month-over-month traffic scaling.",
  actions: [
    { text: "View Managed Retainers (Save $246)", href: "#managed-pricing", primary: true },
    { text: "Chat on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: false }
  ]
})}

  <!-- Packages Section (Verbatim starseo78.com Catalog: Save $246) -->
  <section id="managed-pricing" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="inline-block px-4 py-1.5 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] border border-[#fd3f00]/30 text-xs font-mono font-bold uppercase tracking-wider mb-2">
          ★ Save $246 vs Individual Orders
        </span>
        <h2 class="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
          Managed Link Building Programs
        </h2>
        <p class="text-slate-400 text-sm sm:text-base mt-2">
          Hands-off monthly campaigns with guaranteed link deliverables, pre-approvals, and dedicated strategist support.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Growth Starter: $999/mo -->
        <div class="bg-[#14151e] rounded-3xl p-8 border border-white/[0.08] hover:border-[#fd3f00]/50 transition-all flex flex-col justify-between">
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">6 Monthly Placements</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Growth Starter</h3>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$999</span> <span class="text-xs text-slate-400 font-mono">/ month</span></div>
            <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>4 Guest Posts</strong> (DR 30 - 50+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>2 Niche Edits</strong> (DR 35+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Monthly Anchor Text & URL Strategy</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Dedicated Account Manager</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> 90-Day Replacement Guarantee</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-white/[0.05] hover:bg-[#fd3f00] text-white font-mono font-bold text-xs text-center border border-white/10 hover:border-transparent transition-all">Start Managed Campaign</a>
        </div>

        <!-- Scale Authority: $1,899/mo (Save $246) -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#fd3f00]/50 shadow-[0_0_35px_rgba(253,63,0,0.2)] relative flex flex-col justify-between">
          <span class="absolute -top-3.5 right-8 bg-[#fd3f00] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Save $246 / mo</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#fd3f00] uppercase tracking-wider">12 Monthly Placements</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Scale Authority</h3>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$1,899</span> <span class="text-xs text-slate-400 font-mono">/ month</span></div>
            <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>7 Guest Posts</strong> (DR 40 - 65+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>5 Niche Edits</strong> (DR 40+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Competitor Gap Reverse-Engineering</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Pre-Approval on Sites & Content Drafts</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Bi-Weekly Ranking Reports</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Start Managed Campaign</a>
        </div>

        <!-- Enterprise Domination: $3,499/mo -->
        <div class="bg-[#14151e] rounded-3xl p-8 border-2 border-[#7A5AF8]/50 shadow-[0_0_35px_rgba(122,90,248,0.2)] relative flex flex-col justify-between">
          <span class="absolute -top-3.5 right-8 bg-[#7A5AF8] text-white text-[11px] font-mono font-bold uppercase px-4 py-1 rounded-full">Enterprise</span>
          <div>
            <span class="text-xs font-mono font-bold text-[#7A5AF8] uppercase tracking-wider">24 Monthly Placements</span>
            <h3 class="font-display font-black text-2xl text-white mt-1">Enterprise Domination</h3>
            <div class="my-6"><span class="text-5xl font-display font-black text-white">$3,499</span> <span class="text-xs text-slate-400 font-mono">/ month</span></div>
            <ul class="space-y-3 text-xs text-slate-300 font-medium pb-6 border-b border-white/[0.08]">
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>15 High DR Guest Posts</strong> (DR 50 - 80+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> <strong>9 Niche Edits</strong> (DA 50+)</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Editorial PR and News Citations Included</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Custom Pitching and Resource Link Building</li>
              <li class="flex items-center gap-2"><span class="text-emerald-400 font-bold">✓</span> Direct Slack / Skype Channel with Strategist</li>
            </ul>
          </div>
          <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="mt-8 block w-full py-4 rounded-full bg-gradient-to-r from-[#7A5AF8] to-purple-700 text-white font-mono font-bold text-xs text-center shadow-lg hover:opacity-95 transition-all">Start Managed Campaign</a>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "Managed Link Building Services - Hands-Off Monthly Campaigns | Star SEO",
    description: "Fully managed monthly link building campaigns. Custom anchor strategy, competitor analysis, and guaranteed placements. Save $246 with bundled management.",
    activePage: "managed-links",
    content
  });
}

// -------------------------------------------------------------
// PAGE 14: Case Studies (case-studies.html)
// -------------------------------------------------------------
function buildCaseStudies() {
  const content = `
${renderPageHero({
  badge: "Proven Track Record",
  title: "Real Client Results &",
  highlight: "SEO Case Studies",
  description: "Examine actual before-and-after organic traffic graphs, keyword ranking surges, and revenue growth across SaaS, local medical, e-commerce, and enterprise B2B niches.",
  actions: [
    { text: "Explore Client Results", href: "#case-grid", primary: true },
    { text: "Request Free Audit For Your Site", href: "contact.html", primary: false }
  ]
})}

  <!-- Case Studies Grid -->
  <section id="case-grid" class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <!-- Case 1: SaaS FinTech -->
      <div class="p-8 sm:p-12 rounded-3xl bg-[#14151e] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div class="lg:col-span-7 space-y-5">
          <span class="inline-block px-3 py-1 rounded-full bg-[#fd3f00]/15 text-[#fd3f00] text-xs font-mono font-bold uppercase">FinTech SaaS</span>
          <h2 class="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            From 8,200 to 36,100 Monthly Organic Visitors (+340% Traffic)
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed">
            The client operated a B2B expense management platform struggling against legacy incumbents. Through a 6-month campaign of DR 50+ guest posts and contextual Wikipedia reference links, we targeted high-intent commercial keywords.
          </p>
          <div class="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
            <div><span class="block font-display font-black text-3xl text-white">+340%</span><span class="text-xs text-slate-400 font-mono">Organic Traffic</span></div>
            <div><span class="block font-display font-black text-3xl text-[#fd3f00]">68</span><span class="text-xs text-slate-400 font-mono">Top 3 Keywords</span></div>
            <div><span class="block font-display font-black text-3xl text-emerald-400">+$210k</span><span class="text-xs text-slate-400 font-mono">Pipeline Value</span></div>
          </div>
        </div>
        <div class="lg:col-span-5 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06] space-y-3 font-mono">
          <div class="flex justify-between text-xs font-bold text-white pb-2 border-b border-white/[0.08]">
            <span>Keyword</span><span>Before</span><span>After</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>corporate expense tool</span><span class="text-rose-400 font-bold">#48</span><span class="text-emerald-400 font-bold">#2</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>automated receipt tracking</span><span class="text-rose-400 font-bold">#34</span><span class="text-emerald-400 font-bold">#1</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>b2b expense software</span><span class="text-rose-400 font-bold">#62</span><span class="text-emerald-400 font-bold">#3</span>
          </div>
        </div>
      </div>

      <!-- Case 2: Multi-Location Dental Practice -->
      <div class="p-8 sm:p-12 rounded-3xl bg-[#14151e] border border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div class="lg:col-span-7 space-y-5">
          <span class="inline-block px-3 py-1 rounded-full bg-[#7A5AF8]/15 text-[#7A5AF8] text-xs font-mono font-bold uppercase">Local Medical</span>
          <h2 class="font-display font-black text-3xl sm:text-4xl text-white uppercase">
            #1 Google 3-Pack Across 9 Suburbs in 90 Days
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed">
            Using our GMB Accelerated SEO All 3 Phases package coupled with 100 clean NAP local citations, this dental practice jumped from invisible map rankings to dominating the local 3-pack for high-ticket cosmetic dentistry terms.
          </p>
          <div class="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
            <div><span class="block font-display font-black text-3xl text-white">9</span><span class="text-xs text-slate-400 font-mono">Suburbs #1</span></div>
            <div><span class="block font-display font-black text-3xl text-[#7A5AF8]">+185%</span><span class="text-xs text-slate-400 font-mono">Direct Calls</span></div>
            <div><span class="block font-display font-black text-3xl text-emerald-400">3.8x</span><span class="text-xs text-slate-400 font-mono">Month 3 ROI</span></div>
          </div>
        </div>
        <div class="lg:col-span-5 bg-white/[0.02] p-6 rounded-2xl border border-white/[0.06] space-y-3 font-mono">
          <div class="flex justify-between text-xs font-bold text-white pb-2 border-b border-white/[0.08]">
            <span>Local Map Search</span><span>Geo-Grid Rank</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>emergency dentist near me</span><span class="text-emerald-400 font-bold">Position 1 (Green)</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>invisalign provider downtown</span><span class="text-emerald-400 font-bold">Position 1 (Green)</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>cosmetic dental clinic</span><span class="text-emerald-400 font-bold">Position 2 (Green)</span>
          </div>
        </div>
      </div>

    </div>
  </section>
  `;

  return wrapPage({
    title: "Case Studies & SEO Results - Star SEO Link Building Agency",
    description: "Explore real case studies showing verifiable organic traffic growth, Google 3-Pack local dominance, and keyword surges powered by Star SEO.",
    activePage: "case-studies",
    content
  });
}

// -------------------------------------------------------------
// PAGE 15: About Us (about.html)
// -------------------------------------------------------------
function buildAbout() {
  const content = `
${renderPageHero({
  badge: "About Star SEO",
  title: "A Decade of Battle-Tested",
  highlight: "White Hat Link Outreach",
  description: "Star SEO was founded with a singular, uncompromising mission: to provide agencies and businesses with 100% genuine manual backlinks on verified websites—zero private blog networks, zero link farms, zero spam.",
  actions: [
    { text: "Explore Our Full Services", href: "index.html#services-overview", primary: true },
    { text: "Contact Our Leadership Team", href: "contact.html", primary: false }
  ]
})}

  <!-- Story & Values -->
  <section class="py-20 bg-[#0c0d12]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-slate-400 leading-relaxed">
      <div>
        <h2 class="font-display font-black text-3xl sm:text-4xl text-white uppercase mb-4">
          Why We Built Star SEO Differently
        </h2>
        <p class="text-sm sm:text-base mb-4">
          The SEO industry is saturated with low-grade automation, hidden PBN networks, and link brokers who sell backlinks on hacked websites or expired domains that collapse during the next Google Core algorithm update.
        </p>
        <p class="text-sm sm:text-base">
          At Star SEO, every placement is the result of human-to-human editorial outreach. We pitch genuine content to real webmasters who run active, trafficked digital publications. Our clients include Fortune 500 brands, boutique digital agencies, and ambitious e-commerce entrepreneurs who cannot afford algorithmic penalties.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center pt-4">
        <div class="p-8 rounded-3xl bg-[#14151e] border border-white/[0.08]">
          <span class="block font-display font-black text-4xl sm:text-5xl text-[#fd3f00] mb-1">10+</span>
          <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">Years in SEO Outreach</span>
        </div>
        <div class="p-8 rounded-3xl bg-[#14151e] border border-white/[0.08]">
          <span class="block font-display font-black text-4xl sm:text-5xl text-white mb-1">15,000+</span>
          <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">Links Landed</span>
        </div>
        <div class="p-8 rounded-3xl bg-[#14151e] border border-white/[0.08]">
          <span class="block font-display font-black text-4xl sm:text-5xl text-[#7A5AF8] mb-1">99.4%</span>
          <span class="text-xs font-mono font-bold text-white uppercase tracking-wider">Client Retention</span>
        </div>
      </div>
    </div>
  </section>
  `;

  return wrapPage({
    title: "About Us - Premier Link Outreach & SEO Agency | Star SEO",
    description: "Learn about Star SEO's 10+ year track record of delivering 100% white hat link building, blogger outreach, and GMB local rankings. Real sites only.",
    activePage: "about",
    content
  });
}

// -------------------------------------------------------------
// PAGE 16: Contact Us (contact.html)
// -------------------------------------------------------------
function buildContact() {
  const content = `
${renderPageHero({
  badge: "Direct Communication",
  title: "Get In Touch With",
  highlight: "Our Outreach Team",
  description: "Have questions about our vetted publisher list, anchor text distribution, or custom bulk orders? Talk directly with our outreach team today.",
  actions: [
    { text: "Chat on Skype: starseo78", href: "https://join.skype.com/invite/pnCgYI1t88HB", target: "_blank", primary: true },
    { text: "Email: contact@starseo78.com", href: "mailto:contact@starseo78.com", primary: false }
  ]
})}

  <!-- Contact Grid & Form -->
  <section class="py-20 bg-[#0c0d12]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
      
      <!-- Direct Contact Info -->
      <div class="lg:col-span-5 space-y-8">
        <div>
          <span class="text-[#fd3f00] font-mono font-bold text-xs uppercase tracking-widest">// RAPID RESPONSE</span>
          <h2 class="font-display font-black text-3xl sm:text-4xl text-white uppercase mt-2 mb-4">
            We Respond Within 2 Hours Guaranteed
          </h2>
          <p class="text-slate-400 text-sm leading-relaxed">
            Whether you need a quick audit of your competitor's link profile, a custom wholesale quote for agency white-labeling, or guidance on the right tier for your budget, we are here to help.
          </p>
        </div>

        <div class="space-y-4">
          <div class="p-6 rounded-2xl bg-[#14151e] border border-white/[0.08] flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-xl border border-sky-500/20">
              <svg class="w-6 h-6 fill-[#00aff0]" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.89-1.92A9.97 9.97 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.47 0-2.84-.4-4.02-1.1l-.29-.17-3.32.92.93-3.23-.19-.32A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/></svg>
            </div>
            <div>
              <span class="text-xs text-slate-400 font-mono">Skype Instant Chat:</span>
              <a href="https://join.skype.com/invite/pnCgYI1t88HB" target="_blank" class="block font-display font-black text-lg text-white hover:text-[#fd3f00] transition-colors">starseo78</a>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-[#14151e] border border-white/[0.08] flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-xl border border-purple-500/20">
              ✉
            </div>
            <div>
              <span class="text-xs text-slate-400 font-mono">Direct Email:</span>
              <a href="mailto:contact@starseo78.com" class="block font-display font-black text-lg text-white hover:text-[#fd3f00] transition-colors">contact@starseo78.com</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Free SEO Analysis Form -->
      <div class="lg:col-span-7 bg-[#14151e] rounded-3xl p-8 sm:p-10 border border-white/[0.08] shadow-2xl">
        <h3 class="font-display font-black text-2xl text-white uppercase mb-2">Request Free SEO & Backlink Audit</h3>
        <p class="text-slate-400 text-xs sm:text-sm mb-6">Fill in your website details and our senior strategist will analyze your competitor link gaps and reply with recommendations.</p>

        <form class="space-y-4" onsubmit="event.preventDefault(); alert('Thank you! Your audit request has been received. Our team will contact you shortly.');">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-mono text-slate-300 mb-1 uppercase font-bold">Your Name</label>
              <input type="text" required placeholder="John Doe" class="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#fd3f00] font-mono">
            </div>
            <div>
              <label class="block text-xs font-mono text-slate-300 mb-1 uppercase font-bold">Email Address</label>
              <input type="email" required placeholder="john@example.com" class="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#fd3f00] font-mono">
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-mono text-slate-300 mb-1 uppercase font-bold">Website URL</label>
              <input type="url" required placeholder="https://yourwebsite.com" class="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#fd3f00] font-mono">
            </div>
            <div>
              <label class="block text-xs font-mono text-slate-300 mb-1 uppercase font-bold">Target Service</label>
              <select class="w-full px-4 py-3 rounded-xl bg-[#14151e] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-[#fd3f00] font-mono">
                <option>Guest Posting Service</option>
                <option>Niche Edit Backlinks</option>
                <option>Foreign Link Placements</option>
                <option>Managed Linkbuilding</option>
                <option>White Hat Link Building</option>
                <option>Wikipedia Backlinks</option>
                <option>GMB Verification & SEO</option>
                <option>EDU Backlinks</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-mono text-slate-300 mb-1 uppercase font-bold">Target Keywords or Project Notes</label>
            <textarea rows="4" placeholder="List your main target keywords, competitors, or specific requirements..." class="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-[#fd3f00] font-mono"></textarea>
          </div>

          <button type="submit" class="w-full py-4 rounded-full bg-gradient-to-r from-[#fd3f00] to-[#ff6a00] text-white font-display font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(253,63,0,0.4)] hover:opacity-95 transition-all flex items-center justify-center gap-2">
            Submit Free Audit Request <span>↗</span>
          </button>
        </form>
      </div>

    </div>
  </section>
  `;

  return wrapPage({
    title: "Contact Us - Free SEO Audit & Consultation | Star SEO",
    description: "Get in touch with Star SEO. Skype: starseo78 | Email: contact@starseo78.com. Request a free competitor link audit and custom quote.",
    activePage: "contact",
    content
  });
}

// -------------------------------------------------------------
// EXECUTE GENERATION
// -------------------------------------------------------------
const pages = [
  { file: 'guest-posting.html', html: buildGuestPosting() },
  { file: 'niche-edit-backlinks.html', html: buildNicheEdits() },
  { file: 'foreign-links.html', html: buildForeignLinks() },
  { file: 'white-hat-links.html', html: buildWhiteHatLinks() },
  { file: 'wikipedia-backlinks.html', html: buildWikipediaBacklinks() },
  { file: 'edu-backlinks.html', html: buildEduBacklinks() },
  { file: 'gmb-verification.html', html: buildGmbVerification() },
  { file: 'gmb-accelerated-seo.html', html: buildGmbAcceleratedSeo() },
  { file: 'local-citations.html', html: buildLocalCitations() },
  { file: 'mini-networks.html', html: buildMiniNetworks() },
  { file: 'seo-plans.html', html: buildSeoPlans() },
  { file: 'press-releases.html', html: buildPressReleases() },
  { file: 'managed-link-building.html', html: buildManagedLinkBuilding() },
  { file: 'case-studies.html', html: buildCaseStudies() },
  { file: 'about.html', html: buildAbout() },
  { file: 'contact.html', html: buildContact() },
];

for (const p of pages) {
  const filePath = path.join(__dirname, p.file);
  fs.writeFileSync(filePath, p.html, 'utf8');
  console.log(`Generated: ${p.file} (${p.html.length} bytes)`);
}

console.log('All 16 subpages successfully generated with Avista theme!');
