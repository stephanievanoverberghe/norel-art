'use client';

import { useState, type FormEvent } from 'react';

import { SectionIntro } from '@/components/shared/SectionIntro';
import type { FresquesFormContent } from '@/domain/fresques/types';
import { Button } from '@/ui/Button';
import { Text } from '@/ui/Text';
import { FormField } from '@/ui/form/FormField';
import { Input } from '@/ui/form/Input';
import { Select } from '@/ui/form/Select';
import { Textarea } from '@/ui/form/Textarea';

import { FresquesSection } from './FresquesSection';

interface FresquesFormSectionProps {
    id: string;
    content: FresquesFormContent;
}

export function FresquesFormSection({ id, content }: FresquesFormSectionProps) {
    const [placeType, setPlaceType] = useState('');
    const [surface, setSurface] = useState('');
    const [styleDirection, setStyleDirection] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const form = event.currentTarget;
        const formData = new FormData(form);
        const selectedPlaceType = String(formData.get('placeType') ?? '');

        if (!selectedPlaceType) {
            setError('Choisissez un type de lieu.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/requests', {
                body: JSON.stringify({
                    budget: String(formData.get('budget') ?? ''),
                    email: String(formData.get('email') ?? ''),
                    location: String(formData.get('city') ?? ''),
                    message: String(formData.get('message') ?? ''),
                    metadata: {
                        placeType: selectedPlaceType,
                        styleDirection: String(formData.get('styleDirection') ?? ''),
                        surface: String(formData.get('surface') ?? ''),
                        timeline: String(formData.get('timeline') ?? ''),
                    },
                    name: String(formData.get('firstName') ?? ''),
                    phone: String(formData.get('phone') ?? ''),
                    source: 'mural',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            });
            const payload = (await response.json().catch(() => null)) as { message?: string } | null;

            if (!response.ok) {
                throw new Error(payload?.message ?? "La demande n'a pas pu etre envoyee.");
            }

            form.reset();
            setPlaceType('');
            setStyleDirection('');
            setSurface('');
            setSuccess('Votre demande a bien ete envoyee.');
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "La demande n'a pas pu etre envoyee.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FresquesSection id={id} className="scroll-mt-36">
            <SectionIntro eyebrow={content.eyebrow} title={content.title} description={content.intro} centered className="mx-auto max-w-3xl" />

            <div className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:gap-6">
                <aside className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7">
                    <div className="flex h-full flex-col">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Reperes</p>
                        <h3 className="mt-4 max-w-[12ch] text-2xl text-white sm:text-3xl">Quelques elements pour ouvrir l&apos;echange.</h3>

                        <div className="mt-6 grid gap-3">
                            {content.hints.map((hint, index) => (
                                <div key={hint} className="rounded-[1.1rem] border border-white/8 bg-white/3 px-4 py-4">
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">{String(index + 1).padStart(2, '0')}</p>
                                    <p className="mt-2 text-sm leading-6 text-white/66">{hint}</p>
                                </div>
                            ))}
                        </div>

                        <Text variant="muted" className="mt-auto pt-8 text-sm leading-6 text-white/54">
                            Meme si tout n&apos;est pas encore defini, un premier message permet deja de construire une proposition adaptee au lieu.
                        </Text>
                    </div>
                </aside>

                <form onSubmit={handleSubmit} className="rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))] p-3 backdrop-blur-sm sm:p-4">
                    <div className="rounded-[1.4rem] border border-white/8 bg-white/2 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <FormField label="Prenom" htmlFor="firstName" required>
                                <Input id="firstName" name="firstName" placeholder="Votre prenom" autoComplete="given-name" required />
                            </FormField>

                            <FormField label="Email" htmlFor="email" required>
                                <Input id="email" name="email" type="email" placeholder="votre@email.com" autoComplete="email" required />
                            </FormField>

                            <FormField label="Telephone" htmlFor="phone">
                                <Input id="phone" name="phone" type="tel" placeholder="Optionnel" autoComplete="tel" />
                            </FormField>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <FormField label="Type de lieu" htmlFor="place-type" required>
                                <Select id="place-type" name="placeType" value={placeType} onChange={setPlaceType} options={content.placeTypeOptions} placeholder="Choisir" />
                            </FormField>

                            <FormField label="Surface" htmlFor="surface">
                                <Select id="surface" name="surface" value={surface} onChange={setSurface} options={content.surfaceOptions} placeholder="Choisir" />
                            </FormField>

                            <FormField label="Budget" htmlFor="budget">
                                <Input id="budget" name="budget" placeholder="Enveloppe ou a definir" />
                            </FormField>
                        </div>

                        <div className="mt-4 grid gap-4 sm:grid-cols-3">
                            <FormField label="Ville" htmlFor="city">
                                <Input id="city" name="city" placeholder="Ville du projet" autoComplete="address-level2" />
                            </FormField>

                            <FormField label="Direction visuelle" htmlFor="styleDirection">
                                <Select id="styleDirection" name="styleDirection" value={styleDirection} onChange={setStyleDirection} options={content.styleOptions} placeholder="Choisir" />
                            </FormField>

                            <FormField label="Delai" htmlFor="timeline">
                                <Input id="timeline" name="timeline" placeholder="Date, saison, pas presse" />
                            </FormField>
                        </div>

                        <FormField className="mt-4" label="Intention" htmlFor="message" required>
                            <Textarea id="message" name="message" rows={7} required placeholder="Parlez-moi de l'espace, de l'ambiance recherchee, de ce que vous souhaitez faire apparaitre dans le lieu." />
                        </FormField>

                        <div className="mt-6 border-t border-white/10 pt-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div className="max-w-md">
                                    <Text variant="muted" className="text-sm leading-6 text-white/54">
                                        Je reviendrai vers vous pour proposer un cadre de travail, une premiere direction et les reperes adaptes a votre lieu.
                                    </Text>
                                    {error ? <p className="mt-3 text-sm leading-6 text-rose-100/82" role="alert">{error}</p> : null}
                                    {success ? <p className="mt-3 text-sm leading-6 text-emerald-100/82" role="status">{success}</p> : null}
                                </div>

                                <Button type="submit" disabled={isSubmitting} className="min-h-12 w-full rounded-full px-8 sm:w-auto">
                                    {isSubmitting ? 'Envoi en cours...' : content.submitLabel}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </FresquesSection>
    );
}
