import type { ChangeEventHandler, FormEventHandler } from 'react';
import type { ProfileMessages } from '@/types';
import type {
    PasswordRuleStatuses,
    ProfileEditor,
    ProfileValidationStatuses,
} from '../profileTypes';

type FieldErrors = Record<string, string | undefined>;

export type ProfileEditorProps = {
    activeEditor: ProfileEditor;
    requiresCurrentPassword: boolean;
    messages: ProfileMessages;
    username: string;
    usernameCurrentPassword: string;
    usernameErrors: FieldErrors;
    usernameProcessing: boolean;
    email: string;
    emailCurrentPassword: string;
    emailErrors: FieldErrors;
    emailProcessing: boolean;
    passwordCurrentPassword: string;
    password: string;
    passwordConfirmation: string;
    passwordErrors: FieldErrors;
    passwordProcessing: boolean;
    validationStatuses: ProfileValidationStatuses;
    passwordRules: PasswordRuleStatuses;
    onUsernameChange: ChangeEventHandler<HTMLInputElement>;
    onUsernameClear: () => void;
    onUsernameCurrentPasswordChange: ChangeEventHandler<HTMLInputElement>;
    onEmailChange: ChangeEventHandler<HTMLInputElement>;
    onEmailClear: () => void;
    onEmailCurrentPasswordChange: ChangeEventHandler<HTMLInputElement>;
    onPasswordCurrentPasswordChange: ChangeEventHandler<HTMLInputElement>;
    onPasswordChange: ChangeEventHandler<HTMLInputElement>;
    onPasswordConfirmationChange: ChangeEventHandler<HTMLInputElement>;
    onUsernameSubmit: FormEventHandler<HTMLFormElement>;
    onEmailSubmit: FormEventHandler<HTMLFormElement>;
    onPasswordSubmit: FormEventHandler<HTMLFormElement>;
    onCancel: () => void;
};
