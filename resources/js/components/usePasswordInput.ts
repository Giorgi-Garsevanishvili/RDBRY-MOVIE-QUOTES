import { useState } from 'react';

export function usePasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility(): void {
        setShowPassword((isVisible) => !isVisible);
    }

    return { showPassword, togglePasswordVisibility };
}
