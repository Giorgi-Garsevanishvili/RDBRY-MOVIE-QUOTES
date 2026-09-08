import { Link } from '@inertiajs/react';
import { home, login, register } from '@/routes';
import LocaleMenu from './LocaleMenu';
import type { PublicHeaderProps } from './publicHeaderTypes';

const OUTLINE_BUTTON_CLASSES =
    'inline-flex h-8 items-center justify-center rounded border border-white px-2 text-xs font-normal text-white transition-colors hover:bg-white hover:text-brand-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night min-[380px]:h-9 min-[380px]:px-3 min-[380px]:text-sm md:h-[38px] md:px-6 md:text-base';

export default function PublicHeader({
    brand,
    signUpLabel,
    logInLabel,
    languageLabel,
    locale,
    onLocaleChange,
}: PublicHeaderProps) {
    return (
        <header className="absolute inset-x-0 top-0 z-20 px-3 pt-5 min-[380px]:px-9 md:px-[70px] md:pt-7">
            <nav
                className="mx-auto flex max-w-[1780px] items-center justify-between"
                aria-label="Main"
            >
                <Link
                    href={home()}
                    className="max-w-[72px] text-[10px] leading-3 font-medium text-brand-gold uppercase focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none min-[380px]:max-w-28 min-[380px]:text-xs min-[380px]:leading-4 sm:max-w-none sm:text-base"
                >
                    {brand}
                </Link>

                <div className="flex items-center gap-1.5 min-[380px]:gap-2 sm:gap-3 md:gap-4">
                    <LocaleMenu locale={locale} label={languageLabel} onChange={onLocaleChange} />
                    <Link
                        href={register()}
                        className="inline-flex h-8 items-center justify-center rounded bg-brand-red px-2 text-xs font-normal text-white transition-colors hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night focus-visible:outline-none min-[380px]:h-9 min-[380px]:px-3 min-[380px]:text-sm sm:px-4 md:h-[38px] md:px-6 md:text-base"
                    >
                        {signUpLabel}
                    </Link>
                    <Link href={login()} className={OUTLINE_BUTTON_CLASSES}>
                        {logInLabel}
                    </Link>
                </div>
            </nav>
        </header>
    );
}
