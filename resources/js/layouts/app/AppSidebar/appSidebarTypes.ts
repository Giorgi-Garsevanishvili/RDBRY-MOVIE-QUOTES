import type { InertiaLinkProps } from '@inertiajs/react';
import type { AppShellMessages, Locale, User } from '@/types';

type LinkHref = NonNullable<InertiaLinkProps['href']>;

export type AppSidebarProps = {
    className: string;
    user: User;
    initials: string;
    messages: AppShellMessages;
    locale: Locale;
    feedUrl: LinkHref;
    moviesUrl: LinkHref;
    profileUrl: LinkHref;
    logoutUrl: LinkHref;
    isFeedActive: boolean;
    isMoviesActive: boolean;
    showFooter: boolean;
    onLocaleChange: (locale: Locale) => void;
    onNavigate: () => void;
};
