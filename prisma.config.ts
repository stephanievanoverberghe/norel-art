import 'dotenv/config';

import { defineConfig } from 'prisma/config';

const datasourceUrl = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!datasourceUrl) {
    throw new Error('DIRECT_URL or DATABASE_URL is required for Prisma CLI commands.');
}

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'node prisma/seed.mjs',
    },
    engine: 'classic',
    datasource: {
        url: datasourceUrl,
    },
});
