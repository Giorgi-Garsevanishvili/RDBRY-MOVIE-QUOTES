import type { ErrorMessages, Locale } from '@/types';

export const ERROR_MESSAGES: Record<Locale, ErrorMessages> = {
    en: {
        forbidden: {
            title: 'You shall not pass!',
            description: "Sorry, but you don't have permission to access this page",
        },
        notFound: {
            title: 'Whoops!',
            description: "We can't see the page you are looking for",
        },
        returnHome: 'Return home',
    },
    ka: {
        forbidden: {
            title: 'თქვენ ვერ გაივლით!',
            description: 'ბოდიშს გიხდით, მაგრამ ამ გვერდზე წვდომის უფლება არ გაქვთ',
        },
        notFound: {
            title: 'უი!',
            description: 'გვერდი, რომელსაც ეძებთ, ვერ მოიძებნა',
        },
        returnHome: 'მთავარ გვერდზე დაბრუნება',
    },
};
