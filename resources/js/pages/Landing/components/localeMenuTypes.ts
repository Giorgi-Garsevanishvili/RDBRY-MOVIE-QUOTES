import type { Locale } from '@/types/locale';

export type LocaleMenuProps = {
    locale: Locale;
    label: string;
    onChange: (locale: Locale) => void;
};
