import type { LegalPageContent } from '@/domain/legal/types';

export const legalNoticePageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Légal',
        title: 'Mentions légales',
        description: 'Informations légales et éditeur du site.',
    },
    paragraphs: [
        'Éditeur : Norel Art · Entreprise individuelle.',
        'Contact : atelier@norel-art.fr',
        'Hébergement : Hébergeur à compléter lors de la mise en ligne.',
        'Propriété intellectuelle : les contenus visuels et textuels du site sont protégés.',
    ],
};

export const privacyPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Légal',
        title: 'Politique de confidentialité',
        description: 'Traitement des données personnelles collectées via les formulaires du site.',
    },
    paragraphs: [
        'Les informations transmises via les formulaires sont utilisées uniquement pour répondre aux demandes.',
        'Les données ne sont pas revendues et sont conservées pendant une durée limitée au suivi client.',
        'Vous pouvez demander modification ou suppression de vos données via atelier@norel-art.fr.',
    ],
};
