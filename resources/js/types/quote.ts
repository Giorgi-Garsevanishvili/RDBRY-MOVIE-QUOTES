import type { LocalizedMovieText, MovieDetailsItem } from './movie';

export type QuoteMovieOption = {
    id: number;
    name: LocalizedMovieText;
    releaseYear: number;
    posterUrl: string | null;
};

export type QuoteComment = {
    id: number;
    body: string;
    author: {
        id: number;
        username: string;
    };
};

export type QuoteInteractionSummary = {
    id: number;
    comments: readonly QuoteComment[];
    commentCount: number;
    likeCount: number;
    likedByViewer: boolean;
};

export type QuoteListItem = {
    id: number;
    text: LocalizedMovieText;
    imageUrl: string | null;
    commentCount: number;
    likeCount: number;
};

export type QuoteDetailsItem = QuoteListItem &
    QuoteInteractionSummary & {
        author: {
            id: number;
            username: string;
        };
        movie: QuoteMovieOption;
        canManage: boolean;
    };

export type QuoteFormMovie = QuoteMovieOption | MovieDetailsItem;
