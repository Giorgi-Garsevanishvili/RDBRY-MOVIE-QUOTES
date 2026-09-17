import { Head } from '@inertiajs/react';
import PasswordInput from '@/components/PasswordInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import {
    AuthField,
    AuthHeading,
    AUTH_INPUT_CLASSES,
    AUTH_PRIMARY_BUTTON_CLASSES,
    AUTH_TEXT_LINK_CLASSES,
    GoogleAuthButton,
} from './components';
import { useRegister } from './useRegister';

export default function Register() {
    const {
        messages,
        googleAuthUrl,
        data,
        processing,
        errors,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleSubmit,
    } = useRegister();

    return (
        <>
            <Head title={messages.registerPageTitle} />
            <AuthHeading
                title={messages.registerTitle}
                description={messages.registerDescription}
            />

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                <fieldset disabled={processing} className="contents">
                    <div className="grid gap-4">
                        <AuthField
                            id="username"
                            label={messages.username}
                            error={errors.username}
                            required
                        >
                            <Input
                                id="username"
                                type="text"
                                className={AUTH_INPUT_CLASSES}
                                required
                                autoFocus
                                autoComplete="username"
                                name="username"
                                value={data.username}
                                onChange={handleUsernameChange}
                                minLength={3}
                                maxLength={15}
                                placeholder={messages.usernamePlaceholder}
                                aria-invalid={Boolean(errors.username)}
                                aria-describedby={errors.username ? 'username-error' : undefined}
                            />
                        </AuthField>

                        <AuthField id="email" label={messages.email} error={errors.email} required>
                            <Input
                                id="email"
                                type="email"
                                className={AUTH_INPUT_CLASSES}
                                required
                                autoComplete="email"
                                name="email"
                                value={data.email}
                                onChange={handleEmailChange}
                                placeholder={messages.emailPlaceholder}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                            />
                        </AuthField>

                        <AuthField
                            id="password"
                            label={messages.password}
                            error={errors.password}
                            required
                        >
                            <PasswordInput
                                id="password"
                                className={AUTH_INPUT_CLASSES}
                                required
                                autoComplete="new-password"
                                name="password"
                                value={data.password}
                                onChange={handlePasswordChange}
                                minLength={8}
                                maxLength={15}
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
                                className={AUTH_INPUT_CLASSES}
                                required
                                autoComplete="new-password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={handlePasswordConfirmationChange}
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
                            data-test="register-user-button"
                        >
                            {processing && <Spinner />}
                            {messages.getStarted}
                        </Button>

                        <GoogleAuthButton href={googleAuthUrl} label={messages.signUpWithGoogle} />
                    </div>

                    <div className="text-center text-base text-[#a5a5ad]">
                        {messages.alreadyHaveAccount}{' '}
                        <TextLink href={login()} className={AUTH_TEXT_LINK_CLASSES}>
                            {messages.logIn}
                        </TextLink>
                    </div>
                </fieldset>
            </form>
        </>
    );
}
