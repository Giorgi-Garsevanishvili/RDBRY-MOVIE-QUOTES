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
            className="relative flex h-screen items-center overflow-hidden md:h-225 xl:h-300"
        >
            <div
                aria-hidden="true"
                className="landing-quote-backdrop absolute inset-0"
                style={backdropStyle}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div
                ref={contentRef}
                className="landing-quote-content relative z-10 mx-auto w-full max-w-445 px-8 sm:px-12 md:px-21"
            >
                <figure className="max-w-210 text-white">
                    <div className="flex gap-2.5 md:gap-7">
                        <QuoteRule />
                        <blockquote className="font-display text-2xl leading-[1.5] font-bold md:text-5xl md:leading-[1.45] xl:text-[3.125rem]">
                            “{quote}”
                        </blockquote>
                    </div>
                    <figcaption className="mt-3 pl-6.75 text-base leading-6 font-normal md:mt-6 md:pl-20.25 md:text-3xl md:leading-10">
                        {movie}
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
