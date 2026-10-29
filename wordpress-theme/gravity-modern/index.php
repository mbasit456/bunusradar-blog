<?php
/**
 * The main template file
 *
 * @package Gravity_Modern
 */

get_header();
?>

<div class="site-content-layout <?php echo is_active_sidebar( 'sidebar-primary' ) ? 'has-sidebar' : 'no-sidebar'; ?>">
    <main id="primary" class="site-content-area">
        <?php
        if ( have_posts() ) :
            $post_counter = 0;
            $has_featured_hero = is_home() && ! is_paged();

            while ( have_posts() ) :
                the_post();
                $post_counter++;

                // Feature the first post on the homepage
                if ( $has_featured_hero && $post_counter === 1 ) :
                    ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class( 'hero-featured-post' ); ?>>
                        <?php if ( has_post_thumbnail() ) : ?>
                            <div class="hero-thumb">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail( 'gravity-hero' ); ?>
                                </a>
                            </div>
                        <?php endif; ?>

                        <div class="hero-content">
                            <?php gravity_modern_category_tag(); ?>
                            <h2 class="hero-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            <div class="hero-excerpt">
                                <?php the_excerpt(); ?>
                            </div>
                            <div class="post-card-meta">
                                <?php gravity_modern_posted_by(); ?>
                                <span><?php gravity_modern_reading_time(); ?></span>
                            </div>
                        </div>
                    </article>

                    <div class="posts-grid">
                <?php else : ?>
                    <?php if ( ! $has_featured_hero && $post_counter === 1 ) : ?>
                        <div class="posts-grid">
                    <?php endif; ?>

                    <?php get_template_part( 'template-parts/content', get_post_type() ); ?>

                <?php endif; ?>
            <?php endwhile; ?>

            </div><!-- .posts-grid -->

            <?php gravity_modern_pagination(); ?>

        <?php else : ?>

            <?php get_template_part( 'template-parts/content', 'none' ); ?>

        <?php endif; ?>
    </main><!-- #primary -->

    <?php get_sidebar(); ?>
</div><!-- .site-content-layout -->

<?php
get_footer();
