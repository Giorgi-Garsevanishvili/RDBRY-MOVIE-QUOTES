import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { useAuthLayout } from './useAuthLayout';

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
    const { messages, authMessages, panelHeight, backgroundStyle } = useAuthLayout();

    return (
        <main className="relative min-h-svh min-w-80 overflow-x-hidden bg-brand-night font-sans">
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-[-8px] scale-[1.02] blur-[3px]" aria-hidden="true">
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,#11101a_0%,#15141f_75%,transparent_100%)]" />
                    <div
                        className="absolute inset-x-0 top-[74%] h-[40%] bg-cover bg-center"
                        style={backgroundStyle}
                    />
                    <p className="absolute top-7 left-[3.65%] text-base font-medium text-brand-gold uppercase">
                        {messages.brand}
                    </p>
                    <p className="absolute top-[29%] left-1/2 w-[780px] -translate-x-1/2 text-center font-display text-6xl leading-[1.25] font-bold text-brand-gold">
                        {messages.heroTitle}
                    </p>
                </div>
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                    aria-hidden="true"
                />
                <Link
                    href={home()}
                    aria-label={authMessages.closeModal}
                    className="absolute inset-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none focus-visible:ring-inset"
                />
            </div>

            <div className="pointer-events-none relative z-10 flex min-h-svh items-start justify-center md:items-center md:px-6 md:py-12">
                <section
                    data-testid="auth-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="auth-modal-title"
                    className={cn(
                        'pointer-events-auto flex min-h-svh w-full flex-col justify-center bg-[#222030] px-8 py-12 text-white shadow-2xl md:min-h-0 md:max-w-[601px] md:rounded-[10px] md:px-10 md:py-12',
                        panelHeight,
                    )}
                >
                    <div className="mx-auto w-full max-w-[360px]">
                        {title && (
                            <header className="mb-6 text-center">
                                <h1
                                    id="auth-modal-title"
                                    className="text-[2rem] leading-[1.2] font-medium text-white"
                                >
                                    {title}
                                </h1>
                                {description && (
                                    <p className="mt-2 text-base leading-6 text-[#a5a5ad]">
                                        {description}
                                    </p>
                                )}
                            </header>
                        )}
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}
