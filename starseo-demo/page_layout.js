/**
 * Avista Home-03 Master Layout Generator for Star SEO
 * Grounded directly in Avista Home-03 assets, typography, GSAP animations, Lenis, and magnetic cursor.
 */

const AVISTA_HEAD_TAGS = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Avista Typography: Inter, Geist Mono, Mona Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Mona+Sans:ital,wght@0,200..900;1,200..900&family=Space+Grotesk:wght@600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- FontAwesome & Flaticon -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="assets/css/fontawesome-min.css">
  <link rel="stylesheet" href="assets/css/flaticon-avista.css">
  
  <!-- Bootstrap & Avista Core CSS -->
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
  <link rel="stylesheet" href="assets/css/animate-min.css">
  <link rel="stylesheet" href="assets/css/swiper.min.css">
  <link rel="stylesheet" href="assets/css/avista-core.css">

  <style>
    :root {
      --primary: #fd3f00;
      --secondary: #7A5AF8;
      --bg-dark: #0c0d12;
      --bg-card: #14151e;
      --border-color: rgba(255, 255, 255, 0.08);
      --text-muted: #9496a1;
    }
    body {
      background-color: var(--bg-dark);
      color: #f0f2f7;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }
    h1, h2, h3, h4, .as-h-1, .title, .logo-text {
      font-family: 'Mona Sans', 'Space Grotesk', sans-serif;
      letter-spacing: -0.02em;
    }
    code, .font-mono, .badge-tag {
      font-family: 'Geist Mono', monospace;
    }

    /* Custom Cursor Styles from Avista */
    .wa-cursor {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999999;
      pointer-events: none;
      width: 14px;
      height: 14px;
      background: var(--primary);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.25s, height 0.25s, background-color 0.25s, opacity 0.25s;
      mix-blend-mode: difference;
    }
    .wa-cursor.-pointer {
      width: 48px;
      height: 48px;
      background: rgba(253, 63, 0, 0.35);
      border: 1px solid var(--primary);
      backdrop-filter: blur(2px);
    }
    .wa-cursor.-active {
      transform: translate(-50%, -50%) scale(0.75);
    }

    /* Avista Home-03 Navigation */
    .star-navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 1000;
      background: rgba(12, 13, 18, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      padding: 16px 0;
      transition: all 0.3s ease;
    }
    .star-nav-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .star-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .star-brand-logo {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, #fd3f00, #7A5AF8);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: 900;
      font-size: 20px;
      box-shadow: 0 0 24px rgba(253, 63, 0, 0.4);
    }
    .star-brand-text {
      font-family: 'Mona Sans', sans-serif;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #fff;
      text-transform: uppercase;
    }
    .star-brand-text span {
      color: var(--primary);
    }
    .star-nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .star-nav-links a {
      color: #c4c7d4;
      text-decoration: none;
      font-weight: 500;
      font-size: 15px;
      transition: color 0.2s;
    }
    .star-nav-links a:hover, .star-nav-links a.active {
      color: #fff;
    }
    .star-dropdown {
      position: relative;
    }
    .star-dropdown-menu {
      position: absolute;
      top: 100%;
      left: -100px;
      width: 600px;
      background: #14151e;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 24px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      opacity: 0;
      pointer-events: none;
      transform: translateY(12px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 24px 64px rgba(0,0,0,0.8);
      z-index: 1001;
    }
    .star-dropdown:hover .star-dropdown-menu {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }
    .star-sub-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 10px;
      text-decoration: none;
      transition: background 0.2s;
    }
    .star-sub-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }
    .star-sub-item .icon {
      color: var(--primary);
      font-size: 16px;
      margin-top: 2px;
    }
    .star-sub-item .title {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      display: block;
      margin-bottom: 2px;
    }
    .star-sub-item .desc {
      color: var(--text-muted);
      font-size: 12px;
      display: block;
      line-height: 1.4;
    }
    .btn-cta-avista {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      background: var(--primary);
      color: #fff;
      font-family: 'Mona Sans', sans-serif;
      font-weight: 700;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-radius: 100px;
      text-decoration: none;
      box-shadow: 0 10px 30px rgba(253, 63, 0, 0.35);
      transition: all 0.25s ease;
    }
    .btn-cta-avista:hover {
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 14px 40px rgba(253, 63, 0, 0.6);
    }

    /* Avista Rotating Circle Text Badge */
    .rotating-circle-badge {
      width: 140px;
      height: 140px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .rotating-circle-badge .circle-img {
      width: 100%;
      height: 100%;
      animation: spinCircle 16s linear infinite;
    }
    .rotating-circle-badge .center-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--primary);
      color: #fff;
    }
    @keyframes spinCircle {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Fixed Watermark Background Text */
    .as-home-4-logo-fixed {
      position: fixed;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
      pointer-events: none;
      z-index: 0;
      opacity: 0.04;
    }
    .as-home-4-logo-fixed .logo-text {
      font-size: 18vw;
      font-weight: 900;
      letter-spacing: -0.05em;
      color: #fff;
      margin: 0;
      text-transform: uppercase;
    }

    /* Hero Background Video */
    .as-hero-4-bg-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }
    .as-hero-4-bg-img video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.35;
      filter: saturate(1.4) contrast(1.1);
    }
    .as-hero-4-bg-img::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(12, 13, 18, 0.4) 0%, rgba(12, 13, 18, 0.95) 85%);
    }

    /* Marquee Banners */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
      padding: 16px 0;
    }
    .marquee-track {
      display: inline-flex;
      align-items: center;
      animation: marqueeLeft 28s linear infinite;
    }
    .marquee-track-reverse {
      display: inline-flex;
      align-items: center;
      animation: marqueeRight 28s linear infinite;
    }
    .marquee-container:hover .marquee-track,
    .marquee-container:hover .marquee-track-reverse {
      animation-play-state: paused;
    }
    @keyframes marqueeLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marqueeRight {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .marquee-item {
      display: inline-flex;
      align-items: center;
      gap: 16px;
      font-family: 'Mona Sans', sans-serif;
      font-size: 26px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #fff;
      padding: 0 24px;
    }
    .marquee-item i {
      color: var(--primary);
      font-size: 20px;
    }

    /* Pricing Cards (for subpages) */
    .pricing-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 32px 24px;
      transition: all 0.3s ease;
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .pricing-card:hover {
      transform: translateY(-6px);
      border-color: rgba(253, 63, 0, 0.4);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);
    }
    .pricing-card.featured {
      border-color: var(--primary);
      background: linear-gradient(180deg, rgba(253, 63, 0, 0.08) 0%, var(--bg-card) 60%);
    }

    /* Footer */
    .as-footer {
      background: #08090d;
      border-top: 1px solid var(--border-color);
      padding: 80px 0 40px;
      position: relative;
      z-index: 10;
    }
  </style>
