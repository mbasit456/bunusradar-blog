<?php
/**
 * Post card for blog loops
 *
 * @package Gravity_SEO_Agency
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class( 'post-agency-card reveal-on-scroll' ); ?>>
    <?php if ( has_post_thumbnail() ) : ?>
        <div class="post-card-thumb">
            <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail( 'agency-card' ); ?>
            </a>
        </div>
    <?php endif; ?>

    <div class="post-card-content">
        <?php
        $cats = get_the_category();
        if ( ! empty( $cats ) ) :
            ?>
            <span class="post-badge"><?php echo esc_html( $cats[0]->name ); ?></span>
        <?php endif; ?>

        <h3 class="post-card-title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h3>

        <div class="post-card-excerpt">
            <?php the_excerpt(); ?>
        </div>

        <div class="post-card-meta">
            <span>By <?php the_author(); ?></span>
            <span><?php echo esc_html( get_the_date() ); ?></span>
        </div>
    </div>
</article>
