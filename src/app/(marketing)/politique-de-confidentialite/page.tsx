import type { Metadata } from 'next';

import { LegalContentPage } from '@/components/marketing/legal/LegalContentPage';
import { privacyPageContent } from '@/content/legal/legal-content';

export const metadata: Metadata = {
    title: 'Politique de confidentialite',
    description: 'Politique de confidentialite de Norel Art.',
};

export default function PrivacyPolicyRoutePage() {
    return <LegalContentPage content={privacyPageContent} />;
}
