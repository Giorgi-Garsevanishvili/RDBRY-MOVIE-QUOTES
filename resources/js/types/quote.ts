import type { LocalizedMovieText, MovieDetailsItem } from './movie';

export type QuoteMovieOption = {
    id: number;
    name: LocalizedMovieText;
    releaseYear: number;
    posterUrl: string | null;
};

export type QuoteListItem = {
    id: number;
    text: LocalizedMovieText;
    imageUrl: string | null;
    commentCount: number;
    likeCount: number;
};

export type QuoteDetailsItem = QuoteListItem & {
    author: {
        id: number;
        username: string;
    };
    movie: QuoteMovieOption;
    canManage: boolean;
};

export type QuoteFormMovie = QuoteMovieOption | MovieDetailsItem;
