import { cn } from '@/lib/utils/cn';
import type { CommandesProcessItem } from '@/domain/commandes/types';
import { Container } from '@/ui/Container';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';

interface CommandesProcessSectionProps {
    items: CommandesProcessItem[];
    className?: string;
    id?: string;
}

export function CommandesProcessSection({ items, className, id }: CommandesProcessSectionProps) {
    const [first, second, third, fourth] = items;

    return (
        <section id={id} aria-label="Déroulé d'une commande" className={cn('relative overflow-hidden bg-(--bg-primary) py-18 sm:py-24 lg:py-28', className)}>
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-16 h-28 w-[24rem] -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-16 top-32 h-72 w-72 rounded-full bg-white/4 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-white/4 blur-3xl" />

            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-[11px] uppercase tracking-[0.32em] text-white/38">Processus</p>

                    <Heading level={2} className="mx-auto mt-4 max-w-[12ch] text-white">
                        Comment une commande prend forme.
                    </Heading>

                    <Text variant="muted" className="mx-auto mt-5 max-w-2xl text-white/66">
                        Une progression simple. Un échange réel. Une création qui prend son propre temps.
                    </Text>
                </div>

                <div className="relative mt-14">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.16),rgba(255,255,255,0))] lg:block"
                    />

                    <div className="grid gap-4 lg:grid-cols-12">
                        {first ? <LeadProcessCard item={first} className="lg:col-span-5" /> : null}

                        <div className="grid gap-4 lg:col-span-7 lg:grid-cols-7">
                            {second ? <ProcessMiniCard item={second} className="lg:col-span-3 lg:mt-10" /> : null}

                            {third ? <ProcessMiniCard item={third} className="lg:col-span-4" /> : null}

                            {fourth ? <ProcessWideCard item={fourth} className="lg:col-span-7" /> : null}
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/3 px-6 py-6 backdrop-blur-sm sm:px-8 sm:py-7">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
                        <div>
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/34">Tempo</p>

                            <Heading level={3} className="mt-3 max-w-[14ch] text-white">
                                Rien n’est mécanique ici.
                            </Heading>
                        </div>

                        <Text variant="muted" className="text-white/62">
                            Le format, la technique, le nombre de visages, l’intention et la matière influencent ensuite la proposition. Le devis vient clarifier la suite, sans
                            retirer la dimension sensible de la commande.
                        </Text>
                    </div>
                </div>
            </Container>
        </section>
    );
}

interface ProcessCardProps {
    item: CommandesProcessItem;
    className?: string;
}

function LeadProcessCard({ item, className }: ProcessCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7 lg:min-h-108',
                className,
            )}
        >
            <p aria-hidden="true" className="pointer-events-none absolute right-5 top-3 text-[clamp(4rem,8vw,6rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {item.step}
            </p>

            <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{item.step}</span>
                    <span className="h-px flex-1 bg-white/8 transition-colors duration-500 group-hover:bg-white/16" />
                </div>

                <Heading level={3} className="mt-6 max-w-[10ch] text-2xl text-white sm:text-[1.9rem] sm:leading-tight">
                    {item.title}
                </Heading>

                <Text variant="muted" className="mt-5 max-w-xl whitespace-pre-line text-white/74">
                    {item.text}
                </Text>

                <div className="mt-auto pt-10">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/44">
                        Premier contact
                    </span>
                </div>
            </div>
        </article>
    );
}

function ProcessMiniCard({ item, className }: ProcessCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6',
                className,
            )}
        >
            <p aria-hidden="true" className="pointer-events-none absolute right-4 top-2 text-[clamp(3rem,7vw,4.75rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {item.step}
            </p>

            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{item.step}</span>
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

function ProcessWideCard({ item, className }: ProcessCardProps) {
    return (
        <article
            className={cn(
                'group relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.022))] px-6 py-6 backdrop-blur-sm sm:px-7 sm:py-7',
                className,
            )}
        >
            <p aria-hidden="true" className="pointer-events-none absolute right-5 top-2 text-[clamp(3.5rem,7vw,5.5rem)] font-semibold uppercase tracking-[-0.06em] text-white/3">
                {item.step}
            </p>

            <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.24em] text-white/30">{item.step}</span>
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
