import type { ChangeEventHandler, RefObject } from 'react';

export type ProfileAvatarProps = {
    avatarUrl: string | null;
    initials: string;
    username: string;
    uploadLabel: string;
    inputRef: RefObject<HTMLInputElement | null>;
    error?: string;
    processing: boolean;
    onChoose: () => void;
    onChange: ChangeEventHandler<HTMLInputElement>;
};
