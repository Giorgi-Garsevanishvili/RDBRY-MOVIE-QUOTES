import { Head } from '@inertiajs/react';
import type { ProtectedPlaceholderProps } from './protectedPlaceholderTypes';
import { useProtectedPlaceholder } from './useProtectedPlaceholder';

export default function ProtectedPlaceholder({ section }: ProtectedPlaceholderProps) {
    const { title } = useProtectedPlaceholder(section);

    return (
        <>
            <Head title={title} />
            <h1 className="sr-only">{title}</h1>
        </>
    );
}
