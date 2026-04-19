'use client';

import { useState } from 'react';

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

    return (
        <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/3 p-6" aria-label="Formulaire de contact">
            <FormField label={content.fullNameLabel} htmlFor="fullName" required>
                <Input id="fullName" name="fullName" placeholder={content.fullNamePlaceholder} required />
            </FormField>

            <FormField label={content.emailLabel} htmlFor="email" required>
                <Input id="email" name="email" type="email" placeholder={content.emailPlaceholder} required />
            </FormField>

            <FormField label={content.requestTypeLabel} htmlFor="requestType" required>
                <Select
                    id="requestType"
                    name="requestType"
                    value={requestType}
                    onChange={setRequestType}
                    placeholder={content.requestTypePlaceholder}
                    options={content.requestTypeOptions}
                />
            </FormField>

            <FormField label={content.messageLabel} htmlFor="message" required>
                <Textarea id="message" name="message" rows={5} placeholder={content.messagePlaceholder} required />
            </FormField>

            <Button type="submit" className="rounded-full">
                {content.submitLabel}
            </Button>
        </form>
    );
}
