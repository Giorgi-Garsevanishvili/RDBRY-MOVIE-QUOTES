import type { Locale } from '@/types/locale';

export const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'ka'];

export const LOCALE_LABELS: Record<Locale, string> = {
    en: 'Eng',
    ka: 'ქარ',
};

export function isLocale(value: string): value is Locale {
    return SUPPORTED_LOCALES.some((locale) => locale === value);
}
