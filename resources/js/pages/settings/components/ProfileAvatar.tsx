import InputError from '@/components/InputError';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ProfileAvatarProps } from './profileAvatarTypes';

export default function ProfileAvatar({
    avatarUrl,
    initials,
    username,
    uploadLabel,
    inputRef,
    error,
    processing,
    onChoose,
    onChange,
}: ProfileAvatarProps) {
    return (
        <div className="mx-auto flex w-[220px] flex-col items-center">
            <Avatar className="size-[188px] border-0">
                <AvatarImage src={avatarUrl ?? undefined} alt={username} className="object-cover" />
                <AvatarFallback className="bg-[#6c6f8e] text-5xl text-white">
                    {initials}
                </AvatarFallback>
            </Avatar>

            <input
                ref={inputRef}
                type="file"
                name="avatar"
                accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                hidden
                onChange={onChange}
            />
            <button
                type="button"
                disabled={processing}
                onClick={onChoose}
                className="mt-2 rounded text-xl leading-[30px] text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-60"
            >
                {uploadLabel}
            </button>
            <InputError message={error} className="mt-2 text-center" />
        </div>
    );
}
