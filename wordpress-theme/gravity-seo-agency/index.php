<?php
/**
 * Main Template (Blog Index) for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

get_header();
?>

<div class="site-content">
    <div class="container">
        <header class="section-header reveal-on-scroll">
            <span class="section-tag">AGENCY DISPATCH</span>
            <h1 class="section-title">Search Intelligence &amp; <span class="gradient-text">Algorithmic R&amp;D</span></h1>
            <p class="section-desc">Empirical insights, core update breakdowns, and generative search reverse-engineering.</p>
        </header>

        <?php if ( have_posts() ) : ?>
            <div class="posts-agency-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/content', get_post_type() );
                endwhile;
                ?>
            </div>

            <div style="margin-top: 3.5rem; display: flex; justify-content: center;">
                <?php gravity_seo_agency_pagination(); ?>
            </div>

        <?php else : ?>
            <?php get_template_part( 'template-parts/content', 'none' ); ?>
        <?php endif; ?>
    </div>
</div>

<?php
get_footer();
