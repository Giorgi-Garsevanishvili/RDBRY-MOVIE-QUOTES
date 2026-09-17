import { Head } from '@inertiajs/react';
import { AuthHeading } from './components';
import { usePasswordResetEmailSent } from './usePasswordResetEmailSent';

export default function PasswordResetEmailSent() {
    const { messages } = usePasswordResetEmailSent();

    return (
        <>
            <Head title={messages.resetEmailSentPageTitle} />
            <AuthHeading
                title={messages.resetEmailSentTitle}
                description={messages.resetEmailSentDescription}
            />
        </>
    );
}
