import { testimonials } from '@/content/admin/testimonials';

export function TestimonialList() {
    return (
        <div className="space-y-4">
            {testimonials.map((testimonial) => (
                <article key={testimonial.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-lg font-semibold text-slate-900">{testimonial.clientName}</h2>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{testimonial.status}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{testimonial.context}</p>
                    <p className="mt-3 text-sm text-slate-700">“{testimonial.quote}”</p>
                </article>
            ))}
        </div>
    );
}
