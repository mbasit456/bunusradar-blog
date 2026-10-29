<?php
/**
 * The template for displaying search results pages
 *
 * @package Gravity_Modern
 */

get_header();
?>

<div class="site-content-layout <?php echo is_active_sidebar( 'sidebar-primary' ) ? 'has-sidebar' : 'no-sidebar'; ?>">
    <main id="primary" class="site-content-area">
        <?php if ( have_posts() ) : ?>
            <header class="page-header" style="margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--color-border);">
                <h1 class="page-title" style="font-size: 2.25rem; font-weight: 800;">
                    <?php
                    /* translators: %s: search query. */
                    printf( esc_html__( 'Search Results for: "%s"', 'gravity-modern' ), '<span style="color: var(--color-primary);">' . get_search_query() . '</span>' );
                    ?>
                </h1>
                <p style="color: var(--color-text-muted); margin-top: 0.5rem; margin-bottom: 0;">
                    <?php
                    global $wp_query;
                    printf(
                        /* translators: %d: number of results */
                        esc_html( _n( 'Found %d result', 'Found %d results', (int) $wp_query->found_posts, 'gravity-modern' ) ),
                        (int) $wp_query->found_posts
                    );
                    ?>
                </p>
            </header>

            <div class="posts-grid">
                <?php
                while ( have_posts() ) :
                    the_post();
                    get_template_part( 'template-parts/content', 'search' );
                endwhile;
                ?>
            </div>

            <?php gravity_modern_pagination(); ?>

        <?php else : ?>

            <header class="page-header" style="margin-bottom: 2rem;">
                <h1 class="page-title" style="font-size: 2.25rem; font-weight: 800;">
                    <?php
                    /* translators: %s: search query. */
                    printf( esc_html__( 'Nothing Found for: "%s"', 'gravity-modern' ), esc_html( get_search_query() ) );
                    ?>
                </h1>
            </header>

            <div class="search-empty-content" style="background: var(--color-surface); padding: 2.5rem; border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
                <p style="color: var(--color-text-muted); font-size: 1.05rem; margin-bottom: 1.5rem;">
                    <?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'gravity-modern' ); ?>
                </p>
                <?php get_search_form(); ?>
            </div>

        <?php endif; ?>
    </main><!-- #primary -->

    <?php get_sidebar(); ?>
</div><!-- .site-content-layout -->

<?php
get_footer();
