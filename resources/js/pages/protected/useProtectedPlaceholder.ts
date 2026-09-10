import { useLocale } from '@/hooks/useLocale';
import { APP_SHELL_MESSAGES } from '@/locales/appShell';
import type { ProtectedSection } from './protectedPlaceholderTypes';

export function useProtectedPlaceholder(section: ProtectedSection) {
    const { locale } = useLocale();
    const messages = APP_SHELL_MESSAGES[locale];
    const title = {
        feed: messages.newsFeed,
        movies: messages.movieList,
        notifications: messages.notifications,
    }[section];

    return { title };
}
