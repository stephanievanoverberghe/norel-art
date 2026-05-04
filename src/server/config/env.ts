export const requiredServerEnvKeys = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'RESEND_API_KEY',
    'ADMIN_NOTIFICATION_EMAIL',
] as const;

export const requiredPublicEnvKeys = ['NEXT_PUBLIC_SITE_URL', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'] as const;

export type RequiredServerEnvKey = (typeof requiredServerEnvKeys)[number];
export type RequiredPublicEnvKey = (typeof requiredPublicEnvKeys)[number];

export function getMissingEnvKeys(env: NodeJS.ProcessEnv = process.env): string[] {
    return [...requiredServerEnvKeys, ...requiredPublicEnvKeys].filter((key) => !env[key]);
}
