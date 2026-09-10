import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { APP_SHELL_MESSAGES } from '@/locales/appShell';
import { dashboard, logout } from '@/routes';
import { index as moviesIndex } from '@/routes/movies';
import { index as notificationsIndex } from '@/routes/notifications';
import { edit as profileEdit } from '@/routes/profile';
import type { Locale } from '@/types';

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
    const notificationUrl = notificationsIndex();

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
        notificationUrl,
        profileUrl: profileEdit(),
        logoutUrl: logout(),
        isFeedActive: page.url === feedUrl.url,
        isMoviesActive: page.url === moviesUrl.url,
        isNotificationActive: page.url === notificationUrl.url,
        isMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        handleLocaleChange,
    };
}
