export type LoginProps = {
    status?: string;
    googleError?: string;
    canResetPassword: boolean;
};

export type LoginFormData = {
    login: string;
    password: string;
    remember: boolean;
};
