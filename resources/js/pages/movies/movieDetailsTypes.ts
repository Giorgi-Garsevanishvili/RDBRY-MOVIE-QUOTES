import type { MovieDetailsItem, MovieGenre } from '@/types';

export type MovieDetailsProps = {
    movie: MovieDetailsItem;
    genres: readonly MovieGenre[];
};

export type LocalizedMovieDetails = Omit<MovieDetailsItem, 'name' | 'director' | 'genres'> & {
    name: string;
    director: string;
    genres: readonly { id: number; name: string }[];
};
