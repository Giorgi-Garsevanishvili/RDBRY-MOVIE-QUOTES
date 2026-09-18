export type User = {
    id: number;
    username: string;
    email: string;
    avatar: string | null;
    is_passwordless: boolean;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
};

export type Auth = {
    user: User | null;
};

export type AuthenticatedAuth = {
    user: User;
};
