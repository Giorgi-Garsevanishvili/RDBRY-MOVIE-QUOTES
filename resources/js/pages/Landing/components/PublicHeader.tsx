import { Link } from '@inertiajs/react';
import { LocaleMenu } from '@/components/LocaleMenu';
import { BRAND_BUTTON_INTERACTION_CLASSES } from '@/components/ui/brandStyles';
import { home, login, register } from '@/routes';
import type { PublicHeaderProps } from './publicHeaderTypes';

const OUTLINE_BUTTON_CLASSES =
    'inline-flex h-8 items-center justify-center rounded border border-white px-2 text-xs font-normal text-white transition-colors hover:bg-white hover:text-brand-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night min-[23.75rem]:h-9 min-[23.75rem]:px-3 min-[23.75rem]:text-sm md:h-9.5 md:px-6 md:text-base';

export default function PublicHeader({
    brand,
    signUpLabel,
    logInLabel,
    languageLabel,
    navigationLabel,
    locale,
    onLocaleChange,
}: PublicHeaderProps) {
    return (
        <header className="absolute inset-x-0 top-0 z-20 px-3 pt-5 min-[23.75rem]:px-9 md:px-17.5 md:pt-7">
            <nav
                className="mx-auto flex max-w-445 items-center justify-between"
                aria-label={navigationLabel}
            >
                <Link
                    href={home()}
                    className="max-w-18 text-[0.625rem] leading-3 font-medium text-brand-gold uppercase focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none min-[23.75rem]:max-w-28 min-[23.75rem]:text-xs min-[23.75rem]:leading-4 sm:max-w-none sm:text-base"
                >
                    {brand}
                </Link>

                <div className="flex items-center gap-1.5 min-[23.75rem]:gap-2 sm:gap-3 md:gap-4">
                    <LocaleMenu locale={locale} label={languageLabel} onChange={onLocaleChange} />
                    <Link
                        href={register()}
                        className={`inline-flex h-8 items-center justify-center rounded px-2 text-xs font-normal text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night focus-visible:outline-none min-[23.75rem]:h-9 min-[23.75rem]:px-3 min-[23.75rem]:text-sm sm:px-4 md:h-9.5 md:px-6 md:text-base ${BRAND_BUTTON_INTERACTION_CLASSES}`}
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
