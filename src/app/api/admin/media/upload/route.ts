import { NextResponse } from 'next/server';

import { getCurrentSession } from '@/server/auth/session';
import { uploadImageToCloudinary } from '@/server/media/cloudinary';
import { isAdminRole } from '@/server/permissions/roles';

export const runtime = 'nodejs';

const maxUploadSize = 10 * 1024 * 1024;

function getAllowedFolder(value: FormDataEntryValue | null) {
    const folder = String(value ?? 'artworks').trim();

    if (folder === 'categories') return 'norel-art/categories';
    if (folder === 'collections') return 'norel-art/collections';
    if (folder === 'drops') return 'norel-art/drops';
    if (folder === 'artworks') return 'norel-art/artworks';

    return 'norel-art/admin';
}

export async function POST(request: Request) {
    const session = await getCurrentSession();

    if (!isAdminRole(session?.user?.role)) {
        return NextResponse.json({ message: 'Admin access required.' }, { status: 403 });
    }

    const formData = await request.formData().catch(() => null);
    const file = formData?.get('file');

    if (!(file instanceof File)) {
        return NextResponse.json({ message: 'Fichier manquant.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
        return NextResponse.json({ message: 'Seules les images sont acceptees.' }, { status: 400 });
    }

    if (file.size > maxUploadSize) {
        return NextResponse.json({ message: 'Image trop lourde. Limite : 10 Mo.' }, { status: 413 });
    }

    try {
        const media = await uploadImageToCloudinary(file, {
            folder: getAllowedFolder(formData?.get('folder') ?? null),
        });

        return NextResponse.json(media, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "L'upload Cloudinary a echoue." }, { status: 500 });
    }
}
