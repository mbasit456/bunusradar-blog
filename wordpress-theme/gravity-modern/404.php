<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Gravity_Modern
 */

get_header();
?>

<main id="primary" class="site-main">
    <div class="error-404-container">
        <div class="error-404-code">404</div>
        <h1 class="error-404-title" style="font-size: 2rem; margin-bottom: 1rem;"><?php esc_html_e( 'Page Not Found', 'gravity-modern' ); ?></h1>
        <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: 2rem;">
            <?php esc_html_e( 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.', 'gravity-modern' ); ?>
        </p>

        <div style="margin-bottom: 2.5rem;">
            <?php get_search_form(); ?>
        </div>

        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn-primary">
            <?php esc_html_e( 'Back to Homepage', 'gravity-modern' ); ?>
        </a>
    </div>
</main>

<?php
get_footer();
