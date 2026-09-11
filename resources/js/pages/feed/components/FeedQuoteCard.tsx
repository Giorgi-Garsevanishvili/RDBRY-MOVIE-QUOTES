import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { FeedQuoteCardProps } from '../feedTypes';
import FeedCommentIcon from './FeedCommentIcon';
import FeedHeartIcon from './FeedHeartIcon';

export default function FeedQuoteCard({ quote, feedMessages, quoteMessages }: FeedQuoteCardProps) {
    return (
        <article className="bg-black/30 px-[35px] py-6 lg:rounded-xl lg:bg-[#11101a] lg:p-6">
            <header className="flex items-center gap-4">
                <Avatar className="size-10 lg:size-[52px]">
                    <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                        {quote.authorInitials}
                    </AvatarFallback>
                </Avatar>
                <strong className="text-base font-normal lg:text-xl lg:font-medium">
                    {quote.authorName}
                </strong>
            </header>

            <p className="mt-3 text-base leading-6 lg:mt-4 lg:text-xl lg:leading-[30px]">
                “{quote.quote}” {feedMessages.movieLabel} -{' '}
                <span className="font-medium text-brand-gold">{quote.movieName}.</span> (
                {quote.releaseYear})
            </p>

            {quote.imageUrl === null ? (
                <div className="mt-4 aspect-video rounded-[10px] bg-[#24222f] lg:mt-7" />
            ) : (
                <img
                    src={quote.imageUrl}
                    alt={quote.movieName}
                    className="mt-4 aspect-video w-full rounded-[10px] object-cover lg:mt-7"
                />
            )}

            <footer className="mt-4 flex items-center gap-6 border-b border-[#efefef]/20 pb-4 lg:mt-6 lg:gap-8 lg:pb-6">
                <span
                    className="inline-flex items-center gap-3 text-xl"
                    aria-label={quoteMessages.comments}
                >
                    <span>{quote.commentCount}</span>
                    <FeedCommentIcon className="size-6 lg:size-8" />
                </span>
                <span
                    className="inline-flex items-center gap-3 text-xl"
                    aria-label={quoteMessages.likes}
                >
                    <span>{quote.likeCount}</span>
                    <FeedHeartIcon className="h-6 w-[26px] lg:h-8 lg:w-[34px]" />
                </span>
            </footer>
        </article>
    );
}
