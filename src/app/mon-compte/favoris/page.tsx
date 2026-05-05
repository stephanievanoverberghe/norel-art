import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';
import { redirect } from 'next/navigation';

import { OeuvresArtworkCard } from '@/components/marketing/oeuvres/OeuvresArtworkCard';
import { getCurrentSession } from '@/server/auth/session';
import { getFavoriteArtworks } from '@/server/favorites/favorites';

export const metadata: Metadata = {
    title: 'Mes favoris',
    description: 'Œuvres sauvegardées dans votre espace Norel Art.',
};

export default async function AccountFavoritesPage() {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
        redirect('/connexion?callbackUrl=/mon-compte/favoris');
    }

    const favorites = await getFavoriteArtworks(session.user.id);

    return (
        <div className="grid gap-6">
            <Link href="/mon-compte" className="inline-flex items-center gap-2 text-sm text-white/56 transition hover:text-white">
                <ArrowLeft size={16} />
                Mon compte
            </Link>

            <header className="flex flex-col gap-6 border-b border-white/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Collection personnelle</p>
                    <h1 className="mt-4 font-(family-name:--font-heading) text-5xl leading-none text-white sm:text-7xl">Mes favoris</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">Les œuvres que vous gardez de côté pour revenir, comparer ou préparer un achat.</p>
                </div>

                <div className="inline-flex h-14 w-14 items-center justify-center rounded-md border border-white/12 bg-white/8">
                    <Heart size={24} />
                </div>
            </header>

            {favorites.length > 0 ? (
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {favorites.map((favorite) => (
                        <OeuvresArtworkCard key={favorite.id} artwork={favorite.artwork} isFavorite />
                    ))}
                </section>
            ) : (
                <section className="max-w-xl rounded-md border border-white/10 bg-[#08131f]/78 p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/42">Aucun favori</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Votre sélection est encore vide.</h2>
                    <p className="mt-3 text-sm leading-6 text-white/56">Parcourez la galerie et utilisez le cœur sur une œuvre pour la retrouver ici.</p>
                    <Link href="/oeuvres" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-(--accent) px-5 text-sm font-medium text-white transition hover:opacity-90">
                        Explorer la galerie
                    </Link>
                </section>
            )}
        </div>
    );
}
