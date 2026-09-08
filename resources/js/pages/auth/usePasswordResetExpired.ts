import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { request } from '@/routes/password';

export function usePasswordResetExpired() {
    const { locale } = useLocale();

    return {
        messages: AUTH_MESSAGES[locale],
        requestPasswordUrl: request(),
    };
}
