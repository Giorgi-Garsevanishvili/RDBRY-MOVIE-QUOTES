import InputError from '@/components/InputError';
import type { QuoteFormFieldProps } from './quoteFormFieldTypes';

export default function QuoteFormField({ id, error, children }: QuoteFormFieldProps) {
    return (
        <div className="grid gap-1">
            {children}
            <InputError id={`${id}-error`} message={error} className="text-brand-red" />
        </div>
    );
}
