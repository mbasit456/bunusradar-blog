<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @package Gravity_Modern
 */
?>

<section class="no-results not-found" style="background: var(--color-surface); padding: 3rem; border: 1px solid var(--color-border); border-radius: var(--radius-lg); text-align: center;">
    <header class="page-header" style="margin-bottom: 1.5rem;">
        <h2 class="page-title" style="font-size: 1.85rem;"><?php esc_html_e( 'Nothing Found', 'gravity-modern' ); ?></h2>
    </header>

    <div class="page-content" style="max-width: 500px; margin: 0 auto;">
        <?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>
            <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">
                <?php
                printf(
                    wp_kses(
                        /* translators: 1: link to WP admin new post page. */
                        __( 'Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'gravity-modern' ),
                        array(
                            'a' => array(
                                'href' => array(),
                            ),
                        )
                    ),
                    esc_url( admin_url( 'post-new.php' ) )
                );
                ?>
            </p>
        <?php else : ?>
            <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">
                <?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'gravity-modern' ); ?>
            </p>
            <?php get_search_form(); ?>
        <?php endif; ?>
    </div>
</section>
