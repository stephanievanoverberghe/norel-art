export type SocialPlatform = 'facebook' | 'instagram' | 'tiktok';

export interface SocialLink {
    label: string;
    href: string;
    platform: SocialPlatform;
}

export const socialLinks: SocialLink[] = [
    {
        label: 'Facebook',
        href: 'https://facebook.com/',
        platform: 'facebook',
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/',
        platform: 'instagram',
    },
    {
        label: 'TikTok',
        href: 'https://tiktok.com/',
        platform: 'tiktok',
    },
];
