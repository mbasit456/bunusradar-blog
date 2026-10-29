<?php
/**
 * Search Results Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

get_header();
?>

<div class="site-content">
    <div class="container">
        <header class="section-header reveal-on-scroll">
            <span class="section-tag">SEARCH QUERY</span>
            <h1 class="section-title">
                Matches for: <span class="gradient-text"><?php echo esc_html( get_search_query() ); ?></span>
            </h1>
        </header>

        <?php if ( have_posts() ) : ?>
            <div class="posts-agency-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/content', 'search' );
                endwhile;
                ?>
            </div>

            <div style="margin-top: 3.5rem; display: flex; justify-content: center;">
                <?php gravity_seo_agency_pagination(); ?>
            </div>
        <?php else : ?>
            <div style="text-align: center; padding: 4rem 1rem;">
                <p style="color:var(--text-muted); font-size:1.2rem; margin-bottom: 2rem;">No matching articles found. Please try different keywords.</p>
                <div style="max-width: 450px; margin: 0 auto;">
                    <?php get_search_form(); ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php
get_footer();
