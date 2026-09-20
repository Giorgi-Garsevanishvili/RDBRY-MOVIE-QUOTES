import type { PropsWithChildren } from 'react';
import type { ValidationStatus } from '@/types';

export type AuthFieldProps = PropsWithChildren<{
    id: string;
    label: string;
    error?: string;
    required?: boolean;
    status?: ValidationStatus;
    statusIconClassName?: string;
}>;
