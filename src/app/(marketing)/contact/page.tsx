import type { Metadata } from 'next';

import { LeadCapturePage } from '@/components/marketing/LeadCapturePage';
import { leadCapturePages } from '@/content/marketing/pages';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contactez Norel Art pour un achat, une commande personnalisée ou un projet de fresque.',
};

export default function ContactPage() {
    return (
        <LeadCapturePage
            eyebrow={leadCapturePages.contact.eyebrow}
            title={leadCapturePages.contact.title}
            description={leadCapturePages.contact.description}
            aside={<div className="hidden lg:block" aria-hidden="true" />}
        />
    );
}
