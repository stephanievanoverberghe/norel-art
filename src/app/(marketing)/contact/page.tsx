import type { Metadata } from 'next';

import { ContactPage } from '@/components/marketing/contact/ContactPage';
import { contactPageContent } from '@/content/contact/contact-content';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contactez Norel Art pour un achat, une commande personnalisée ou un projet de fresque.',
};

export default function ContactRoutePage() {
    return <ContactPage content={contactPageContent} />;
}
