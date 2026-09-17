/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
    readonly VITE_PUSHER_APP_CLUSTER?: string;
    readonly VITE_PUSHER_APP_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
