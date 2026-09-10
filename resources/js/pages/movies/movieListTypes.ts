import type { MovieListFilters, MovieListItem } from '@/types';

export type MovieListProps = {
    movies: readonly MovieListItem[];
    filters: MovieListFilters;
};

export type MovieCardView = Omit<MovieListItem, 'name'> & {
    name: string;
};