`;

const AVISTA_HEADER_HTML = `
  <nav class="star-navbar">
    <div class="container">
      <div class="star-nav-wrap">
        <!-- Logo -->
        <a href="/" class="star-brand">
          <div class="star-brand-logo">★</div>
          <div class="star-brand-text">STAR <span>SEO</span></div>
        </a>

        <!-- Menu -->
        <ul class="star-nav-links d-none d-lg-flex">
          <li><a href="/">Home</a></li>
          <li class="star-dropdown">
            <a href="guest-posting.html" class="d-flex align-items-center gap-1">
              Services <i class="fa-solid fa-chevron-down" style="font-size:10px;"></i>
            </a>
            <div class="star-dropdown-menu">
              <a href="guest-posting.html" class="star-sub-item">
                <i class="fa-solid fa-newspaper icon"></i>
                <div>
                  <span class="title">Guest Posting</span>
                  <span class="desc">High DR real editorial blogs ($120–$3,450)</span>
                </div>
              </a>
              <a href="niche-edit-backlinks.html" class="star-sub-item">
                <i class="fa-solid fa-link icon"></i>
                <div>
                  <span class="title">Niche Edit Backlinks</span>
                  <span class="desc">Curated contextual links with real traffic ($80–$2,800)</span>
                </div>
              </a>
              <a href="foreign-links.html" class="star-sub-item">
                <i class="fa-solid fa-earth-americas icon"></i>
                <div>
                  <span class="title">Foreign Country Links</span>
                  <span class="desc">Country-specific TLDs ES, FR, DE, IT ($100–$2,450)</span>
                </div>
              </a>
              <a href="white-hat-links.html" class="star-sub-item">
                <i class="fa-solid fa-shield-halved icon"></i>
                <div>
                  <span class="title">White Hat Bundles</span>
                  <span class="desc">Comprehensive multi-tier link campaigns ($350–$1,450)</span>
                </div>
              </a>
              <a href="wikipedia-backlinks.html" class="star-sub-item">
                <i class="fa-solid fa-book-bookmark icon"></i>
                <div>
                  <span class="title">Wikipedia Backlinks</span>
                  <span class="desc">Permanent tier-1 citations ($89–$8,900)</span>
                </div>
              </a>
              <a href="edu-backlinks.html" class="star-sub-item">
                <i class="fa-solid fa-graduation-cap icon"></i>
                <div>
                  <span class="title">EDU &amp; GOV Backlinks</span>
                  <span class="desc">University &amp; state authority links ($60–$2,700)</span>
                </div>
              </a>
              <a href="gmb-verification.html" class="star-sub-item">
                <i class="fa-solid fa-location-dot icon"></i>
                <div>
                  <span class="title">GMB Verification</span>
                  <span class="desc">Guaranteed postcard/video verification ($400–$20k)</span>
                </div>
              </a>
              <a href="gmb-accelerated-seo.html" class="star-sub-item">
                <i class="fa-solid fa-bolt icon"></i>
                <div>
                  <span class="title">GMB Accelerated SEO</span>
                  <span class="desc">Local 3-Pack rank takeover ($459–$1,628)</span>
                </div>
              </a>
              <a href="local-citations.html" class="star-sub-item">
                <i class="fa-solid fa-map-pin icon"></i>
                <div>
                  <span class="title">Local Citations</span>
                  <span class="desc">100% NAP manual directory submissions ($25–$500)</span>
                </div>
              </a>
              <a href="mini-networks.html" class="star-sub-item">
                <i class="fa-solid fa-diagram-project icon"></i>
                <div>
                  <span class="title">Authority Mini Networks</span>
                  <span class="desc">Private 5-site dedicated authority rings ($167)</span>
                </div>
              </a>
              <a href="seo-plans.html" class="star-sub-item">
                <i class="fa-solid fa-chart-line icon"></i>
                <div>
                  <span class="title">Monthly SEO Plans</span>
                  <span class="desc">All-in-one recurring ranking retainer ($65–$170/mo)</span>
                </div>
              </a>
              <a href="managed-link-building.html" class="star-sub-item">
                <i class="fa-solid fa-handshake-angle icon"></i>
                <div>
                  <span class="title">Managed Link Building</span>
                  <span class="desc">Dedicated outreach department ($999–$3,499/mo)</span>
                </div>
              </a>
            </div>
          </li>
          <li><a href="case-studies.html">Case Studies</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>

        <!-- Right CTA -->
        <div class="d-flex align-items-center gap-3">
          <a href="contact.html" class="btn-cta-avista">
            <span>Free SEO Audit</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
