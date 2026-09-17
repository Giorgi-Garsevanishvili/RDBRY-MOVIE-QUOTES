import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { PasswordInputProps } from './passwordInputTypes';
import { usePasswordInput } from './usePasswordInput';

export default function PasswordInput({
    className,
    ref,
    showLabel = 'Show password',
    hideLabel = 'Hide password',
    ...props
}: PasswordInputProps) {
    const { showPassword, togglePasswordVisibility } = usePasswordInput();

    return (
        <div className="relative">
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pr-10', className)}
                ref={ref}
                {...props}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 text-muted-foreground hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={showPassword ? hideLabel : showLabel}
            >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </div>
    );
}
