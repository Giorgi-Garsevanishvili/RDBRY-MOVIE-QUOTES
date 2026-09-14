import type { MouseEvent } from 'react';
import type { Locale, NotificationFeed, NotificationMessages, NotificationType } from '@/types';

export type NotificationMenuProps = {
    userId: number;
    feed: NotificationFeed;
    locale: Locale;
    label: string;
};

export type NotificationItemView = {
    id: string;
    type: NotificationType;
    actorName: string;
    actorInitials: string;
    actorAvatarUrl: string | null;
    action: string;
    relativeTime: string;
    isUnread: boolean;
    avatarClassName: string;
};

export type UseNotificationMenuResult = {
    items: readonly NotificationItemView[];
    messages: NotificationMessages;
    isOpen: boolean;
    hasUnread: boolean;
    badgeText: string;
    onOpenChange: (open: boolean) => void;
    onMarkAllAsRead: () => void;
    onNotificationOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};
