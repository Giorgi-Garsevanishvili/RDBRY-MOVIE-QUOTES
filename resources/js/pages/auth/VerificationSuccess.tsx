import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AuthHeading, AUTH_PRIMARY_BUTTON_CLASSES } from './components';
import { useVerificationSuccess } from './useVerificationSuccess';

export default function VerificationSuccess() {
    const { messages, loginUrl } = useVerificationSuccess();

    return (
        <>
            <Head title={messages.activationSuccessPageTitle} />
            <AuthHeading
                title={messages.activationSuccessTitle}
                description={messages.activationSuccessDescription}
            />
            <Button asChild className={`mt-6 w-full ${AUTH_PRIMARY_BUTTON_CLASSES}`}>
                <Link href={loginUrl}>{messages.logIn}</Link>
            </Button>
        </>
    );
}
