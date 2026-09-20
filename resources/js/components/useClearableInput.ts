import { useRef } from 'react';

export function useClearableInput(onClear: () => void) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClear(): void {
        onClear();
        inputRef.current?.focus();
    }

    return { inputRef, handleClear };
}
