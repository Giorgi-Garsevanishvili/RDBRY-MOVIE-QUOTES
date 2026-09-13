import type { InertiaLinkProps } from '@inertiajs/react';
import type { AppShellMessages, Locale, NotificationFeed } from '@/types';

type LinkHref = NonNullable<InertiaLinkProps['href']>;

export type AppHeaderProps = {
    userId: number;
    messages: AppShellMessages;
    locale: Locale;
    notificationFeed: NotificationFeed;
    logoutUrl: LinkHref;
    onLocaleChange: (locale: Locale) => void;
    onOpenMenu: () => void;
};
