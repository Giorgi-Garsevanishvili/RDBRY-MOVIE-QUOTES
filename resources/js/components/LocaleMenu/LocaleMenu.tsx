import CaretIcon from './CaretIcon';
import { LOCALE_LABELS, SUPPORTED_LOCALES } from '@/locales';
import type { LocaleMenuProps } from './localeMenuTypes';
import { useLocaleMenu } from './useLocaleMenu';

export default function LocaleMenu({ locale, label, onChange }: LocaleMenuProps) {
    const { handleChange } = useLocaleMenu(onChange);

    return (
        <label className="relative inline-flex h-8 items-center text-white min-[380px]:h-9 md:h-10">
            <span className="sr-only">{label}</span>
            <select
                aria-label={label}
                className="h-full cursor-pointer appearance-none bg-transparent py-1 pr-4 pl-0.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night min-[380px]:pr-6 min-[380px]:pl-1 min-[380px]:text-sm md:pr-7 md:text-base"
                value={locale}
                onChange={handleChange}
            >
                {SUPPORTED_LOCALES.map((supportedLocale) => (
                    <option key={supportedLocale} value={supportedLocale} className="text-black">
                        {LOCALE_LABELS[supportedLocale]}
                    </option>
                ))}
            </select>
            <CaretIcon className="pointer-events-none absolute right-0 size-2.5 rotate-90 min-[380px]:size-3 md:size-4" />
        </label>
    );
}
