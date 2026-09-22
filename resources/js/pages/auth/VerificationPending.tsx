import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { AuthHeading, AUTH_PRIMARY_BUTTON_CLASSES } from './components';
import { useVerificationPending } from './useVerificationPending';
import type { VerificationPendingProps } from './verificationPendingTypes';

export default function VerificationPending(props: VerificationPendingProps) {
    const { messages, canResend, status, processing, handleResend } = useVerificationPending(props);

    return (
        <>
            <Head title={messages.activationPendingPageTitle} />
            <AuthHeading
                title={messages.activationPendingTitle}
                description={messages.activationPendingDescription}
            />

            {status && (
                <div
                    role="status"
                    className="mt-5 rounded border border-emerald-600/40 bg-emerald-950/40 px-3 py-2 text-center text-sm text-emerald-300"
                >
                    {status}
                </div>
            )}

            {canResend && (
                <form onSubmit={handleResend} className="mt-6">
                    <Button
                        type="submit"
                        className={`w-full ${AUTH_PRIMARY_BUTTON_CLASSES}`}
                        disabled={processing}
                        data-processing={processing}
                        data-test="resend-activation-link-button"
                    >
                        {processing && <Spinner aria-label={messages.resendingEmail} />}
                        {processing ? messages.resendingEmail : messages.resendEmail}
                    </Button>
                </form>
            )}
        </>
    );
}
