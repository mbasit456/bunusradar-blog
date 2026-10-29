<?php
/**
 * Static page content template part
 *
 * @package Gravity_SEO_Agency
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.75rem; font-weight: 900;"><?php the_title(); ?></h1>
    </header>

    <div class="single-article-content">
        <?php the_content(); ?>
    </div>
</article>
