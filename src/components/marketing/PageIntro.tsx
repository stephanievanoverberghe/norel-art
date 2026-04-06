import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface PageIntroProps {
    eyebrow: string;
    title: string;
    description: string;
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
    return (
        <section className="py-12 sm:py-16">
            <Container>
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">{eyebrow}</p>
                <Heading level={2} className="mt-4">
                    {title}
                </Heading>
                <Text className="mt-5 max-w-3xl text-white/75">{description}</Text>
            </Container>
        </section>
    );
}
