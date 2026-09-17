import InputError from '@/components/InputError';
import { Label } from '@/components/ui/label';
import type { AuthFieldProps } from './authFieldTypes';
import { useAuthField } from './useAuthField';

export default function AuthField({
    id,
    label,
    error,
    required = false,
    children,
}: AuthFieldProps) {
    const { errorId } = useAuthField(id);

    return (
        <div className="grid gap-2">
            <Label htmlFor={id} className="text-base leading-5 font-normal text-white">
                {label}
                {required && (
                    <span className="ml-1 text-brand-red" aria-hidden="true">
                        *
                    </span>
                )}
            </Label>
            {children}
            <InputError id={errorId} message={error} className="text-sm text-[#ff6b74]" />
        </div>
    );
}
