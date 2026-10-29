<?php
/**
 * Header for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="site-wrap">
    <header class="site-header">
        <div class="container header-inner">
            <div class="brand-wrapper">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
                    <div class="brand-logo-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                    <div>
                        <span class="site-title"><span style="color:#fff;">GRAVITY</span><span style="color:var(--accent-cyan);">SEO</span></span>
                    </div>
                </a>
                <span class="brand-badge">AI 3.0</span>
            </div>

            <nav class="desktop-nav" aria-label="<?php esc_attr_e( 'Main Navigation', 'gravity-seo-agency' ); ?>">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'fallback_cb'    => function() {
                        echo '<ul>
                            <li><a href="' . esc_url( home_url( '/' ) ) . '">Home</a></li>
                            <li><a href="' . esc_url( home_url( '/#services' ) ) . '">Solutions</a></li>
                            <li><a href="' . esc_url( home_url( '/#process' ) ) . '">Methodology</a></li>
                            <li><a href="' . esc_url( home_url( '/#pricing' ) ) . '">Retainers</a></li>
                            <li><a href="' . esc_url( home_url( '/#faq' ) ) . '">FAQ</a></li>
                        </ul>';
                    },
                ) );
                ?>
            </nav>

            <div class="header-actions">
                <a href="#audit" class="btn-glow">
                    <span>Audit Website</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </a>

                <button type="button" class="menu-toggle" id="mobileNavToggle" aria-label="Toggle navigation">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Drawer -->
        <div id="mobileNavDrawer" style="display:none; padding:1.5rem; background:rgba(7,9,14,0.98); border-bottom:1px solid var(--border-subtle);">
            <div class="container">
                <ul style="list-style:none; display:flex; flex-direction:column; gap:1rem; font-size:1.1rem; font-weight:700;">
                    <li><a href="<?php echo esc_url( home_url( '/' ) ); ?>" style="color:#fff;">Home</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#services' ) ); ?>" style="color:#fff;">Solutions</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#process' ) ); ?>" style="color:#fff;">Methodology</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#pricing' ) ); ?>" style="color:#fff;">Retainers</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/#faq' ) ); ?>" style="color:#fff;">FAQ</a></li>
                </ul>
            </div>
        </div>
    </header>
