<?php
/**
 * The template for displaying the footer
 *
 * @package Gravity_Modern
 */
?>
        </div><!-- .site-container -->
    </div><!-- #content -->

    <footer id="colophon" class="site-footer">
        <div class="site-container">
            <?php if ( is_active_sidebar( 'footer-col-1' ) || is_active_sidebar( 'footer-col-2' ) || is_active_sidebar( 'footer-col-3' ) ) : ?>
                <div class="footer-widgets">
                    <div class="footer-col"><?php dynamic_sidebar( 'footer-col-1' ); ?></div>
                    <div class="footer-col"><?php dynamic_sidebar( 'footer-col-2' ); ?></div>
                    <div class="footer-col"><?php dynamic_sidebar( 'footer-col-3' ); ?></div>
                </div>
            <?php endif; ?>

            <div class="footer-bottom">
                <div class="site-info">
                    &copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> 
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>. 
                    <?php esc_html_e( 'All rights reserved.', 'gravity-modern' ); ?>
                </div>

                <nav class="footer-navigation" aria-label="<?php esc_attr_e( 'Footer Navigation', 'gravity-modern' ); ?>">
                    <?php
                    wp_nav_menu( array(
                        'theme_location' => 'footer',
                        'menu_id'        => 'footer-menu',
                        'depth'          => 1,
                        'fallback_cb'    => false,
                    ) );
                    ?>
                </nav>
            </div>
        </div>
    </footer>

    <!-- Back to top button -->
    <button id="backToTop" class="back-to-top" aria-label="<?php esc_attr_e( 'Back to top', 'gravity-modern' ); ?>">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    </button>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
