import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { QUOTE_MESSAGES } from '@/locales/quotes';
import { dashboard } from '@/routes';
import { show as showMovie } from '@/routes/movies';
import { destroy } from '@/routes/quotes';
import type { LocalizedQuoteDetails, QuoteDetailsProps } from './quoteDetailsTypes';

export function useQuoteDetails({ quote }: QuoteDetailsProps) {
    const { locale } = useLocale();
    const getInitials = useInitials();
    const [isEditQuoteOpen, setIsEditQuoteOpen] = useState(false);
    const deleteForm = useForm({});
    const localizedQuote: LocalizedQuoteDetails = {
        ...quote,
        movie: {
            ...quote.movie,
            name: quote.movie.name[locale],
        },
    };

    function closeQuote(): void {
        const url = quote.canManage ? showMovie(quote.movie.id).url : dashboard().url;

        router.visit(url);
    }

    function handleQuoteOpenChange(open: boolean): void {
        if (!open) {
            closeQuote();
        }
    }

    function openEditQuote(): void {
        setIsEditQuoteOpen(true);
    }

    function handleEditQuoteOpenChange(open: boolean): void {
        setIsEditQuoteOpen(open);
    }

    function deleteQuote(): void {
        deleteForm.delete(destroy(quote.id).url);
    }

    return {
        quote,
        localizedQuote,
        authorInitials: getInitials(quote.author.username),
        messages: QUOTE_MESSAGES[locale],
        isEditQuoteOpen,
        isDeleting: deleteForm.processing,
        handleQuoteOpenChange,
        openEditQuote,
        handleEditQuoteOpenChange,
        deleteQuote,
    };
}
