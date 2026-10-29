<?php
/**
 * Comments Template for Gravity SEO Agency
 *
 * @package Gravity_SEO_Agency
 */

if ( post_password_required() ) {
    return;
}
?>

<div id="comments" style="margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle);">
    <?php if ( have_comments() ) : ?>
        <h3 style="font-size: 1.5rem; margin-bottom: 2rem;">
            <?php
            $comment_count = get_comments_number();
            printf(
                esc_html( _nx( '%1$s Response', '%1$s Responses', $comment_count, 'comments title', 'gravity-seo-agency' ) ),
                number_format_i18n( $comment_count )
            );
            ?>
        </h3>

        <ol style="list-style: none; padding: 0; margin-bottom: 3rem; display: flex; flex-direction: column; gap: 1.5rem;">
            <?php
            wp_list_comments( array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 44,
            ) );
            ?>
        </ol>
    <?php endif; ?>

    <?php
    comment_form( array(
        'class_submit'  => 'btn-glow',
        'title_reply'   => esc_html__( 'Join the Technical Discussion', 'gravity-seo-agency' ),
    ) );
    ?>
</div>
