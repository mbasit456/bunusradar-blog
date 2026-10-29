<?php
/**
 * Single post content
 *
 * @package Gravity_SEO_Agency
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header style="margin-bottom: 2.5rem; text-align: left;">
        <?php
        $cats = get_the_category();
        if ( ! empty( $cats ) ) :
            ?>
            <span class="post-badge" style="margin-bottom: 1rem;"><?php echo esc_html( $cats[0]->name ); ?></span>
        <?php endif; ?>

        <h1 style="font-size: clamp(2.2rem, 5vw, 3.25rem); font-weight: 900; line-height: 1.15; margin-bottom: 1.25rem;">
            <?php the_title(); ?>
        </h1>

        <div style="display:flex; gap:1.25rem; font-size: 0.9rem; color: var(--text-muted); padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
            <span>Written by <strong style="color:#fff;"><?php the_author(); ?></strong></span>
            <span>&bull;</span>
            <time><?php echo esc_html( get_the_date() ); ?></time>
        </div>
    </header>

    <?php if ( has_post_thumbnail() ) : ?>
        <div style="margin-bottom: 2.5rem; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle);">
            <?php the_post_thumbnail( 'full' ); ?>
        </div>
    <?php endif; ?>

    <div class="single-article-content">
        <?php the_content(); ?>
    </div>
</article>
