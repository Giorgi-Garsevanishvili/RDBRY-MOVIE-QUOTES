import { router } from '@inertiajs/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { MOVIE_MESSAGES } from '@/locales/movies';
import { index as moviesIndex } from '@/routes/movies';
import type { MovieCardView, MovieListProps } from './movieListTypes';

export function useMovieList({ movies, filters }: MovieListProps) {
    const { locale } = useLocale();
    const [searchValue, setSearchValue] = useState(filters.search);
    const messages = MOVIE_MESSAGES[locale];
    const localizedMovies: MovieCardView[] = movies.map((movie) => ({
        ...movie,
        name: movie.name[locale],
    }));

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(event.target.value);
    }

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const search = searchValue.trim();
        const route = moviesIndex({
            query: search === '' ? {} : { filter: { search } },
        });

        router.get(
            route.url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    }

    return {
        messages,
        localizedMovies,
        searchValue,
        handleSearchChange,
        handleSearchSubmit,
    };
}
