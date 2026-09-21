import { Link } from '@inertiajs/react';
import { HeartIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react';
import type { QuoteCardProps } from './quoteCardTypes';
import { useQuoteCard } from './useQuoteCard';

export default function QuoteCard(props: QuoteCardProps) {
    const { quote, viewLabel, commentsLabel, likesLabel } = props;
    const { commentCount, likeCount } = useQuoteCard(props);

    return (
        <article className="relative rounded-xl bg-[#11101a] px-8.75 py-5 lg:grid lg:h-67 lg:grid-cols-[14.125rem_1fr] lg:grid-rows-[10.25rem_0.0625rem_3.4375rem] lg:gap-x-8.5 lg:px-8 lg:py-6">
            <Link href={quote.href} aria-label={viewLabel} className="block">
                {quote.imageUrl === null ? (
                    <span className="block h-35 rounded bg-[#24222f]" />
                ) : (
                    <img src={quote.imageUrl} alt="" className="h-35 w-full rounded object-cover" />
                )}
            </Link>

            <div className="mt-4 min-w-0 lg:mt-0 lg:flex lg:items-center lg:pr-10">
                <Link
                    href={quote.href}
                    className="line-clamp-3 text-xl leading-7.5 italic hover:underline lg:text-2xl lg:leading-9"
                >
                    “{quote.text}”
                </Link>
            </div>

            <Link
                href={quote.href}
                aria-label={viewLabel}
                title={viewLabel}
                className="absolute top-43.5 right-8.75 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:top-6 lg:right-8"
            >
                <MoreHorizontalIcon className="size-7" aria-hidden="true" />
            </Link>

            <div className="my-5 h-px bg-[#efefef]/20 lg:col-span-2 lg:my-0" />

            <div className="flex items-end gap-6 lg:col-span-2">
                <span className="inline-flex items-center gap-3" aria-label={commentsLabel}>
                    <span>{commentCount}</span>
                    <MessageSquareIcon className="size-6" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-3" aria-label={likesLabel}>
                    <span>{likeCount}</span>
                    <HeartIcon className="size-6" aria-hidden="true" />
                </span>
            </div>
        </article>
    );
}
