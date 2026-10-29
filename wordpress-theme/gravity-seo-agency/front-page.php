<?php
/**
 * Front Page Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

get_header();
?>

<main id="primary" class="site-main">

    <!-- =========================================================================
         1. Hero Section with AI Scanner & Kinetic Counters
         ========================================================================= -->
    <section class="hero-agency" id="audit">
        <div class="container">
            <!-- Floating Pill Badge -->
            <div class="hero-pill-badge reveal-on-scroll">
                <span class="live-indicator-dot"></span>
                <span>Generative Engine Optimization 3.0 Live</span>
            </div>

            <!-- Kinetic Hero Title -->
            <h1 class="hero-headline reveal-on-scroll delay-1">
                Dominate Google, ChatGPT &amp; <span class="gradient-text">Perplexity Search</span>
            </h1>

            <p class="hero-subtitle reveal-on-scroll delay-2">
                We engineer autonomous organic search flywheels for modern SaaS, AI startups, and high-growth technology enterprises. Scale high-intent traffic with semantic entity architecture.
            </p>

            <!-- Interactive Live SEO Audit Bar -->
            <div class="seo-audit-bar-wrapper reveal-on-scroll delay-3">
                <form id="heroAuditForm" class="seo-audit-bar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-dim); margin-right: 0.5rem;">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input type="text" placeholder="Enter your website URL (e.g. yourcompany.com)" required>
                    <button type="submit" class="btn-glow">
                        <span>Scan Site Now</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </form>

                <!-- Simulated Live Scan Terminal -->
                <div id="scanResultsCard" class="scanner-results-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.5rem; margin-bottom:0.75rem;">
                        <span style="color:#fff; font-weight:700; font-size:0.85rem;">DIAGNOSTIC TELEMETRY</span>
                        <span style="color:var(--accent-cyan); font-size:0.75rem;">SCANNING CLUSTER #4</span>
                    </div>
                    <div class="scan-progress-bar">
                        <div id="scanProgressFill" class="scan-progress-fill"></div>
                    </div>
                    <div id="scanTerminalLog" style="font-size:0.825rem; line-height:1.6; color:var(--text-muted);">
                        &gt; Standby for target initialization...
                    </div>
                </div>
            </div>

            <!-- Floating Statistics with Animated Numbers -->
            <div class="hero-floating-stats reveal-on-scroll delay-4">
                <div class="stat-pill">
                    <div class="stat-number" data-counter="340" data-prefix="+" data-suffix="%">+340%</div>
                    <div class="stat-label">Organic Pipeline Growth</div>
                </div>
                <div class="stat-pill">
                    <div class="stat-number" data-counter="99.4" data-suffix="%" data-decimal="true">99.4%</div>
                    <div class="stat-label">Top 3 Rank Retention</div>
                </div>
                <div class="stat-pill">
                    <div class="stat-number" data-counter="14.8" data-suffix="M" data-decimal="true">14.8M</div>
                    <div class="stat-label">AI Search Impressions</div>
                </div>
                <div class="stat-pill">
                    <div class="stat-number" data-counter="24" data-suffix="/7">24/7</div>
                    <div class="stat-label">Autonomous Vector Crawling</div>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         2. Infinite Logo Marquee
         ========================================================================= -->
    <section class="marquee-section">
        <div class="marquee-title reveal-on-scroll">Empowering Search Dominance for Industry Pioneers</div>
        <div class="marquee-track">
            <div class="marquee-item"><span>⚡</span> ACME.AI</div>
            <div class="marquee-item"><span>✦</span> HYPERVECTOR</div>
            <div class="marquee-item"><span>◈</span> NEXTSCALE</div>
            <div class="marquee-item"><span>❖</span> CLOUDMATRIX</div>
            <div class="marquee-item"><span>▲</span> CYBERFLOW</div>
            <div class="marquee-item"><span>⬡</span> KERNEL LABS</div>
            <div class="marquee-item"><span>⚡</span> ACME.AI</div>
            <div class="marquee-item"><span>✦</span> HYPERVECTOR</div>
            <div class="marquee-item"><span>◈</span> NEXTSCALE</div>
            <div class="marquee-item"><span>❖</span> CLOUDMATRIX</div>
            <div class="marquee-item"><span>▲</span> CYBERFLOW</div>
            <div class="marquee-item"><span>⬡</span> KERNEL LABS</div>
        </div>
    </section>

    <!-- =========================================================================
         3. Bento Grid AI SEO Solutions
         ========================================================================= -->
    <section class="bento-section" id="services">
        <div class="container">
            <div class="section-header reveal-on-scroll">
                <span class="section-tag">ENGINEERING SUITE</span>
                <h2 class="section-title">The Complete <span class="gradient-text">Algorithmic Advantage</span></h2>
                <p class="section-desc">
                    Old SEO playbooks are obsolete. We build high-dimensional semantic search strategies engineered specifically for Google's Gemini-driven SGE and conversational LLMs.
                </p>
            </div>

            <div class="bento-grid">
                <!-- Card 1: GEO Optimization (Span 2) -->
                <div class="bento-card bento-span-2 reveal-on-scroll">
                    <div class="bento-icon-box">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </div>
                    <h3 class="bento-title">Generative Engine Optimization (GEO)</h3>
                    <p class="bento-desc">
                        ChatGPT, Claude, and Perplexity synthesize answers rather than listing links. We structure your knowledge graphs, JSON-LD schemas, and entity authority to ensure your company is cited as the definitive primary source.
                    </p>
                    <ul class="bento-features">
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Multi-LLM Citation &amp; Source Indexing</span>
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Conversational Prompt Authority Mapping</span>
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Deep Knowledge Graph &amp; Entity Node Ingestion</span>
                        </li>
                    </ul>
                </div>

                <!-- Card 2: Vector Keyword Clustering -->
                <div class="bento-card reveal-on-scroll delay-1">
                    <div class="bento-icon-box">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                    </div>
                    <h3 class="bento-title">Vector Clustering</h3>
                    <p class="bento-desc">
                        Transform 10,000+ keywords into dense semantic topical hubs that establish total category dominance without keyword cannibalization.
                    </p>
                    <ul class="bento-features">
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Embeddings-based Topic Maps</span>
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Cannibalization Auto-Detection</span>
                        </li>
                    </ul>
                </div>

                <!-- Card 3: Technical Edge Performance -->
                <div class="bento-card reveal-on-scroll">
                    <div class="bento-icon-box">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                    </div>
                    <h3 class="bento-title">Edge Architecture</h3>
                    <p class="bento-desc">
                        Near-zero TTFB, optimal LCP under 800ms, and dynamic prerendering across distributed edge CDNs for maximum crawl efficiency.
                    </p>
                    <ul class="bento-features">
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>100/100 Core Web Vitals Standard</span>
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Headless Rendering &amp; Caching</span>
                        </li>
                    </ul>
                </div>

                <!-- Card 4: Digital PR & Link Velocity (Span 2) -->
                <div class="bento-card bento-span-2 reveal-on-scroll delay-1">
                    <div class="bento-icon-box">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </div>
                    <h3 class="bento-title">High-Velocity Algorithmic Digital PR</h3>
                    <p class="bento-desc">
                        Links remain Google's fundamental trust signal. We run proprietary empirical benchmark studies and industry reports that naturally attract DR 85+ editorial backlinks from top tech publications.
                    </p>
                    <ul class="bento-features">
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Zero PBNs, 100% White-Hat Editorial Placements</span>
                        </li>
                        <li>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            <span>Data-Driven Original Research Assets</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         4. 4-Step Flywheel Methodology
         ========================================================================= -->
    <section class="process-section" id="process">
        <div class="container">
            <div class="section-header reveal-on-scroll">
                <span class="section-tag">THE PLAYBOOK</span>
                <h2 class="section-title">Autonomous <span class="gradient-text">Ranking Flywheel</span></h2>
                <p class="section-desc">A deterministic 4-stage system built to systematically conquer high-intent revenue keywords.</p>
            </div>

            <div class="process-steps-grid">
                <div class="step-card reveal-on-scroll">
                    <div class="step-number">01</div>
                    <h3 class="step-title">Vector Audit</h3>
                    <p class="step-desc">We map your existing site taxonomy into multi-dimensional embeddings to pinpoint content gaps and authority leaks.</p>
                </div>
                <div class="step-card reveal-on-scroll delay-1">
                    <div class="step-number">02</div>
                    <h3 class="step-title">Entity Architecture</h3>
                    <p class="step-desc">Restructure internal links, canonical silos, and JSON-LD schema so search engines grasp your complete semantic graph.</p>
                </div>
                <div class="step-card reveal-on-scroll delay-2">
                    <div class="step-number">03</div>
                    <h3 class="step-title">Programmatic Scale</h3>
                    <p class="step-desc">Deploy high-velocity comparison grids, template engines, and comprehensive benchmark documentation.</p>
                </div>
                <div class="step-card reveal-on-scroll delay-3">
                    <div class="step-number">04</div>
                    <h3 class="step-title">Authority Loop</h3>
                    <p class="step-desc">Accelerate backlink acquisition and maintain #1 ranking dominance with automated real-time monitoring.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         5. Retainer Pricing Packages
         ========================================================================= -->
    <section class="pricing-section" id="pricing">
        <div class="container">
            <div class="section-header reveal-on-scroll">
                <span class="section-tag">INVESTMENT</span>
                <h2 class="section-title">Predictable Growth <span class="gradient-text">Retainers</span></h2>
                <p class="section-desc">Transparent monthly engagements designed to outpace venture-backed competitors.</p>
            </div>

            <div class="pricing-grid">
                <!-- Tier 1 -->
                <div class="pricing-card reveal-on-scroll">
                    <h3 class="plan-name">Seed Growth</h3>
                    <p class="plan-desc">For early startups scaling initial organic customer acquisition.</p>
                    <div class="plan-price">$3,800<span> /mo</span></div>
                    <ul class="plan-features">
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Complete Technical &amp; Core Web Vitals Audit</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 50 Target Vector Keyword Clusters</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 4 In-Depth Research Content Assets/mo</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Monthly Performance Telemetry</li>
                    </ul>
                    <a href="#audit" class="btn-secondary" style="justify-content:center;">Select Seed Plan</a>
                </div>

                <!-- Tier 2 (Featured) -->
                <div class="pricing-card featured reveal-on-scroll delay-1">
                    <span class="pricing-badge-popular">MOST POPULAR FOR SAAS</span>
                    <h3 class="plan-name">Scale AI</h3>
                    <p class="plan-desc">For high-growth scaleups ready to dominate high-intent category search.</p>
                    <div class="plan-price">$7,500<span> /mo</span></div>
                    <ul class="plan-features">
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Full Generative Engine Optimization (GEO)</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 200+ Semantic Keyword Cluster Graphs</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 12 Programmatic &amp; Data Assets/mo</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 8 Guaranteed DR 70+ Editorial Links/mo</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Dedicated Search Architect &amp; Slack Channel</li>
                    </ul>
                    <a href="#audit" class="btn-glow" style="justify-content:center;">Accelerate With Scale</a>
                </div>

                <!-- Tier 3 -->
                <div class="pricing-card reveal-on-scroll delay-2">
                    <h3 class="plan-name">Enterprise</h3>
                    <p class="plan-desc">For large multinational organizations and public tech companies.</p>
                    <div class="plan-price">$14,000<span> /mo</span></div>
                    <ul class="plan-features">
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Global Multi-Domain Strategy</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Unlimited Vector Clustering &amp; Hubs</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Tier-1 Publication Digital PR Campaigns</li>
                        <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Custom Headless Edge Migration Support</li>
                    </ul>
                    <a href="#audit" class="btn-secondary" style="justify-content:center;">Contact Enterprise Desk</a>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         6. Interactive FAQ Accordion
         ========================================================================= -->
    <section class="faq-section" id="faq">
        <div class="container">
            <div class="section-header reveal-on-scroll">
                <span class="section-tag">CLARITY</span>
                <h2 class="section-title">Frequently Asked <span class="gradient-text">Questions</span></h2>
            </div>

            <div class="faq-list">
                <div class="faq-item is-open reveal-on-scroll">
                    <button type="button" class="faq-question">
                        <span>How does Generative Engine Optimization (GEO) differ from classic SEO?</span>
                        <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div class="faq-answer">
                        Traditional SEO focuses primarily on ten blue links and exact keyword density. GEO focuses on high-dimensional semantic entities, structured citation formats, and schema markup that large language models (like ChatGPT, Perplexity, and Google Gemini) consume to generate direct synthetic responses.
                    </div>
                </div>

                <div class="faq-item reveal-on-scroll delay-1">
                    <button type="button" class="faq-question">
                        <span>How quickly do we see organic ranking improvements?</span>
                        <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div class="faq-answer">
                        Technical improvements and schema indexation take effect within 14 to 30 days. Core keyword cluster rankings and organic traffic acceleration typically compound noticeably within 60 to 90 days.
                    </div>
                </div>

                <div class="faq-item reveal-on-scroll delay-2">
                    <button type="button" class="faq-question">
                        <span>Do you provide genuine white-hat backlinks?</span>
                        <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div class="faq-answer">
                        Yes, exclusively. We strictly avoid private blog networks (PBNs), spam farms, or paid link schemes. All links are acquired via original benchmark research, data releases, and journalistic digital PR that naturally commands editorial citations.
                    </div>
                </div>

                <div class="faq-item reveal-on-scroll delay-3">
                    <button type="button" class="faq-question">
                        <span>Can we integrate this WordPress theme into our existing setup?</span>
                        <svg class="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div class="faq-answer">
                        Absolutely. This theme is 100% compliant with standard WordPress core guidelines, Gutenberg block editors, and popular SEO plugins like Yoast, RankMath, and All in One SEO.
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- =========================================================================
         7. Final High-Conversion CTA
         ========================================================================= -->
    <section class="cta-banner-section">
        <div class="container">
            <div class="cta-banner reveal-on-scroll">
                <h2 style="font-size:clamp(2.2rem, 5vw, 3.5rem); margin-bottom:1.25rem;">
                    Ready to Outrank Competitors in the <span class="gradient-text">AI Search Era?</span>
                </h2>
                <p style="color:var(--text-muted); font-size:1.2rem; max-width:650px; margin:0 auto 2.5rem;">
                    Claim your complimentary 30-minute organic growth teardown and technical vector analysis.
                </p>
                <div style="display:flex; justify-content:center; gap:1.25rem; flex-wrap:wrap;">
                    <a href="#audit" class="btn-glow" style="padding:1rem 2.2rem; font-size:1.05rem;">
                        <span>Run Free Website Audit</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

</main>

<?php
get_footer();
