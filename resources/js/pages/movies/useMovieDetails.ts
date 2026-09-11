import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { MOVIE_MESSAGES } from '@/locales/movies';
import { destroy } from '@/routes/movies';
import type { LocalizedMovieDetails, MovieDetailsProps } from './movieDetailsTypes';

export function useMovieDetails({ movie, genres }: MovieDetailsProps) {
    const { locale } = useLocale();
    const [isEditMovieOpen, setIsEditMovieOpen] = useState(false);
    const deleteForm = useForm({});
    const localizedMovie: LocalizedMovieDetails = {
        ...movie,
        name: movie.name[locale],
        director: movie.director[locale],
        genres: movie.genres.map((genre) => ({
            id: genre.id,
            name: genre.name[locale],
        })),
    };

    function openEditMovie(): void {
        setIsEditMovieOpen(true);
    }

    function handleEditMovieOpenChange(open: boolean): void {
        setIsEditMovieOpen(open);
    }

    function deleteMovie(): void {
        deleteForm.delete(destroy(movie.id).url);
    }

    return {
        movie,
        genres,
        localizedMovie,
        messages: MOVIE_MESSAGES[locale],
        isEditMovieOpen,
        isDeleting: deleteForm.processing,
        openEditMovie,
        handleEditMovieOpenChange,
        deleteMovie,
    };
}
