import 'server-only';

import { createHash } from 'node:crypto';

interface CloudinaryConfig {
    apiKey: string;
    apiSecret: string;
    cloudName: string;
}

interface CloudinaryUploadOptions {
    folder: string;
}

interface CloudinaryUploadResponse {
    bytes: number;
    format: string;
    height: number;
    original_filename?: string;
    public_id: string;
    resource_type: string;
    secure_url: string;
    width: number;
}

interface CloudinaryDestroyResponse {
    result: string;
}

export interface UploadedMedia {
    bytes: number;
    format: string;
    height: number;
    originalFilename?: string;
    publicId: string;
    secureUrl: string;
    width: number;
}

function getCloudinaryConfig(): CloudinaryConfig {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error('Cloudinary environment variables are missing');
    }

    return {
        apiKey,
        apiSecret,
        cloudName,
    };
}

function createSignature(params: Record<string, string | number | boolean | undefined>, apiSecret: string) {
    const serialized = Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== '')
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    return createHash('sha1').update(`${serialized}${apiSecret}`).digest('hex');
}

function getCloudinaryFolder(folder: string) {
    const cleaned = folder
        .trim()
        .replace(/\\/g, '/')
        .replace(/[^a-zA-Z0-9/_-]+/g, '-')
        .replace(/\/+/g, '/')
        .replace(/^\/|\/$/g, '');

    if (!cleaned) return 'norel-art/admin';
    if (cleaned.startsWith('norel-art/')) return cleaned;

    return `norel-art/${cleaned}`;
}

export async function uploadImageToCloudinary(file: File, options: CloudinaryUploadOptions): Promise<UploadedMedia> {
    const config = getCloudinaryConfig();
    const timestamp = Math.round(Date.now() / 1000);
    const folder = getCloudinaryFolder(options.folder);
    const params = {
        folder,
        timestamp,
    };
    const signature = createSignature(params, config.apiSecret);
    const body = new FormData();

    body.append('file', file);
    body.append('api_key', config.apiKey);
    body.append('folder', folder);
    body.append('timestamp', String(timestamp));
    body.append('signature', signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
        method: 'POST',
        body,
    });

    if (!response.ok) {
        const message = await response.text().catch(() => 'Cloudinary upload failed');
        throw new Error(message);
    }

    const payload = (await response.json()) as CloudinaryUploadResponse;

    return {
        bytes: payload.bytes,
        format: payload.format,
        height: payload.height,
        originalFilename: payload.original_filename,
        publicId: payload.public_id,
        secureUrl: payload.secure_url,
        width: payload.width,
    };
}

export async function deleteCloudinaryImage(publicId: string): Promise<CloudinaryDestroyResponse> {
    const config = getCloudinaryConfig();
    const timestamp = Math.round(Date.now() / 1000);
    const params = {
        invalidate: true,
        public_id: publicId,
        timestamp,
    };
    const signature = createSignature(params, config.apiSecret);
    const body = new FormData();

    body.append('api_key', config.apiKey);
    body.append('invalidate', 'true');
    body.append('public_id', publicId);
    body.append('timestamp', String(timestamp));
    body.append('signature', signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/destroy`, {
        method: 'POST',
        body,
    });

    if (!response.ok) {
        const message = await response.text().catch(() => 'Cloudinary delete failed');
        throw new Error(message);
    }

    return (await response.json()) as CloudinaryDestroyResponse;
}
