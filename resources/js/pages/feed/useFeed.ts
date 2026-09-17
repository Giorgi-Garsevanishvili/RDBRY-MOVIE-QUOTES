import { router } from '@inertiajs/react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { FEED_MESSAGES } from '@/locales/feed';
import { QUOTE_MESSAGES } from '@/locales/quotes';
import { dashboard } from '@/routes';
import type { FeedProps, FeedQuoteCardView } from './feedTypes';

export function useFeed({ movies, quotes, filters }: FeedProps) {
    const { locale } = useLocale();
    const getInitials = useInitials();
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(filters.search);
    const feedMessages = FEED_MESSAGES[locale];
    const quoteMessages = QUOTE_MESSAGES[locale];
    const quoteCards: FeedQuoteCardView[] = quotes.data.map((quote) => ({
        id: quote.id,
        authorName: quote.author.username,
        authorInitials: getInitials(quote.author.username),
        quote: quote.text[locale],
        movieName: quote.movie.name[locale],
        releaseYear: quote.movie.releaseYear,
        imageUrl: quote.imageUrl,
        commentCount: quote.commentCount,
        likeCount: quote.likeCount,
    }));
    const emptyMessage =
        filters.search === '' ? feedMessages.noQuotes : feedMessages.noSearchResults;

    function openQuoteForm(): void {
        setIsQuoteFormOpen(true);
    }

    function handleQuoteFormOpenChange(open: boolean): void {
        setIsQuoteFormOpen(open);
    }

    function openSearch(): void {
        setIsSearchOpen(true);
    }

    function closeSearch(): void {
        setSearchValue(filters.search);
        setIsSearchOpen(false);
    }

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(event.target.value);
    }

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setIsSearchOpen(false);

        const search = searchValue.trim();
        const route = dashboard({
            query: search === '' ? {} : { filter: { search } },
        });

        router.get(
            route.url,
            {},
            {
                preserveScroll: false,
                preserveState: false,
                replace: true,
            },
        );
    }

    return {
        movies,
        feedMessages,
        quoteMessages,
        quoteCards,
        emptyMessage,
        searchValue,
        isQuoteFormOpen,
        isSearchOpen,
        isDesktopSearchActive: isSearchOpen || filters.search !== '',
        openQuoteForm,
        handleQuoteFormOpenChange,
        openSearch,
        closeSearch,
        handleSearchChange,
        handleSearchSubmit,
    };
}
