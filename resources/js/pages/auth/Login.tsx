import { Head } from '@inertiajs/react';
import PasswordInput from '@/components/PasswordInput';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { request } from '@/routes/password';
import {
    AuthField,
    AuthHeading,
    AUTH_INPUT_CLASSES,
    AUTH_PRIMARY_BUTTON_CLASSES,
    AUTH_TEXT_LINK_CLASSES,
    GoogleAuthButton,
} from './components';
import type { LoginProps } from './loginTypes';
import { useLogin } from './useLogin';

export default function Login(props: LoginProps) {
    const {
        messages,
        status,
        googleError,
        googleAuthUrl,
        canResetPassword,
        data,
        processing,
        errors,
        handleLoginChange,
        handlePasswordChange,
        handleRememberChange,
        handleSubmit,
    } = useLogin(props);

    return (
        <>
            <Head title={messages.loginPageTitle} />
            <AuthHeading title={messages.loginTitle} description={messages.loginDescription} />

            {status && (
                <div
                    role="status"
                    className="mt-5 rounded border border-emerald-600/40 bg-emerald-950/40 px-3 py-2 text-center text-sm text-emerald-300"
                >
                    {status}
                </div>
            )}

            {googleError && (
                <div
                    role="alert"
                    className="mt-5 rounded border border-[#dc3545]/50 bg-[#dc3545]/10 px-3 py-2 text-center text-sm text-[#ff8b94]"
                >
                    {googleError}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                <fieldset disabled={processing} className="contents">
                    <div className="grid gap-5">
                        <AuthField
                            id="login"
                            label={messages.loginIdentity}
                            error={errors.login}
                            required
                        >
                            <Input
                                id="login"
                                type="text"
                                className={AUTH_INPUT_CLASSES}
                                name="login"
                                value={data.login}
                                onChange={handleLoginChange}
                                required
                                autoFocus
                                autoComplete="username"
                                minLength={3}
                                placeholder={messages.loginIdentityPlaceholder}
                                aria-invalid={Boolean(errors.login)}
                                aria-describedby={errors.login ? 'login-error' : undefined}
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
                                name="password"
                                value={data.password}
                                onChange={handlePasswordChange}
                                required
                                autoComplete="current-password"
                                placeholder={messages.password}
                                showLabel={messages.showPassword}
                                hideLabel={messages.hidePassword}
                                aria-invalid={Boolean(errors.password)}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                            />
                        </AuthField>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onCheckedChange={handleRememberChange}
                                    className="border-white bg-white text-white data-[state=checked]:border-brand-red data-[state=checked]:bg-brand-red"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-base font-normal text-white"
                                >
                                    {messages.rememberMe}
                                </Label>
                            </div>
                            {canResetPassword && (
                                <TextLink href={request()} className={AUTH_TEXT_LINK_CLASSES}>
                                    {messages.forgotPassword}
                                </TextLink>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className={AUTH_PRIMARY_BUTTON_CLASSES}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner aria-label={messages.loading} />}
                            {messages.logIn}
                        </Button>

                        <GoogleAuthButton href={googleAuthUrl} label={messages.signInWithGoogle} />
                    </div>

                    <div className="text-center text-base text-[#a5a5ad]">
                        {messages.doNotHaveAccount}{' '}
                        <TextLink href={register()} className={AUTH_TEXT_LINK_CLASSES}>
                            {messages.signUp}
                        </TextLink>
                    </div>
                </fieldset>
            </form>
        </>
    );
}
