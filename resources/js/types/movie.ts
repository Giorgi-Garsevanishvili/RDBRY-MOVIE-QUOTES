import type { Locale } from './locale';

export type LocalizedMovieText = Record<Locale, string>;

export type MovieGenre = {
    id: number;
    name: LocalizedMovieText;
};

export type MovieListItem = {
    id: number;
    name: LocalizedMovieText;
    releaseYear: number;
    posterUrl: string | null;
    quoteCount: number;
};

export type MovieListFilters = {
    search: string;
};

export type MovieDetailsItem = {
    id: number;
    name: LocalizedMovieText;
    director: LocalizedMovieText;
    description: LocalizedMovieText;
    releaseYear: number;
    genres: readonly MovieGenre[];
    posterUrl: string | null;
    quoteCount: number;
};
