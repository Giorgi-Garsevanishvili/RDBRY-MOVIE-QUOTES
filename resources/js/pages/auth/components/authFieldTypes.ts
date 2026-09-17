import type { PropsWithChildren } from 'react';

export type AuthFieldProps = PropsWithChildren<{
    id: string;
    label: string;
    error?: string;
    required?: boolean;
}>;
