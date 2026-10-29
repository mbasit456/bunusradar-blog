<?php
/**
 * The template for displaying archive pages
 *
 * @package Gravity_Modern
 */

get_header();
?>

<div class="site-content-layout <?php echo is_active_sidebar( 'sidebar-primary' ) ? 'has-sidebar' : 'no-sidebar'; ?>">
    <main id="primary" class="site-content-area">
        <?php if ( have_posts() ) : ?>
            <header class="page-header" style="margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border);">
                <?php
                the_archive_title( '<h1 class="page-title" style="font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem;">', '</h1>' );
                the_archive_description( '<div class="archive-description" style="color: var(--color-text-muted); font-size: 1.05rem;">', '</div>' );
                ?>
            </header>

            <div class="posts-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/content', get_post_type() );
                endwhile;
                ?>
            </div>

            <?php gravity_modern_pagination(); ?>

        <?php else : ?>

            <?php get_template_part( 'template-parts/content', 'none' ); ?>

        <?php endif; ?>
    </main><!-- #primary -->

    <?php get_sidebar(); ?>
</div><!-- .site-content-layout -->

<?php
get_footer();
