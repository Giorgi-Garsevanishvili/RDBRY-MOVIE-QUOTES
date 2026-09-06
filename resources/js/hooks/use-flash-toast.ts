import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { FlashToast } from '@/types/ui';

type FlashEvent = CustomEvent<{
    flash?: {
        toast?: FlashToast;
    };
}>;

export function useFlashToast(): void {
    useEffect(() => {
        return router.on('flash', (event) => {
            const data = (event as FlashEvent).detail.flash?.toast;

            if (!data) {
                return;
            }

            toast[data.type](data.message);
        });
    }, []);
}
