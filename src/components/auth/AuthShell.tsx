import type { ReactNode } from 'react';
import Link from 'next/link';

interface AuthShellProps {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
}

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
    return (
        <main className="norel-bg-shell norel-bg-auth min-h-screen text-white">
            <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/35 to-transparent" />

            <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_420px]">
                <section className="max-w-2xl">
                    <Link href="/" className="inline-flex text-sm font-semibold uppercase tracking-[0.28em] text-white/70 transition hover:text-white">
                        Norel Art
                    </Link>
                    <p className="mt-24 text-xs font-semibold uppercase tracking-[0.3em] text-white/52 lg:mt-0">{eyebrow}</p>
                    <h1 className="mt-4 max-w-xl font-(family-name:--font-heading) text-5xl leading-[0.94] text-white sm:text-7xl">{title}</h1>
                    <p className="mt-6 max-w-lg text-base leading-7 text-white/68 sm:text-lg">{description}</p>
                </section>

                <section className="rounded-lg border border-white/14 bg-[#08131f]/88 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl sm:p-7">{children}</section>
            </div>
        </main>
    );
}
