import InputError from '@/components/InputError';
import ClearableInput from '@/components/ClearableInput';
import PasswordInput from '@/components/PasswordInput';
import { BRAND_BUTTON_INTERACTION_CLASSES } from '@/components/ui/brandStyles';
import type { ProfileEditorProps } from './profileEditorTypes';
import ProfileInputFrame from './ProfileInputFrame';

const INPUT_CLASSES =
    'h-12.25 w-full rounded-[0.3125rem] border border-[#ced4da] bg-[#ced4da] px-4 pr-10 text-xl leading-7.5 text-[#212529] outline-none transition-[border-color,box-shadow] placeholder:text-[#6c757d] focus:border-white focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:bg-[#e9ecef] disabled:text-[#6c757d] disabled:opacity-100 aria-invalid:border-brand-red aria-invalid:ring-2 aria-invalid:ring-brand-red/30 lg:h-12';

const PASSWORD_INPUT_CLASSES = `${INPUT_CLASSES} pr-16`;

const ACTION_CLASSES =
    'inline-flex items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-60 lg:h-12 lg:px-4.25 lg:text-xl lg:leading-7.5';

const EDITOR_FIELDS_CLASSES =
    'grid gap-6 rounded-t-xl bg-[#24222f] px-8 pt-20 pb-18.5 lg:rounded-none lg:bg-transparent lg:p-0';

const EDITOR_ACTIONS_CLASSES =
    'mt-7.25 flex items-center justify-between pl-8.75 pr-7.25 lg:mt-6 lg:justify-end lg:gap-2 lg:px-0';

const CANCEL_CLASSES = `${ACTION_CLASSES} h-11 min-w-22 px-4.25 text-base leading-6 hover:bg-white/10 active:bg-white/15`;
const SUBMIT_CLASSES = `${ACTION_CLASSES} h-9.5 min-w-17.25 px-5 text-base leading-6 ${BRAND_BUTTON_INTERACTION_CLASSES}`;

