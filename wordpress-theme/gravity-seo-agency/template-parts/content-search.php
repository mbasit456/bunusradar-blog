<?php
/**
 * Search card template part
 *
 * @package Gravity_SEO_Agency
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-agency-card reveal-on-scroll' ); ?>>
    <div class="post-card-content">
        <h3 class="post-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>

        <div class="post-card-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <div class="post-card-meta">
            <span>By <?php the_author(); ?></span>
            <a href="<?php the_permalink(); ?>" style="color:var(--accent-cyan); font-weight:700;">Read Insight →</a>
        </div>
    </div>
</article>
