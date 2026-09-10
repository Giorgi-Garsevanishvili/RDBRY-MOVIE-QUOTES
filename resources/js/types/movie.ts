import type { Locale } from './locale';

export type LocalizedMovieText = Record<Locale, string>;

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
