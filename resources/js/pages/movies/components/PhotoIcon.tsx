import type { MovieIconProps } from './movieIconTypes';

export default function PhotoIcon({ className }: MovieIconProps) {
    return (
        <svg className={className} viewBox="0 0 23 24" fill="none" aria-hidden="true">
            <path
                d="M.96 19H20.13C21.19 19 22.04 18.1 22.04 17V6C22.04 4.9 21.19 4 20.13 4H16.29L14.38 1H8.63L6.71 4H2.88C1.82 4 .96 4.9.96 6V17C.96 18.1 1.82 19 2.88 19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="11.5" cy="12" r="3.83" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}
