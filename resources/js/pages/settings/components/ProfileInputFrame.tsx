import ValidationStatusIcon from '@/components/ValidationStatusIcon';
import { cn } from '@/lib/utils';
import type { ProfileInputFrameProps } from './profileInputFrameTypes';

export default function ProfileInputFrame({
    status,
    password = false,
    children,
}: ProfileInputFrameProps) {
    return (
        <div
            className="relative data-[validation-status=invalid]:[&_input]:border-brand-red data-[validation-status=invalid]:[&_input]:ring-2 data-[validation-status=invalid]:[&_input]:ring-brand-red/30 data-[validation-status=valid]:[&_input]:border-[#198754] data-[validation-status=valid]:[&_input]:ring-2 data-[validation-status=valid]:[&_input]:ring-[#198754]/25"
            data-validation-status={status}
        >
            {children}
            {status !== undefined && (
                <ValidationStatusIcon
                    status={status}
                    className={cn(
                        'pointer-events-none absolute top-1/2 size-5 -translate-y-1/2',
                        password ? 'right-10' : 'right-3',
                        status === 'valid' ? 'text-[#198754]' : 'text-brand-red',
                    )}
                />
            )}
        </div>
    );
}
