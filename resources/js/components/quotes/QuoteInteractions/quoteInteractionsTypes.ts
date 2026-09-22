import type { ChangeEvent, FormEvent } from 'react';
import type { QuoteComment, QuoteInteractionSummary, QuoteMessages } from '@/types';

export type QuoteInteractionsProps = {
    quote: QuoteInteractionSummary;
    messages: QuoteMessages;
    viewerId: number;
    viewerUsername: string;
    viewerAvatarUrl: string | null;
    commentPreviewLimit?: number;
};

export type RealtimeQuoteInteractions = {
    quoteId: number;
    comments: readonly QuoteComment[];
    commentCount: number;
    likeCount: number;
    likedByViewer: boolean | null;
};

export type QuoteCommentView = {
    id: number;
    body: string;
    authorName: string;
    authorInitials: string;
    authorAvatarUrl: string | null;
};

export type CommentFormData = {
    body: string;
};

export type QuoteInteractionHandlers = {
    onCommentChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCommentSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onCommentsToggle: () => void;
    onLikeToggle: () => void;
};

export type UseQuoteInteractionsResult = QuoteInteractionHandlers & {
    comments: readonly QuoteCommentView[];
    commentsExpanded: boolean;
    commentsListId: string;
    commentsToggleLabel: string;
    hasHiddenComments: boolean;
    commentCount: number;
    likeCount: number;
    likedByViewer: boolean;
    commentBody: string;
    commentError: string | undefined;
    currentUserInitials: string;
    currentUserAvatarUrl: string | null;
    isCommentSubmitting: boolean;
    isLikeSubmitting: boolean;
    likeIconClassName: string;
    likeLabel: string;
};
