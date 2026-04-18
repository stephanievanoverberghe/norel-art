'use client';

import { useState } from 'react';

import type { CommandesFormContent } from '@/domain/commandes/types';
import { Button } from '@/ui/Button';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import { FormField } from '@/ui/form/FormField';
import { Input } from '@/ui/form/Input';
import { Select } from '@/ui/form/Select';
import { Textarea } from '@/ui/form/Textarea';

import { CommandesSection } from './CommandesSection';

interface CommandesFormSectionProps {
    id: string;
    content: CommandesFormContent;
}

export function CommandesFormSection({ id, content }: CommandesFormSectionProps) {
    const [requestType, setRequestType] = useState<string>('');
    const [format, setFormat] = useState<string>('');
    const [technique, setTechnique] = useState<string>('');

    return (
        <CommandesSection id={id} className="scroll-mt-36">
            <div className="mx-auto max-w-3xl text-center">
                <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">{content.eyebrow}</p>

                <Heading level={2} className="mt-4 text-white">
                    {content.title}
                </Heading>

                <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/66">
                    {content.intro}
                </Text>
            </div>

            <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:gap-6">
                <aside className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7">
                    <div className="flex h-full flex-col">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Avant d’écrire</p>

                        <Heading level={3} className="mt-4 max-w-[12ch] text-white">
                            Quelques repères pour commencer.
                        </Heading>

                        <div className="mt-6 grid gap-3">
                            {content.hints.map((hint, index) => (
                                <div key={hint} className="rounded-[1.1rem] border border-white/8 bg-white/3 px-4 py-4">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">{String(index + 1).padStart(2, '0')}</p>
                                    <p className="mt-2 text-sm leading-6 text-white/66">{hint}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto pt-8">
                            <Text variant="muted" className="max-w-sm text-sm leading-6 text-white/54">
                                Vous n’avez pas besoin de tout formuler parfaitement. L’essentiel est de me confier une première trace.
                            </Text>
                        </div>
                    </div>
                </aside>

                <form className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))] p-3 backdrop-blur-sm sm:p-4">
                    <div className="rounded-[1.4rem] border border-white/8 bg-white/2 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label="Prénom" htmlFor="firstName" required>
                                <Input id="firstName" name="firstName" placeholder="Votre prénom" autoComplete="given-name" required />
                            </FormField>

                            <FormField label="Email" htmlFor="email" required>
                                <Input id="email" name="email" type="email" placeholder="votre@email.com" autoComplete="email" required />
                            </FormField>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <FormField label="Type de demande" htmlFor="request-type-trigger" required>
                                <Select name="requestType" value={requestType} onChange={setRequestType} options={content.requestTypeOptions} placeholder="Choisir" />
                            </FormField>

                            <FormField label="Format envisagé" htmlFor="format-trigger">
                                <Select name="format" value={format} onChange={setFormat} options={content.formatOptions} placeholder="Choisir" />
                            </FormField>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <FormField label="Nombre de visages" htmlFor="facesCount">
                                <Input id="facesCount" name="facesCount" inputMode="numeric" placeholder="1, 2, 3..." />
                            </FormField>

                            <FormField label="Technique souhaitée" htmlFor="technique-trigger">
                                <Select name="technique" value={technique} onChange={setTechnique} options={content.techniqueOptions} placeholder="Choisir" />
                            </FormField>
                        </div>

                        <FormField className="mt-4" label="Message" htmlFor="message" required>
                            <Textarea
                                id="message"
                                name="message"
                                rows={7}
                                required
                                placeholder="Parlez-moi du visage, de l’histoire, du contexte, d’un cadeau, d’un hommage, ou simplement de ce qui compte dans cette demande."
                            />
                        </FormField>

                        <div className="mt-6 border-t border-white/10 pt-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <Text variant="muted" className="max-w-md text-sm leading-6 text-white/54">
                                    Je reviendrai vers vous avec attention pour préciser la suite, le cadre et la proposition la plus juste.
                                </Text>

                                <Button type="submit" className="min-h-12 w-full rounded-full px-8 sm:w-auto">
                                    {content.submitLabel}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </CommandesSection>
    );
}
