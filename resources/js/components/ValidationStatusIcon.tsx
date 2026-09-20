import type { ValidationStatusIconProps } from './validationStatusIconTypes';

export default function ValidationStatusIcon({ status, ...props }: ValidationStatusIconProps) {
    if (status === 'valid') {
        return (
            <svg viewBox="0 0 18 18" aria-hidden="true" {...props}>
                <path
                    d="M4.05 12.86L0.23 7.91C-0.67 5.57 1.26 4.76 2.7 6.11L5.18 9.26L12.83 0.71C14.18 -0.71 16.43 0.1 15.53 2.28L6.53 12.63C5.56 13.76 4.73 13.53 4.05 12.86Z"
                    fill="currentColor"
                    transform="translate(1.12 2.286)"
                />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 18 18" aria-hidden="true" {...props}>
            <path
                d="M13 6.75C13 10.2 10.2 13 6.75 13L6.75 14C10.75 14 14 10.75 14 6.75L13 6.75ZM6.75 13C3.3 13 0.5 10.2 0.5 6.75L-0.5 6.75C-0.5 10.75 2.75 14 6.75 14L6.75 13ZM0.5 6.75C0.5 3.3 3.3 0.5 6.75 0.5L6.75-0.5C2.75-0.5-0.5 2.75-0.5 6.75L0.5 6.75ZM6.75 0.5C10.2 0.5 13 3.3 13 6.75L14 6.75C14 2.75 10.75-0.5 6.75-0.5L6.75 0.5Z"
                fill="currentColor"
                transform="translate(2.25 2.25)"
            />
            <path
                d="M0 0L0-0.5C-0.14-0.5-0.27-0.44-0.37-0.34C-0.46-0.24-0.51-0.1-0.5 0.03L0 0ZM0.6 0L1.1 0.03C1.11-0.1 1.06-0.24 0.97-0.34C0.87-0.44 0.74-0.5 0.6-0.5L0.6 0ZM0.3 4.35L-0.2 4.38C-0.18 4.65 0.04 4.85 0.3 4.85C0.56 4.85 0.78 4.65 0.8 4.38L0.3 4.35ZM0 0.5L0.6 0.5L0.6-0.5L0-0.5L0 0.5ZM0.1-0.03L-0.2 4.32L0.8 4.38L1.1 0.03L0.1-0.03ZM0.8 4.32L0.5-0.03L-0.5 0.03L-0.2 4.38L0.8 4.32Z"
                fill="currentColor"
                transform="translate(8.7 5.4)"
            />
            <path
                d="M0.9 1.8C1.4 1.8 1.8 1.4 1.8 0.9C1.8 0.4 1.4 0 0.9 0C0.4 0 0 0.4 0 0.9C0 1.4 0.4 1.8 0.9 1.8Z"
                fill="currentColor"
                transform="translate(8.1 11.4)"
            />
        </svg>
    );
}
