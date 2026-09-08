import type { ComponentProps, Ref } from 'react';

export type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'> & {
    ref?: Ref<HTMLInputElement>;
    showLabel?: string;
    hideLabel?: string;
};
