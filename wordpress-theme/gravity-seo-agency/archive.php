<?php
/**
 * Archive Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

get_header();
?>

<div class="site-content">
    <div class="container">
        <header class="section-header reveal-on-scroll">
            <span class="section-tag">TAXONOMY ARCHIVE</span>
            <?php the_archive_title( '<h1 class="section-title">', '</h1>' ); ?>
            <?php the_archive_description( '<p class="section-desc">', '</p>' ); ?>
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
