import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { resend } from '@/routes/activation';
import type { VerificationPendingProps } from './verificationPendingTypes';

export function useVerificationPending({ canResend, status }: VerificationPendingProps) {
    const { locale } = useLocale();
    const { post, processing } = useForm({});

    function handleResend(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(resend().url, { preserveScroll: true });
    }

    return {
        messages: AUTH_MESSAGES[locale],
        canResend,
        status,
        processing,
        handleResend,
    };
}
