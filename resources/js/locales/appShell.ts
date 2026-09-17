import type { AppShellMessages, Locale } from '@/types';

export const APP_SHELL_MESSAGES: Record<Locale, AppShellMessages> = {
    en: {
        brand: 'Movie Quotes',
        editProfile: 'Edit your profile',
        newsFeed: 'News feed',
        movieList: 'List of movies',
        notifications: 'Notifications',
        languageLabel: 'Choose language',
        logOut: 'Log out',
        primaryNavigation: 'Primary navigation',
        applicationNavigation: 'Application navigation',
        openMenu: 'Open navigation menu',
        closeMenu: 'Close navigation menu',
    },
    ka: {
        brand: 'Movie Quotes',
        editProfile: 'პროფილის რედაქტირება',
        newsFeed: 'სიახლეების ლენტი',
        movieList: 'ფილმების სია',
        notifications: 'შეტყობინებები',
        languageLabel: 'აირჩიე ენა',
        logOut: 'გასვლა',
        primaryNavigation: 'მთავარი ნავიგაცია',
        applicationNavigation: 'აპლიკაციის ნავიგაცია',
        openMenu: 'ნავიგაციის მენიუს გახსნა',
        closeMenu: 'ნავიგაციის მენიუს დახურვა',
    },
};
