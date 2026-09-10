import type { Locale, MovieMessages } from '@/types';

export const MOVIE_MESSAGES: Record<Locale, MovieMessages> = {
    en: {
        listTitle: 'My list of movies',
        total: 'Total',
        searchLabel: 'Search movies',
        searchPlaceholder: 'Search',
    },
    ka: {
        listTitle: 'ჩემი ფილმების სია',
        total: 'სულ',
        searchLabel: 'ფილმების ძიება',
        searchPlaceholder: 'ძიება',
    },
};
