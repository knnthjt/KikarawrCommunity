<?php
/**
 * Kikarawr Community Website Configuration
 * 
 * You can easily customize community information, social links,
 * and the 4 buttons below.
 */

$config = [
    // Community Profile Information
    'community_name' => "Kikarawr_\u{1F98B}",
    'handle'         => '@kikarawr',
    'bio'            => '',
    'avatar'         => 'assets/avatar.jpg',
    'background'     => file_exists(__DIR__ . '/assets/bg.gif') ? 'assets/bg.gif' : 'assets/bg.jpg',
    'verified'       => true,

    // Social Media Icons (Header area)
    'social_links'   => [
        [
            'name' => 'Discord',
            'url'  => 'https://discord.gg/DunDZHezd',
            'icon' => 'discord',
        ],
    ],

    /**
     * The 4 Community Buttons
     * 
     * Button 1: Connected to the Discord server / community group.
     * Buttons 2, 3, 4: Left blank as requested. To activate any blank button later,
     * simply add a 'title' and 'url'!
     */
    'buttons' => [
        // Button 1 (Active Group Link)
        [
            'id'          => 1,
            'title'       => "Kika's Lavender Palace",
            'subtitle'    => 'Discord Server • Free to join',
            'url'         => 'https://discord.gg/DunDZHezd',
            'icon'        => 'discord',
            'thumbnail'   => '', // Optional custom image/emoji thumbnail
            'is_active'   => true,
            'open_new_tab'=> true,
        ],

        // Button 2 (Blank slot for now)
        [
            'id'          => 2,
            'title'       => '',
            'subtitle'    => '',
            'url'         => '',
            'icon'        => '',
            'thumbnail'   => '',
            'is_active'   => false,
            'open_new_tab'=> true,
        ],

        // Button 3 (Blank slot for now)
        [
            'id'          => 3,
            'title'       => '',
            'subtitle'    => '',
            'url'         => '',
            'icon'        => '',
            'thumbnail'   => '',
            'is_active'   => false,
            'open_new_tab'=> true,
        ],

        // Button 4 (Blank slot for now)
        [
            'id'          => 4,
            'title'       => '',
            'subtitle'    => '',
            'url'         => '',
            'icon'        => '',
            'thumbnail'   => '',
            'is_active'   => false,
            'open_new_tab'=> true,
        ],
    ],

    // Footer CTA button
    'bottom_cta' => [
        'text' => 'Join Kikarawr on Discord',
        'url'  => 'https://discord.gg/DunDZHezd',
    ],

    // Site Metadata
    'site_title' => "Kikarawr_\u{1F98B} | Official Links",
    'site_description' => "Official hub for Kikarawr_\u{1F98B}. Join our Discord group, chat, and connect!",
];

/**
 * Helper function to escape HTML output safely
 */
function e(?string $str): string {
    return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8');
}
