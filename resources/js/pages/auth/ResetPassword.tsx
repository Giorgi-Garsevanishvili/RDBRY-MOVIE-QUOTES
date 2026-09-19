import { Head } from '@inertiajs/react';
import PasswordInput from '@/components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
    AuthField,
    AuthHeading,
    AUTH_INPUT_CLASSES,
    AUTH_PRIMARY_BUTTON_CLASSES,
} from './components';
import type { ResetPasswordProps } from './resetPasswordTypes';
import { useResetPassword } from './useResetPassword';

export default function ResetPassword(props: ResetPasswordProps) {
    const {
        messages,
        data,
        processing,
        errors,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleSubmit,
    } = useResetPassword(props);

    return (
        <>
            <Head title={messages.resetPasswordPageTitle} />
            <AuthHeading
                title={messages.resetPasswordTitle}
                description={messages.resetPasswordDescription}
            />

            <form noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                <fieldset disabled={processing} className="contents">
                    <AuthField
                        id="password"
                        label={messages.password}
                        error={errors.password}
                        required
                    >
                        <PasswordInput
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handlePasswordChange}
                            className={AUTH_INPUT_CLASSES}
                            required
                            minLength={8}
                            maxLength={15}
                            autoComplete="new-password"
                            autoFocus
                            placeholder={messages.passwordPlaceholder}
                            showLabel={messages.showPassword}
                            hideLabel={messages.hidePassword}
                            aria-invalid={Boolean(errors.password)}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                        />
                    </AuthField>

                    <AuthField
                        id="password_confirmation"
                        label={messages.confirmPassword}
                        error={errors.password_confirmation}
                        required
                    >
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handlePasswordConfirmationChange}
                            className={AUTH_INPUT_CLASSES}
                            required
                            autoComplete="new-password"
                            placeholder={messages.confirmPasswordPlaceholder}
                            showLabel={messages.showPassword}
                            hideLabel={messages.hidePassword}
                            aria-invalid={Boolean(errors.password_confirmation)}
                            aria-describedby={
                                errors.password_confirmation
                                    ? 'password_confirmation-error'
                                    : undefined
                            }
                        />
                    </AuthField>

                    <Button
                        type="submit"
                        className={AUTH_PRIMARY_BUTTON_CLASSES}
                        disabled={processing}
                        data-test="reset-password-button"
                    >
                        {processing && <Spinner aria-label={messages.loading} />}
                        {messages.resetPassword}
                    </Button>
                </fieldset>
            </form>
        </>
    );
}
