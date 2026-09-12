export type NotificationType = 'quote_liked' | 'quote_commented';

export type QuoteNotification = {
    id: string;
    type: NotificationType;
    actor: {
        id: number;
        username: string;
    };
    quoteId: number;
    readAt: string | null;
    createdAt: string;
};

export type NotificationFeed = {
    items: QuoteNotification[];
    unreadCount: number;
};
