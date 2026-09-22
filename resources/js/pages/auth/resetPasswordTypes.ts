export type ResetPasswordProps = {
    token: string;
    email: string;
};

export type ResetPasswordFormData = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type ResetPasswordValidationStatuses = Partial<
    Record<'password' | 'password_confirmation', ValidationStatus>
>;
import type { ValidationStatus } from '@/types';
