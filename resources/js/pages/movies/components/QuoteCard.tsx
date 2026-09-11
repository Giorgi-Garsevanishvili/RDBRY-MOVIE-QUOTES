import { Link } from '@inertiajs/react';
import { HeartIcon, MessageSquareIcon, MoreHorizontalIcon } from 'lucide-react';
import type { QuoteCardProps } from './quoteCardTypes';

export default function QuoteCard({ quote, viewLabel, commentsLabel, likesLabel }: QuoteCardProps) {
    return (
        <article className="relative rounded-xl bg-[#11101a] px-[35px] py-5 lg:grid lg:h-[268px] lg:grid-cols-[226px_1fr] lg:grid-rows-[164px_1px_55px] lg:gap-x-[34px] lg:px-8 lg:py-6">
            <Link href={quote.href} aria-label={viewLabel} className="block">
                {quote.imageUrl === null ? (
                    <span className="block h-[140px] rounded bg-[#24222f]" />
                ) : (
                    <img
                        src={quote.imageUrl}
                        alt=""
                        className="h-[140px] w-full rounded object-cover"
                    />
                )}
            </Link>

            <div className="mt-4 min-w-0 lg:mt-0 lg:flex lg:items-center lg:pr-10">
                <Link
                    href={quote.href}
                    className="line-clamp-3 text-xl leading-[30px] italic hover:underline lg:text-2xl lg:leading-9"
                >
                    “{quote.text}”
                </Link>
            </div>

            <Link
                href={quote.href}
                aria-label={viewLabel}
                title={viewLabel}
                className="absolute top-[174px] right-[35px] inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:top-6 lg:right-8"
            >
                <MoreHorizontalIcon className="size-7" aria-hidden="true" />
            </Link>

            <div className="my-5 h-px bg-[#efefef]/20 lg:col-span-2 lg:my-0" />

            <div className="flex items-end gap-6 lg:col-span-2">
                <span className="inline-flex items-center gap-3" aria-label={commentsLabel}>
                    <span>{quote.commentCount}</span>
                    <MessageSquareIcon className="size-6" aria-hidden="true" />
                </span>
                <span className="inline-flex items-center gap-3" aria-label={likesLabel}>
                    <span>{quote.likeCount}</span>
                    <HeartIcon className="size-6" aria-hidden="true" />
                </span>
            </div>
        </article>
    );
}
