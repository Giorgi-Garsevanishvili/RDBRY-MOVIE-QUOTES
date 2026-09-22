export type LoginProps = {
    status?: string;
    googleError?: string;
    canResetPassword: boolean;
};

export type LoginFormData = {
    login: string;
    password: string;
    remember: boolean;
};

export type LoginValidationStatuses = Partial<Record<'login' | 'password', ValidationStatus>>;
import type { ValidationStatus } from '@/types';
