import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { update } from '@/routes/password';
import type { ResetPasswordFormData, ResetPasswordProps } from './resetPasswordTypes';

export function useResetPassword({ token, email }: ResetPasswordProps) {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors, reset } = useForm<ResetPasswordFormData>({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('password', event.target.value);
    }

    function handlePasswordConfirmationChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('password_confirmation', event.target.value);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(update().url, {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    }

    return {
        messages: AUTH_MESSAGES[locale],
        data,
        processing,
        errors,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleSubmit,
    };
}
