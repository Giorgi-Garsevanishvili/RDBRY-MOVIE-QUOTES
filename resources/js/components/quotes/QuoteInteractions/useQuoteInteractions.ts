import { useForm } from '@inertiajs/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
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
    viewerAvatarUrl,
    commentPreviewLimit,
}: QuoteInteractionsProps): UseQuoteInteractionsResult {
    const getInitials = useInitials();
    const commentForm = useForm<CommentFormData>({ body: '' });
    const likeForm = useForm({});
    const [commentsExpanded, setCommentsExpanded] = useState(false);

    const allComments: QuoteCommentView[] = quote.comments.map((comment) => ({
        id: comment.id,
        body: comment.body,
        authorName: comment.author.username,
        authorInitials: getInitials(comment.author.username),
        authorAvatarUrl: comment.author.avatar,
    }));
    const hasHiddenComments =
        commentPreviewLimit !== undefined && allComments.length > commentPreviewLimit;
    const comments =
        hasHiddenComments && !commentsExpanded
            ? allComments.slice(-commentPreviewLimit)
            : allComments;
    const commentsListId = `quote-${quote.id}-comments`;
    const commentsToggleLabel = commentsExpanded
        ? messages.showFewerComments
        : messages.viewAllComments(quote.commentCount);
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

    function onCommentsToggle(): void {
        setCommentsExpanded((expanded) => !expanded);
    }

    return {
        comments,
        commentsExpanded,
        commentsListId,
        commentsToggleLabel,
        hasHiddenComments,
        commentBody: commentForm.data.body,
        commentError: commentForm.errors.body,
        currentUserInitials: getInitials(viewerUsername),
        currentUserAvatarUrl: viewerAvatarUrl,
        isCommentSubmitting: commentForm.processing,
        isLikeSubmitting: likeForm.processing,
        likeIconClassName,
        likeLabel,
        onCommentChange,
        onCommentSubmit,
        onCommentsToggle,
        onLikeToggle,
    };
}
