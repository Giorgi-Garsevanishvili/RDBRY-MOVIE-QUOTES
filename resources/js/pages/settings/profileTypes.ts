export type ProfileEditor = 'username' | 'email' | 'password' | null;

export type ProfilePageProps = {
    profile: {
        pendingEmail: string | null;
        isPasswordless: boolean;
    };
};

export type UsernameFormData = {
    username: string;
    current_password: string;
};

export type EmailFormData = {
    email: string;
    current_password: string;
};

export type PasswordFormData = {
    current_password: string;
    password: string;
    password_confirmation: string;
};
