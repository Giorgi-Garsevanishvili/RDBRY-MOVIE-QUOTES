import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AuthHeading, AUTH_PRIMARY_BUTTON_CLASSES } from './components';
import { usePasswordResetSuccess } from './usePasswordResetSuccess';

export default function PasswordResetSuccess() {
    const { messages, loginUrl } = usePasswordResetSuccess();

    return (
        <>
            <Head title={messages.resetSuccessPageTitle} />
            <AuthHeading
                title={messages.resetSuccessTitle}
                description={messages.resetSuccessDescription}
            />
            <Button asChild className={`mt-6 w-full ${AUTH_PRIMARY_BUTTON_CLASSES}`}>
                <Link href={loginUrl}>{messages.logIn}</Link>
            </Button>
        </>
    );
}
