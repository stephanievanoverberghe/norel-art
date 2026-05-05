import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getCurrentSession } from '@/server/auth/session';
import { deleteCloudinaryImage } from '@/server/media/cloudinary';
import { isAdminRole } from '@/server/permissions/roles';

export const runtime = 'nodejs';

const deleteMediaSchema = z.object({
    publicId: z.string().min(1),
});

export async function POST(request: Request) {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        return NextResponse.json({ message: 'Admin access required.' }, { status: 403 });
    }

    const body = await request.json().catch(() => null);
    const parsed = deleteMediaSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: 'Media invalide.' }, { status: 400 });
    }

    if (!parsed.data.publicId.startsWith('norel-art/')) {
        return NextResponse.json({ message: 'Suppression refusee.' }, { status: 403 });
    }

    try {
        const result = await deleteCloudinaryImage(parsed.data.publicId);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Suppression Cloudinary impossible.' }, { status: 500 });
    }
}
