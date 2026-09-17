import QuoteRule from './QuoteRule';
import type { QuoteSectionProps } from './quoteSectionTypes';
import { useQuoteSection } from './useQuoteSection';

export default function QuoteSection({
    quote,
    movie,
    image,
    imagePosition = 'center',
}: QuoteSectionProps) {
    const { sectionRef, contentRef, backdropStyle } = useQuoteSection(image, imagePosition);

    return (
        <section
            ref={sectionRef}
            className="relative flex h-[431px] items-center overflow-hidden md:h-[900px] xl:h-[1200px]"
        >
            <div
                aria-hidden="true"
                className="landing-quote-backdrop absolute inset-0"
                style={backdropStyle}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div
                ref={contentRef}
                className="landing-quote-content relative z-10 mx-auto w-full max-w-[1780px] px-8 sm:px-12 md:px-[84px]"
            >
                <figure className="max-w-[840px] text-white">
                    <div className="flex gap-2.5 md:gap-7">
                        <QuoteRule />
                        <blockquote className="font-display text-2xl leading-[1.5] font-bold md:text-5xl md:leading-[1.45] xl:text-[50px]">
                            “{quote}”
                        </blockquote>
                    </div>
                    <figcaption className="mt-3 pl-[27px] text-base leading-6 font-normal md:mt-6 md:pl-[81px] md:text-3xl md:leading-10">
                        {movie}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
