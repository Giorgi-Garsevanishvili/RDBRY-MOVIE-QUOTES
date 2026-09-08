import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { login } from '@/routes';

export function useVerificationSuccess() {
    const { locale } = useLocale();

    return {
        messages: AUTH_MESSAGES[locale],
        loginUrl: login(),
    };
}
