import { Head, Link } from '@inertiajs/react';
import union from '@/assets/errors/union.png';
import { BRAND_BUTTON_INTERACTION_CLASSES } from '@/components/ui/brandStyles';
import type { ErrorPageProps } from './errorPageTypes';
import { useErrorPage } from './useErrorPage';

export default function ErrorPage({ status }: ErrorPageProps) {
    const { content, homeUrl, illustration, illustrationClassName, isForbidden, returnHomeLabel } =
        useErrorPage(status);

    return (
        <>
            <Head title={`${status} | ${content.title}`} />
            <main className="flex min-h-svh items-center justify-center bg-[linear-gradient(187.16deg,#181623_0.07%,#191725_51.65%,#0d0b14_98.75%)] px-6 py-10 text-white">
                <section
                    aria-labelledby="error-title"
                    className="flex w-full flex-col items-center gap-8 text-center"
                >
                    <div className="relative flex h-65.25 w-full max-w-96 items-start justify-center">
                        {isForbidden && (
                            <img
                                src={union}
                                alt=""
                                aria-hidden="true"
                                className="absolute top-17.5 h-36.75 w-58.75"
                            />
                        )}
                        <img
                            src={illustration}
                            alt=""
                            aria-hidden="true"
                            className={illustrationClassName}
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4 px-4">
                        <h1 id="error-title" className="text-2xl font-bold lg:text-5xl">
                            {content.title}
                        </h1>
                        <p className="max-w-2xl text-base font-medium lg:text-2xl">
                            {content.description}
                        </p>
                    </div>

                    <Link
                        href={homeUrl}
                        className={`inline-flex min-h-12 min-w-36 items-center justify-center rounded px-4 text-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night focus-visible:outline-none ${BRAND_BUTTON_INTERACTION_CLASSES}`}
                    >
                        {returnHomeLabel}
                    </Link>
                </section>
            </main>
        </>
    );
}
