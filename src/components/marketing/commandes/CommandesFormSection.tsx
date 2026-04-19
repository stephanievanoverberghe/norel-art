'use client';

import { useState } from 'react';

import { SectionIntro } from '@/components/shared/SectionIntro';
import type { CommandesFormContent } from '@/domain/commandes/types';
import { Button } from '@/ui/Button';
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
    const [requestType, setRequestType] = useState('');
    const [format, setFormat] = useState('');
    const [technique, setTechnique] = useState('');

    return (
        <CommandesSection id={id} className="scroll-mt-36">
            <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.intro} centered className="mx-auto max-w-3xl" />

            <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:gap-6">
                <aside className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7">
                    <div className="flex h-full flex-col">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">{content.fields.preformEyebrow}</p>

                        <h3 className="mt-4 max-w-[12ch] text-2xl text-white sm:text-3xl">{content.fields.preformTitle}</h3>

                        <div className="mt-6 grid gap-3">
                            {content.hints.map((hint, index) => (
                                <div key={hint} className="rounded-[1.1rem] border border-white/8 bg-white/3 px-4 py-4">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">{String(index + 1).padStart(2, '0')}</p>
                                    <p className="mt-2 text-sm leading-6 text-white/66">{hint}</p>
                                </div>
                            ))}
                        </div>

                        <Text variant="muted" className="mt-auto pt-8 text-sm leading-6 text-white/54">
                            {content.fields.closingText}
                        </Text>
                    </div>
                </aside>

                <form className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))] p-3 backdrop-blur-sm sm:p-4">
                    <div className="rounded-[1.4rem] border border-white/8 bg-white/2 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <FormField label={content.fields.firstNameLabel} htmlFor="firstName" required>
                                <Input id="firstName" name="firstName" placeholder={content.fields.firstNamePlaceholder} autoComplete="given-name" required />
                            </FormField>

                            <FormField label={content.fields.emailLabel} htmlFor="email" required>
                                <Input id="email" name="email" type="email" placeholder={content.fields.emailPlaceholder} autoComplete="email" required />
                            </FormField>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <FormField label={content.fields.requestTypeLabel} htmlFor="request-type" required>
                                <Select
                                    id="request-type"
                                    name="requestType"
                                    value={requestType}
                                    onChange={setRequestType}
                                    options={content.requestTypeOptions}
                                    placeholder={content.fields.requestTypePlaceholder}
                                />
                            </FormField>

                            <FormField label={content.fields.formatLabel} htmlFor="format">
                                <Select
                                    id="format"
                                    name="format"
                                    value={format}
                                    onChange={setFormat}
                                    options={content.formatOptions}
                                    placeholder={content.fields.formatPlaceholder}
                                />
                            </FormField>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <FormField label={content.fields.facesCountLabel} htmlFor="facesCount">
                                <Input id="facesCount" name="facesCount" inputMode="numeric" placeholder={content.fields.facesCountPlaceholder} />
                            </FormField>

                            <FormField label={content.fields.techniqueLabel} htmlFor="technique">
                                <Select
                                    id="technique"
                                    name="technique"
                                    value={technique}
                                    onChange={setTechnique}
                                    options={content.techniqueOptions}
                                    placeholder={content.fields.techniquePlaceholder}
                                />
                            </FormField>
                        </div>

                        <FormField className="mt-4" label={content.fields.messageLabel} htmlFor="message" required>
                            <Textarea id="message" name="message" rows={7} required placeholder={content.fields.messagePlaceholder} />
                        </FormField>

                        <div className="mt-6 border-t border-white/10 pt-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <Text variant="muted" className="max-w-md text-sm leading-6 text-white/54">
                                    {content.fields.footerText}
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
