import { router, usePage } from '@inertiajs/react';
import { useRef, useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { FEED_MESSAGES } from '@/locales/feed';
import { QUOTE_MESSAGES } from '@/locales/quotes';
import { dashboard } from '@/routes';
import type { FeedProps, FeedQuoteCardView } from './feedTypes';

const MOBILE_FEED_QUERY =
    typeof window === 'undefined' ? undefined : window.matchMedia('(max-width: 63.9375rem)');

function subscribeToFeedViewport(callback: (event: MediaQueryListEvent) => void) {
    MOBILE_FEED_QUERY?.addEventListener('change', callback);

    return () => MOBILE_FEED_QUERY?.removeEventListener('change', callback);
}

function isMobileFeedViewport(): boolean {
    return MOBILE_FEED_QUERY?.matches ?? false;
}

function getServerFeedViewport(): boolean {
    return false;
}

export function useFeed({ movies, quotes, filters }: FeedProps) {
    const { locale } = useLocale();
    const page = usePage();
    const getInitials = useInitials();
    const isMobileViewport = useSyncExternalStore(
        subscribeToFeedViewport,
        isMobileFeedViewport,
        getServerFeedViewport,
    );
    const mobileSearchTriggerRef = useRef<HTMLButtonElement>(null);
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
    const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState(filters.search);
    const feedMessages = FEED_MESSAGES[locale];
    const quoteMessages = QUOTE_MESSAGES[locale];
    const viewer = page.props.auth.user;

    if (viewer === null) {
        throw new Error('The feed requires an authenticated user.');
    }

    const quoteCards: FeedQuoteCardView[] = quotes.data.map((quote) => ({
        id: quote.id,
        authorName: quote.author.username,
        authorInitials: getInitials(quote.author.username),
        authorAvatarUrl: quote.author.avatar,
        quote: quote.text[locale],
        movieName: quote.movie.name[locale],
        releaseYear: quote.movie.releaseYear,
        imageUrl: quote.imageUrl,
        viewerId: viewer.id,
        viewerUsername: viewer.username,
        viewerAvatarUrl: viewer.avatar,
        interactions: {
            id: quote.id,
            comments: quote.comments,
            commentCount: quote.commentCount,
            likeCount: quote.likeCount,
            likedByViewer: quote.likedByViewer,
        },
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
        if (isMobileViewport) {
            setIsMobileSearchOpen(true);

            return;
        }

        setIsDesktopSearchOpen(true);
    }

    function handleMobileSearchOpenChange(open: boolean): void {
        if (open) {
            setIsMobileSearchOpen(true);

            return;
        }

        setSearchValue(filters.search);
        setIsMobileSearchOpen(false);
    }

    function handleMobileSearchCloseAutoFocus(event: Event): void {
        event.preventDefault();
        mobileSearchTriggerRef.current?.focus();
    }

    function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
        setSearchValue(event.target.value);
    }

    function handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setIsDesktopSearchOpen(false);
        setIsMobileSearchOpen(false);

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
        isMobileSearchOpen: isMobileViewport && isMobileSearchOpen,
        isDesktopSearchActive: isDesktopSearchOpen || filters.search !== '',
        mobileSearchTriggerRef,
        openQuoteForm,
        handleQuoteFormOpenChange,
        openSearch,
        handleMobileSearchOpenChange,
        handleMobileSearchCloseAutoFocus,
        handleSearchChange,
        handleSearchSubmit,
    };
}
