import type { ComponentType } from 'react';

import type { SocialPlatform } from '@/content/site/social-links';
import { cn } from '@/lib/utils/cn';

interface IconProps {
    className?: string;
}

function FacebookIcon({ className }: IconProps) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cn('h-4.5 w-4.5 fill-current', className)}>
            <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-.9-.1-1.8-.1-1.8 0-3.1 1.1-3.1 3.3V11H9v3h2.8v8h1.7Z" />
        </svg>
    );
}

function InstagramIcon({ className }: IconProps) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cn('h-4.5 w-4.5 fill-current', className)}>
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
        </svg>
    );
}

function TikTokIcon({ className }: IconProps) {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cn('h-4.5 w-4.5 fill-current', className)}>
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.717h-3.004v12.467a2.896 2.896 0 1 1-2.896-2.896c.298 0 .586.045.857.127V8.61a5.9 5.9 0 0 0-.857-.063A5.9 5.9 0 1 0 15.82 14.45V8.126a7.768 7.768 0 0 0 4.53 1.454V6.686h-.761Z" />
        </svg>
    );
}

const iconByPlatform: Record<SocialPlatform, ComponentType<IconProps>> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    tiktok: TikTokIcon,
};

interface SocialIconProps {
    platform: SocialPlatform;
    className?: string;
}

export function SocialIcon({ platform, className }: SocialIconProps) {
    const Icon = iconByPlatform[platform];

    return <Icon className={cn('h-4.5 w-4.5', className)} />;
}
