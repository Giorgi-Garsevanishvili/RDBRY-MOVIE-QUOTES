export type NotificationType = 'quote_liked' | 'quote_commented';

export type QuoteNotification = {
    id: string;
    type: NotificationType;
    actor: {
        id: number;
        username: string;
        avatar: string | null;
    };
    quoteId: number;
    readAt: string | null;
    createdAt: string;
};

export type QuoteNotificationBroadcastPayload = Pick<QuoteNotification, 'actor' | 'quoteId'>;

export type NotificationFeed = {
    items: readonly QuoteNotification[];
    unreadCount: number;
};

export type NotificationMessages = {
    title: string;
    markAllAsRead: string;
    new: string;
    reactedToQuote: string;
    commentedOnQuote: string;
    noNotifications: string;
};
