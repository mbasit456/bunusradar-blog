<?php
/**
 * Single Article Template for Gravity SEO Agency
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
            get_template_part( 'template-parts/content', 'single' );

            if ( comments_open() || get_comments_number() ) :
                comments_template();
            endif;
        endwhile;
        ?>
    </div>
</div>

<?php
get_footer();
