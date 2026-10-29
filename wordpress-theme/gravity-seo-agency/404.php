<?php
/**
 * 404 Error Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

get_header();
?>

<div class="site-content">
    <div class="container" style="text-align:center; padding: 5rem 1.5rem;">
        <div style="font-family:var(--font-mono); font-size: 6rem; font-weight:900; line-height:1; color:var(--accent-cyan); text-shadow: var(--shadow-neon); margin-bottom: 1rem;">
            404
        </div>
        <h1 style="font-size:2.5rem; margin-bottom: 1rem;">Endpoint Not Found</h1>
        <p style="color:var(--text-muted); font-size:1.15rem; max-width:550px; margin: 0 auto 2.5rem;">
            The requested vector route or URL entity could not be resolved in our index.
        </p>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-glow">
            <span>Return to Agency Home</span>
        </a>
    </div>
</div>

<?php
get_footer();
