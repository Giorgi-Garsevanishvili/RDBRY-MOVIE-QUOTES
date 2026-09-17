import type { ChangeEventHandler, DragEventHandler } from 'react';
import type { QuoteMessages } from '@/types';

export type QuoteImageFieldProps = {
    messages: QuoteMessages;
    error?: string;
    isEdit: boolean;
    imageUrl: string | null;
    selectedFileName: string | null;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onDragOver: DragEventHandler<HTMLLabelElement>;
    onDrop: DragEventHandler<HTMLLabelElement>;
};