`;

const AVISTA_FOOTER_HTML = `
  <footer class="as-footer">
    <div class="container">
      <div class="row g-5 mb-5">
        <div class="col-lg-4">
          <a href="/" class="star-brand mb-3">
            <div class="star-brand-logo">★</div>
            <div class="star-brand-text">STAR <span>SEO</span></div>
          </a>
          <p style="color:var(--text-muted); font-size:14px; max-width:320px; margin-top:16px;">
            Elite link building, niche edits, and search engine domination for modern enterprises, SaaS companies, and digital agencies worldwide.
          </p>
          <div class="d-flex gap-3 mt-4">
            <a href="https://join.skype.com/invite/starseo78" class="text-white-50 hover-white" title="Skype: starseo78"><i class="fa-brands fa-skype fa-lg"></i></a>
            <a href="mailto:contact@starseo78.com" class="text-white-50 hover-white" title="contact@starseo78.com"><i class="fa-solid fa-envelope fa-lg"></i></a>
            <a href="#" class="text-white-50 hover-white"><i class="fa-brands fa-x-twitter fa-lg"></i></a>
            <a href="#" class="text-white-50 hover-white"><i class="fa-brands fa-linkedin fa-lg"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-6">
          <h5 style="color:#fff; font-size:16px; font-weight:700; margin-bottom:20px; text-transform:uppercase;">Outreach</h5>
          <ul style="list-style:none; padding:0; margin:0; font-size:14px; display:flex; flex-direction:column; gap:12px;">
            <li><a href="guest-posting.html" style="color:var(--text-muted); text-decoration:none;">Guest Posting</a></li>
            <li><a href="niche-edit-backlinks.html" style="color:var(--text-muted); text-decoration:none;">Niche Edits</a></li>
            <li><a href="foreign-links.html" style="color:var(--text-muted); text-decoration:none;">Foreign Country Links</a></li>
            <li><a href="white-hat-links.html" style="color:var(--text-muted); text-decoration:none;">White Hat Bundles</a></li>
            <li><a href="managed-link-building.html" style="color:var(--text-muted); text-decoration:none;">Managed Outreach</a></li>
          </ul>
        </div>
        <div class="col-lg-2 col-6">
          <h5 style="color:#fff; font-size:16px; font-weight:700; margin-bottom:20px; text-transform:uppercase;">Authority</h5>
          <ul style="list-style:none; padding:0; margin:0; font-size:14px; display:flex; flex-direction:column; gap:12px;">
            <li><a href="wikipedia-backlinks.html" style="color:var(--text-muted); text-decoration:none;">Wikipedia Links</a></li>
            <li><a href="edu-backlinks.html" style="color:var(--text-muted); text-decoration:none;">EDU &amp; GOV Backlinks</a></li>
            <li><a href="press-releases.html" style="color:var(--text-muted); text-decoration:none;">Press Releases</a></li>
            <li><a href="mini-networks.html" style="color:var(--text-muted); text-decoration:none;">Authority Mini Networks</a></li>
            <li><a href="seo-plans.html" style="color:var(--text-muted); text-decoration:none;">Monthly SEO Plans</a></li>
          </ul>
        </div>
        <div class="col-lg-4">
          <h5 style="color:#fff; font-size:16px; font-weight:700; margin-bottom:20px; text-transform:uppercase;">Contact Information</h5>
          <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:16px; padding:20px;">
            <p style="color:#fff; font-weight:600; margin-bottom:8px;">Direct Skype Outreach</p>
            <p style="font-family:'Geist Mono',monospace; color:var(--primary); font-size:15px; margin-bottom:16px;">
              <i class="fa-brands fa-skype me-2"></i>starseo78
            </p>
            <p style="color:#fff; font-weight:600; margin-bottom:8px;">Direct Email</p>
            <p style="font-family:'Geist Mono',monospace; color:var(--primary); font-size:15px; margin-bottom:0;">
              <i class="fa-solid fa-envelope me-2"></i>contact@starseo78.com
            </p>
          </div>
        </div>
      </div>
      <div style="border-top: 1px solid var(--border-color); padding-top: 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; color:var(--text-muted); font-size:13px;">
        <p class="mb-0">© 2026 Star SEO. All Rights Reserved. Built with Avista Theme Engine.</p>
        <p class="mb-0">Official Contact: Skype <strong>starseo78</strong> · Email <strong>contact@starseo78.com</strong></p>
      </div>
    </div>
  </footer>

  <!-- Fixed Watermark Logo -->
  <div class="as-home-4-logo-fixed">
    <div class="container">
      <h2 class="logo-text">STAR SEO</h2>
    </div>
  </div>

  <!-- Avista Magnetic Cursor Element -->
  <div class="wa-cursor" id="wa-cursor"></div>

  <!-- Core Scripts: jQuery, GSAP, Lenis, Swiper, Avista JS -->
  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/gsap.min.js"></script>
  <script src="assets/js/scrollTrigger.min.js"></script>
  <script src="assets/js/SplitText.min.js"></script>
  <script src="assets/js/lenis.min.js"></script>
  <script src="assets/js/cursor.js"></script>

  <script>
    // Initialize Lenis Smooth Inertia Scroll
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.log('Lenis init:', e);
    }

    // Custom Cursor follower logic
    const cursor = document.getElementById('wa-cursor');
    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
      document.querySelectorAll('a, button, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('-pointer'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('-pointer'));
      });
      document.addEventListener('mousedown', () => cursor.classList.add('-active'));
      document.addEventListener('mouseup', () => cursor.classList.remove('-active'));
    }
  </script>
