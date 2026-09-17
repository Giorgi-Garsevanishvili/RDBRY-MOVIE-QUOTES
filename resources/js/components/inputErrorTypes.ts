import type { HTMLAttributes } from 'react';

export type InputErrorProps = HTMLAttributes<HTMLParagraphElement> & {
    message?: string;
};
