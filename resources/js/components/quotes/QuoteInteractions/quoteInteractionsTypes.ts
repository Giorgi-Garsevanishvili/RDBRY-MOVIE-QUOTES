import type { ChangeEvent, FormEvent } from 'react';
import type { QuoteInteractionSummary, QuoteMessages } from '@/types';

export type QuoteInteractionsProps = {
    quote: QuoteInteractionSummary;
    messages: QuoteMessages;
    viewerUsername: string;
};

export type QuoteCommentView = {
    id: number;
    body: string;
    authorName: string;
    authorInitials: string;
};

export type CommentFormData = {
    body: string;
};

export type QuoteInteractionHandlers = {
    onCommentChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onCommentSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onLikeToggle: () => void;
};

export type UseQuoteInteractionsResult = QuoteInteractionHandlers & {
    comments: readonly QuoteCommentView[];
    commentBody: string;
    commentError: string | undefined;
    currentUserInitials: string;
    isCommentSubmitting: boolean;
    isLikeSubmitting: boolean;
    likeIconClassName: string;
    likeLabel: string;
};