export default function ProfileEditor({
    activeEditor,
    requiresCurrentPassword,
    messages,
    username,
    usernameCurrentPassword,
    usernameErrors,
    usernameProcessing,
    email,
    emailCurrentPassword,
    emailErrors,
    emailProcessing,
    passwordCurrentPassword,
    password,
    passwordConfirmation,
    passwordErrors,
    passwordProcessing,
    validationStatuses,
    passwordRules,
    onUsernameChange,
    onUsernameClear,
    onUsernameCurrentPasswordChange,
    onEmailChange,
    onEmailClear,
    onEmailCurrentPasswordChange,
    onPasswordCurrentPasswordChange,
    onPasswordChange,
    onPasswordConfirmationChange,
    onUsernameSubmit,
    onEmailSubmit,
    onPasswordSubmit,
    onCancel,
}: ProfileEditorProps) {
    if (activeEditor === null) {
        return null;
    }

    return (
        <div className="absolute inset-x-0 top-0 z-20 lg:static lg:mt-8 lg:border-t lg:border-white/20 lg:pt-8">
            {activeEditor === 'username' && (
                <form noValidate onSubmit={onUsernameSubmit}>
                    <fieldset disabled={usernameProcessing}>
                        <div className={EDITOR_FIELDS_CLASSES}>
                            <div>
                                <label
                                    htmlFor="profile-username"
                                    className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                >
                                    {messages.newUsername}
                                </label>
                                <ProfileInputFrame status={validationStatuses.username}>
                                    <ClearableInput
                                        id="profile-username"
                                        name="username"
                                        value={username}
                                        onChange={onUsernameChange}
                                        onClear={onUsernameClear}
                                        clearLabel={messages.clearField(messages.newUsername)}
                                        status={validationStatuses.username}
                                        autoComplete="username"
                                        minLength={3}
                                        maxLength={15}
                                        pattern="[a-z0-9]+"
                                        required
                                        aria-invalid={Boolean(usernameErrors.username)}
                                        aria-describedby={
                                            usernameErrors.username
                                                ? 'profile-username-error'
                                                : undefined
                                        }
                                        className={INPUT_CLASSES}
                                    />
                                </ProfileInputFrame>
                                <InputError
                                    id="profile-username-error"
                                    message={usernameErrors.username}
                                    className="mt-2"
                                />
                            </div>

                            {requiresCurrentPassword && (
                                <div>
                                    <label
                                        htmlFor="username-current-password"
                                        className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                    >
                                        {messages.currentPassword}
                                    </label>
                                    <ProfileInputFrame
                                        status={validationStatuses.usernameCurrentPassword}
                                        password
                                    >
                                        <PasswordInput
                                            id="username-current-password"
                                            name="current_password"
                                            value={usernameCurrentPassword}
                                            onChange={onUsernameCurrentPasswordChange}
                                            autoComplete="current-password"
                                            required
                                            showLabel={messages.showPassword}
                                            hideLabel={messages.hidePassword}
                                            aria-invalid={Boolean(usernameErrors.current_password)}
                                            aria-describedby={
                                                usernameErrors.current_password
                                                    ? 'username-current-password-error'
                                                    : undefined
                                            }
                                            className={PASSWORD_INPUT_CLASSES}
                                        />
                                    </ProfileInputFrame>
                                    <InputError
                                        id="username-current-password-error"
                                        message={usernameErrors.current_password}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>

                        <div className={EDITOR_ACTIONS_CLASSES}>
                            <button type="button" onClick={onCancel} className={CANCEL_CLASSES}>
                                {messages.cancel}
                            </button>
                            <button
                                type="submit"
                                disabled={usernameProcessing}
                                data-processing={usernameProcessing}
                                className={SUBMIT_CLASSES}
                            >
                                <span className="lg:hidden">{messages.edit}</span>
                                <span className="hidden lg:inline">{messages.saveChanges}</span>
                            </button>
                        </div>
                    </fieldset>
                </form>
            )}

            {activeEditor === 'email' && (
                <form noValidate onSubmit={onEmailSubmit}>
                    <fieldset disabled={emailProcessing}>
                        <div className={EDITOR_FIELDS_CLASSES}>
                            <div>
                                <label
                                    htmlFor="profile-email"
                                    className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                >
                                    {messages.newEmail}
                                </label>
                                <ProfileInputFrame status={validationStatuses.email}>
                                    <ClearableInput
                                        id="profile-email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={onEmailChange}
                                        onClear={onEmailClear}
                                        clearLabel={messages.clearField(messages.newEmail)}
                                        status={validationStatuses.email}
                                        autoComplete="email"
                                        maxLength={255}
                                        required
                                        aria-invalid={Boolean(emailErrors.email)}
                                        aria-describedby={
                                            emailErrors.email ? 'profile-email-error' : undefined
                                        }
                                        className={INPUT_CLASSES}
                                    />
                                </ProfileInputFrame>
                                <InputError
                                    id="profile-email-error"
                                    message={emailErrors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email-current-password"
                                    className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                >
                                    {messages.currentPassword}
                                </label>
                                <ProfileInputFrame
                                    status={validationStatuses.emailCurrentPassword}
                                    password
                                >
                                    <PasswordInput
                                        id="email-current-password"
                                        name="current_password"
                                        value={emailCurrentPassword}
                                        onChange={onEmailCurrentPasswordChange}
                                        autoComplete="current-password"
                                        required
                                        showLabel={messages.showPassword}
                                        hideLabel={messages.hidePassword}
                                        aria-invalid={Boolean(emailErrors.current_password)}
                                        aria-describedby={
                                            emailErrors.current_password
                                                ? 'email-current-password-error'
                                                : undefined
                                        }
                                        className={PASSWORD_INPUT_CLASSES}
                                    />
                                </ProfileInputFrame>
                                <InputError
                                    id="email-current-password-error"
                                    message={emailErrors.current_password}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className={EDITOR_ACTIONS_CLASSES}>
                            <button type="button" onClick={onCancel} className={CANCEL_CLASSES}>
                                {messages.cancel}
                            </button>
                            <button
                                type="submit"
                                disabled={emailProcessing}
                                data-processing={emailProcessing}
                                className={SUBMIT_CLASSES}
                            >
                                <span className="lg:hidden">{messages.add}</span>
                                <span className="hidden lg:inline">{messages.saveChanges}</span>
                            </button>
                        </div>
                    </fieldset>
                </form>
            )}

            {activeEditor === 'password' && (
                <form noValidate onSubmit={onPasswordSubmit}>
                    <fieldset disabled={passwordProcessing}>
                        <div className={EDITOR_FIELDS_CLASSES}>
                            <div>
                                <label
                                    htmlFor="password-current-password"
                                    className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                >
                                    {messages.currentPassword}
                                </label>
                                <ProfileInputFrame
                                    status={validationStatuses.passwordCurrentPassword}
                                    password
                                >
                                    <PasswordInput
                                        id="password-current-password"
                                        name="current_password"
                                        value={passwordCurrentPassword}
                                        onChange={onPasswordCurrentPasswordChange}
                                        autoComplete="current-password"
                                        required
                                        showLabel={messages.showPassword}
                                        hideLabel={messages.hidePassword}
                                        aria-invalid={Boolean(passwordErrors.current_password)}
                                        aria-describedby={
                                            passwordErrors.current_password
                                                ? 'password-current-password-error'
                                                : undefined
                                        }
                                        className={PASSWORD_INPUT_CLASSES}
                                    />
                                </ProfileInputFrame>
                                <InputError
                                    id="password-current-password-error"
                                    message={passwordErrors.current_password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="rounded bg-[#11101a] p-6 text-sm leading-5 lg:bg-[#24222f]">
                                <p className="mb-3 text-base leading-6">
                                    {messages.passwordRulesTitle}
                                </p>
                                <ul className="list-disc space-y-1 pl-5 text-white/70">
                                    <li className={passwordRules.minimum ? 'text-[#198754]' : ''}>
                                        {messages.passwordMinimum}
                                    </li>
                                    <li
                                        className={
                                            passwordRules.lowercaseAndMaximum
                                                ? 'text-[#198754]'
                                                : ''
                                        }
                                    >
                                        {messages.passwordMaximum}
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <label
                                    htmlFor="profile-new-password"
                                    className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                >
                                    {messages.newPassword}
                                </label>
                                <ProfileInputFrame status={validationStatuses.password} password>
                                    <PasswordInput
                                        id="profile-new-password"
                                        name="password"
                                        value={password}
                                        onChange={onPasswordChange}
                                        autoComplete="new-password"
                                        minLength={8}
                                        maxLength={15}
                                        pattern="[a-z0-9]+"
                                        required
                                        showLabel={messages.showPassword}
                                        hideLabel={messages.hidePassword}
                                        aria-invalid={Boolean(passwordErrors.password)}
                                        aria-describedby={
                                            passwordErrors.password
                                                ? 'profile-new-password-error'
                                                : undefined
                                        }
                                        className={PASSWORD_INPUT_CLASSES}
                                    />
                                </ProfileInputFrame>
                                <InputError
                                    id="profile-new-password-error"
                                    message={passwordErrors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="profile-password-confirmation"
                                    className="mb-2 block text-base leading-6 lg:text-xl lg:leading-7.5"
                                >
                                    {messages.confirmPassword}
                                </label>
                                <ProfileInputFrame
                                    status={validationStatuses.passwordConfirmation}
                                    password
                                >
                                    <PasswordInput
                                        id="profile-password-confirmation"
                                        name="password_confirmation"
                                        value={passwordConfirmation}
                                        onChange={onPasswordConfirmationChange}
                                        autoComplete="new-password"
                                        minLength={8}
                                        maxLength={15}
                                        pattern="[a-z0-9]+"
                                        required
                                        showLabel={messages.showPassword}
                                        hideLabel={messages.hidePassword}
                                        aria-invalid={Boolean(passwordErrors.password_confirmation)}
                                        aria-describedby={
                                            passwordErrors.password_confirmation
                                                ? 'profile-password-confirmation-error'
                                                : undefined
                                        }
                                        className={PASSWORD_INPUT_CLASSES}
                                    />
                                </ProfileInputFrame>
                                <InputError
                                    id="profile-password-confirmation-error"
                                    message={passwordErrors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className={EDITOR_ACTIONS_CLASSES}>
                            <button type="button" onClick={onCancel} className={CANCEL_CLASSES}>
                                {messages.cancel}
                            </button>
                            <button
                                type="submit"
                                disabled={passwordProcessing}
                                data-processing={passwordProcessing}
                                className={SUBMIT_CLASSES}
                            >
                                <span className="lg:hidden">{messages.add}</span>
                                <span className="hidden lg:inline">{messages.saveChanges}</span>
                            </button>
                        </div>
                    </fieldset>
                </form>
            )}
        </div>
    );
}
