import type { PublicFooterProps } from './publicFooterTypes';

export default function PublicFooter({ copyright }: PublicFooterProps) {
    return (
        <footer className="flex h-8 items-center bg-brand-ink px-8 text-[8px] font-medium text-brand-gold uppercase md:h-[50px] md:px-[70px] md:text-xs">
            <p>{copyright}</p>
        </footer>
    );
}
