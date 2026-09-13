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
    UsernameFormData,
} from './profileTypes';

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
        usernameForm.setData('username', event.target.value);
    }

    function handleUsernameCurrentPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        usernameForm.setData('current_password', event.target.value);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
        emailForm.setData('email', event.target.value);
    }

    function handleEmailCurrentPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        emailForm.setData('current_password', event.target.value);
    }

    function handlePasswordCurrentPasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        passwordForm.setData('current_password', event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>): void {
        passwordForm.setData('password', event.target.value);
    }

    function handlePasswordConfirmationChange(event: ChangeEvent<HTMLInputElement>): void {
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
        openAvatarPicker,
        handleAvatarChange,
        openUsernameEditor,
        openEmailEditor,
        openPasswordEditor,
        cancelEditor,
        handleUsernameChange,
        handleUsernameCurrentPasswordChange,
        handleEmailChange,
        handleEmailCurrentPasswordChange,
        handlePasswordCurrentPasswordChange,
        handlePasswordChange,
        handlePasswordConfirmationChange,
        handleUsernameSubmit,
        handleEmailSubmit,
        handlePasswordSubmit,
    };
}
