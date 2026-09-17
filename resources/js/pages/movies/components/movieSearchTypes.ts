import type { ChangeEventHandler, FormEventHandler } from 'react';

export type MovieSearchProps = {
    value: string;
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onSubmit: FormEventHandler<HTMLFormElement>;
};
