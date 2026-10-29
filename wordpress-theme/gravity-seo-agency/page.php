<?php
/**
 * Static Page Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

get_header();
?>

<div class="site-content">
    <div class="container article-container">
        <?php
        while ( have_posts() ) :
            the_post();
            get_template_part( 'template-parts/content', 'page' );
        endwhile;
        ?>
    </div>
</div>

<?php
get_footer();
