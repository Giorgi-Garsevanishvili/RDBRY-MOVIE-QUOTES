import { useState } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { QUOTE_MESSAGES } from '@/locales/quotes';
import type { FeedProps } from './feedTypes';

export function useFeed({ movies }: FeedProps) {
    const { locale } = useLocale();
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

    function openQuoteForm(): void {
        setIsQuoteFormOpen(true);
    }

    function handleQuoteFormOpenChange(open: boolean): void {
        setIsQuoteFormOpen(open);
    }

    return {
        movies,
        messages: QUOTE_MESSAGES[locale],
        isQuoteFormOpen,
        openQuoteForm,
        handleQuoteFormOpenChange,
    };
}
