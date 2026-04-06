import type { ReactNode } from 'react';
import { Footer } from '@/layout/Footer';
import { Header } from '@/layout/Header';

interface MarketingLayoutProps {
    children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
