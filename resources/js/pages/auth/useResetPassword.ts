import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { update } from '@/routes/password';
import type {
    ResetPasswordFormData,
    ResetPasswordProps,
    ResetPasswordValidationStatuses,
} from './resetPasswordTypes';

const PASSWORD_PATTERN = /^[a-z0-9]{8,15}$/;

export function useResetPassword({ token, email }: ResetPasswordProps) {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm<ResetPasswordFormData>({
            token,
            email,
            password: '',
            password_confirmation: '',
        });
    const validationStatuses: ResetPasswordValidationStatuses = {
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
        post(update().url, {
            onSuccess: () => reset('password', 'password_confirmation'),
        });
    }

    return {
        messages: AUTH_MESSAGES[locale],
        data,
        processing,
        errors,
        validationStatuses,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleSubmit,
    };
}
