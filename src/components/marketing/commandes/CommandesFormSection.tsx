'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils/cn';
import { Container } from '@/ui/Container';
import { Button } from '@/ui/Button';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import { FormField } from '@/ui/form/FormField';
import { Input } from '@/ui/form/Input';
import { Select } from '@/ui/form/Select';
import { Textarea } from '@/ui/form/Textarea';

interface CommandesFormSectionProps {
    intro: string;
    className?: string;
    id?: string;
}

const requestTypeOptions = [
    { value: 'portrait-photo', label: 'Portrait à partir d’une photo' },
    { value: 'histoire', label: 'Création à partir d’une histoire' },
    { value: 'cadeau', label: 'Commande à offrir' },
    { value: 'libre', label: 'Demande plus libre' },
];

const formatOptions = [
    { value: 'a4', label: 'A4' },
    { value: 'a3', label: 'A3' },
    { value: 'a2', label: 'A2' },
    { value: 'autre', label: 'Autre / à définir' },
];

const techniqueOptions = [
    { value: 'fusain-graphite', label: 'Fusain / graphite' },
    { value: 'encre', label: 'Encre' },
    { value: 'aquarelle', label: 'Aquarelle' },
    { value: 'acrylique', label: 'Acrylique' },
    { value: 'pastel', label: 'Pastel' },
    { value: 'a-definir', label: 'À définir ensemble' },
];

export function CommandesFormSection({ intro, className, id }: CommandesFormSectionProps) {
    const [requestType, setRequestType] = useState<string>('');
    const [format, setFormat] = useState<string>('');
    const [technique, setTechnique] = useState<string>('');

    return (
        <section id={id} aria-label="Formulaire de commande" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28 scroll-mt-36', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-[24rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-32 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">Formulaire</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] text-white">
                        Tu peux me confier cela ici.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-white/66">
                        {intro}
                    </Text>
                </div>

                <div className="mt-12 grid gap-4 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:gap-6">
                    <aside className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7">
                        <div className="flex h-full flex-col">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Avant d’écrire</p>

                            <Heading level={3} className="mt-4 max-w-[12ch] text-white">
                                Quelques repères pour commencer.
                            </Heading>

                            <div className="mt-6 grid gap-3">
                                <InfoPill>Une photo, un souvenir ou quelques mots suffisent.</InfoPill>
                                <InfoPill>Je reviens vers toi personnellement après lecture.</InfoPill>
                                <InfoPill>Le devis dépend du format, de la technique et du nombre de visages.</InfoPill>
                                <InfoPill>Certaines demandes commencent très simplement. C’est déjà assez.</InfoPill>
                            </div>

                            <div className="mt-auto pt-8">
                                <Text variant="muted" className="max-w-sm text-sm leading-6 text-white/56">
                                    Tu n’as pas besoin d’avoir tout formulé parfaitement. L’important est de me confier une première trace.
                                </Text>
                            </div>
                        </div>
                    </aside>

                    <form className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))] p-3 backdrop-blur-sm sm:p-4">
                        <div className="rounded-[1.4rem] border border-white/8 bg-white/2 px-5 py-5 sm:px-6 sm:py-6">
                            <input type="hidden" name="requestType" value={requestType} />
                            <input type="hidden" name="format" value={format} />
                            <input type="hidden" name="technique" value={technique} />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField label="Prénom" htmlFor="firstName" required>
                                    <Input id="firstName" name="firstName" placeholder="Ton prénom" autoComplete="given-name" />
                                </FormField>

                                <FormField label="Email" htmlFor="email" required>
                                    <Input id="email" name="email" type="email" placeholder="ton@email.com" autoComplete="email" />
                                </FormField>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <FormField label="Type de demande" htmlFor="requestType-trigger" required>
                                    <Select value={requestType} onChange={setRequestType} options={requestTypeOptions} placeholder="Choisir" />
                                </FormField>

                                <FormField label="Format envisagé" htmlFor="format-trigger">
                                    <Select value={format} onChange={setFormat} options={formatOptions} placeholder="Choisir" />
                                </FormField>
                            </div>

                            <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                <FormField label="Nombre de visages" htmlFor="facesCount">
                                    <Input id="facesCount" name="facesCount" placeholder="1, 2, 3..." inputMode="numeric" />
                                </FormField>

                                <FormField label="Technique souhaitée" htmlFor="technique-trigger">
                                    <Select value={technique} onChange={setTechnique} options={techniqueOptions} placeholder="Choisir" />
                                </FormField>
                            </div>

                            <FormField
                                className="mt-4"
                                label="Message"
                                htmlFor="message"
                                hint="Tu peux me parler du visage, de l’histoire, du contexte, d’un hommage, d’un cadeau, ou simplement de ce que tu ressens."
                                required
                            >
                                <Textarea id="message" name="message" rows={7} placeholder="Écris-moi quelques mots..." />
                            </FormField>

                            <div className="mt-6 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-end sm:justify-between">
                                <Text variant="muted" className="max-w-md text-sm leading-6 text-white/54">
                                    Je reviendrai vers toi avec attention pour préciser la suite, le cadre et la proposition la plus juste.
                                </Text>

                                <Button type="submit" variant="primary" className="min-h-12 rounded-full px-8 text-sm font-medium tracking-[0.02em]">
                                    Envoyer la demande
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
}

interface InfoPillProps {
    children: string;
}

function InfoPill({ children }: InfoPillProps) {
    return <div className="rounded-[1.1rem] border border-white/8 bg-white/3 px-4 py-4 text-sm leading-6 text-white/66">{children}</div>;
}
