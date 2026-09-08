import type { LandingMessages } from '@/types/landing';
import type { Locale } from '@/types/locale';

export const LANDING_MESSAGES: Record<Locale, LandingMessages> = {
    en: {
        pageTitle: 'Movie Quotes',
        pageDescription: 'Discover memorable quotes from your favorite movies.',
        brand: 'Movie Quotes',
        heroTitle: 'Find any quote in millions of movie lines',
        getStarted: 'Get started',
        signUp: 'Sign Up',
        logIn: 'Log in',
        languageLabel: 'Choose language',
        copyright: (year) => `© ${year} Movie Quotes. All rights reserved.`,
        quotes: [
            {
                quote: 'You have to leave something behind to go forward',
                movie: 'Interstellar, 2014',
            },
            {
                quote: 'I think we’re just gonna have to be secretly in love with each other and leave it at that.',
                movie: 'The Royal Tenenbaums, 2001',
            },
            {
                quote: 'I see in your eyes the same fear that would take the heart of me.',
                movie: 'The Lord of the Rings, 2003',
            },
        ],
    },
    ka: {
        pageTitle: 'ფილმების ციტატები',
        pageDescription: 'აღმოაჩინე დასამახსოვრებელი ფრაზები საყვარელი ფილმებიდან.',
        brand: 'ფილმების ციტატები',
        heroTitle: 'იპოვე ნებისმიერი ციტატა მილიონობით ფილმის ფრაზას შორის',
        getStarted: 'დაწყება',
        signUp: 'რეგისტრაცია',
        logIn: 'შესვლა',
        languageLabel: 'აირჩიე ენა',
        copyright: (year) => `© ${year} ფილმების ციტატები. ყველა უფლება დაცულია.`,
        quotes: [
            {
                quote: 'წინ წასასვლელად რაღაც უნდა დატოვო უკან',
                movie: 'ინტერსტელარი, 2014',
            },
            {
                quote: 'როგორც ჩანს, ერთმანეთი საიდუმლოდ უნდა გვიყვარდეს და ყველაფერი ასე დავტოვოთ.',
                movie: 'ტენენბაუმების ოჯახი, 2001',
            },
            {
                quote: 'შენს თვალებში იმავე შიშს ვხედავ, რომელიც მეც გულს მიკლავდა.',
                movie: 'ბეჭდების მბრძანებელი, 2003',
            },
        ],
    },
};
