import type { PropsWithChildren } from 'react';
import type { ValidationStatus } from '@/types';

export type ProfileInputFrameProps = PropsWithChildren<{
    status?: ValidationStatus;
    password?: boolean;
}>;
