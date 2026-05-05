'use client';

import Image from 'next/image';
import { ImagePlus, Loader2, Trash2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

import { cn } from '@/lib/utils/cn';

import { adminInputClass, adminLabelClass, adminSecondaryButtonClass } from './AdminPrimitives';

interface AdminMediaUploadFieldProps {
    altName?: string;
    className?: string;
    description?: string;
    folder: 'artworks' | 'categories' | 'collections' | 'drops';
    initialAlt?: string | null;
    initialPublicId?: string | null;
    initialUrl?: string | null;
    label: string;
    publicIdName: string;
    urlName: string;
}

interface UploadResponse {
    originalFilename?: string;
    publicId: string;
    secureUrl: string;
}

export function AdminMediaUploadField({ altName, className, description, folder, initialAlt, initialPublicId, initialUrl, label, publicIdName, urlName }: AdminMediaUploadFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [url, setUrl] = useState(initialUrl ?? '');
    const [publicId, setPublicId] = useState(initialPublicId ?? '');
    const [alt, setAlt] = useState(initialAlt ?? '');
    const [error, setError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const hasMedia = Boolean(url);

    const uploadFile = async (file: File) => {
        setError('');
        setIsUploading(true);

        const body = new FormData();
        body.append('file', file);
        body.append('folder', folder);

        try {
            const response = await fetch('/api/admin/media/upload', {
                method: 'POST',
                body,
            });
            const payload = (await response.json().catch(() => null)) as Partial<UploadResponse> & { message?: string };

            if (!response.ok || !payload?.secureUrl || !payload.publicId) {
                throw new Error(payload?.message ?? "L'upload a echoue.");
            }

            setUrl(payload.secureUrl);
            setPublicId(payload.publicId);

            if (altName && !alt) {
                setAlt(payload.originalFilename ?? label);
            }
        } catch (uploadError) {
            setError(uploadError instanceof Error ? uploadError.message : "L'upload a echoue.");
        } finally {
            setIsUploading(false);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    const deleteRemoteMedia = async () => {
        if (!publicId || !publicId.startsWith('norel-art/')) return;

        await fetch('/api/admin/media/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ publicId }),
        }).catch(() => null);
    };

    const removeMedia = async () => {
        setError('');
        setIsDeleting(true);

        try {
            await deleteRemoteMedia();
            setUrl('');
            setPublicId('');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className={cn('rounded-md border border-white/10 bg-white/4 p-3', className)}>
            <input type="hidden" name={urlName} value={url} />
            <input type="hidden" name={publicIdName} value={publicId} />
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(event) => event.target.files?.[0] && void uploadFile(event.target.files[0])} />

            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-white">{label}</p>
                    {description ? <p className="mt-1 text-xs leading-5 text-white/42">{description}</p> : null}
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/50">
                    <ImagePlus size={16} />
                </span>
            </div>

            <div className="mt-3">
                <div className="relative aspect-4/5 overflow-hidden rounded-md border border-white/10 bg-[#060c15]/80">
                    {hasMedia ? (
                        <Image src={url} alt={alt || label} fill sizes="18rem" className="object-cover" />
                    ) : (
                        <div className="flex h-full items-center justify-center px-5 text-center text-sm text-white/34">Aucun visuel</div>
                    )}
                </div>
            </div>

            {altName ? (
                <label className={cn(adminLabelClass, 'mt-3')}>
                    Texte alternatif
                    <input name={altName} value={alt} onChange={(event) => setAlt(event.target.value)} placeholder={label} className={adminInputClass} />
                </label>
            ) : null}

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <button type="button" onClick={() => inputRef.current?.click()} disabled={isUploading || isDeleting} className={adminSecondaryButtonClass}>
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                    {hasMedia ? 'Remplacer' : 'Uploader'}
                </button>
                <button
                    type="button"
                    onClick={() => void removeMedia()}
                    disabled={!hasMedia || isUploading || isDeleting}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-rose-300/18 bg-rose-400/8 px-4 text-sm font-medium text-rose-50/80 transition hover:border-rose-300/30 hover:bg-rose-400/12 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    Retirer
                </button>
            </div>

            {error ? <p className="mt-3 text-xs leading-5 text-rose-100/80">{error}</p> : null}
        </div>
    );
}
