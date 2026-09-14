import { useEchoNotification } from '@laravel/echo-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { NOTIFICATION_MESSAGES } from '@/locales/notifications';
import { read, readAll } from '@/routes/notifications';
import type { NotificationType, QuoteNotificationBroadcastPayload } from '@/types';
import type {
    NotificationItemView,
    NotificationMenuProps,
    UseNotificationMenuResult,
} from './notificationMenuTypes';
import { formatNotificationTime } from './notificationTime';

const QUOTE_NOTIFICATION_TYPES: NotificationType[] = ['quote_liked', 'quote_commented'];

export function useNotificationMenu({
    userId,
    feed,
    locale,
}: NotificationMenuProps): UseNotificationMenuResult {
    const [isOpen, setIsOpen] = useState(false);
    const getInitials = useInitials();
    const messages = NOTIFICATION_MESSAGES[locale];
    const items: NotificationItemView[] = feed.items.map((notification) => ({
        id: notification.id,
        type: notification.type,
        actorName: notification.actor.username,
        actorInitials: getInitials(notification.actor.username),
        actorAvatarUrl: notification.actor.avatar,
        action:
            notification.type === 'quote_commented'
                ? messages.commentedOnQuote
                : messages.reactedToQuote,
        relativeTime: formatNotificationTime(notification.createdAt, locale),
        isUnread: notification.readAt === null,
        avatarClassName: notification.readAt === null ? 'border-2 border-[#198754]' : 'border-0',
    }));
    const hasUnread = feed.unreadCount > 0;
    const badgeText = feed.unreadCount > 9 ? '9+' : String(feed.unreadCount);

    useEchoNotification<QuoteNotificationBroadcastPayload>(
        `App.Models.User.${userId}`,
        onRealtimeNotification,
        QUOTE_NOTIFICATION_TYPES,
    );

    function onRealtimeNotification(): void {
        router.reload({
            only: ['notificationFeed'],
        });
    }

    function onOpenChange(open: boolean): void {
        setIsOpen(open);
    }

    function onMarkAllAsRead(): void {
        router.patch(
            readAll().url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: ['notificationFeed'],
            },
        );
    }

    function onNotificationOpen(event: MouseEvent<HTMLButtonElement>): void {
        const notificationId = event.currentTarget.dataset.notificationId;

        if (notificationId === undefined) {
            return;
        }

        setIsOpen(false);
        router.patch(read(notificationId).url);
    }

    return {
        items,
        messages,
        isOpen,
        hasUnread,
        badgeText,
        onOpenChange,
        onMarkAllAsRead,
        onNotificationOpen,
    };
}
