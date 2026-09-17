import { configureEcho } from '@laravel/echo-react';

export function configureBroadcasting(): void {
    const key = import.meta.env.VITE_PUSHER_APP_KEY;
    const cluster = import.meta.env.VITE_PUSHER_APP_CLUSTER;

    if (key === undefined || key === '' || cluster === undefined || cluster === '') {
        configureEcho({ broadcaster: 'null' });

        return;
    }

    configureEcho({
        broadcaster: 'pusher',
        key,
        cluster,
    });
}
