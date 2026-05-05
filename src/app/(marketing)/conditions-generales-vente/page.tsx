import type { Metadata } from 'next';

import { LegalContentPage } from '@/components/marketing/legal/LegalContentPage';
import { termsPageContent } from '@/content/legal/legal-content';

export const metadata: Metadata = {
    title: 'Conditions generales de vente',
    description: 'Conditions generales de vente de Norel Art.',
};

export default function TermsRoutePage() {
    return <LegalContentPage content={termsPageContent} />;
}
