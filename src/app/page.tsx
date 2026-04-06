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
                    <Text variant="muted">Base UI en cours de construction.</Text>
                </Container>
            </Section>
        </main>
    );
}
