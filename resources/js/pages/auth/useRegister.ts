import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { redirect as googleRedirect } from '@/routes/auth/google';
import { store } from '@/routes/register';
import type { RegisterFormData, RegisterValidationStatuses } from './registerTypes';

const USERNAME_PATTERN = /^[a-z0-9]{3,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^[a-z0-9]{8,15}$/;

export function useRegister() {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<RegisterFormData>({
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
    const validationStatuses: RegisterValidationStatuses = {
        username:
            errors.username === undefined
                ? USERNAME_PATTERN.test(data.username)
                    ? 'valid'
                    : undefined
                : 'invalid',
        email:
            errors.email === undefined
                ? EMAIL_PATTERN.test(data.email)
                    ? 'valid'
                    : undefined
                : 'invalid',
        password:
            errors.password === undefined
                ? PASSWORD_PATTERN.test(data.password)
                    ? 'valid'
                    : undefined
                : 'invalid',
        password_confirmation:
            errors.password_confirmation === undefined
                ? data.password_confirmation !== '' && data.password_confirmation === data.password
                    ? 'valid'
                    : undefined
                : 'invalid',
    };

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
        clearErrors('username');
        setData('username', event.target.value);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
        clearErrors('email');
        setData('email', event.target.value);
    }

    function handleUsernameClear(): void {
        clearErrors('username');
        setData('username', '');
    }

    function handleEmailClear(): void {
        clearErrors('email');
        setData('email', '');
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        clearErrors('password', 'password_confirmation');
        setData('password', event.target.value);
    }

    function handlePasswordConfirmationChange(event: ChangeEvent<HTMLInputElement>): void {
        clearErrors('password_confirmation');
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
        validationStatuses,
        handleUsernameChange,
        handleEmailChange,
        handleUsernameClear,
        handleEmailClear,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleSubmit,
    };
}
