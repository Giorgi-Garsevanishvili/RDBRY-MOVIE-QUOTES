import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { MOVIE_MESSAGES } from '@/locales/movies';
import { QUOTE_MESSAGES } from '@/locales/quotes';
import { destroy } from '@/routes/movies';
import { show } from '@/routes/quotes';
import type { QuoteCardItem } from './components/quoteCardTypes';
import type { LocalizedMovieDetails, MovieDetailsProps } from './movieDetailsTypes';

export function useMovieDetails({ movie, genres }: MovieDetailsProps) {
    const { locale } = useLocale();
    const [isEditMovieOpen, setIsEditMovieOpen] = useState(false);
    const [isAddQuoteOpen, setIsAddQuoteOpen] = useState(false);
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
    const quoteCards: QuoteCardItem[] = movie.quotes.map((quote) => ({
        ...quote,
        text: quote.text[locale],
        href: show(quote.id).url,
    }));

    function openEditMovie(): void {
        setIsEditMovieOpen(true);
    }

    function handleEditMovieOpenChange(open: boolean): void {
        setIsEditMovieOpen(open);
    }

    function openAddQuote(): void {
        setIsAddQuoteOpen(true);
    }

    function handleAddQuoteOpenChange(open: boolean): void {
        setIsAddQuoteOpen(open);
    }

    function deleteMovie(): void {
        deleteForm.delete(destroy(movie.id).url);
    }

    return {
        movie,
        genres,
        localizedMovie,
        messages: MOVIE_MESSAGES[locale],
        quoteMessages: QUOTE_MESSAGES[locale],
        quoteCards,
        isEditMovieOpen,
        isAddQuoteOpen,
        isDeleting: deleteForm.processing,
        openEditMovie,
        handleEditMovieOpenChange,
        openAddQuote,
        handleAddQuoteOpenChange,
        deleteMovie,
    };
}
