import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';

export function usePasswordResetEmailSent() {
    const { locale } = useLocale();

    return { messages: AUTH_MESSAGES[locale] };
}
