import { Link } from '@inertiajs/react';
import { LocaleMenu } from '@/components/LocaleMenu';
import type { AppHeaderProps } from './appHeaderTypes';
import MenuIcon from './MenuIcon';
import NotificationMenu from './NotificationMenu';

export default function AppHeader({
    userId,
    messages,
    locale,
    notificationFeed,
    logoutUrl,
    onLocaleChange,
    onOpenMenu,
}: AppHeaderProps) {
    return (
        <header className="fixed inset-x-0 top-0 z-40 h-[86px] border-b border-white/5 bg-[#222030] text-white">
            <nav
                aria-label={messages.primaryNavigation}
                className="flex h-full items-center justify-between px-9 lg:px-[70px]"
            >
                <button
                    type="button"
                    onClick={onOpenMenu}
                    aria-label={messages.openMenu}
                    className="inline-flex size-10 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:hidden"
                >
                    <MenuIcon className="size-6" />
                </button>

                <span className="hidden text-base font-medium text-brand-gold uppercase lg:inline">
                    {messages.brand}
                </span>

                <div className="ml-auto flex items-center gap-4">
                    <NotificationMenu
                        userId={userId}
                        feed={notificationFeed}
                        locale={locale}
                        label={messages.notifications}
                    />

                    <div className="hidden items-center gap-4 lg:flex">
                        <LocaleMenu
                            locale={locale}
                            label={messages.languageLabel}
                            onChange={onLocaleChange}
                        />
                        <Link
                            href={logoutUrl}
                            as="button"
                            className="inline-flex h-[38px] items-center justify-center rounded border border-white px-6 text-base transition-colors hover:bg-white hover:text-brand-night focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                        >
                            {messages.logOut}
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
