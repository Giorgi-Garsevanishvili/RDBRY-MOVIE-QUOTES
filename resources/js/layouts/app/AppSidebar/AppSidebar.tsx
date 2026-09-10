import { Link } from '@inertiajs/react';
import { LocaleMenu } from '@/components/LocaleMenu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { AppSidebarProps } from './appSidebarTypes';
import HomeIcon from './HomeIcon';
import MovieIcon from './MovieIcon';

export default function AppSidebar({
    className,
    user,
    initials,
    messages,
    locale,
    feedUrl,
    moviesUrl,
    profileUrl,
    logoutUrl,
    isFeedActive,
    isMoviesActive,
    showFooter,
    onLocaleChange,
    onNavigate,
}: AppSidebarProps) {
    return (
        <aside className={className}>
            <div>
                <Link
                    href={profileUrl}
                    onClick={onNavigate}
                    className="mb-10 flex items-center gap-4 rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                    <Avatar className="size-10">
                        <AvatarImage src={user.avatar} alt="" />
                        <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 text-left">
                        <strong className="block truncate text-xl font-medium">
                            {user.username}
                        </strong>
                        <span className="block text-sm text-white/60">{messages.editProfile}</span>
                    </span>
                </Link>

                <nav aria-label={messages.applicationNavigation} className="flex flex-col gap-10">
                    <Link
                        href={feedUrl}
                        onClick={onNavigate}
                        aria-current={isFeedActive ? 'page' : undefined}
                        className="flex items-center gap-8 rounded text-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                        <HomeIcon className={isFeedActive ? 'size-6 text-brand-red' : 'size-6'} />
                        <span>{messages.newsFeed}</span>
                    </Link>
                    <Link
                        href={moviesUrl}
                        onClick={onNavigate}
                        aria-current={isMoviesActive ? 'page' : undefined}
                        className="flex items-center gap-8 rounded text-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                        <MovieIcon
                            className={isMoviesActive ? 'size-6 text-brand-red' : 'size-6'}
                        />
                        <span>{messages.movieList}</span>
                    </Link>
                </nav>
            </div>

            {showFooter && (
                <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <LocaleMenu
                        locale={locale}
                        label={messages.languageLabel}
                        onChange={onLocaleChange}
                    />
                    <Link
                        href={logoutUrl}
                        as="button"
                        className="inline-flex h-10 items-center rounded border border-white px-4 text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                        {messages.logOut}
                    </Link>
                </div>
            )}
        </aside>
    );
}
