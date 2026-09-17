import { QuoteInteractions } from '@/components/quotes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { FeedQuoteCardProps } from '../feedTypes';

const FEED_COMMENT_PREVIEW_LIMIT = 3;

export default function FeedQuoteCard({ quote, feedMessages, quoteMessages }: FeedQuoteCardProps) {
    return (
        <article className="bg-black/30 px-8.75 py-6 lg:rounded-xl lg:bg-[#11101a] lg:p-6">
            <header className="flex items-center gap-4">
                <Avatar className="size-10 lg:size-13">
                    <AvatarImage src={quote.authorAvatarUrl ?? undefined} alt="" />
                    <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                        {quote.authorInitials}
                    </AvatarFallback>
                </Avatar>
                <strong className="text-base font-normal lg:text-xl lg:font-medium">
                    {quote.authorName}
                </strong>
            </header>

            <p className="mt-3 text-base leading-6 lg:mt-4 lg:text-xl lg:leading-7.5">
                “{quote.quote}” {feedMessages.movieLabel} -{' '}
                <span className="font-medium text-brand-gold">{quote.movieName}.</span> (
                {quote.releaseYear})
            </p>

            {quote.imageUrl === null ? (
                <div className="mt-4 aspect-video rounded-lg bg-[#24222f] lg:mt-7" />
            ) : (
                <img
                    src={quote.imageUrl}
                    alt={quote.movieName}
                    className="mt-4 aspect-video w-full rounded-lg object-cover lg:mt-7"
                />
            )}

            <QuoteInteractions
                quote={quote.interactions}
                messages={quoteMessages}
                viewerUsername={quote.viewerUsername}
                viewerAvatarUrl={quote.viewerAvatarUrl}
                commentPreviewLimit={FEED_COMMENT_PREVIEW_LIMIT}
            />
        </article>
    );
}
