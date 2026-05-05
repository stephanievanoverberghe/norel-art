import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { DropForm } from '@/components/admin/DropForm';
import { getAdminDropArtworkOptions } from '@/server/drops/admin-drops';

import { createDropAction } from '../actions';

export default async function AdminNewDropPage() {
    const artworks = await getAdminDropArtworkOptions();

    return (
        <>
            <AdminPageHeader title="Nouveau drop" description="Creer un lancement avec calendrier, image hero, waitlist et selection d'oeuvres ordonnee." />
            <DropForm mode="create" artworks={artworks} action={createDropAction} />
        </>
    );
}
