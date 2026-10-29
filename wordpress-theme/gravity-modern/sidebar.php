<?php
/**
 * The sidebar containing the main widget area
 *
 * @package Gravity_Modern
 */

if ( ! is_active_sidebar( 'sidebar-primary' ) ) {
    return;
}
?>

<aside id="secondary" class="site-sidebar widget-area" aria-label="<?php esc_attr_e( 'Sidebar', 'gravity-modern' ); ?>">
    <?php dynamic_sidebar( 'sidebar-primary' ); ?>
</aside><!-- #secondary -->
