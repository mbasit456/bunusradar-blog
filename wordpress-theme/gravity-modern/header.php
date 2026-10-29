<?php
/**
 * The header for Gravity Modern theme
 *
 * @package Gravity_Modern
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'gravity-modern' ); ?></a>

    <header id="masthead" class="site-header">
        <div class="site-container header-inner">
            <div class="site-branding">
                <?php
                if ( has_custom_logo() ) :
                    the_custom_logo();
                else :
                    ?>
                    <h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
                    <?php
                    $description = get_bloginfo( 'description', 'display' );
                    if ( $description || is_customize_preview() ) :
                        ?>
                        <p class="site-description"><?php echo esc_html( $description ); ?></p>
                    <?php endif; ?>
                <?php endif; ?>
            </div>

            <nav id="site-navigation" class="main-navigation" aria-label="<?php esc_attr_e( 'Primary Menu', 'gravity-modern' ); ?>">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                    'fallback_cb'    => function() {
                        echo '<ul id="primary-menu"><li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'gravity-modern' ) . '</a></li></ul>';
                    },
                ) );
                ?>
            </nav>

            <div class="header-actions">
                <button type="button" class="search-toggle-btn" id="searchToggle" aria-label="<?php esc_attr_e( 'Toggle Search Form', 'gravity-modern' ); ?>">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>

                <button type="button" class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="<?php esc_attr_e( 'Toggle Mobile Navigation', 'gravity-modern' ); ?>" aria-expanded="false">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Collapsible Search Bar -->
        <div id="headerSearchBar" class="header-search-bar">
            <div class="site-container">
                <?php get_search_form(); ?>
            </div>
        </div>

        <!-- Mobile Menu Drawer -->
        <div id="mobileMenuDrawer" class="mobile-menu-drawer">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'primary',
                'menu_id'        => 'mobile-menu-items',
                'container'      => false,
                'fallback_cb'    => function() {
                    echo '<ul><li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'gravity-modern' ) . '</a></li></ul>';
                },
            ) );
            ?>
        </div>
    </header>

    <div id="content" class="site-main">
        <div class="site-container">
