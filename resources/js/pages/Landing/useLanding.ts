import interstellarImage from '@/assets/landing/interstellar.png';
import lordOfTheRingsImage from '@/assets/landing/lord-of-the-rings.png';
import royalTenenbaumsImage from '@/assets/landing/royal-tenenbaums.png';
import { useLocale } from '@/hooks/useLocale';
import { LANDING_MESSAGES } from '@/locales/landing';

export function useLanding() {
    const { locale, changeLocale } = useLocale();
    const messages = LANDING_MESSAGES[locale];
    const quoteSections = [
        {
            ...messages.quotes[0],
            image: interstellarImage,
            imagePosition: 'center',
        },
        {
            ...messages.quotes[1],
            image: royalTenenbaumsImage,
            imagePosition: 'center',
        },
        {
            ...messages.quotes[2],
            image: lordOfTheRingsImage,
            imagePosition: '78% center',
        },
    ] as const;

    return {
        locale,
        messages,
        changeLocale,
        quoteSections,
        copyright: messages.copyright(new Date().getFullYear()),
    };
}
