import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { login } from '@/routes';
import { email } from '@/routes/password';
import type { ValidationStatus } from '@/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useForgotPassword() {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors, clearErrors } = useForm({ email: '' });
    const validationStatus: ValidationStatus | undefined =
        errors.email === undefined
            ? EMAIL_PATTERN.test(data.email)
                ? 'valid'
                : undefined
            : 'invalid';

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
        clearErrors('email');
        setData('email', event.target.value);
    }

    function handleEmailClear(): void {
        clearErrors('email');
        setData('email', '');
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
        validationStatus,
        handleEmailChange,
        handleEmailClear,
        handleSubmit,
    };
}
