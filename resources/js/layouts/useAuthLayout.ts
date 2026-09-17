import { usePage } from '@inertiajs/react';
import interstellarImage from '@/assets/landing/interstellar.png';
import { AUTH_MESSAGES } from '@/locales/auth';
import { LANDING_MESSAGES } from '@/locales/landing';

const AUTH_PANEL_HEIGHTS: Record<string, string> = {
    'auth/Register': 'md:min-h-[704px]',
    'auth/Login': 'md:min-h-[600px]',
};

export function useAuthLayout() {
    const { component, props } = usePage();

    return {
        messages: LANDING_MESSAGES[props.locale],
        authMessages: AUTH_MESSAGES[props.locale],
        panelHeight: AUTH_PANEL_HEIGHTS[component] ?? '',
        backgroundStyle: { backgroundImage: `url(${interstellarImage})` },
    };
}
