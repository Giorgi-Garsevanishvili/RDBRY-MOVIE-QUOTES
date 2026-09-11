import type { MovieGenre, MovieListFilters, MovieListItem } from '@/types';

export type MovieListProps = {
    movies: readonly MovieListItem[];
    filters: MovieListFilters;
    genres: readonly MovieGenre[];
};

export type MovieCardView = Omit<MovieListItem, 'name'> & {
    name: string;
    href: string;
};
