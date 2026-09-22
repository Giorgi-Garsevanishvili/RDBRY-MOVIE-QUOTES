import InputError from '@/components/InputError';
import ValidationStatusIcon from '@/components/ValidationStatusIcon';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { AuthFieldProps } from './authFieldTypes';
import { useAuthField } from './useAuthField';

export default function AuthField({
    id,
    label,
    error,
    required = false,
    status,
    statusIconClassName,
    children,
}: AuthFieldProps) {
    const { errorId } = useAuthField(id);
    const validationStatus = error === undefined ? status : 'invalid';

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
            <div
                className="relative data-[validation-status=invalid]:[&_input]:border-brand-red data-[validation-status=invalid]:[&_input]:ring-[0.2rem] data-[validation-status=invalid]:[&_input]:ring-brand-red/25 data-[validation-status=valid]:[&_input]:border-[#198754] data-[validation-status=valid]:[&_input]:ring-[0.2rem] data-[validation-status=valid]:[&_input]:ring-[#198754]/25"
                data-validation-status={validationStatus}
            >
                {children}
                {validationStatus !== undefined && (
                    <ValidationStatusIcon
                        status={validationStatus}
                        className={cn(
                            'pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2',
                            validationStatus === 'valid' ? 'text-[#198754]' : 'text-brand-red',
                            statusIconClassName,
                        )}
                    />
                )}
            </div>
            <InputError id={errorId} message={error} className="text-sm text-[#ff6b74]" />
        </div>
    );
}
