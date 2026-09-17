import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AuthHeading, AUTH_PRIMARY_BUTTON_CLASSES } from './components';
import { usePasswordResetExpired } from './usePasswordResetExpired';

export default function PasswordResetExpired() {
    const { messages, requestPasswordUrl } = usePasswordResetExpired();

    return (
        <>
            <Head title={messages.expiredLinkPageTitle} />
            <AuthHeading
                title={messages.expiredLinkTitle}
                description={messages.expiredLinkDescription}
            />
            <Button asChild className={`mt-6 w-full ${AUTH_PRIMARY_BUTTON_CLASSES}`}>
                <Link href={requestPasswordUrl}>{messages.requestAnotherLink}</Link>
            </Button>
        </>
    );
}
