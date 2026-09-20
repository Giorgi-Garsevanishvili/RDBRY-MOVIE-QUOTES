import { Head } from '@inertiajs/react';
import ClearableInput from '@/components/ClearableInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
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
    const {
        messages,
        loginUrl,
        data,
        processing,
        errors,
        validationStatus,
        handleEmailChange,
        handleEmailClear,
        handleSubmit,
    } = useForgotPassword();

    return (
        <>
            <Head title={messages.forgotPasswordPageTitle} />
            <AuthHeading
                title={messages.forgotPasswordTitle}
                description={messages.forgotPasswordDescription}
            />

            <form noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                <fieldset disabled={processing} className="contents">
                    <AuthField
                        id="email"
                        label={messages.email}
                        error={errors.email}
                        status={validationStatus}
                        required
                    >
                        <ClearableInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleEmailChange}
                            onClear={handleEmailClear}
                            clearLabel={messages.clearField(messages.email)}
                            status={validationStatus}
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
                        data-processing={processing}
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
