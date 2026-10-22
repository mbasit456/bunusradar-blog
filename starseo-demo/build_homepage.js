const fs = require('fs');
const { AVISTA_HEAD_TAGS, AVISTA_HEADER_HTML, AVISTA_FOOTER_HTML, renderMarquee } = require('./page_layout.js');

const homepageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  ${AVISTA_HEAD_TAGS}
  <title>Star SEO | High-Authority Link Building &amp; Search Engine Dominance</title>
  <style>
    .text-gradient {
      background: linear-gradient(135deg, #fd3f00 0%, #ff7700 50%, #7A5AF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 140px;
      padding-bottom: 80px;
      overflow: hidden;
    }
    .hero-content {
      position: relative;
      z-index: 2;
    }
    .hero-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 18px;
      border-radius: 100px;
      background: rgba(253, 63, 0, 0.1);
      border: 1px solid rgba(253, 63, 0, 0.25);
      color: var(--primary);
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 24px;
    }
    .hero-title {
      font-size: clamp(40px, 7vw, 84px);
      font-weight: 900;
      line-height: 1.05;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      margin-bottom: 24px;
    }
    .hero-lead {
      font-size: clamp(16px, 2vw, 20px);
      color: var(--text-muted);
      max-width: 640px;
      line-height: 1.6;
      margin-bottom: 36px;
    }
    .avatar-stack {
      display: flex;
      align-items: center;
    }
    .avatar-stack img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 3px solid var(--bg-dark);
      margin-left: -12px;
      object-fit: cover;
    }
    .avatar-stack img:first-child {
      margin-left: 0;
    }

    /* Bento Grid */
    .bento-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 32px;
      transition: all 0.3s ease;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .bento-card:hover {
      transform: translateY(-6px);
      border-color: rgba(253, 63, 0, 0.4);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
    }
    .bento-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: rgba(253, 63, 0, 0.1);
      border: 1px solid rgba(253, 63, 0, 0.2);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 24px;
    }
    .bento-number {
      font-family: 'Geist Mono', monospace;
      font-size: 13px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* FAQ accordion */
    .faq-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      margin-bottom: 16px;
      overflow: hidden;
      transition: border-color 0.2s;
    }
    .faq-item:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
    .faq-header {
      padding: 22px 28px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
    }
    .faq-header h4 {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
      color: #fff;
    }
    .faq-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      color: var(--primary);
      font-size: 14px;
    }
    .faq-content {
      padding: 0 28px 24px;
      color: var(--text-muted);
      font-size: 15px;
      line-height: 1.6;
      display: none;
    }
    .faq-item.active .faq-content {
      display: block;
    }
    .faq-item.active .faq-icon {
      transform: rotate(45deg);
      background: var(--primary);
      color: #fff;
    }
  </style>
