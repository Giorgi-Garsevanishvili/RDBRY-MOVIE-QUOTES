import type { ValidationStatus } from '@/types';

export type RegisterFormData = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type RegisterValidationStatuses = Partial<Record<keyof RegisterFormData, ValidationStatus>>;
