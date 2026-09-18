import { useSyncExternalStore } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 47.9375rem)';

const mql = typeof window === 'undefined' ? undefined : window.matchMedia(MOBILE_MEDIA_QUERY);

function mediaQueryListener(callback: (event: MediaQueryListEvent) => void) {
    if (!mql) {
        return () => undefined;
    }

    mql.addEventListener('change', callback);

    return () => {
        mql.removeEventListener('change', callback);
    };
}

function isSmallerThanBreakpoint(): boolean {
    return mql?.matches ?? false;
}

function getServerSnapshot(): boolean {
    return false;
}

export function useIsMobile(): boolean {
    return useSyncExternalStore(mediaQueryListener, isSmallerThanBreakpoint, getServerSnapshot);
}
