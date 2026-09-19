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
                    className="group mx-2.25 mb-10 flex items-center gap-5 rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:mx-0 lg:gap-6"
                >
                    <Avatar className="size-10 border-2 border-transparent transition-colors group-hover:border-brand-red group-focus-visible:border-brand-red lg:size-15">
                        <AvatarImage src={user.avatar ?? undefined} alt="" />
                        <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 text-left">
                        <strong className="block truncate text-xl leading-7.5 font-medium lg:text-2xl lg:leading-9">
                            {user.username}
                        </strong>
                        <span className="block text-sm leading-5.25 text-white/60 lg:text-base lg:leading-6">
                            {messages.editProfile}
                        </span>
                    </span>
                </Link>

                <nav aria-label={messages.applicationNavigation} className="flex flex-col gap-10">
                    <Link
                        href={feedUrl}
                        onClick={onNavigate}
                        aria-current={isFeedActive ? 'page' : undefined}
                        className="relative isolate -mx-9 flex items-center gap-7.5 px-13.25 text-xl leading-7.5 transition-colors before:absolute before:inset-x-0 before:-inset-y-2.75 before:-z-10 before:bg-[#24222f]/60 before:opacity-0 before:transition-opacity hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:before:opacity-100 lg:mx-0 lg:ml-2.25 lg:min-h-9 lg:gap-10.5 lg:px-0 lg:text-2xl lg:leading-9 lg:hover:text-[#6c757d] lg:hover:before:opacity-0 lg:focus-visible:before:opacity-0"
                    >
                        <HomeIcon
                            className={
                                isFeedActive
                                    ? 'size-6 text-brand-red lg:size-8'
                                    : 'size-6 lg:size-8'
                            }
                        />
                        <span>{messages.newsFeed}</span>
                    </Link>
                    <Link
                        href={moviesUrl}
                        onClick={onNavigate}
                        aria-current={isMoviesActive ? 'page' : undefined}
                        className="relative isolate -mx-9 flex items-center gap-7.5 px-13.25 text-xl leading-7.5 transition-colors before:absolute before:inset-x-0 before:-inset-y-2.75 before:-z-10 before:bg-[#24222f]/60 before:opacity-0 before:transition-opacity hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:before:opacity-100 lg:mx-0 lg:ml-2.25 lg:min-h-9 lg:gap-10.5 lg:px-0 lg:text-2xl lg:leading-9 lg:hover:text-[#6c757d] lg:hover:before:opacity-0 lg:focus-visible:before:opacity-0"
                    >
                        <MovieIcon
                            className={
                                isMoviesActive
                                    ? 'size-6 text-brand-red lg:size-8'
                                    : 'size-6 lg:size-8'
                            }
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
                        className="inline-flex h-10 items-center rounded border border-white px-4 text-base transition-colors hover:bg-white hover:text-brand-night focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                        {messages.logOut}
                    </Link>
                </div>
            )}
        </aside>
    );
}
