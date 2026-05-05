import { Mail, MapPin, Timer } from 'lucide-react';

import { ContactForm } from '@/components/marketing/ContactForm';
import { MarketingPageIntro } from '@/components/marketing/shared/MarketingPageIntro';
import type { ContactPageContent } from '@/domain/contact/types';
import { Container } from '@/ui/Container';
import { Text } from '@/ui/Text';

interface ContactPageProps {
    content: ContactPageContent;
}

const contactSignals = [
    { label: 'Projet', value: 'Œuvre, commande ou fresque', icon: Mail },
    { label: 'Lieu', value: 'Ville et contexte utiles', icon: MapPin },
    { label: 'Délai', value: 'Urgence ou rythme souple', icon: Timer },
] as const;

export function ContactPage({ content }: ContactPageProps) {
    return (
        <>
            <MarketingPageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} description={content.intro.description} />
            <section className="relative overflow-hidden bg-(--bg-primary) pb-16 sm:pb-20 lg:pb-24">
                <Container className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-start">
                    <aside className="rounded-md border border-white/10 bg-white/[0.035] p-5 sm:p-6 lg:sticky lg:top-32">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">Qualifier sans rigidifier</p>
                        <div className="mt-5 space-y-4">
                            {content.asideParagraphs.map((paragraph) => (
                                <Text key={paragraph} variant="small" className="text-white/62">
                                    {paragraph}
                                </Text>
                            ))}
                        </div>
                        <div className="mt-6 grid gap-3">
                            {contactSignals.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="flex items-start gap-3 border-t border-white/8 pt-3">
                                        <Icon size={16} className="mt-0.5 text-(--premium)" />
                                        <div>
                                            <p className="text-sm font-semibold text-white">{item.label}</p>
                                            <p className="mt-1 text-sm leading-6 text-white/52">{item.value}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    <ContactForm content={content.form} />
                </Container>
            </section>
        </>
    );
}
