import type { ChangeEvent } from 'react';
import { isLocale } from '@/locales';
import type { LocaleMenuProps } from './localeMenuTypes';

export function useLocaleMenu(onChange: LocaleMenuProps['onChange']) {
    function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
        const selectedLocale = event.target.value;

        if (isLocale(selectedLocale)) {
            onChange(selectedLocale);
        }
    }

    return { handleChange };
}
