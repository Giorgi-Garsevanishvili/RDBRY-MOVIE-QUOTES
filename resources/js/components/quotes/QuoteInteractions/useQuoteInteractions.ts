import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { store as storeComment } from '@/routes/quotes/comments';
import { destroy as destroyLike, store as storeLike } from '@/routes/quotes/likes';
import type {
    CommentFormData,
    QuoteCommentView,
    QuoteInteractionsProps,
    UseQuoteInteractionsResult,
} from './quoteInteractionsTypes';

export function useQuoteInteractions({
    quote,
    messages,
    viewerUsername,
}: QuoteInteractionsProps): UseQuoteInteractionsResult {
    const getInitials = useInitials();
    const commentForm = useForm<CommentFormData>({ body: '' });
    const likeForm = useForm({});

    const comments: QuoteCommentView[] = quote.comments.map((comment) => ({
        id: comment.id,
        body: comment.body,
        authorName: comment.author.username,
        authorInitials: getInitials(comment.author.username),
    }));
    const likeIconClassName = quote.likedByViewer ? 'text-brand-red' : 'text-white';
    const likeLabel = quote.likedByViewer ? messages.unlikeQuote : messages.likeQuote;

    function onCommentChange(event: ChangeEvent<HTMLInputElement>): void {
        commentForm.setData('body', event.target.value);
    }

    function onCommentSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        commentForm.post(storeComment(quote.id).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => commentForm.reset('body'),
        });
    }

    function onLikeToggle(): void {
        const options = {
            preserveScroll: true,
            preserveState: true,
        };

        if (quote.likedByViewer) {
            likeForm.delete(destroyLike(quote.id).url, options);

            return;
        }

        likeForm.put(storeLike(quote.id).url, options);
    }

    return {
        comments,
        commentBody: commentForm.data.body,
        commentError: commentForm.errors.body,
        currentUserInitials: getInitials(viewerUsername),
        isCommentSubmitting: commentForm.processing,
        isLikeSubmitting: likeForm.processing,
        likeIconClassName,
        likeLabel,
        onCommentChange,
        onCommentSubmit,
        onLikeToggle,
    };
}
