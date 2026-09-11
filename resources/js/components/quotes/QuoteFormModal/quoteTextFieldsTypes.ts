import type { ChangeEventHandler } from 'react';
import type { QuoteMessages } from '@/types';

export type QuoteTextFieldsProps = {
    messages: QuoteMessages;
    textEn: string;
    textKa: string;
    textEnError?: string;
    textKaError?: string;
    autoFocus: boolean;
    onTextEnChange: ChangeEventHandler<HTMLTextAreaElement>;
    onTextKaChange: ChangeEventHandler<HTMLTextAreaElement>;
};
