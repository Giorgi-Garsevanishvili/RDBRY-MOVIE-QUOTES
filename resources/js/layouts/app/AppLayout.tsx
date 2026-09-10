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
        notificationUrl,
        profileUrl,
        logoutUrl,
        isFeedActive,
        isMoviesActive,
        isNotificationActive,
        isMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        handleLocaleChange,
    } = useAppLayout();

    return (
        <div className="min-h-svh bg-[linear-gradient(187.16deg,#181623_0.07%,#191725_51.65%,#0d0b14_98.75%)] text-white">
            <AppHeader
                messages={messages}
                locale={locale}
                notificationUrl={notificationUrl}
                logoutUrl={logoutUrl}
                isNotificationActive={isNotificationActive}
                onLocaleChange={handleLocaleChange}
                onOpenMenu={openMobileMenu}
            />

            <AppSidebar
                className="fixed top-[120px] left-[70px] z-30 hidden w-72 flex-col text-white lg:flex"
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

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        onClick={closeMobileMenu}
                        aria-label={messages.closeMenu}
                        className="absolute inset-0 bg-black/60"
                    />
                    <AppSidebar
                        className="relative flex h-full w-[min(24rem,calc(100vw-1.5rem))] flex-col rounded-r-xl bg-[#11101a] px-9 py-10 text-white shadow-2xl"
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
                </div>
            )}

            <main className="min-h-svh pt-[86px] lg:pl-[430px]">{children}</main>
        </div>
    );
}
