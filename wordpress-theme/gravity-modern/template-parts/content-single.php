<?php
/**
 * Template part for displaying single post content
 *
 * @package Gravity_Modern
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="article-header">
        <?php gravity_modern_category_tag(); ?>

        <h1 class="article-title"><?php the_title(); ?></h1>

        <div class="article-meta">
            <?php gravity_modern_posted_by(); ?>
            <span class="meta-sep">&bull;</span>
            <?php gravity_modern_posted_on(); ?>
            <span class="meta-sep">&bull;</span>
            <span class="meta-reading-time">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <?php echo gravity_modern_reading_time(); ?>
            </span>
        </div>
    </header>

    <?php if ( has_post_thumbnail() ) : ?>
        <div class="article-featured-image">
            <?php the_post_thumbnail( 'gravity-hero' ); ?>
        </div>
    <?php endif; ?>

    <div class="article-content">
        <?php
        the_content(
            sprintf(
                wp_kses(
                    /* translators: %s: Name of current post. Only visible to screen readers */
                    __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'gravity-modern' ),
                    array(
                        'span' => array(
                            'class' => array(),
                        ),
                    )
                ),
                wp_kses_post( get_the_title() )
            )
        );

        wp_link_pages( array(
            'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'gravity-modern' ),
            'after'  => '</div>',
        ) );
        ?>
    </div>

    <?php
    $tags = get_the_tags();
    if ( $tags ) :
        ?>
        <div class="post-tags-container">
            <?php foreach ( $tags as $tag ) : ?>
                <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" class="post-tag">
                    #<?php echo esc_html( $tag->name ); ?>
                </a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</article>
