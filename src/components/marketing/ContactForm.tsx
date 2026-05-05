'use client';

import { useState, type FormEvent } from 'react';

import type { ContactFormContent } from '@/domain/contact/types';
import { Button } from '@/ui/Button';
import { FormField } from '@/ui/form/FormField';
import { Input } from '@/ui/form/Input';
import { Select } from '@/ui/form/Select';
import { Textarea } from '@/ui/form/Textarea';

interface ContactFormProps {
    content: ContactFormContent;
}

export function ContactForm({ content }: ContactFormProps) {
    const [requestType, setRequestType] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const form = event.currentTarget;
        const formData = new FormData(form);
        const selectedRequestType = String(formData.get('requestType') ?? '');

        if (!selectedRequestType) {
            setError('Choisissez un type de demande.');
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
                        requestType: selectedRequestType,
                        timeline: String(formData.get('timeline') ?? ''),
                    },
                    name: String(formData.get('fullName') ?? ''),
                    phone: String(formData.get('phone') ?? ''),
                    source: 'contact',
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
            setRequestType('');
            setSuccess('Votre demande a bien ete envoyee.');
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "La demande n'a pas pu etre envoyee.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-5 rounded-md border border-white/10 bg-[#08131f]/82 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6" aria-label="Formulaire de contact">
            <div className="grid gap-4 sm:grid-cols-2">
                <FormField label={content.fullNameLabel} htmlFor="fullName" required>
                    <Input id="fullName" name="fullName" placeholder={content.fullNamePlaceholder} required />
                </FormField>

                <FormField label={content.emailLabel} htmlFor="email" required>
                    <Input id="email" name="email" type="email" placeholder={content.emailPlaceholder} autoComplete="email" required />
                </FormField>

                <FormField label={content.phoneLabel} htmlFor="phone">
                    <Input id="phone" name="phone" type="tel" placeholder={content.phonePlaceholder} autoComplete="tel" />
                </FormField>

                <FormField label={content.cityLabel} htmlFor="city">
                    <Input id="city" name="city" placeholder={content.cityPlaceholder} />
                </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <FormField label={content.requestTypeLabel} htmlFor="requestType" required>
                    <Select id="requestType" name="requestType" value={requestType} onChange={setRequestType} placeholder={content.requestTypePlaceholder} options={content.requestTypeOptions} />
                </FormField>

                <FormField label={content.budgetLabel} htmlFor="budget">
                    <Input id="budget" name="budget" placeholder={content.budgetPlaceholder} />
                </FormField>

                <FormField label={content.timelineLabel} htmlFor="timeline">
                    <Input id="timeline" name="timeline" placeholder={content.timelinePlaceholder} />
                </FormField>
            </div>

            <FormField label={content.messageLabel} htmlFor="message" required>
                <Textarea id="message" name="message" rows={6} placeholder={content.messagePlaceholder} required />
            </FormField>

            {error ? <p className="text-sm leading-6 text-rose-100/82" role="alert">{error}</p> : null}
            {success ? <p className="text-sm leading-6 text-emerald-100/82" role="status">{success}</p> : null}

            <Button type="submit" disabled={isSubmitting} className="min-h-12 rounded-full">
                {isSubmitting ? 'Envoi en cours...' : content.submitLabel}
            </Button>
        </form>
    );
}
