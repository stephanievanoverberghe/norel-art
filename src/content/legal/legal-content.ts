import type { LegalPageContent } from '@/domain/legal/types';

export const legalNoticePageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Légal',
        title: 'Mentions légales',
        description: 'Informations relatives à l’édition, à l’hébergement et à la propriété intellectuelle du site Norel Art.',
    },
    paragraphs: [
        'Éditeur du site : Norel Art. Les informations administratives définitives de l’entreprise devront être complétées avant mise en production publique : dénomination exacte, forme juridique, adresse, numéro SIRET, TVA si applicable.',
        'Contact : atelier@norel-art.fr. Ce contact est utilisé pour les demandes clients, les demandes relatives aux commandes et les demandes liées aux données personnelles.',
        'Hébergement : Vercel Inc. ou hébergeur définitif à confirmer selon le déploiement de production.',
        'Propriété intellectuelle : les œuvres, images, textes, logos, photographies, vidéos et éléments graphiques présentés sur le site sont protégés. Toute reproduction, diffusion, modification ou utilisation sans autorisation écrite est interdite.',
        'Responsabilité : Norel Art s’efforce de maintenir les informations du site exactes et accessibles, sans pouvoir garantir l’absence d’erreur, d’interruption ou de maintenance ponctuelle.',
    ],
};

export const privacyPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Données',
        title: 'Politique de confidentialité',
        description: 'Traitement des données personnelles collectées via le compte client, les commandes, les favoris et les formulaires.',
    },
    paragraphs: [
        'Les données collectées servent à gérer les comptes, les commandes, les favoris, les demandes personnalisées, les projets fresques, le service client et les obligations légales.',
        'Les données peuvent inclure : nom, email, téléphone, adresses, historique de commande, favoris, messages envoyés, informations de paiement traitées par Stripe et données techniques nécessaires au fonctionnement du site.',
        'Les paiements sont traités par Stripe. Norel Art ne stocke pas les numéros complets de carte bancaire.',
        'Les données ne sont pas revendues. Elles peuvent être transmises uniquement aux prestataires nécessaires au fonctionnement du service : hébergement, paiement, email, livraison ou outils techniques.',
        'Vous pouvez demander l’accès, la rectification ou la suppression de vos données via atelier@norel-art.fr, sous réserve des obligations légales de conservation.',
    ],
};

export const termsPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Vente',
        title: 'Conditions générales de vente',
        description: 'Cadre de vente des peintures originales, affiches, commandes personnalisées et prestations artistiques.',
    },
    paragraphs: [
        'Les présentes conditions encadrent les ventes réalisées sur le site Norel Art. Elles devront être relues et validées juridiquement avant ouverture commerciale complète.',
        'Les produits peuvent inclure des peintures originales, affiches, éditions limitées, commandes personnalisées et prestations de fresque. Les caractéristiques essentielles sont indiquées sur les fiches ou devis.',
        'Les prix sont indiqués en euros. Les frais de livraison, taxes et conditions particulières sont précisés avant validation du paiement ou dans le devis.',
        'Le paiement en ligne est réalisé via Stripe. Une commande est considérée comme confirmée après validation du paiement et traitement technique de la commande.',
        'Les commandes personnalisées et fresques peuvent faire l’objet d’un devis, d’un acompte, d’un calendrier spécifique et de conditions adaptées au projet.',
        'Pour les œuvres personnalisées, le droit de rétractation peut être exclu lorsque la création est réalisée selon les spécifications du client, conformément au droit applicable.',
    ],
};

export const shippingReturnsPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Commandes',
        title: 'Livraison et retours',
        description: 'Repères pour l’expédition, le suivi, les retours et les cas d’œuvres personnalisées.',
    },
    paragraphs: [
        'Les délais de préparation varient selon le type de pièce : œuvre disponible, affiche, commande personnalisée ou fresque. Les informations définitives sont précisées sur la fiche, la commande ou le devis.',
        'Les œuvres sont emballées avec soin. Les frais et modes de livraison sont indiqués avant paiement lorsque la vente est réalisée en ligne.',
        'En cas de colis abîmé, il est recommandé de prendre des photos du colis et de l’œuvre, puis de contacter Norel Art rapidement avec le numéro de commande.',
        'Les retours des œuvres non personnalisées suivent les conditions légales applicables. Les frais, délais et modalités devront être confirmés dans les CGV finales.',
        'Les commandes personnalisées, portraits sur mesure et fresques peuvent ne pas être retournables lorsqu’elles sont réalisées selon les indications du client.',
    ],
};

export const cookiesPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Cookies',
        title: 'Politique cookies',
        description: 'Informations sur les cookies et technologies nécessaires au fonctionnement du site.',
    },
    paragraphs: [
        'Le site peut utiliser des cookies strictement nécessaires au fonctionnement : session, panier, authentification, sécurité et préférences techniques.',
        'Des services tiers peuvent déposer des cookies ou technologies similaires lorsque certaines fonctionnalités sont utilisées : Stripe pour le paiement, YouTube pour les vidéos intégrées, outils de mesure si ajoutés plus tard.',
        'Les cookies non essentiels devront faire l’objet d’un consentement lorsque des outils analytiques, marketing ou vidéos non strictement nécessaires seront activés.',
        'Vous pouvez gérer les cookies depuis les paramètres de votre navigateur. Le blocage de certains cookies peut limiter le panier, la connexion ou le paiement.',
    ],
};
