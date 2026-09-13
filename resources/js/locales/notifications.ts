import type { Locale, NotificationMessages } from '@/types';

export const NOTIFICATION_MESSAGES: Record<Locale, NotificationMessages> = {
    en: {
        title: 'Notifications',
        markAllAsRead: 'Mark all as read',
        new: 'New',
        reactedToQuote: 'Reacted to your quote',
        commentedOnQuote: 'Commented on your movie quote',
        noNotifications: 'You have no notifications yet.',
        close: 'Close notifications',
    },
    ka: {
        title: 'შეტყობინებები',
        markAllAsRead: 'ყველას წაკითხულად მონიშვნა',
        new: 'ახალი',
        reactedToQuote: 'მოიწონა თქვენი ციტატა',
        commentedOnQuote: 'დააკომენტარა თქვენი ციტატა',
        noNotifications: 'შეტყობინებები ჯერ არ გაქვთ.',
        close: 'შეტყობინებების დახურვა',
    },
};
