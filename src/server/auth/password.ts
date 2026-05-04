import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const PASSWORD_HASH_PREFIX = 'scrypt';
const PASSWORD_KEY_LENGTH = 64;

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, PASSWORD_KEY_LENGTH).toString('hex');

    return `${PASSWORD_HASH_PREFIX}:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string | null | undefined): boolean {
    if (!storedHash) {
        return false;
    }

    const [prefix, salt, hash] = storedHash.split(':');

    if (prefix !== PASSWORD_HASH_PREFIX || !salt || !hash) {
        return false;
    }

    const expectedHash = Buffer.from(hash, 'hex');
    const candidateHash = scryptSync(password, salt, expectedHash.length);

    return expectedHash.length === candidateHash.length && timingSafeEqual(expectedHash, candidateHash);
}
