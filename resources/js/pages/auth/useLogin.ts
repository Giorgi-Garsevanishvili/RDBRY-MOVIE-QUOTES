import { useForm } from '@inertiajs/react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { AUTH_MESSAGES } from '@/locales/auth';
import { store } from '@/routes/login';
import type { LoginFormData, LoginProps } from './loginTypes';

export function useLogin({ status, canResetPassword }: LoginProps) {
    const { locale } = useLocale();
    const { data, setData, post, processing, errors, reset } = useForm<LoginFormData>({
        login: '',
        password: '',
        remember: false,
    });

    function handleLoginChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('login', event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        setData('password', event.target.value);
    }

    function handleRememberChange(checked: boolean | 'indeterminate'): void {
        setData('remember', checked === true);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        post(store().url, { onSuccess: () => reset('password') });
    }

    return {
        messages: AUTH_MESSAGES[locale],
        status,
        canResetPassword,
        data,
        processing,
        errors,
        handleLoginChange,
        handlePasswordChange,
        handleRememberChange,
        handleSubmit,
    };
}
