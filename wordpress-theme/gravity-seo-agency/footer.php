<?php
/**
 * Footer for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */
?>
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
                        <div class="brand-logo-icon" style="width:32px; height:32px;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            </svg>
                        </div>
                        <span style="font-family:var(--font-heading); font-size:1.3rem; font-weight:900; color:#fff;">GRAVITY<span style="color:var(--accent-cyan);">SEO</span></span>
                    </div>
                    <p class="footer-brand-desc">
                        Engineering autonomous organic growth loops for high-growth tech enterprises, AI platforms, and venture-backed SaaS.
                    </p>
                    <div style="display:inline-flex; align-items:center; gap:0.5rem; margin-top:1.5rem; padding:0.4rem 0.8rem; background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.25); border-radius:var(--radius-full); font-size:0.75rem; font-family:var(--font-mono); color:var(--accent-emerald);">
                        <span class="live-indicator-dot" style="width:6px; height:6px;"></span>
                        <span>AI Search Crawlers: Operational</span>
                    </div>
                </div>

                <div>
                    <h4 class="footer-heading"><?php esc_html_e( 'Solutions', 'gravity-seo-agency' ); ?></h4>
                    <ul class="footer-links">
                        <li><a href="#services">Generative Engine Optimization (GEO)</a></li>
                        <li><a href="#services">Semantic Vector Clustering</a></li>
                        <li><a href="#services">Programmatic SEO Architecture</a></li>
                        <li><a href="#services">Core Web Vitals Engineering</a></li>
                        <li><a href="#services">Digital PR & Link Velocity</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-heading"><?php esc_html_e( 'Agency', 'gravity-seo-agency' ); ?></h4>
                    <ul class="footer-links">
                        <li><a href="#process">Our 4-Step Flywheel</a></li>
                        <li><a href="#pricing">Retainer Plans</a></li>
                        <li><a href="#faq">Knowledge Base & FAQ</a></li>
                        <li><a href="#audit">Request Live Site Scan</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-heading"><?php esc_html_e( 'Intelligence Dispatch', 'gravity-seo-agency' ); ?></h4>
                    <p style="color:var(--text-muted); font-size:0.875rem; margin-bottom:1rem;">
                        Get bi-weekly breakdown of Google &amp; AI search algorithm shifts.
                    </p>
                    <form onsubmit="event.preventDefault(); alert('Subscribed to AI SEO Dispatch!');" style="display:flex; flex-direction:column; gap:0.6rem;">
                        <input type="email" required placeholder="Enter work email..." style="width:100%; background:rgba(255,255,255,0.05); border:1px solid var(--border-subtle); padding:0.7rem 1rem; border-radius:var(--radius-sm); color:#fff; font-size:0.9rem; outline:none;">
                        <button type="submit" class="btn-glow" style="width:100%; padding:0.65rem;">
                            <span>Subscribe Dispatch</span>
                        </button>
                    </form>
                </div>
            </div>

            <div class="footer-bottom">
                <div>
                    &copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. All rights reserved. Built for the Generative Search Era.
                </div>
                <div style="display:flex; gap:1.5rem;">
                    <a href="#" style="color:var(--text-dim); font-size:0.85rem;">Privacy Policy</a>
                    <a href="#" style="color:var(--text-dim); font-size:0.85rem;">Terms of Service</a>
                    <a href="#" style="color:var(--text-dim); font-size:0.85rem;">Security Standards</a>
                </div>
            </div>
        </div>
    </footer>
</div><!-- .site-wrap -->

<?php wp_footer(); ?>
</body>
</html>
