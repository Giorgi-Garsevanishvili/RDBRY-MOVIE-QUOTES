import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import type { AuthLayoutProps } from '@/types';
import { useAuthLayout } from './useAuthLayout';

export default function AuthLayout({ children }: AuthLayoutProps) {
    const { messages, authMessages, panelHeight, backgroundStyle, handleOpenChange } =
        useAuthLayout();

    return (
        <DialogPrimitive.Root open onOpenChange={handleOpenChange}>
            <main className="relative min-h-svh min-w-80 overflow-x-hidden bg-brand-night font-sans">
                <div className="fixed inset-0 overflow-hidden">
                    <div
                        className="absolute inset-[-8px] scale-[1.02] blur-[3px]"
                        aria-hidden="true"
                    >
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
                </div>

                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" />
                    <div className="pointer-events-none fixed inset-0 z-10 flex items-start justify-center md:items-center md:px-6 md:py-12">
                        <DialogPrimitive.Content
                            data-testid="auth-modal"
                            className={cn(
                                'pointer-events-auto relative flex min-h-svh w-full flex-col justify-center bg-[#222030] px-8 py-12 text-white shadow-2xl outline-none md:min-h-0 md:max-w-[601px] md:rounded-[10px] md:px-10 md:py-12',
                                panelHeight,
                            )}
                        >
                            <DialogPrimitive.Close className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-10 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-brand-night focus:outline-none">
                                {authMessages.closeModal}
                            </DialogPrimitive.Close>
                            <div className="mx-auto w-full max-w-[360px]">{children}</div>
                        </DialogPrimitive.Content>
                    </div>
                </DialogPrimitive.Portal>
            </main>
        </DialogPrimitive.Root>
    );
}
