import { Quote } from 'lucide-react';

import { testimonials } from '@/content/admin/testimonials';

import { AdminBadge, AdminPanel } from './AdminPrimitives';

const testimonialToneByStatus: Record<string, 'muted' | 'success'> = {
    draft: 'muted',
    published: 'success',
};

export function TestimonialList() {
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
                <AdminPanel key={testimonial.id} as="article" className="relative overflow-hidden p-5">
                    <Quote size={44} className="absolute right-5 top-5 text-white/8" />
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <AdminBadge tone={testimonialToneByStatus[testimonial.status] ?? 'muted'}>{testimonial.status}</AdminBadge>
                            <h2 className="mt-4 text-xl font-semibold text-white">{testimonial.clientName}</h2>
                            <p className="mt-1 text-sm text-white/42">{testimonial.context}</p>
                        </div>
                        <p className="text-xs text-white/34">{testimonial.createdAt}</p>
                    </div>
                    <p className="mt-6 text-base leading-7 text-white/70">&quot;{testimonial.quote}&quot;</p>
                </AdminPanel>
            ))}
        </div>
    );
}
