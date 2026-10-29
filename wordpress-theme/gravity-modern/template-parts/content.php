<?php
/**
 * Template part for displaying posts in a loop/grid
 *
 * @package Gravity_Modern
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-card' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="post-card-thumb">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'gravity-card' ); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="post-card-body">
        <?php gravity_modern_category_tag(); ?>

        <h3 class="post-card-title">
            <a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
        </h3>

        <div class="post-card-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <div class="post-card-meta">
            <?php gravity_modern_posted_by(); ?>
            <span><?php gravity_modern_reading_time(); ?></span>
        </div>
    </div>
</article>
