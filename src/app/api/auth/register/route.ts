import { NextResponse } from 'next/server';
import { z } from 'zod';

import { hashPassword } from '@/server/auth/password';
import { prisma } from '@/server/db/prisma';

const registerSchema = z.object({
    name: z.string().trim().min(2).max(80),
    email: z
        .string()
        .trim()
        .email()
        .transform((value) => value.toLowerCase()),
    password: z.string().min(8).max(128),
});

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ message: 'Les informations envoyees sont invalides.' }, { status: 400 });
    }

    const { name, email, password } = parsed.data;
    const existingUser = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
    });

    if (existingUser) {
        return NextResponse.json({ message: 'Un compte existe deja avec cet email.' }, { status: 409 });
    }

    const [firstName, ...lastNameParts] = name.split(/\s+/);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashPassword(password),
            profile: {
                create: {
                    firstName,
                    lastName: lastNameParts.join(' ') || null,
                },
            },
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });

    return NextResponse.json({ user }, { status: 201 });
}
