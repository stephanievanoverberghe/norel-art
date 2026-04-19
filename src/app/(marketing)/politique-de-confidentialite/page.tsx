import type { Metadata } from 'next';

import { LegalContentPage } from '@/components/marketing/legal/LegalContentPage';
import { privacyPageContent } from '@/content/legal/legal-content';

export const metadata: Metadata = {
    title: 'Politique de confidentialité',
    description: 'Politique de confidentialité de Norel Art.',
};

export default function PrivacyPolicyRoutePage() {
    return <LegalContentPage content={privacyPageContent} />;
}
