import type { Metadata } from 'next';

import { LegalContentPage } from '@/components/marketing/legal/LegalContentPage';
import { legalNoticePageContent } from '@/content/legal/legal-content';

export const metadata: Metadata = {
    title: 'Mentions légales',
    description: 'Informations légales relatives au site Norel Art.',
};

export default function LegalNoticeRoutePage() {
    return <LegalContentPage content={legalNoticePageContent} />;
}