`;

function renderMarquee(customItems) {
  const items = customItems || [
    '★ GUEST POSTING',
    '⚡ NICHE EDITS',
    '★ HIGH DR BACKLINKS',
    '⚡ WIKIPEDIA CITATIONS',
    '★ EDU & GOV DOMINANCE',
    '⚡ GOOGLE 3-PACK SEO',
    '★ 100% MANUAL OUTREACH'
  ];
  const itemsHtml = items.map(it => `
    <span class="marquee-item">
      <span>${it}</span>
      <i class="fa-solid fa-sparkles"></i>
    </span>
  `).join('');

  return `
    <div style="background: rgba(253, 63, 0, 0.04); border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
      <div class="marquee-container" style="padding: 18px 0;">
        <div class="marquee-track">
          ${itemsHtml}${itemsHtml}${itemsHtml}${itemsHtml}
        </div>
      </div>
      <div class="marquee-container" style="padding: 18px 0; border-top: 1px dashed rgba(255,255,255,0.06); background: rgba(122, 90, 248, 0.04);">
        <div class="marquee-track-reverse">
          ${itemsHtml}${itemsHtml}${itemsHtml}${itemsHtml}
        </div>
      </div>
    </div>
  `;
}

function wrapPage({ title, description, content, activeNav = '' }) {

  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${AVISTA_HEAD_TAGS}
  <title>${title} | Star SEO</title>
  <meta name="description" content="${description || 'Star SEO authority link building services'}">
</head>
<body>
  ${AVISTA_HEADER_HTML}
  <main style="padding-top: 80px;">
    ${content}
  </main>
  ${AVISTA_FOOTER_HTML}
</body>
</html>`;
}

module.exports = {
  AVISTA_HEAD_TAGS,
  AVISTA_HEADER_HTML,
  AVISTA_FOOTER_HTML,
  renderMarquee,
  wrapPage
};

