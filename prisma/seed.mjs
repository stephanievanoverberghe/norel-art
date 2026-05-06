import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const prisma = new PrismaClient();
const PASSWORD_HASH_PREFIX = 'scrypt';
const PASSWORD_KEY_LENGTH = 64;
const catalogueArtworks = JSON.parse(await readFile(new URL('../src/content/artworks/catalogue-artworks.json', import.meta.url), 'utf8'));

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

const categories = [
    {
        name: 'Portrait',
        imageUrl: '/images/categories/portrait.jpg',
        imageAlt: 'Portrait artistique Norel Art',
    },
    {
        name: 'Pop Art',
        imageUrl: '/images/categories/pop-art.jpg',
        imageAlt: 'Categorie Pop Art Norel Art',
    },
    {
        name: 'Manga',
        imageUrl: '/images/categories/manga.jpg',
        imageAlt: 'Categorie Manga Norel Art',
    },
    {
        name: 'Graphisme',
        imageUrl: '/images/categories/graphisme.jpg',
        imageAlt: 'Categorie Graphisme Norel Art',
    },
    {
        name: 'Street Art',
        imageUrl: '/images/categories/street-art.jpg',
        imageAlt: 'Categorie Street Art Norel Art',
    },
];
const collectionDetails = {
    'Peintures originales': {
        eyebrow: 'Pieces uniques',
        description: 'Peintures et techniques mixtes disponibles a l achat.',
    },
    'Fusains et pastels': {
        eyebrow: 'Dessins originaux',
        description: 'Portraits, fusains, pastels et formats papier.',
    },
    'Series et duos': {
        eyebrow: 'Ensembles',
        description: 'Duos, series et compositions pensees comme un ensemble.',
    },
    Illustrations: {
        eyebrow: 'Illustrations',
        description: 'Illustrations originales issues des documents d atelier.',
    },
    'Affiches graphiques': {
        eyebrow: 'Editions signees',
        description: 'Affiches graphiques disponibles en formats papier.',
    },
    'Oeuvres libres': {
        eyebrow: 'Catalogue',
        description: 'Pieces ajoutees depuis les fichiers sources, a completer dans l admin si besoin.',
    },
};

const collections = Array.from(new Set(catalogueArtworks.map((artwork) => artwork.collection))).map((name, position) => ({
    name,
    eyebrow: collectionDetails[name]?.eyebrow ?? 'Catalogue',
    description: collectionDetails[name]?.description ?? 'Selection d oeuvres Norel Art.',
    position,
    isFeatured: position === 0,
}));

const artworks = catalogueArtworks.map((artwork) => ({
    slug: artwork.slug,
    title: artwork.title,
    excerpt: artwork.excerpt,
    story: artwork.story,
    image: artwork.image,
    gallery: artwork.gallery ?? [],
    category: artwork.category,
    collection: artwork.collection,
    variantType: artwork.type === 'print' ? 'PRINT' : 'ORIGINAL',
    technique: artwork.technique,
    support: artwork.support,
    dimensions: artwork.dimensions,
    priceCents: Math.round(artwork.priceEur * 100),
    stock: artwork.stock ?? (artwork.type === 'print' ? 50 : 1),
    availability: (artwork.availability ?? 'available').toUpperCase(),
    tags: artwork.tags ?? [],
}));

const legacyArtworkSlugs = ['souffle-dans-l-ombre', 'pulsation-verticale', 'trace-de-peau', 'texture-de-peau', 'velours-brut'];

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
            where: { slug: slugify(category.name) },
            update: {
                name: category.name,
                imageUrl: category.imageUrl,
                imageAlt: category.imageAlt,
            },
            create: {
                slug: slugify(category.name),
                name: category.name,
                imageUrl: category.imageUrl,
                imageAlt: category.imageAlt,
            },
        });

        categoryByName.set(category.name, record);
    }

    const collectionByName = new Map();
    for (const collection of collections) {
        const record = await prisma.collection.upsert({
            where: { slug: slugify(collection.name) },
            update: {
                name: collection.name,
                eyebrow: collection.eyebrow,
                description: collection.description,
                position: collection.position,
                isFeatured: collection.isFeatured,
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
            create: {
                slug: slugify(collection.name),
                name: collection.name,
                eyebrow: collection.eyebrow,
                description: collection.description,
                position: collection.position,
                isFeatured: collection.isFeatured,
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
        });

        collectionByName.set(collection.name, record);
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
                title: artworkSeed.variantType === 'ORIGINAL' ? 'Peinture originale' : 'Affiche signee',
                priceCents: artworkSeed.priceCents,
                stock: artworkSeed.stock,
                isActive: artworkSeed.availability !== 'SOLD',
            },
            create: {
                artworkId: artwork.id,
                type: artworkSeed.variantType,
                title: artworkSeed.variantType === 'ORIGINAL' ? 'Peinture originale' : 'Affiche signee',
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

    await prisma.artwork.updateMany({
        where: {
            slug: {
                in: legacyArtworkSlugs,
            },
        },
        data: {
            status: 'ARCHIVED',
            availability: 'SOLD',
        },
    });

    await prisma.productVariant.updateMany({
        where: {
            artwork: {
                slug: {
                    in: legacyArtworkSlugs,
                },
            },
        },
        data: {
            stock: 0,
            isActive: false,
        },
    });

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
