import { router, useForm, usePage } from '@inertiajs/react';
import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { PROFILE_MESSAGES } from '@/locales/profile';
import { dashboard } from '@/routes';
import type {
    EmailFormData,
    PasswordFormData,
    ProfileEditor,
    ProfilePageProps,
    ProfileValidationStatuses,
    UsernameFormData,
} from './profileTypes';

const USERNAME_PATTERN = /^[a-z0-9]{3,15}$/;
const PASSWORD_PATTERN = /^[a-z0-9]{8,15}$/;

function validationStatus(
    error: string | undefined,
    value: string,
    isValid: boolean,
): 'valid' | 'invalid' | undefined {
    if (error !== undefined) {
        return 'invalid';
    }

    return value !== '' && isValid ? 'valid' : undefined;
}

export function useProfile() {
    const page = usePage<ProfilePageProps>();
    const { locale } = useLocale();
    const getInitials = useInitials();
    const user = page.props.auth.user;
    const profile = page.props.profile;
    const [activeEditor, setActiveEditor] = useState<ProfileEditor>(null);
    const [avatarError, setAvatarError] = useState<string>();
    const [avatarProcessing, setAvatarProcessing] = useState(false);
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const usernameForm = useForm<UsernameFormData>({
        username: user?.username ?? '',
        current_password: '',
    });
    const emailForm = useForm<EmailFormData>({
        email: '',
        current_password: '',
    });
    const passwordForm = useForm<PasswordFormData>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const validationStatuses: ProfileValidationStatuses = {
        username: validationStatus(
            usernameForm.errors.username,
            usernameForm.data.username,
            USERNAME_PATTERN.test(usernameForm.data.username),
        ),
        usernameCurrentPassword: validationStatus(
            usernameForm.errors.current_password,
            usernameForm.data.current_password,
            usernameForm.data.current_password !== '',
        ),
        email: validationStatus(
            emailForm.errors.email,
            emailForm.data.email,
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailForm.data.email),
        ),
        emailCurrentPassword: validationStatus(
            emailForm.errors.current_password,
            emailForm.data.current_password,
            emailForm.data.current_password !== '',
        ),
        passwordCurrentPassword: validationStatus(
            passwordForm.errors.current_password,
            passwordForm.data.current_password,
            passwordForm.data.current_password !== '',
        ),
        password: validationStatus(
            passwordForm.errors.password,
            passwordForm.data.password,
            PASSWORD_PATTERN.test(passwordForm.data.password),
        ),
        passwordConfirmation: validationStatus(
            passwordForm.errors.password_confirmation,
            passwordForm.data.password_confirmation,
            passwordForm.data.password_confirmation !== '' &&
                passwordForm.data.password_confirmation === passwordForm.data.password,
        ),
    };
    const passwordRules = {
        minimum: passwordForm.data.password.length >= 8,
        lowercaseAndMaximum:
            passwordForm.data.password.length > 0 &&
            passwordForm.data.password.length <= 15 &&
            /^[a-z0-9]+$/.test(passwordForm.data.password),
    };

    if (user === null) {
        throw new Error('The profile page requires an authenticated user.');
    }

    const authenticatedUser = user;

    function openAvatarPicker(): void {
        avatarInputRef.current?.click();
    }

    function handleAvatarChange(event: ChangeEvent<HTMLInputElement>): void {
        const avatar = event.currentTarget.files?.[0];
        event.currentTarget.value = '';

        if (avatar === undefined) {
            return;
        }

        router.post(
            ProfileController.updateAvatar().url,
            { avatar },
            {
                forceFormData: true,
                preserveScroll: true,
                onStart: () => {
                    setAvatarError(undefined);
                    setAvatarProcessing(true);
                },
                onError: (errors) => {
                    setAvatarError(errors.avatar);
                },
                onFinish: () => {
                    setAvatarProcessing(false);
                },
            },
        );
    }

    function openUsernameEditor(): void {
        usernameForm.setData({ username: authenticatedUser.username, current_password: '' });
        usernameForm.clearErrors();
        setActiveEditor('username');
    }

    function openEmailEditor(): void {
        emailForm.reset();
        emailForm.clearErrors();
        setActiveEditor('email');
    }

    function openPasswordEditor(): void {
        passwordForm.reset();
        passwordForm.clearErrors();
        setActiveEditor('password');
    }

    function cancelEditor(): void {
        usernameForm.clearErrors();
        emailForm.clearErrors();
        passwordForm.clearErrors();
        setActiveEditor(null);
    }

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>): void {
        usernameForm.clearErrors('username');
        usernameForm.setData('username', event.target.value);
    }

    function handleUsernameCurrentPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        usernameForm.clearErrors('current_password');
        usernameForm.setData('current_password', event.target.value);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
        emailForm.clearErrors('email');
        emailForm.setData('email', event.target.value);
    }

    function handleUsernameClear(): void {
        usernameForm.clearErrors('username');
        usernameForm.setData('username', '');
    }

    function handleEmailClear(): void {
        emailForm.clearErrors('email');
        emailForm.setData('email', '');
    }

    function handleEmailCurrentPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        emailForm.clearErrors('current_password');
        emailForm.setData('current_password', event.target.value);
    }

    function handlePasswordCurrentPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        passwordForm.clearErrors('current_password');
        passwordForm.setData('current_password', event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        passwordForm.clearErrors('password', 'password_confirmation');
        passwordForm.setData('password', event.target.value);
    }

    function handlePasswordConfirmationChange(event: ChangeEvent<HTMLInputElement>): void {
        passwordForm.clearErrors('password_confirmation');
        passwordForm.setData('password_confirmation', event.target.value);
    }

    function handleUsernameSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        usernameForm.patch(ProfileController.updateUsername().url, {
            preserveScroll: true,
            onSuccess: () => {
                usernameForm.reset('current_password');
                setActiveEditor(null);
            },
        });
    }

    function handleEmailSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        emailForm.post(ProfileController.requestEmailChange().url, {
            preserveScroll: true,
            onSuccess: () => {
                emailForm.reset();
                setActiveEditor(null);
            },
        });
    }

    function handlePasswordSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        passwordForm.put(SecurityController.update().url, {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
                setActiveEditor(null);
            },
        });
    }

    return {
        user: authenticatedUser,
        initials: getInitials(authenticatedUser.username),
        profile,
        messages: PROFILE_MESSAGES[locale],
        feedUrl: dashboard(),
        activeEditor,
        avatarInputRef,
        avatarError,
        avatarProcessing,
        usernameForm,
        emailForm,
        passwordForm,
        validationStatuses,
        passwordRules,
        openAvatarPicker,
        handleAvatarChange,
        openUsernameEditor,
        openEmailEditor,
        openPasswordEditor,
        cancelEditor,
        handleUsernameChange,
        handleUsernameClear,
        handleUsernameCurrentPasswordChange,
        handleEmailChange,
        handleEmailClear,
        handleEmailCurrentPasswordChange,
        handlePasswordCurrentPasswordChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleUsernameSubmit,
        handleEmailSubmit,
        handlePasswordSubmit,
    };
}
