import type { FeedIconProps } from './feedIconTypes';

export default function FeedHeartIcon({ className }: FeedIconProps) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            viewBox="0 0 24 23"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 22.5C-11 7.3 4.92 -4.56 12 1.72C19.08 -4.56 35 7.3 12 22.5ZM12 20.68C30.15 8.33 18.07 -1.34 12.91 3.3L12 4.12L11.09 3.3C5.93 -1.34 -6.15 8.33 12 20.68Z" />
        </svg>
    );
}
