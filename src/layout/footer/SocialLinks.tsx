import Link from 'next/link';

import type { SocialLink } from '@/content/site/social-links';
import { cn } from '@/lib/utils/cn';

import { SocialIcon } from './SocialIcons';

interface SocialLinksProps {
    links: SocialLink[];
}

export function SocialLinks({ links }: SocialLinksProps) {
    return (
        <div className="flex items-center gap-3">
            {links.map((item) => (
                <Link
                    key={item.platform}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className={cn(
                        'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/2 text-white/70 transition-all duration-300',
                        'hover:border-white/20 hover:bg-white/6 hover:text-white',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)',
                    )}
                >
                    <SocialIcon platform={item.platform} />
                </Link>
            ))}
        </div>
    );
}
