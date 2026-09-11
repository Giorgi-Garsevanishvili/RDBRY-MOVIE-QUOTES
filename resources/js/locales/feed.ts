import type { FeedMessages, Locale } from '@/types';

export const FEED_MESSAGES: Record<Locale, FeedMessages> = {
    en: {
        title: 'News feed',
        searchBy: 'Search by',
        search: 'Search',
        searchInstructions: 'Enter @ to search movies, Enter # to search quotes',
        searchMoviesHint: 'Enter @ to search movies',
        searchQuotesHint: 'Enter # to search quotes',
        closeSearch: 'Close search',
        noQuotes: 'No quotes have been published yet.',
        noSearchResults: 'No quotes match your search.',
        loadingMore: 'Loading more quotes…',
        movieLabel: 'movie',
    },
    ka: {
        title: 'სიახლეების გვერდი',
        searchBy: 'ძებნა',
        search: 'ძებნა',
        searchInstructions: 'ფილმის მოსაძებნად გამოიყენეთ @, ციტატისთვის — #',
        searchMoviesHint: 'ფილმის მოსაძებნად გამოიყენეთ @',
        searchQuotesHint: 'ციტატის მოსაძებნად გამოიყენეთ #',
        closeSearch: 'ძებნის დახურვა',
        noQuotes: 'ჯერ არცერთი ციტატა არ გამოქვეყნებულა.',
        noSearchResults: 'თქვენს ძებნას არცერთი ციტატა არ ემთხვევა.',
        loadingMore: 'იტვირთება დამატებითი ციტატები…',
        movieLabel: 'ფილმი',
    },
};
