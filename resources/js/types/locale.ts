export type Locale = 'en' | 'ka';

export type UseLocaleResult = {
    locale: Locale;
    changeLocale: (locale: Locale) => void;
};
