import type { InertiaLinkProps } from '@inertiajs/react';
import type { AppShellMessages, Locale } from '@/types';

type LinkHref = NonNullable<InertiaLinkProps['href']>;

export type AppHeaderProps = {
    messages: AppShellMessages;
    locale: Locale;
    notificationUrl: LinkHref;
    logoutUrl: LinkHref;
    isNotificationActive: boolean;
    onLocaleChange: (locale: Locale) => void;
    onOpenMenu: () => void;
};
