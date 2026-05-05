import type { Metadata } from 'next';

import { LegalContentPage } from '@/components/marketing/legal/LegalContentPage';
import { cookiesPageContent } from '@/content/legal/legal-content';

export const metadata: Metadata = {
    title: 'Politique cookies',
    description: 'Politique cookies Norel Art.',
};

export default function CookiesRoutePage() {
    return <LegalContentPage content={cookiesPageContent} />;
}
