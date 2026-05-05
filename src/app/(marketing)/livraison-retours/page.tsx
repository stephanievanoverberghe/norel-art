import type { Metadata } from 'next';

import { LegalContentPage } from '@/components/marketing/legal/LegalContentPage';
import { shippingReturnsPageContent } from '@/content/legal/legal-content';

export const metadata: Metadata = {
    title: 'Livraison et retours',
    description: 'Informations de livraison et retours Norel Art.',
};

export default function ShippingReturnsRoutePage() {
    return <LegalContentPage content={shippingReturnsPageContent} />;
}
