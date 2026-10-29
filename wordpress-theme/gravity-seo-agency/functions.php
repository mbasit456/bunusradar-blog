<?php
/**
 * Gravity SEO Agency Functions and Definitions
 *
 * @package Gravity_SEO_Agency
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! function_exists( 'gravity_seo_agency_setup' ) ) :
    function gravity_seo_agency_setup() {
        load_theme_textdomain( 'gravity-seo-agency', get_template_directory() . '/languages' );
        add_theme_support( 'automatic-feed-links' );
        add_theme_support( 'title-tag' );
        add_theme_support( 'post-thumbnails' );
        set_post_thumbnail_size( 800, 450, true );
        add_image_size( 'agency-card', 640, 360, true );

        register_nav_menus( array(
            'primary' => esc_html__( 'Primary Agency Menu', 'gravity-seo-agency' ),
            'footer'  => esc_html__( 'Footer Menu', 'gravity-seo-agency' ),
        ) );

        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );

        add_theme_support( 'custom-logo', array(
            'height'      => 60,
            'width'       => 240,
            'flex-height' => true,
            'flex-width'  => true,
        ) );

        add_theme_support( 'align-wide' );
        add_theme_support( 'responsive-embeds' );
    }
endif;
add_action( 'after_setup_theme', 'gravity_seo_agency_setup' );

/**
 * Enqueue scripts, styles, and high-performance fonts.
 */
function gravity_seo_agency_scripts() {
    // Main stylesheet with Google Fonts
    wp_enqueue_style( 'gravity-seo-agency-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Kinetic Animation & Interaction Engine
    wp_enqueue_script(
        'gravity-seo-agency-anim',
        get_template_directory_uri() . '/assets/js/agency-animations.js',
        array(),
        '1.0.0',
        true
    );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'gravity_seo_agency_scripts' );

/**
 * Register widget areas.
 */
function gravity_seo_agency_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Primary Sidebar', 'gravity-seo-agency' ),
        'id'            => 'agency-sidebar',
        'description'   => esc_html__( 'Add widgets here to appear in your blog sidebar.', 'gravity-seo-agency' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'gravity_seo_agency_widgets_init' );

/**
 * Custom excerpt length.
 */
function gravity_seo_agency_excerpt_length( $length ) {
    return 20;
}
add_filter( 'excerpt_length', 'gravity_seo_agency_excerpt_length' );

/**
 * Clean pagination.
 */
function gravity_seo_agency_pagination() {
    the_posts_pagination( array(
        'mid_size'  => 2,
        'prev_text' => esc_html__( '← Prev', 'gravity-seo-agency' ),
        'next_text' => esc_html__( 'Next →', 'gravity-seo-agency' ),
    ) );
}
