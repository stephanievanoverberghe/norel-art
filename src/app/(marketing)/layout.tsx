import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';

export const metadata: Metadata = {
    title: 'Norel Art',
    description: 'Oeuvres originales, impressions et creations artistiques sur mesure.',
};

export const dynamic = 'force-dynamic';

interface MarketingLayoutProps {
    children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className="min-h-screen bg-(--bg-primary) text-(--text-primary)">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
