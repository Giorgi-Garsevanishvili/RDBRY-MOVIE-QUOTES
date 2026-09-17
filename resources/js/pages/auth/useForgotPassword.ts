import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { login } from '@/routes';
import { email } from '@/routes/password';

export function useForgotPassword() {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('email', event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(email().url);
    }

    return {
        messages: AUTH_MESSAGES[locale],
        loginUrl: login(),
        data,
        processing,
        errors,
        handleEmailChange,
        handleSubmit,
    };
}
