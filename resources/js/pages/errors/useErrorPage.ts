import gandalf from '@/assets/errors/gandalf.png';
import ghost from '@/assets/errors/ghost.png';
import { useLocale } from '@/hooks/useLocale';
import { ERROR_MESSAGES } from '@/locales/errors';
import { home } from '@/routes';
import type { ErrorStatus } from './errorPageTypes';

export function useErrorPage(status: ErrorStatus) {
    const { locale } = useLocale();
    const isForbidden = status === 403;
    const messages = ERROR_MESSAGES[locale];
    const content = isForbidden ? messages.forbidden : messages.notFound;

    return {
        content,
        homeUrl: home(),
        illustration: isForbidden ? gandalf : ghost,
        illustrationClassName: isForbidden
            ? 'relative z-10 h-[261px] w-[345px]'
            : 'h-[178px] w-[122px]',
        isForbidden,
        returnHomeLabel: messages.returnHome,
    };
}
