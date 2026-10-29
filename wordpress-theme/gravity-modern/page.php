<?php
/**
 * The template for displaying all pages
 *
 * @package Gravity_Modern
 */

get_header();
?>

<div class="site-content-layout <?php echo is_active_sidebar( 'sidebar-primary' ) ? 'has-sidebar' : 'no-sidebar'; ?>">
    <main id="primary" class="site-content-area">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="article-header">
                    <h1 class="article-title"><?php the_title(); ?></h1>
                </header>

                <?php if ( has_post_thumbnail() ) : ?>
                    <div class="article-featured-image">
                        <?php the_post_thumbnail( 'gravity-hero' ); ?>
                    </div>
                <?php endif; ?>

                <div class="article-content">
                    <?php
                    the_content();

                    wp_link_pages( array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'gravity-modern' ),
                        'after'  => '</div>',
                    ) );
                    ?>
                </div>
            </article>

            <?php
            // If comments are open on pages, display comments
            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;

        endwhile;
        ?>
    </main><!-- #primary -->

    <?php get_sidebar(); ?>
</div><!-- .site-content-layout -->

<?php
get_footer();
