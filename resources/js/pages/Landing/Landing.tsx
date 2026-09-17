import { Head, Link } from '@inertiajs/react';
import { register } from '@/routes';
import { PublicFooter, PublicHeader, QuoteSection } from './components';
import { useLanding } from './useLanding';

export default function Landing() {
    const { locale, messages, changeLocale, quoteSections, copyright } = useLanding();

    return (
        <div className="min-w-80 bg-brand-night font-sans">
            <Head title={messages.pageTitle}>
                <meta name="description" content={messages.pageDescription} />
                <link rel="preload" as="image" href={quoteSections[0].image} />
            </Head>

            <PublicHeader
                brand={messages.brand}
                signUpLabel={messages.signUp}
                logInLabel={messages.logIn}
                languageLabel={messages.languageLabel}
                navigationLabel={messages.mainNavigation}
                locale={locale}
                onLocaleChange={changeLocale}
            />

            <main>
                <section className="flex h-121.25 items-center justify-center bg-[linear-gradient(180deg,#11101a_0%,#15141f_100%)] px-8 pt-14 text-center md:h-202 md:px-16 md:pt-10">
                    <div className="flex max-w-195 flex-col items-center">
                        <h1 className="font-display text-2xl leading-[1.5] font-bold text-brand-gold md:text-6xl md:leading-[1.25]">
                            {messages.heroTitle}
                        </h1>
                        <Link
                            href={register()}
                            className="mt-6 inline-flex h-10 items-center justify-center rounded bg-brand-red px-4 text-base font-normal text-white transition-colors hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night focus-visible:outline-none md:mt-8 md:h-12 md:px-5 md:text-xl"
                        >
                            {messages.getStarted}
                        </Link>
                    </div>
                </section>

                <QuoteSection {...quoteSections[0]} />
                <QuoteSection {...quoteSections[1]} />
                <QuoteSection {...quoteSections[2]} />
            </main>

            <PublicFooter copyright={copyright} />
        </div>
    );
}
