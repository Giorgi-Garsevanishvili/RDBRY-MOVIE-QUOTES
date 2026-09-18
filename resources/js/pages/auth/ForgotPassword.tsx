import { Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
    AuthField,
    AuthHeading,
    AUTH_INPUT_CLASSES,
    AUTH_PRIMARY_BUTTON_CLASSES,
    AUTH_TEXT_LINK_CLASSES,
} from './components';
import { useForgotPassword } from './useForgotPassword';

export default function ForgotPassword() {
    const { messages, loginUrl, data, processing, errors, handleEmailChange, handleSubmit } =
        useForgotPassword();

    return (
        <>
            <Head title={messages.forgotPasswordPageTitle} />
            <AuthHeading
                title={messages.forgotPasswordTitle}
                description={messages.forgotPasswordDescription}
            />

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                <fieldset disabled={processing} className="contents">
                    <AuthField id="email" label={messages.email} error={errors.email} required>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleEmailChange}
                            className={AUTH_INPUT_CLASSES}
                            required
                            autoComplete="email"
                            autoFocus
                            placeholder={messages.emailPlaceholder}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                        />
                    </AuthField>

                    <Button
                        type="submit"
                        className={AUTH_PRIMARY_BUTTON_CLASSES}
                        disabled={processing}
                        data-test="email-password-reset-link-button"
                    >
                        {processing && <Spinner aria-label={messages.loading} />}
                        {messages.sendInstructions}
                    </Button>

                    <div className="text-center">
                        <TextLink href={loginUrl} className={AUTH_TEXT_LINK_CLASSES}>
                            {messages.backToLogin}
                        </TextLink>
                    </div>
                </fieldset>
            </form>
        </>
    );
}
