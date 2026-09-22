import type { ComponentProps } from 'react';
import type { ValidationStatus } from '@/types';

export type ValidationStatusIconProps = ComponentProps<'svg'> & {
    status: ValidationStatus;
};
