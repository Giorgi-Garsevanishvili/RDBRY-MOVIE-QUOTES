import type { CaretIconProps } from './caretIconTypes';

export default function CaretIcon({ className }: CaretIconProps) {
    return (
        <svg aria-hidden="true" className={className} viewBox="0 0 16 16" fill="none">
            <path
                d="M12.14 8.753L6.658 13.549C6.012 14.115 5 13.655 5 12.796V3.204C4.99984 3.01176 5.05509 2.82354 5.15914 2.66189C5.26319 2.50024 5.41164 2.37201 5.58669 2.29255C5.76175 2.21309 5.956 2.18578 6.14618 2.21388C6.33636 2.24199 6.5144 2.32431 6.659 2.451L12.139 7.247C12.2464 7.34086 12.3325 7.45662 12.3915 7.58649C12.4505 7.71637 12.481 7.85736 12.481 8C12.481 8.14264 12.4505 8.28363 12.3915 8.41351C12.3325 8.54338 12.2464 8.65914 12.139 8.753H12.14Z"
                fill="currentColor"
            />
        </svg>
    );
}
