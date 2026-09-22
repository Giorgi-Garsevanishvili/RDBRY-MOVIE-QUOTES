import { cn } from '@/lib/utils';
import ClearInputIcon from './ClearInputIcon';
import type { ClearableInputProps } from './clearableInputTypes';
import { Input } from './ui/input';
import { useClearableInput } from './useClearableInput';

export default function ClearableInput({
    className,
    clearLabel,
    disabled,
    onClear,
    status,
    value,
    ...props
}: ClearableInputProps) {
    const { inputRef, handleClear } = useClearableInput(onClear);
    const hasClearButton = value !== undefined && String(value).length > 0 && status === undefined;

    return (
        <div className="relative">
            <Input
                ref={inputRef}
                value={value}
                disabled={disabled}
                className={cn('pr-10', className)}
                {...props}
            />
            {hasClearButton && !disabled && (
                <button
                    type="button"
                    onClick={handleClear}
                    aria-label={clearLabel}
                    className="absolute inset-y-0 right-0 inline-flex w-10 items-center justify-center rounded-r text-[#6c757d] transition-colors hover:text-[#212529] focus-visible:ring-2 focus-visible:ring-[#0d6efd] focus-visible:outline-none active:text-black"
                >
                    <ClearInputIcon className="size-4" />
                </button>
            )}
        </div>
    );
}
