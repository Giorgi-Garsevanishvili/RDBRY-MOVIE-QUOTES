import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { AuthHeadingProps } from './authHeadingTypes';

export default function AuthHeading({ title, description }: AuthHeadingProps) {
    return (
        <header className="text-center">
            <DialogPrimitive.Title asChild>
                <h1 className="text-[2rem] leading-[1.2] font-medium text-white">{title}</h1>
            </DialogPrimitive.Title>
            <DialogPrimitive.Description asChild>
                <p className="mt-2 text-base leading-6 text-[#a5a5ad]">{description}</p>
            </DialogPrimitive.Description>
        </header>
    );
}
