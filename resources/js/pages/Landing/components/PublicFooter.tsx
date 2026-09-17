import type { PublicFooterProps } from './publicFooterTypes';

export default function PublicFooter({ copyright }: PublicFooterProps) {
    return (
        <footer className="flex h-8 items-center bg-brand-ink px-8 text-[0.5rem] font-medium text-brand-gold uppercase md:h-12.5 md:px-17.5 md:text-xs">
            <p>{copyright}</p>
        </footer>
    );
}
