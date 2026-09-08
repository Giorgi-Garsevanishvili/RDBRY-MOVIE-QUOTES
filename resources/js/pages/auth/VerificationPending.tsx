import { Head } from '@inertiajs/react';
import { AuthHeading } from './components';
import { useVerificationPending } from './useVerificationPending';

export default function VerificationPending() {
    const { messages } = useVerificationPending();

    return (
        <>
            <Head title={messages.activationPendingPageTitle} />
            <AuthHeading
                title={messages.activationPendingTitle}
                description={messages.activationPendingDescription}
            />
        </>
    );
}
