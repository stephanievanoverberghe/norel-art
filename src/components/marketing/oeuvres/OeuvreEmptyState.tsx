import { Container } from '@/ui/Container';

export function OeuvreEmptyState() {
    return (
        <Container>
            <div className="rounded-3xl border border-dashed border-white/20 bg-white/2px-6 py-12 text-center text-white/75">
                <p className="text-sm uppercase tracking-[0.2em] text-white/50">Aucune œuvre affichée</p>
                <p className="mt-3 text-sm sm:text-base">Ajustez les filtres pour explorer une autre sélection.</p>
            </div>
        </Container>
    );
}