</head>
<body>

  ${AVISTA_HEADER_HTML}

  <!-- Avista Hero Section -->
  <section class="hero-section">
    <!-- Background Video from Avista Home-03 -->
    <div class="as-hero-4-bg-img">
      <video src="assets/images/h4-video.mp4" autoplay muted loop playsinline></video>
    </div>

    <div class="container hero-content">
      <div class="row align-items-center">
        <div class="col-lg-8">
          <div class="hero-badge-pill">
            <i class="fa-solid fa-asterisk"></i>
            <span>We are Star SEO &middot; Elite Link Outreach</span>
          </div>

          <h1 class="hero-title">
            DRIVE UNSTOPPABLE<br>
            <span class="text-gradient" id="typewriter">RANKINGS</span>
          </h1>

          <p class="hero-lead">
            Accelerate your domain authority with authentic editorial outreach, niche edit placements, and high-impact Tier-1 links built exclusively for long-term Google domination.
          </p>

          <div class="d-flex align-items-center flex-wrap gap-4 mb-5">
            <a href="guest-posting.html" class="btn-cta-avista">
              <span>Explore Services</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
            <a href="#audit" class="btn-cta-avista" style="background:transparent; border:1px solid var(--border-color); box-shadow:none;">
              <span>Free SEO Audit</span>
              <i class="fa-solid fa-magnifying-glass-chart"></i>
            </a>
          </div>

          <!-- Socials + Reviews Stack -->
          <div class="d-flex align-items-center flex-wrap gap-4 pt-4" style="border-top:1px solid var(--border-color);">
            <div class="avatar-stack">
              <img src="assets/images/author-1.webp" alt="Client">
              <img src="assets/images/author-2.webp" alt="Client">
              <img src="assets/images/author-3.webp" alt="Client">
              <img src="assets/images/author-4.webp" alt="Client">
            </div>
            <div>
              <div style="color: #ffaa40; font-size: 14px; margin-bottom: 2px;">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <strong style="color:#fff; margin-left:6px;">5.0</strong>
              </div>
              <p style="font-size:13px; color:var(--text-muted); margin:0;">
                Trusted by 99+ agencies &amp; modern enterprises
              </p>
            </div>
          </div>
        </div>

        <!-- Avista Rotating Circle Text Badge -->
        <div class="col-lg-4 text-center mt-5 mt-lg-0">
          <div class="rotating-circle-badge mx-auto">
            <img src="assets/images/h4-circle-text.webp" alt="Badge" class="circle-img">
            <div class="center-icon">
              <img src="assets/images/s4-illus.webp" alt="Icon" style="width:24px; height:24px;">
            </div>
          </div>
          <p style="font-family:'Geist Mono',monospace; font-size:12px; color:var(--text-muted); text-transform:uppercase; margin-top:20px; letter-spacing:0.1em;">
            ✦ Continuous Organic Authority ✦
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Dual-Direction Moving Marquee Banner -->
  ${renderMarquee()}

  <!-- 4 Pillars Section -->
  <section style="padding: 100px 0; background: #0c0d12; position:relative; z-index:2;">
    <div class="container">
      <div class="row mb-5 align-items-end">
        <div class="col-lg-7">
          <div class="badge-tag" style="color:var(--primary); font-size:13px; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px;">
            // Engineered Search Success
          </div>
          <h2 style="font-size:clamp(32px, 4vw, 48px); font-weight:800; text-transform:uppercase; margin:0;">
            4 Pillars of <span class="text-gradient">Search Dominance</span>
          </h2>
        </div>
        <div class="col-lg-5 text-lg-end mt-3 mt-lg-0">
          <p style="color:var(--text-muted); font-size:15px; margin:0;">
            Our systematic approach transforms organic search into your most profitable acquisition channel.
          </p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-md-6 col-lg-3">
          <div class="bento-card">
            <div>
              <div class="bento-number">01 // STRATEGY</div>
              <div class="bento-icon mt-3"><i class="fa-solid fa-compass"></i></div>
              <h4 style="font-size:20px; font-weight:700; color:#fff; margin-bottom:12px;">Planning &amp; Audit</h4>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">
                Comprehensive domain audit, competitor backlink gap analysis, anchor-text profile modeling, and high-ROI keyword prioritization.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="bento-card">
            <div>
              <div class="bento-number">02 // DISCOVERY</div>
              <div class="bento-icon mt-3"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
              <h4 style="font-size:20px; font-weight:700; color:#fff; margin-bottom:12px;">Outreach &amp; Research</h4>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">
                Deep vetting of real sites with authentic organic traffic. Zero PBNs, zero spam networks, zero toxic automated blasts.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="bento-card">
            <div>
              <div class="bento-number">03 // EXECUTION</div>
              <div class="bento-icon mt-3"><i class="fa-solid fa-sliders"></i></div>
              <h4 style="font-size:20px; font-weight:700; color:#fff; margin-bottom:12px;">Optimizing &amp; Links</h4>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">
                Native editorial content creation, natural contextual anchor insertion, and high-authority contextual links that stick permanently.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="bento-card">
            <div>
              <div class="bento-number">04 // OUTCOME</div>
              <div class="bento-icon mt-3"><i class="fa-solid fa-trophy"></i></div>
              <h4 style="font-size:20px; font-weight:700; color:#fff; margin-bottom:12px;">Results &amp; Dominance</h4>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">
                Rapid keyword indexation, steady top-3 Google rankings, compounding organic visitors, and permanent domain trust.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Telemetry Counter Section -->
  <section style="padding: 60px 0; background: #14151e; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); position:relative; z-index:2;">
    <div class="container">
      <div class="row g-4 text-center">
        <div class="col-6 col-md-3">
          <h3 style="font-size:44px; font-weight:900; color:#fff; font-family:'Geist Mono',monospace; margin-bottom:4px;">
            60K<span style="color:var(--primary);">+</span>
          </h3>
          <p style="color:var(--text-muted); font-size:14px; margin:0; text-transform:uppercase; letter-spacing:0.05em;">Keywords Ranked</p>
        </div>
        <div class="col-6 col-md-3">
          <h3 style="font-size:44px; font-weight:900; color:#fff; font-family:'Geist Mono',monospace; margin-bottom:4px;">
            390<span style="color:var(--primary);">+</span>
          </h3>
          <p style="color:var(--text-muted); font-size:14px; margin:0; text-transform:uppercase; letter-spacing:0.05em;">Campaigns Delivered</p>
        </div>
        <div class="col-6 col-md-3">
          <h3 style="font-size:44px; font-weight:900; color:#fff; font-family:'Geist Mono',monospace; margin-bottom:4px;">
            99<span style="color:var(--primary);">%</span>
          </h3>
          <p style="color:var(--text-muted); font-size:14px; margin:0; text-transform:uppercase; letter-spacing:0.05em;">Client Retention</p>
        </div>
        <div class="col-6 col-md-3">
          <h3 style="font-size:44px; font-weight:900; color:#fff; font-family:'Geist Mono',monospace; margin-bottom:4px;">
            10<span style="color:var(--primary);">+</span>
          </h3>
          <p style="color:var(--text-muted); font-size:14px; margin:0; text-transform:uppercase; letter-spacing:0.05em;">Years Industry Mastery</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Services Bento Grid (NO Packages here - links to dedicated subpages!) -->
  <section style="padding: 100px 0; background: #0c0d12; position:relative; z-index:2;">
    <div class="container">
      <div class="row mb-5 align-items-end">
        <div class="col-lg-8">
          <div class="badge-tag" style="color:var(--primary); font-size:13px; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px;">
            // Full Spectrum Capabilities
          </div>
          <h2 style="font-size:clamp(32px, 4vw, 48px); font-weight:800; text-transform:uppercase; margin:0;">
            Dedicated <span class="text-gradient">SEO Services</span>
          </h2>
          <p style="color:var(--text-muted); font-size:16px; margin-top:12px;">
            Explore our specialized link acquisition capabilities. Every service features dedicated pricing tiers, strict metric filters, and verified placements.
          </p>
        </div>
        <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
          <a href="case-studies.html" class="btn-cta-avista" style="background:transparent; border:1px solid var(--border-color); box-shadow:none;">
            <span>View Case Studies</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="row g-4">
        <!-- 1. Guest Posting -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 01</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(253,63,0,0.15); color:var(--primary); padding:4px 8px; border-radius:4px;">DA30–DA60</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">Guest Posting</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Premium manual outreach on real high-authority publications with active organic traffic, do-follow in-content links, and editorial content.
              </p>
            </div>
            <a href="guest-posting.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 2. Niche Edits -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 02</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(122,90,248,0.15); color:#a78bfa; padding:4px 8px; border-radius:4px;">Aged Posts</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">Niche Edit Backlinks</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Insert your contextual anchor into established, indexed articles that already boast authority and verified Ahrefs traffic of 1k to 100k+.
              </p>
            </div>
            <a href="niche-edit-backlinks.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 3. Foreign Links -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 03</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(16,185,129,0.15); color:#34d399; padding:4px 8px; border-radius:4px;">Global ccTLDs</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">Foreign Country Links</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Native outreach for international geo-targeting across Spain, France, Germany, Italy, Netherlands, and Latin America.
              </p>
            </div>
            <a href="foreign-links.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 4. White Hat Bundles -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 04</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(253,63,0,0.15); color:var(--primary); padding:4px 8px; border-radius:4px;">All-in-One</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">White Hat Link Bundles</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Carefully engineered link diversity packs combining guest posts, niche edits, authority citations, and tier-2 foundational signals.
              </p>
            </div>
            <a href="white-hat-links.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 5. Wikipedia Backlinks -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 05</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(255,255,255,0.1); color:#fff; padding:4px 8px; border-radius:4px;">Permanent DA98</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">Wikipedia Backlinks</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Editorial Wikipedia citations placed naturally on active encyclopedia articles to maximize trust rank and entity authority.
              </p>
            </div>
            <a href="wikipedia-backlinks.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 6. EDU & GOV Backlinks -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 06</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(245,158,11,0.15); color:#fbbf24; padding:4px 8px; border-radius:4px;">Gov &amp; Uni</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">EDU &amp; GOV Backlinks</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Elite educational and government domain links that supply immense trust algorithm signals to break through competitive SERP plateaus.
              </p>
            </div>
            <a href="edu-backlinks.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 7. GMB Verification -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 07</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(253,63,0,0.15); color:var(--primary); padding:4px 8px; border-radius:4px;">Guaranteed</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">GMB Verification</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Guaranteed Google Business Profile verification service across all commercial niches without suspension risk.
              </p>
            </div>
            <a href="gmb-verification.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 8. GMB Accelerated SEO -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 08</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(122,90,248,0.15); color:#a78bfa; padding:4px 8px; border-radius:4px;">Google Maps</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">GMB Accelerated SEO</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Geotagged signals, local schema optimization, and citation networks designed to launch your business directly into Google's Local 3-Pack.
              </p>
            </div>
            <a href="gmb-accelerated-seo.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- 9. Managed Outreach -->
        <div class="col-md-6 col-lg-4">
          <div class="bento-card">
            <div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="bento-number">SERVICE // 09</div>
                <span class="badge-tag" style="font-size:11px; background:rgba(16,185,129,0.15); color:#34d399; padding:4px 8px; border-radius:4px;">Full Autopilot</span>
              </div>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-bottom:12px;">Managed Link Building</h3>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:20px;">
                Complete white-glove monthly link acquisition service. We handle niche prospecting, pitch drafting, content authoring, and QA.
              </p>
            </div>
            <a href="managed-link-building.html" class="btn-cta-avista w-100 justify-content-center" style="font-size:13px; padding:10px 18px;">
              <span>View Packages &amp; Pricing</span>
              <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Case Studies / Proof Section -->
  <section style="padding: 100px 0; background: #14151e; border-top:1px solid var(--border-color); border-bottom:1px solid var(--border-color); position:relative; z-index:2;">
    <div class="container">
      <div class="row mb-5 align-items-end">
        <div class="col-lg-8">
          <div class="badge-tag" style="color:var(--primary); font-size:13px; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px;">
            // Documented Case Studies
          </div>
          <h2 style="font-size:clamp(32px, 4vw, 48px); font-weight:800; text-transform:uppercase; margin:0;">
            Proof of <span class="text-gradient">Real Dominance</span>
          </h2>
        </div>
        <div class="col-lg-4 text-lg-end mt-3 mt-lg-0">
          <a href="case-studies.html" class="btn-cta-avista">
            <span>Read All Case Studies</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="bento-card">
            <div>
              <span class="badge-tag" style="color:#34d399; font-size:12px; background:rgba(16,185,129,0.15); padding:4px 10px; border-radius:99px;">B2B SAAS</span>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-top:16px; margin-bottom:8px;">Enterprise Cloud Software</h3>
              <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">
                Stagnating domain rating was revived through 40 Tier-1 niche edits and editorial guest posts in authoritative tech media.
              </p>
              <div style="font-family:'Geist Mono',monospace; font-size:36px; font-weight:900; color:var(--primary); margin-bottom:4px;">
                +480%
              </div>
              <p style="font-size:13px; color:var(--text-muted); text-transform:uppercase; margin:0;">Organic Traffic Growth</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="bento-card">
            <div>
              <span class="badge-tag" style="color:#a78bfa; font-size:12px; background:rgba(122,90,248,0.15); padding:4px 10px; border-radius:99px;">GLOBAL E-COMMERCE</span>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-top:16px; margin-bottom:8px;">Luxury Apparel Retailer</h3>
              <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">
                International ccTLD outreach across ES, DE, and FR combined with Wikipedia citations drove key commercial buyer terms to #1.
              </p>
              <div style="font-family:'Geist Mono',monospace; font-size:36px; font-weight:900; color:var(--primary); margin-bottom:4px;">
                +950%
              </div>
              <p style="font-size:13px; color:var(--text-muted); text-transform:uppercase; margin:0;">Monthly Organic Revenue</p>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="bento-card">
            <div>
              <span class="badge-tag" style="color:#fbbf24; font-size:12px; background:rgba(245,158,11,0.15); padding:4px 10px; border-radius:99px;">FINTECH DISRUPTOR</span>
              <h3 style="font-size:22px; font-weight:700; color:#fff; margin-top:16px; margin-bottom:8px;">Crypto &amp; Banking App</h3>
              <p style="color:var(--text-muted); font-size:14px; margin-bottom:20px;">
                Aggressive financial guest posting and press releases broke through ultra-competitive banking SERPs in under 90 days.
              </p>
              <div style="font-family:'Geist Mono',monospace; font-size:36px; font-weight:900; color:var(--primary); margin-bottom:4px;">
                +620%
              </div>
              <p style="font-size:13px; color:var(--text-muted); text-transform:uppercase; margin:0;">Top-3 Keyword Placements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Free SEO Audit & Interactive FAQ Section -->
  <section id="audit" style="padding: 100px 0; background: #0c0d12; position:relative; z-index:2;">
    <div class="container">
      <div class="row g-5">
        <!-- Left: Free SEO Audit Form -->
        <div class="col-lg-6">
          <div class="bento-card p-4 p-md-5" style="background:#14151e;">
            <div class="badge-tag mb-3" style="color:var(--primary); font-size:12px;">// FAST RESPONSE WITHIN 1 HOUR</div>
            <h2 style="font-size:32px; font-weight:800; text-transform:uppercase; margin-bottom:12px; color:#fff;">
              Claim Your Free <span class="text-gradient">Link Audit</span>
            </h2>
            <p style="color:var(--text-muted); font-size:15px; margin-bottom:28px;">
              Submit your target URL and primary competitor. Our senior search team will conduct a manual backlink gap audit and report within 60 minutes.
            </p>

            <form onsubmit="event.preventDefault(); alert('Audit requested! Our team will contact you via Skype or email shortly.');">
              <div class="mb-3">
                <label style="font-size:13px; font-weight:600; color:#c4c7d4; margin-bottom:6px; display:block;">Target Website URL</label>
                <input type="url" required placeholder="https://yourwebsite.com" style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); border-radius:10px; padding:12px 16px; color:#fff; font-size:14px; outline:none;">
              </div>
              <div class="mb-3">
                <label style="font-size:13px; font-weight:600; color:#c4c7d4; margin-bottom:6px; display:block;">Target Keywords / Niche</label>
                <input type="text" required placeholder="e.g. CRM software, crypto wallet, dentist" style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); border-radius:10px; padding:12px 16px; color:#fff; font-size:14px; outline:none;">
              </div>
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label style="font-size:13px; font-weight:600; color:#c4c7d4; margin-bottom:6px; display:block;">Your Email Address</label>
                  <input type="email" required placeholder="contact@yourcompany.com" style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); border-radius:10px; padding:12px 16px; color:#fff; font-size:14px; outline:none;">
                </div>
                <div class="col-md-6">
                  <label style="font-size:13px; font-weight:600; color:#c4c7d4; margin-bottom:6px; display:block;">Skype ID (Fastest)</label>
                  <input type="text" placeholder="e.g. live:.cid.12345" style="width:100%; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); border-radius:10px; padding:12px 16px; color:#fff; font-size:14px; outline:none;">
                </div>
              </div>
              <button type="submit" class="btn-cta-avista w-100 justify-content-center" style="padding:14px; font-size:15px;">
                <span>Generate My Audit Report</span>
                <i class="fa-solid fa-bolt"></i>
              </button>
            </form>
          </div>
        </div>

        <!-- Right: Interactive Accordion FAQs -->
        <div class="col-lg-6">
          <div class="badge-tag mb-3" style="color:var(--primary); font-size:12px;">// TRANSPARENCY &amp; PROTOCOL</div>
          <h2 style="font-size:32px; font-weight:800; text-transform:uppercase; margin-bottom:24px; color:#fff;">
            Frequently Asked <span class="text-gradient">Questions</span>
          </h2>

          <div class="faq-item active">
            <div class="faq-header" onclick="this.parentElement.classList.toggle('active')">
              <h4>Are all backlinks permanent and do-follow?</h4>
              <div class="faq-icon"><i class="fa-solid fa-plus"></i></div>
            </div>
            <div class="faq-content">
              Yes, 100%. All guest posts and niche edits placed by Star SEO are permanently hosted on aged indexable articles with do-follow attribute, surrounded by contextually relevant editorial copy.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" onclick="this.parentElement.classList.toggle('active')">
              <h4>Do you use PBNs or link networks?</h4>
              <div class="faq-icon"><i class="fa-solid fa-plus"></i></div>
            </div>
            <div class="faq-content">
              Never. We exclusively outreach to real editorial blogs and publications that have legitimate organic search traffic verified via Ahrefs and SEMrush. We do not place your brand on dangerous private blog networks.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" onclick="this.parentElement.classList.toggle('active')">
              <h4>What is the turnaround time for link deliveries?</h4>
              <div class="faq-icon"><i class="fa-solid fa-plus"></i></div>
            </div>
            <div class="faq-content">
              Standard turnaround is 7 to 14 business days. You will receive a live Google Sheets report detailing target URL, live link, publication domain rating, anchor text, and verification metrics.
            </div>
          </div>

          <div class="faq-item">
            <div class="faq-header" onclick="this.parentElement.classList.toggle('active')">
              <h4>How do I get in direct contact with your outreach team?</h4>
              <div class="faq-icon"><i class="fa-solid fa-plus"></i></div>
            </div>
            <div class="faq-content">
              You can connect with us directly on Skype at <strong>starseo78</strong> or email us at <strong>contact@starseo78.com</strong>. We provide real-time updates and custom enterprise proposals.
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  ${AVISTA_FOOTER_HTML}

  <script>
    // Hero Typewriter Animation
    const words = ["RANKINGS", "ORGANIC TRAFFIC", "BRAND AUTHORITY", "GOOGLE DOMINANCE"];
    let i = 0;
    let timer;

    function typingEffect() {
      let word = words[i].split("");
      var loopTyping = function() {
        if (word.length > 0) {
          document.getElementById('typewriter').innerHTML += word.shift();
        } else {
          setTimeout(deletingEffect, 2000);
          return false;
        }
        timer = setTimeout(loopTyping, 120);
      };
      loopTyping();
    }

    function deletingEffect() {
      let word = words[i].split("");
      var loopDeleting = function() {
        if (word.length > 0) {
          word.pop();
          document.getElementById('typewriter').innerHTML = word.join("");
        } else {
          if (words.length > (i + 1)) {
            i++;
          } else {
            i = 0;
          }
          setTimeout(typingEffect, 500);
          return false;
        }
        timer = setTimeout(loopDeleting, 60);
      };
      loopDeleting();
    }

    typingEffect();
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', homepageHtml);
console.log('Homepage index.html generated successfully with authentic Avista layout & animations!');
