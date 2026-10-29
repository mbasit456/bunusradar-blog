<?php
/**
 * Gravity Modern Theme Functions & Definitions
 *
 * @package Gravity_Modern
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

if ( ! function_exists( 'gravity_modern_setup' ) ) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     */
    function gravity_modern_setup() {
        // Make theme available for translation.
        load_theme_textdomain( 'gravity-modern', get_template_directory() . '/languages' );

        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        // Let WordPress manage the document title.
        add_theme_support( 'title-tag' );

        // Enable support for Post Thumbnails on posts and pages.
        add_theme_support( 'post-thumbnails' );
        set_post_thumbnail_size( 800, 450, true );
        add_image_size( 'gravity-card', 640, 360, true );
        add_image_size( 'gravity-hero', 1200, 675, true );

        // Register Primary and Footer navigation menus.
        register_nav_menus( array(
            'primary' => esc_html__( 'Primary Header Menu', 'gravity-modern' ),
            'footer'  => esc_html__( 'Footer Menu', 'gravity-modern' ),
        ) );

        // Switch default core markup for search form, comment form, etc. to output valid HTML5.
        add_theme_support( 'html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
            'style',
            'script',
        ) );

        // Set up custom logo support.
        add_theme_support( 'custom-logo', array(
            'height'      => 60,
            'width'       => 240,
            'flex-height' => true,
            'flex-width'  => true,
            'header-text' => array( 'site-title', 'site-description' ),
        ) );

        // Gutenberg block features support.
        add_theme_support( 'align-wide' );
        add_theme_support( 'responsive-embeds' );
        add_theme_support( 'wp-block-styles' );
    }
endif;
add_action( 'after_setup_theme', 'gravity_modern_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 */
function gravity_modern_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'gravity_modern_content_width', 1140 );
}
add_action( 'after_setup_theme', 'gravity_modern_content_width', 0 );

/**
 * Register widget area.
 */
function gravity_modern_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Primary Sidebar', 'gravity-modern' ),
        'id'            => 'sidebar-primary',
        'description'   => esc_html__( 'Add widgets here to appear in your sidebar.', 'gravity-modern' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    for ( $i = 1; $i <= 3; $i++ ) {
        register_sidebar( array(
            'name'          => sprintf( esc_html__( 'Footer Column %d', 'gravity-modern' ), $i ),
            'id'            => 'footer-col-' . $i,
            'description'   => sprintf( esc_html__( 'Add widgets to Footer Column %d.', 'gravity-modern' ), $i ),
            'before_widget' => '<section id="%1$s" class="widget %2$s">',
            'after_widget'  => '</section>',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>',
        ) );
    }
}
add_action( 'widgets_init', 'gravity_modern_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function gravity_modern_scripts() {
    // Main stylesheet
    wp_enqueue_style( 'gravity-modern-style', get_stylesheet_uri(), array(), '1.0.0' );

    // Main JavaScript
    wp_enqueue_script(
        'gravity-modern-main',
        get_template_directory_uri() . '/assets/js/main.js',
        array(),
        '1.0.0',
        true
    );

    // Threaded comments script for single posts
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'gravity_modern_scripts' );

/**
 * Calculate estimated reading time for a post.
 */
function gravity_modern_reading_time() {
    $content = get_post_field( 'post_content', get_the_ID() );
    $word_count = str_word_count( strip_tags( $content ) );
    $reading_time = ceil( $word_count / 200 ); // Average 200 words per minute
    if ( $reading_time < 1 ) {
        $reading_time = 1;
    }
    return sprintf( esc_html__( '%d min read', 'gravity-modern' ), $reading_time );
}

/**
 * Custom excerpt length.
 */
function gravity_modern_custom_excerpt_length( $length ) {
    return 24;
}
add_filter( 'excerpt_length', 'gravity_modern_custom_excerpt_length', 999 );

/**
 * Custom excerpt more string.
 */
function gravity_modern_excerpt_more( $more ) {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'gravity_modern_excerpt_more' );

/**
 * Output post category badge.
 */
function gravity_modern_category_tag() {
    $categories = get_the_category();
    if ( ! empty( $categories ) ) {
        $category = $categories[0];
        printf(
            '<a href="%1$s" class="post-category-tag">%2$s</a>',
            esc_url( get_category_link( $category->term_id ) ),
            esc_html( $category->name )
        );
    }
}

/**
 * Output post publication date.
 */
function gravity_modern_posted_on() {
    $time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
    if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
        $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';
    }

    $time_string = sprintf(
        $time_string,
        esc_attr( get_the_date( DATE_W3C ) ),
        esc_html( get_the_date() )
    );

    echo '<span class="posted-on">' . $time_string . '</span>';
}

/**
 * Output author badge.
 */
function gravity_modern_posted_by() {
    $author_id = get_the_author_meta( 'ID' );
    $avatar = get_avatar( $author_id, 24, '', esc_attr( get_the_author() ) );
    $author_link = get_author_posts_url( $author_id );

    echo '<span class="post-meta-author">';
    if ( $avatar ) {
        echo $avatar;
    }
    printf(
        '<a href="%1$s">%2$s</a>',
        esc_url( $author_link ),
        esc_html( get_the_author() )
    );
    echo '</span>';
}

/**
 * Clean pagination helper.
 */
function gravity_modern_pagination() {
    the_posts_pagination( array(
        'mid_size'           => 2,
        'prev_text'          => esc_html__( '← Previous', 'gravity-modern' ),
        'next_text'          => esc_html__( 'Next →', 'gravity-modern' ),
        'before_page_number' => '<span class="meta-nav screen-reader-text">' . esc_html__( 'Page', 'gravity-modern' ) . ' </span>',
    ) );
}

/**
 * Clean up WordPress generator version from head for security.
 */
remove_action( 'wp_head', 'wp_generator' );
