import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';

export const metadata: Metadata = {
    title: 'Norel Art',
    description: 'Peintures originales, affiches et créations artistiques sur mesure.',
};

export const dynamic = 'force-dynamic';

interface MarketingLayoutProps {
    children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className="marketing-site-shell text-(--text-primary)">
            <Header />
            <main className="marketing-site-main">{children}</main>
            <Footer />
        </div>
    );
}
