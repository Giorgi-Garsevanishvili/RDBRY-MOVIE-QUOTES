import type { ChangeEvent, FormEvent } from 'react';
import type { FeedMessages, QuoteMessages, QuoteMovieOption } from '@/types';

export type FeedQuote = {
    id: number;
    text: {
        en: string;
        ka: string;
    };
    imageUrl: string | null;
    author: {
        id: number;
        username: string;
    };
    movie: {
        id: number;
        name: {
            en: string;
            ka: string;
        };
        releaseYear: number;
    };
    commentCount: number;
    likeCount: number;
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
    quote: string;
    movieName: string;
    releaseYear: number;
    imageUrl: string | null;
    commentCount: number;
    likeCount: number;
};

export type FeedToolbarProps = {
    writeNewQuote: string;
    searchBy: string;
    search: string;
    searchInstructions: string;
    searchValue: string;
    isSearchActive: boolean;
    onWriteQuote: () => void;
    onOpenSearch: () => void;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type FeedMobileSearchProps = {
    open: boolean;
    messages: FeedMessages;
    searchValue: string;
    onClose: () => void;
    onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type FeedQuoteCardProps = {
    quote: FeedQuoteCardView;
    feedMessages: FeedMessages;
    quoteMessages: QuoteMessages;
};
