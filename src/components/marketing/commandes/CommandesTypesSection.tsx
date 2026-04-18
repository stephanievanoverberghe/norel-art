import { cn } from '@/lib/utils/cn';
import type { CommandesTypeItem } from '@/domain/commandes/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesTypesSectionProps {
    items: CommandesTypeItem[];
    className?: string;
    id?: string;
}

export function CommandesTypesSection({ items, className, id }: CommandesTypesSectionProps) {
    const [first, second, third, fourth] = items;

    return (
        <section id={id} aria-label="Ce que je peux créer" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-[24rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-12 top-28 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">Possibles</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] text-white">
                        Ce que je peux faire apparaître avec toi.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/66">
                        Portraits à partir de vos photos, pour un visage seul, un couple, une famille, un enfant, un animal, un cadeau ou un hommage.
                    </Text>
                </div>

                <div className="mt-12 grid gap-4 lg:grid-cols-12 lg:auto-rows-auto">
                    {first ? <FeatureTypeCard item={first} index={0} className="lg:col-span-7" /> : null}

                    <div className="grid gap-4 lg:col-span-5">
                        {second ? <CompactTypeCard item={second} index={1} className="lg:translate-y-6" /> : null}

                        {third ? <CompactTypeCard item={third} index={2} /> : null}
                    </div>

                    {fourth ? <WideTypeCard item={fourth} index={3} className="lg:col-span-12" /> : null}
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/3 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6">
                    <div className="flex flex-wrap items-center gap-2.5">
                        {['Portraits', 'Familles', 'Couples', 'Enfants', 'Animaux', 'Cadeaux', 'Hommages'].map((label) => (
                            <span
                                key={label}
                                className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/48"
                            >
                                {label}
                            </span>
                        ))}
                    </div>

                    <Text variant="muted" className="mt-4 max-w-3xl text-sm leading-6 text-white/58">
                        Fusain, graphite, encre, aquarelle, acrylique ou pastel : la technique, le format et l’intention influencent ensuite la proposition et le devis.
                    </Text>
                </div>
            </Container>
        </section>
    );
}

interface BaseTypeCardProps {
    item: CommandesTypeItem;
    index: number;
    className?: string;
}

function FeatureTypeCard({ item, index, className }: BaseTypeCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7 lg:min-h-88',
                className,
            )}
        >
            <p aria-hidden="true" className="pointer-events-none absolute right-5 top-3 text-[clamp(4rem,7vw,6rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {String(index + 1).padStart(2, '0')}
            </p>

            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-px flex-1 bg-white/8 transition-colors duration-500 group-hover:bg-white/16" />
                </div>

                <Heading level={3} className="mt-6 max-w-[10ch] text-2xl text-white sm:text-[1.9rem] sm:leading-tight">
                    {item.title}
                </Heading>

                <Text variant="muted" className="mt-5 max-w-xl whitespace-pre-line text-white/74">
                    {item.text}
                </Text>

                <div className="mt-auto pt-8">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/44">
                        À partir de vos photos
                    </span>
                </div>
            </div>
        </article>
    );
}

function CompactTypeCard({ item, index, className }: BaseTypeCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6',
                className,
            )}
        >
            <p aria-hidden="true" className="pointer-events-none absolute right-4 top-2 text-[clamp(3.25rem,7vw,5rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {String(index + 1).padStart(2, '0')}
            </p>

            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
                    <span className="h-px flex-1 bg-white/8 transition-colors duration-500 group-hover:bg-white/16" />
                </div>

                <Heading level={3} className="mt-5 max-w-[14ch] text-lg text-white sm:text-[1.15rem]">
                    {item.title}
                </Heading>

                <Text variant="muted" className="mt-4 whitespace-pre-line text-white/72">
                    {item.text}
                </Text>
            </div>
        </article>
    );
}

function WideTypeCard({ item, index, className }: BaseTypeCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7',
                className,
            )}
        >
            <p aria-hidden="true" className="pointer-events-none absolute right-5 top-3 text-[clamp(3.5rem,7vw,5.5rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {String(index + 1).padStart(2, '0')}
            </p>

            <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{String(index + 1).padStart(2, '0')}</span>
                        <span className="h-px flex-1 bg-white/8 transition-colors duration-500 group-hover:bg-white/16" />
                    </div>

                    <Heading level={3} className="mt-5 max-w-[14ch] text-xl text-white">
                        {item.title}
                    </Heading>
                </div>

                <Text variant="muted" className="whitespace-pre-line text-white/72">
                    {item.text}
                </Text>
            </div>
        </article>
    );
}
