import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { redirect as googleRedirect } from '@/routes/auth/google';
import { store } from '@/routes/register';

export function useRegister() {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('username', event.target.value);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('email', event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('password', event.target.value);
    }

    function handlePasswordConfirmationChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('password_confirmation', event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(store().url, {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    }

    return {
        messages: AUTH_MESSAGES[locale],
        googleAuthUrl: googleRedirect().url,
        data,
        processing,
        errors,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleSubmit,
    };
}
