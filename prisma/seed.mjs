import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'node:crypto';

const prisma = new PrismaClient();
const PASSWORD_HASH_PREFIX = 'scrypt';
const PASSWORD_KEY_LENGTH = 64;

function hashPassword(password) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString('hex');

    return `${PASSWORD_HASH_PREFIX}:${salt}:${hash}`;
}

function slugify(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

const categories = ['Portrait', 'Pop Art', 'Manga', 'Graphisme', 'Street Art'];
const collections = ['Fragments interieurs', 'Veilles nocturnes', 'Presences'];

const artworks = [
    {
        slug: 'souffle-dans-l-ombre',
        title: "Souffle dans l'ombre",
        excerpt: 'Un visage suspendu, entre disparition et renaissance.',
        story: "Cette piece travaille les zones de silence. Le regard se revele par couches, comme un souvenir qui insiste.",
        image: '/images/oeuvres/oeuvre-1.jpg',
        gallery: ['/images/oeuvres/oeuvre-1-detail.jpg', '/images/oeuvres/oeuvre-1-cadre.jpg'],
        category: 'Portrait',
        collection: 'Fragments interieurs',
        variantType: 'ORIGINAL',
        technique: 'Acrylique et fusain',
        support: 'Toile coton sur chassis',
        dimensions: '80 x 100 cm',
        priceCents: 180000,
        stock: 1,
        availability: 'AVAILABLE',
        tags: ['portrait', 'intime', 'contraste'],
    },
    {
        slug: 'pulsation-verticale',
        title: 'Pulsation verticale',
        excerpt: "Un rythme rouge et noir qui traverse l'espace.",
        story: 'Une oeuvre pensee comme une respiration debout. Les lignes ouvrent un passage vers le mouvement.',
        image: '/images/oeuvres/oeuvre-2.jpg',
        gallery: ['/images/oeuvres/oeuvre-2-detail.jpg', '/images/oeuvres/oeuvre-2-cadre.jpg'],
        category: 'Pop Art',
        collection: 'Veilles nocturnes',
        variantType: 'ORIGINAL',
        technique: 'Acrylique',
        support: 'Bois apprete',
        dimensions: '60 x 120 cm',
        priceCents: 145000,
        stock: 1,
        availability: 'RESERVED',
        tags: ['mouvement', 'abstrait'],
    },
    {
        slug: 'trace-de-peau',
        title: 'Trace de peau',
        excerpt: 'Une presence douce, presque tactile.',
        story: 'Cette serie aborde la memoire du corps avec des couches fines et des retraits de matiere.',
        image: '/images/oeuvres/oeuvre-3.jpg',
        gallery: ['/images/oeuvres/oeuvre-3-detail.jpg', '/images/oeuvres/oeuvre-3-cadre.jpg'],
        category: 'Manga',
        collection: 'Presences',
        variantType: 'PRINT',
        technique: 'Impression pigmentaire fine art',
        support: 'Papier coton 310g',
        dimensions: '50 x 70 cm',
        priceCents: 22000,
        stock: 25,
        availability: 'AVAILABLE',
        tags: ['corps', 'sensible'],
    },
    {
        slug: 'velours-brut',
        title: 'Velours brut',
        excerpt: 'Le contraste entre douceur et griffure.',
        story: 'Une piece sur la tension entre controle et abandon dans le geste.',
        image: '/images/oeuvres/oeuvre-4.jpg',
        gallery: ['/images/oeuvres/oeuvre-4-detail.jpg', '/images/oeuvres/oeuvre-4-cadre.jpg'],
        category: 'Graphisme',
        collection: 'Fragments interieurs',
        variantType: 'PRINT',
        technique: 'Impression giclee signee',
        support: 'Papier texture',
        dimensions: '40 x 60 cm',
        priceCents: 16000,
        stock: 0,
        availability: 'SOLD',
        tags: ['matiere', 'texture'],
    },
];

async function seedAdminUser() {
    const email = process.env.ADMIN_SEED_EMAIL || process.env.ADMIN_NOTIFICATION_EMAIL;
    const password = process.env.ADMIN_SEED_PASSWORD;

    if (!email || !password) {
        console.info('No admin seed user created. Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD to create one.');
        return;
    }

    await prisma.user.upsert({
        where: { email },
        update: {
            role: 'ADMIN',
            passwordHash: hashPassword(password),
        },
        create: {
            email,
            name: 'Norel Admin',
            role: 'ADMIN',
            passwordHash: hashPassword(password),
        },
    });
}

async function main() {
    await seedAdminUser();

    const categoryByName = new Map();
    for (const category of categories) {
        const record = await prisma.category.upsert({
            where: { slug: slugify(category) },
            update: { name: category },
            create: {
                slug: slugify(category),
                name: category,
            },
        });

        categoryByName.set(category, record);
    }

    const collectionByName = new Map();
    for (const collection of collections) {
        const record = await prisma.collection.upsert({
            where: { slug: slugify(collection) },
            update: { name: collection },
            create: {
                slug: slugify(collection),
                name: collection,
            },
        });

        collectionByName.set(collection, record);
    }

    for (const artworkSeed of artworks) {
        const category = categoryByName.get(artworkSeed.category);
        const collection = collectionByName.get(artworkSeed.collection);

        if (!category) {
            throw new Error(`Missing category ${artworkSeed.category}`);
        }

        const artwork = await prisma.artwork.upsert({
            where: { slug: artworkSeed.slug },
            update: {
                title: artworkSeed.title,
                excerpt: artworkSeed.excerpt,
                story: artworkSeed.story,
                technique: artworkSeed.technique,
                support: artworkSeed.support,
                dimensions: artworkSeed.dimensions,
                tags: artworkSeed.tags,
                status: 'PUBLISHED',
                availability: artworkSeed.availability,
                categoryId: category.id,
                collectionId: collection?.id,
                publishedAt: new Date(),
            },
            create: {
                slug: artworkSeed.slug,
                title: artworkSeed.title,
                excerpt: artworkSeed.excerpt,
                story: artworkSeed.story,
                technique: artworkSeed.technique,
                support: artworkSeed.support,
                dimensions: artworkSeed.dimensions,
                tags: artworkSeed.tags,
                status: 'PUBLISHED',
                availability: artworkSeed.availability,
                categoryId: category.id,
                collectionId: collection?.id,
                publishedAt: new Date(),
            },
        });

        await prisma.productVariant.upsert({
            where: { sku: `NOREL-${artworkSeed.slug.toUpperCase()}` },
            update: {
                type: artworkSeed.variantType,
                title: artworkSeed.variantType === 'ORIGINAL' ? 'Original' : 'Print signe',
                priceCents: artworkSeed.priceCents,
                stock: artworkSeed.stock,
                isActive: artworkSeed.availability !== 'SOLD',
            },
            create: {
                artworkId: artwork.id,
                type: artworkSeed.variantType,
                title: artworkSeed.variantType === 'ORIGINAL' ? 'Original' : 'Print signe',
                sku: `NOREL-${artworkSeed.slug.toUpperCase()}`,
                priceCents: artworkSeed.priceCents,
                stock: artworkSeed.stock,
                editionSize: artworkSeed.variantType === 'PRINT' ? 50 : null,
                editionLabel: artworkSeed.variantType === 'PRINT' ? 'Edition limitee' : null,
                isActive: artworkSeed.availability !== 'SOLD',
            },
        });

        await prisma.artworkImage.deleteMany({
            where: { artworkId: artwork.id },
        });

        await prisma.artworkImage.createMany({
            data: [
                {
                    artworkId: artwork.id,
                    url: artworkSeed.image,
                    alt: artworkSeed.title,
                    position: 0,
                    kind: 'MAIN',
                },
                ...artworkSeed.gallery.map((url, index) => ({
                    artworkId: artwork.id,
                    url,
                    alt: `${artworkSeed.title} detail ${index + 1}`,
                    position: index + 1,
                    kind: index === 0 ? 'DETAIL' : 'FRAME',
                })),
            ],
        });
    }

    await prisma.siteSettings.upsert({
        where: { key: 'shop' },
        update: {
            value: {
                currency: 'EUR',
                freeShippingThresholdCents: 25000,
                defaultCountry: 'FR',
            },
        },
        create: {
            key: 'shop',
            value: {
                currency: 'EUR',
                freeShippingThresholdCents: 25000,
                defaultCountry: 'FR',
            },
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    });
