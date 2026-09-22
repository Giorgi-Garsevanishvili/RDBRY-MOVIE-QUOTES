import type { ComponentProps } from 'react';
import type { ValidationStatus } from '@/types';
import type { Input } from './ui/input';

export type ClearableInputProps = Omit<ComponentProps<typeof Input>, 'ref'> & {
    clearLabel: string;
    onClear: () => void;
    status?: ValidationStatus;
};
