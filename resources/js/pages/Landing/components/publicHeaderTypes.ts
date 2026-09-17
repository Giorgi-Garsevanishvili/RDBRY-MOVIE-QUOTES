import type { Locale } from '@/types/locale';

export type PublicHeaderProps = {
    brand: string;
    signUpLabel: string;
    logInLabel: string;
    languageLabel: string;
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
};
