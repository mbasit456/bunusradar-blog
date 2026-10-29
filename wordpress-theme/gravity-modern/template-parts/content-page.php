<?php
/**
 * Template part for displaying page content
 *
 * @package Gravity_Modern
 */
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
