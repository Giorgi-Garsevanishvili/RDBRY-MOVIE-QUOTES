import type { AuthHeadingProps } from './authHeadingTypes';

export default function AuthHeading({ title, description }: AuthHeadingProps) {
    return (
        <header className="text-center">
            <h1 id="auth-modal-title" className="text-[2rem] leading-[1.2] font-medium text-white">
                {title}
            </h1>
            <p className="mt-2 text-base leading-6 text-[#a5a5ad]">{description}</p>
        </header>
    );
}
