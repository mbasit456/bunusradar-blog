<?php
/**
 * The template for displaying all single posts
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
            get_template_part( 'template-parts/content', 'single' );

            // Author Box
            $author_id = get_the_author_meta( 'ID' );
            $author_bio = get_the_author_meta( 'description' );
            if ( $author_bio ) :
                ?>
                <section class="author-box">
                    <div class="author-box-avatar">
                        <?php echo get_avatar( $author_id, 72 ); ?>
                    </div>
                    <div class="author-box-content">
                        <h4><?php the_author(); ?></h4>
                        <p class="author-box-bio"><?php echo esc_html( $author_bio ); ?></p>
                    </div>
                </section>
                <?php
            endif;

            // Next / Previous Navigation
            $prev_post = get_previous_post();
            $next_post = get_next_post();

            if ( $prev_post || $next_post ) :
                ?>
                <nav class="post-navigation" aria-label="<?php esc_attr_e( 'Posts', 'gravity-modern' ); ?>">
                    <?php if ( $prev_post ) : ?>
                        <a href="<?php echo esc_url( get_permalink( $prev_post->ID ) ); ?>" class="post-nav-card">
                            <span class="post-nav-label"><?php esc_html_e( '← Previous Article', 'gravity-modern' ); ?></span>
                            <span class="post-nav-title"><?php echo esc_html( get_the_title( $prev_post->ID ) ); ?></span>
                        </a>
                    <?php else : ?>
                        <div></div>
                    <?php endif; ?>

                    <?php if ( $next_post ) : ?>
                        <a href="<?php echo esc_url( get_permalink( $next_post->ID ) ); ?>" class="post-nav-card" style="text-align: right;">
                            <span class="post-nav-label"><?php esc_html_e( 'Next Article →', 'gravity-modern' ); ?></span>
                            <span class="post-nav-title"><?php echo esc_html( get_the_title( $next_post->ID ) ); ?></span>
                        </a>
                    <?php endif; ?>
                </nav>
                <?php
            endif;

            // If comments are open or we have at least one comment, load up the comment template.
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
