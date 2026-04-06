import Link from 'next/link';

import type { NavigationItem } from '@/content/site/navigation';

interface FooterNavGroupProps {
    title: string;
    links: NavigationItem[];
}

export function FooterNavGroup({ title, links }: FooterNavGroupProps) {
    return (
        <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-white/35">{title}</p>

            <ul className="space-y-3">
                {links.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="text-sm text-white/70 transition-colors duration-300 hover:text-white">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
