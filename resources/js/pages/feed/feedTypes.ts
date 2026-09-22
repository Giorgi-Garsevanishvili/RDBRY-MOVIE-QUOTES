import type { ChangeEvent, FormEvent, RefObject } from 'react';
import type {
    FeedMessages,
    QuoteInteractionSummary,
    QuoteMessages,
    QuoteMovieOption,
} from '@/types';

export type FeedQuote = QuoteInteractionSummary & {
    text: {
        en: string;
        ka: string;
    };
    imageUrl: string | null;
    author: {
        id: number;
        username: string;
        avatar: string | null;
    };
    movie: {
        id: number;
        name: {
            en: string;
            ka: string;
        };
        releaseYear: number;
    };
};

export type FeedQuotePage = {
    data: readonly FeedQuote[];
};

export type FeedFilters = {
    search: string;
};

export type FeedProps = {
    movies: readonly QuoteMovieOption[];
    quotes: FeedQuotePage;
    filters: FeedFilters;
};

export type FeedQuoteCardView = {
    id: number;
    authorName: string;
    authorInitials: string;
    authorAvatarUrl: string | null;
    quote: string;
    movieName: string;
    releaseYear: number;
    imageUrl: string | null;
    viewerId: number;
    viewerUsername: string;
    viewerAvatarUrl: string | null;
    interactions: QuoteInteractionSummary;
};

export type FeedToolbarProps = {
    writeNewQuote: string;
    searchBy: string;
    search: string;
    searchInstructions: string;
    searchValue: string;
    isSearchActive: boolean;
    mobileSearchTriggerRef: RefObject<HTMLButtonElement | null>;
    onWriteQuote: () => void;
    onOpenSearch: () => void;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type FeedMobileSearchProps = {
    open: boolean;
    messages: FeedMessages;
    searchValue: string;
    onOpenChange: (open: boolean) => void;
    onCloseAutoFocus: (event: Event) => void;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type FeedQuoteCardProps = {
    quote: FeedQuoteCardView;
    feedMessages: FeedMessages;
    quoteMessages: QuoteMessages;
};
