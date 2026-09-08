import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { update } from '@/routes/locale';
import type { Locale, UseLocaleResult } from '@/types/locale';

export function useLocale(): UseLocaleResult {
    const { locale } = usePage().props;

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    function changeLocale(nextLocale: Locale): void {
        if (nextLocale === locale) {
            return;
        }

        router.post(
            update(nextLocale).url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    }

    return { locale, changeLocale };
}
