import { useEcho } from '@laravel/echo-react';
import { useForm } from '@inertiajs/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import {
    QUOTE_INTERACTIONS_CHANNEL,
    QUOTE_INTERACTIONS_EVENT,
} from '@/helpers/quoteInteractionBroadcast';
import { useInitials } from '@/hooks/use-initials';
import { store as storeComment } from '@/routes/quotes/comments';
import { destroy as destroyLike, store as storeLike } from '@/routes/quotes/likes';
import type { QuoteComment, QuoteInteractionBroadcastPayload } from '@/types';
import type {
    CommentFormData,
    QuoteCommentView,
    QuoteInteractionsProps,
    RealtimeQuoteInteractions,
    UseQuoteInteractionsResult,
} from './quoteInteractionsTypes';

export function useQuoteInteractions({
    quote,
    messages,
    viewerId,
    viewerUsername,
    viewerAvatarUrl,
    commentPreviewLimit,
}: QuoteInteractionsProps): UseQuoteInteractionsResult {
    const getInitials = useInitials();
    const commentForm = useForm<CommentFormData>({ body: '' });
    const likeForm = useForm({});
    const [commentsExpanded, setCommentsExpanded] = useState(false);
    const [realtime, setRealtime] = useState<RealtimeQuoteInteractions | null>(null);
    const currentRealtime = realtime?.quoteId === quote.id ? realtime : null;
    const realtimeComments = currentRealtime?.comments ?? [];
    const commentMap = new Map<number, QuoteComment>();

    quote.comments.forEach((comment) => commentMap.set(comment.id, comment));
    realtimeComments.forEach((comment) => commentMap.set(comment.id, comment));

    const mergedComments = Array.from(commentMap.values());
    const commentCount = currentRealtime?.commentCount ?? quote.commentCount;
    const likeCount = currentRealtime?.likeCount ?? quote.likeCount;
    const likedByViewer = currentRealtime?.likedByViewer ?? quote.likedByViewer;

    const allComments: QuoteCommentView[] = mergedComments.map((comment) => ({
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
        : messages.viewAllComments(commentCount);
    const likeIconClassName = likedByViewer ? 'text-brand-red' : 'text-white';
    const likeLabel = likedByViewer ? messages.unlikeQuote : messages.likeQuote;

    useEcho<QuoteInteractionBroadcastPayload>(
        QUOTE_INTERACTIONS_CHANNEL,
        `.${QUOTE_INTERACTIONS_EVENT}`,
        onRealtimeInteraction,
        [quote.id, viewerId],
    );

    function onRealtimeInteraction(payload: QuoteInteractionBroadcastPayload): void {
        if (payload.quoteId !== quote.id) {
            return;
        }

        setRealtime((current) => {
            const currentComments = current?.quoteId === quote.id ? current.comments : [];
            const comments = [...currentComments];

            if (
                payload.comment !== null &&
                !quote.comments.some((comment) => comment.id === payload.comment?.id) &&
                !comments.some((comment) => comment.id === payload.comment?.id)
            ) {
                comments.push(payload.comment);
            }

            const currentLikedByViewer =
                current?.quoteId === quote.id ? current.likedByViewer : null;
            const likedByViewerUpdate =
                payload.actorId === viewerId && payload.likedByActor !== null
                    ? payload.likedByActor
                    : currentLikedByViewer;

            return {
                quoteId: quote.id,
                comments,
                commentCount: payload.commentCount,
                likeCount: payload.likeCount,
                likedByViewer: likedByViewerUpdate,
            };
        });
    }

    function onCommentChange(event: ChangeEvent<HTMLInputElement>): void {
        commentForm.clearErrors('body');
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

        if (likedByViewer) {
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
        commentCount,
        likeCount,
        likedByViewer,
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
