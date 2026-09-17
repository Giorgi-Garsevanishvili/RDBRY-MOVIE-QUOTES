import googleLogo from '@/assets/auth/google-logo.png';
import type { GoogleAuthButtonProps } from './googleAuthButtonTypes';

export default function GoogleAuthButton({ href, label }: GoogleAuthButtonProps) {
    return (
        <a
            href={href}
            className="flex h-12 w-full items-center justify-center gap-2 rounded border border-white bg-transparent px-4 text-base font-normal text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
        >
            <img src={googleLogo} alt="" className="size-5 object-contain" aria-hidden="true" />
            <span>{label}</span>
        </a>
    );
}
