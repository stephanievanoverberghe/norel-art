import type { CustomRequestType, Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getCurrentSession } from '@/server/auth/session';
import { createPublicCustomRequest } from '@/server/requests/custom-requests';

export const runtime = 'nodejs';

const requestSourceSchema = z.enum(['contact', 'custom-artwork', 'mural']);

const publicRequestSchema = z.object({
    budget: z.string().optional(),
    email: z.string().email(),
    location: z.string().optional(),
    message: z.string().min(8),
    metadata: z.record(z.string(), z.unknown()).optional(),
    name: z.string().min(2),
    phone: z.string().optional(),
    source: requestSourceSchema,
});

function getRequestType(source: z.infer<typeof requestSourceSchema>, metadata?: Record<string, unknown>): CustomRequestType {
    if (source === 'custom-artwork') return 'CUSTOM_ARTWORK';
    if (source === 'mural') return 'MURAL';

    const requestType = typeof metadata?.requestType === 'string' ? metadata.requestType : '';

    if (requestType === 'commande') return 'CUSTOM_ARTWORK';
    if (requestType === 'fresque') return 'MURAL';

    return 'CONTACT';
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = publicRequestSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: 'Les informations envoyees sont invalides.' }, { status: 400 });
    }

    const session = await getCurrentSession().catch(() => null);
    const metadata = {
        ...parsed.data.metadata,
        source: parsed.data.source,
    } satisfies Prisma.InputJsonObject;

    try {
        const customRequest = await createPublicCustomRequest(
            {
                budget: parsed.data.budget,
                email: parsed.data.email,
                location: parsed.data.location,
                message: parsed.data.message,
                metadata,
                name: parsed.data.name,
                phone: parsed.data.phone,
                type: getRequestType(parsed.data.source, parsed.data.metadata),
            },
            session?.user?.id,
        );

        return NextResponse.json({ id: customRequest.id, message: 'Demande envoyee.' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "La demande n'a pas pu etre envoyee." }, { status: 500 });
    }
}
