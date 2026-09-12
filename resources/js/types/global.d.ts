import type { Auth } from '@/types/auth';
import type { Locale } from '@/types/locale';
import type { NotificationFeed } from '@/types/notification';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            locale: Locale;
            auth: Auth;
            notificationFeed: NotificationFeed | null;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
