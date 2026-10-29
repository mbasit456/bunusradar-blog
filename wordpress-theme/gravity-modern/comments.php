<?php
/**
 * The template for displaying comments
 *
 * @package Gravity_Modern
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" class="comments-area">
    <?php if ( have_comments() ) : ?>
        <h3 class="comments-title">
            <?php
            $comment_count = get_comments_number();
            if ( '1' === $comment_count ) {
                printf(
                    /* translators: 1: title. */
                    esc_html__( 'One response on &ldquo;%1$s&rdquo;', 'gravity-modern' ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            } else {
                printf(
                    /* translators: 1: comment count number, 2: title. */
                    esc_html( _nx( '%1$s response on &ldquo;%2$s&rdquo;', '%1$s responses on &ldquo;%2$s&rdquo;', $comment_count, 'comments title', 'gravity-modern' ) ),
                    number_format_i18n( $comment_count ),
                    '<span>' . wp_kses_post( get_the_title() ) . '</span>'
                );
            }
            ?>
        </h3>

        <ol class="comment-list">
            <?php
            wp_list_comments( array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 48,
            ) );
            ?>
        </ol>

        <?php
        the_comments_navigation( array(
            'prev_text' => esc_html__( '← Older Comments', 'gravity-modern' ),
            'next_text' => esc_html__( 'Newer Comments →', 'gravity-modern' ),
        ) );

        if ( ! comments_open() ) :
            ?>
            <p class="no-comments" style="color: var(--color-text-muted); font-style: italic;"><?php esc_html_e( 'Comments are closed.', 'gravity-modern' ); ?></p>
            <?php
        endif;

    endif;

    comment_form( array(
        'title_reply_before' => '<h3 id="reply-title" class="comment-reply-title">',
        'title_reply_after'  => '</h3>',
        'class_submit'       => 'btn-primary',
    ) );
    ?>
</div><!-- #comments -->
