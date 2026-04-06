import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';

export const metadata: Metadata = {
    title: 'Norel Art',
    description: 'Œuvres originales, impressions et créations artistiques sur mesure.',
};

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
