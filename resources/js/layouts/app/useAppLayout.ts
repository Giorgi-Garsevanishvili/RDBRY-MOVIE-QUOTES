import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { APP_SHELL_MESSAGES } from '@/locales/appShell';
import { dashboard, logout } from '@/routes';
import { index as moviesIndex } from '@/routes/movies';
import { edit as profileEdit } from '@/routes/profile';
import type { Locale, NotificationFeed } from '@/types';

const EMPTY_NOTIFICATION_FEED = {
    items: [],
    unreadCount: 0,
} satisfies NotificationFeed;

export function useAppLayout() {
    const page = usePage();
    const { locale, changeLocale } = useLocale();
    const getInitials = useInitials();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = page.props.auth.user;

    if (user === null) {
        throw new Error('The protected application layout requires an authenticated user.');
    }

    const feedUrl = dashboard();
    const moviesUrl = moviesIndex();
    const currentPath = page.url.split('?')[0];

    function openMobileMenu(): void {
        setIsMobileMenuOpen(true);
    }

    function closeMobileMenu(): void {
        setIsMobileMenuOpen(false);
    }

    function handleLocaleChange(nextLocale: Locale): void {
        closeMobileMenu();
        changeLocale(nextLocale);
    }

    return {
        user,
        initials: getInitials(user.username),
        locale,
        messages: APP_SHELL_MESSAGES[locale],
        feedUrl,
        moviesUrl,
        notificationFeed: page.props.notificationFeed ?? EMPTY_NOTIFICATION_FEED,
        profileUrl: profileEdit(),
        logoutUrl: logout(),
        isFeedActive: currentPath === feedUrl.url,
        isMoviesActive:
            currentPath === moviesUrl.url || currentPath.startsWith(`${moviesUrl.url}/`),
        isMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        handleLocaleChange,
    };
}
