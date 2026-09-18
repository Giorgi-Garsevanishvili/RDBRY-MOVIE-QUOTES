import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { AppLayoutProps } from '@/types';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import { useAppLayout } from './useAppLayout';

export default function AppLayout({ children }: AppLayoutProps) {
    const {
        user,
        initials,
        locale,
        messages,
        feedUrl,
        moviesUrl,
        notificationFeed,
        profileUrl,
        logoutUrl,
        isFeedActive,
        isMoviesActive,
        isMobileMenuOpen,
        closeMobileMenu,
        handleMobileMenuOpenChange,
        handleLocaleChange,
    } = useAppLayout();

    return (
        <DialogPrimitive.Root open={isMobileMenuOpen} onOpenChange={handleMobileMenuOpenChange}>
            <div className="min-h-svh bg-[linear-gradient(187.16deg,#181623_0.07%,#191725_51.65%,#0d0b14_98.75%)] text-white">
                <AppHeader
                    userId={user.id}
                    messages={messages}
                    locale={locale}
                    notificationFeed={notificationFeed}
                    logoutUrl={logoutUrl}
                    onLocaleChange={handleLocaleChange}
                />

                <AppSidebar
                    className="fixed top-30 left-17.5 z-30 hidden w-72 flex-col text-white lg:flex"
                    user={user}
                    initials={initials}
                    messages={messages}
                    locale={locale}
                    feedUrl={feedUrl}
                    moviesUrl={moviesUrl}
                    profileUrl={profileUrl}
                    logoutUrl={logoutUrl}
                    isFeedActive={isFeedActive}
                    isMoviesActive={isMoviesActive}
                    showFooter={false}
                    onLocaleChange={handleLocaleChange}
                    onNavigate={closeMobileMenu}
                />

                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 lg:hidden" />
                    <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-50 w-[min(24rem,calc(100vw-1.5rem))] outline-none lg:hidden">
                        <DialogPrimitive.Title className="sr-only">
                            {messages.applicationNavigation}
                        </DialogPrimitive.Title>
                        <AppSidebar
                            className="flex h-full w-full flex-col rounded-r-xl bg-[#11101a] px-9 py-10 text-white shadow-2xl"
                            user={user}
                            initials={initials}
                            messages={messages}
                            locale={locale}
                            feedUrl={feedUrl}
                            moviesUrl={moviesUrl}
                            profileUrl={profileUrl}
                            logoutUrl={logoutUrl}
                            isFeedActive={isFeedActive}
                            isMoviesActive={isMoviesActive}
                            showFooter={true}
                            onLocaleChange={handleLocaleChange}
                            onNavigate={closeMobileMenu}
                        />
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>

                <main className="min-h-svh pt-21.5 lg:pl-107.5">{children}</main>
            </div>
        </DialogPrimitive.Root>
    );
}
