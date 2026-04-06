import { Button } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Section } from '@/ui/Section';
import { Text } from '@/ui/Text';

export default function HomePage() {
    return (
        <main>
            <Section>
                <Container className="space-y-6">
                    <Heading level={1}>Norel Art</Heading>

                    <Text>L’art du regard, le trait de l’âme.</Text>

                    <div className="flex gap-4">
                        <Button>Je la choisis</Button>
                        <Button variant="secondary">Voir les œuvres</Button>
                        <Button variant="ghost">Explorer</Button>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
