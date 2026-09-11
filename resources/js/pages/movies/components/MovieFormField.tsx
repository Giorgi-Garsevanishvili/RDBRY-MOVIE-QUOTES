import InputError from '@/components/InputError';
import type { MovieFormFieldProps } from './movieFormFieldTypes';

export default function MovieFormField({ id, error, children }: MovieFormFieldProps) {
    return (
        <div className="grid gap-1">
            {children}
            <InputError id={`${id}-error`} message={error} className="text-brand-red" />
        </div>
    );
}
