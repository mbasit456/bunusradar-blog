<?php
/**
 * Sidebar Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

if ( ! is_active_sidebar( 'agency-sidebar' ) ) {
    return;
}
?>

<aside id="secondary" class="widget-area">
    <?php dynamic_sidebar( 'agency-sidebar' ); ?>
</aside>
