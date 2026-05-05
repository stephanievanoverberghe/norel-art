import type { LegalPageContent } from '@/domain/legal/types';

export const legalNoticePageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Legal',
        title: 'Mentions legales',
        description: 'Informations relatives a l edition, a l hebergement et a la propriete intellectuelle du site Norel Art.',
    },
    paragraphs: [
        'Editeur du site : Norel Art. Les informations administratives definitives de l entreprise devront etre completees avant mise en production publique : denomination exacte, forme juridique, adresse, numero SIRET, TVA si applicable.',
        'Contact : atelier@norel-art.fr. Ce contact est utilise pour les demandes clients, les demandes relatives aux commandes et les demandes liees aux donnees personnelles.',
        'Hebergement : Vercel Inc. ou hebergeur definitif a confirmer selon le deploiement de production.',
        'Propriete intellectuelle : les oeuvres, images, textes, logos, photographies, videos et elements graphiques presentes sur le site sont proteges. Toute reproduction, diffusion, modification ou utilisation sans autorisation ecrite est interdite.',
        'Responsabilite : Norel Art s efforce de maintenir les informations du site exactes et accessibles, sans pouvoir garantir l absence d erreur, d interruption ou de maintenance ponctuelle.',
    ],
};

export const privacyPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Donnees',
        title: 'Politique de confidentialite',
        description: 'Traitement des donnees personnelles collectees via le compte client, les commandes, les favoris et les formulaires.',
    },
    paragraphs: [
        'Les donnees collectees servent a gerer les comptes, les commandes, les favoris, les demandes personnalisees, les projets fresques, le service client et les obligations legales.',
        'Les donnees peuvent inclure : nom, email, telephone, adresses, historique de commande, favoris, messages envoyes, informations de paiement traitees par Stripe et donnees techniques necessaires au fonctionnement du site.',
        'Les paiements sont traites par Stripe. Norel Art ne stocke pas les numeros complets de carte bancaire.',
        'Les donnees ne sont pas revendues. Elles peuvent etre transmises uniquement aux prestataires necessaires au fonctionnement du service : hebergement, paiement, email, livraison ou outils techniques.',
        'Vous pouvez demander l acces, la rectification ou la suppression de vos donnees via atelier@norel-art.fr, sous reserve des obligations legales de conservation.',
    ],
};

export const termsPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Vente',
        title: 'Conditions generales de vente',
        description: 'Cadre de vente des oeuvres originales, impressions, commandes personnalisees et prestations artistiques.',
    },
    paragraphs: [
        'Les presentes conditions encadrent les ventes realisees sur le site Norel Art. Elles devront etre relues et validees juridiquement avant ouverture commerciale complete.',
        'Les produits peuvent inclure des oeuvres originales, impressions, editions limitees, commandes personnalisees et prestations de fresque. Les caracteristiques essentielles sont indiquees sur les fiches ou devis.',
        'Les prix sont indiques en euros. Les frais de livraison, taxes et conditions particulieres sont precises avant validation du paiement ou dans le devis.',
        'Le paiement en ligne est realise via Stripe. Une commande est consideree comme confirmee apres validation du paiement et traitement technique de la commande.',
        'Les commandes personnalisees et fresques peuvent faire l objet d un devis, d un acompte, d un calendrier specifique et de conditions adaptees au projet.',
        'Pour les oeuvres personnalisees, le droit de retractation peut etre exclu lorsque la creation est realisee selon les specifications du client, conformement au droit applicable.',
    ],
};

export const shippingReturnsPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Commandes',
        title: 'Livraison et retours',
        description: 'Reperes pour l expedition, le suivi, les retours et les cas d oeuvres personnalisees.',
    },
    paragraphs: [
        'Les delais de preparation varient selon le type de piece : oeuvre disponible, impression, commande personnalisee ou fresque. Les informations definitives sont precisees sur la fiche, la commande ou le devis.',
        'Les oeuvres sont emballees avec soin. Les frais et modes de livraison sont indiques avant paiement lorsque la vente est realisee en ligne.',
        'En cas de colis abime, il est recommande de prendre des photos du colis et de l oeuvre, puis de contacter Norel Art rapidement avec le numero de commande.',
        'Les retours des oeuvres non personnalisees suivent les conditions legales applicables. Les frais, delais et modalites devront etre confirmes dans les CGV finales.',
        'Les commandes personnalisees, portraits sur mesure et fresques peuvent ne pas etre retournables lorsqu elles sont realisees selon les indications du client.',
    ],
};

export const cookiesPageContent: LegalPageContent = {
    intro: {
        eyebrow: 'Cookies',
        title: 'Politique cookies',
        description: 'Informations sur les cookies et technologies necessaires au fonctionnement du site.',
    },
    paragraphs: [
        'Le site peut utiliser des cookies strictement necessaires au fonctionnement : session, panier, authentification, securite et preferences techniques.',
        'Des services tiers peuvent deposer des cookies ou technologies similaires lorsque certaines fonctionnalites sont utilisees : Stripe pour le paiement, YouTube pour les videos integrees, outils de mesure si ajoutes plus tard.',
        'Les cookies non essentiels devront faire l objet d un consentement lorsque des outils analytiques, marketing ou videos non strictement necessaires seront actives.',
        'Vous pouvez gerer les cookies depuis les parametres de votre navigateur. Le blocage de certains cookies peut limiter le panier, la connexion ou le paiement.',
    ],
};
