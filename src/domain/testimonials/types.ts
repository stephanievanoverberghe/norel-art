export type TestimonialStatus = 'published' | 'draft';

export interface Testimonial {
    id: string;
    clientName: string;
    context: string;
    quote: string;
    status: TestimonialStatus;
    createdAt: string;
}
