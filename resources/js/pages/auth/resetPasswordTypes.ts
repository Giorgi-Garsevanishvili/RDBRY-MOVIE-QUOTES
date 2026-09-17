export type ResetPasswordProps = {
    token: string;
    email: string;
};

export type ResetPasswordFormData = {
    token: string;
    email: string;
    password: string;
    password_confirmation: string;
};
