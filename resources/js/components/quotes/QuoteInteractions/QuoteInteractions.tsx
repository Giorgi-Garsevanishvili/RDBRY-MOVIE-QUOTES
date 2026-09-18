import InputError from '@/components/InputError';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { QuoteInteractionsProps } from './quoteInteractionsTypes';
import QuoteCommentIcon from './QuoteCommentIcon';
import QuoteHeartIcon from './QuoteHeartIcon';
import { useQuoteInteractions } from './useQuoteInteractions';

export default function QuoteInteractions(props: QuoteInteractionsProps) {
    const {
        comments,
        commentBody,
        commentError,
        currentUserInitials,
        currentUserAvatarUrl,
        isCommentSubmitting,
        isLikeSubmitting,
        likeIconClassName,
        likeLabel,
        onCommentChange,
        onCommentSubmit,
        onLikeToggle,
    } = useQuoteInteractions(props);

    return (
        <div>
            <div className="flex items-center gap-6 border-b border-[#efefef]/20 py-4 lg:gap-8 lg:py-6">
                <span
                    className="inline-flex items-center gap-3 text-xl"
                    aria-label={props.messages.comments}
                >
                    <span>{props.quote.commentCount}</span>
                    <QuoteCommentIcon className="size-6 lg:size-8" />
                </span>
                <button
                    type="button"
                    onClick={onLikeToggle}
                    disabled={isLikeSubmitting}
                    aria-label={likeLabel}
                    aria-pressed={props.quote.likedByViewer}
                    className="inline-flex items-center gap-3 rounded text-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-50"
                >
                    <span>{props.quote.likeCount}</span>
                    <QuoteHeartIcon
                        className={`h-6 w-[26px] lg:h-8 lg:w-[34px] ${likeIconClassName}`}
                    />
                </button>
            </div>

            {comments.map((comment) => (
                <article
                    key={comment.id}
                    className="flex gap-4 border-b border-[#efefef]/20 py-4 lg:gap-6 lg:py-6"
                >
                    <Avatar className="size-10 shrink-0 lg:size-[52px]">
                        <AvatarImage src={comment.authorAvatarUrl ?? undefined} alt="" />
                        <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                            {comment.authorInitials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                        <strong className="text-base font-normal lg:text-xl lg:font-medium">
                            {comment.authorName}
                        </strong>
                        <p className="mt-1 text-base leading-6 break-words lg:mt-2 lg:text-xl lg:leading-[30px]">
                            {comment.body}
                        </p>
                    </div>
                </article>
            ))}

            <form
                onSubmit={onCommentSubmit}
                className="flex items-start gap-4 pt-4 lg:gap-6 lg:pt-6"
            >
                <Avatar className="size-10 shrink-0 lg:size-[52px]">
                    <AvatarImage src={currentUserAvatarUrl ?? undefined} alt="" />
                    <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                        {currentUserInitials}
                    </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                    <label htmlFor={`quote-${props.quote.id}-comment`} className="sr-only">
                        {props.messages.writeComment}
                    </label>
                    <input
                        id={`quote-${props.quote.id}-comment`}
                        name="body"
                        type="text"
                        value={commentBody}
                        onChange={onCommentChange}
                        disabled={isCommentSubmitting}
                        placeholder={props.messages.writeComment}
                        aria-invalid={commentError === undefined ? undefined : true}
                        aria-describedby={
                            commentError === undefined
                                ? undefined
                                : `quote-${props.quote.id}-comment-error`
                        }
                        className="h-10 w-full rounded-[10px] bg-[#24222f] px-4 text-base text-white placeholder:text-[#ced4da] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-50 lg:h-[52px] lg:px-7 lg:text-xl"
                    />
                    <InputError
                        id={`quote-${props.quote.id}-comment-error`}
                        message={commentError}
                        className="mt-2 text-brand-red"
                    />
                </div>
                <button type="submit" disabled={isCommentSubmitting} className="sr-only">
                    {props.messages.submitComment}
                </button>
            </form>
        </div>
    );
}
