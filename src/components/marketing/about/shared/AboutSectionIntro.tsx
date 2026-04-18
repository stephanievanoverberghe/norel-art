import { cn } from '@/lib/utils/cn';
import { Heading } from '@/ui/Heading';
import { Text } from '@/ui/Text';
import type { AboutSectionIntroContent } from '@/types/about';

import { aboutSectionStyles } from './about-styles';
import { SplitLines } from './SplitLines';

interface AboutSectionIntroProps {
    content: AboutSectionIntroContent;
    className?: string;
    headingClassName?: string;
    descriptionClassName?: string;
}

export function AboutSectionIntro({ content, className, headingClassName, descriptionClassName }: AboutSectionIntroProps) {
    return (
        <div className={cn(aboutSectionStyles.stickyIntro, className)}>
            <p className={aboutSectionStyles.eyebrow}>{content.eyebrow}</p>

            <Heading level={2} className={cn('mt-4 text-white', headingClassName)}>
                <SplitLines lines={content.heading.lines} />
            </Heading>

            {content.description ? (
                <Text variant="muted" className={cn('mt-5 max-w-md text-white/66', descriptionClassName)}>
                    {content.description}
                </Text>
            ) : null}

            {content.descriptionLines ? (
                <Text variant="muted" className={cn('mt-5 max-w-sm text-white/62', descriptionClassName)}>
                    <SplitLines lines={content.descriptionLines} />
                </Text>
            ) : null}
        </div>
    );
}
