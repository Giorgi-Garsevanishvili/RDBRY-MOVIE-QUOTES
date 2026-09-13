import { QuoteCommentIcon, QuoteHeartIcon } from '@/components/quotes';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { NotificationMenuProps } from './notificationMenuTypes';
import { useNotificationMenu } from './useNotificationMenu';
import NotificationIcon from '../NotificationIcon';

export default function NotificationMenu(props: NotificationMenuProps) {
    const {
        items,
        messages,
        isOpen,
        hasUnread,
        badgeText,
        onToggle,
        onClose,
        onMarkAllAsRead,
        onNotificationOpen,
        onPanelKeyDown,
    } = useNotificationMenu(props);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={onToggle}
                aria-label={props.label}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="notification-menu"
                className="relative inline-flex size-10 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
                <NotificationIcon className="size-6 lg:size-8" />
                {hasUnread && (
                    <span className="absolute top-0 right-0 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] leading-none font-medium text-white lg:-top-1 lg:-right-1">
                        {badgeText}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={messages.close}
                        className="fixed inset-x-0 top-[86px] bottom-0 z-0 bg-[#11101a]/70 lg:inset-0 lg:bg-transparent"
                    />
                    <dialog
                        open
                        id="notification-menu"
                        aria-modal="true"
                        aria-labelledby="notification-menu-title"
                        onKeyDown={onPanelKeyDown}
                        className="fixed inset-x-0 top-[62px] z-10 m-0 w-full max-w-none bg-transparent p-0 text-white lg:inset-x-auto lg:right-16 lg:w-[min(961px,calc(100vw-128px))]"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute top-3 right-6 size-8 rotate-45 bg-black lg:right-[226px]"
                        />
                        <div className="mt-6 max-h-[calc(100svh-86px)] overflow-y-auto rounded-t-xl bg-black px-[35px] pb-8 lg:max-h-[812px] lg:rounded-xl lg:px-8 lg:pb-9">
                            <header className="flex min-h-[76px] items-center justify-between gap-4 lg:min-h-[111px]">
                                <h2
                                    id="notification-menu-title"
                                    className="text-xl font-medium lg:text-[32px] lg:leading-[48px]"
                                >
                                    {messages.title}
                                </h2>
                                {hasUnread && (
                                    <button
                                        type="button"
                                        onClick={onMarkAllAsRead}
                                        className="rounded text-right text-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:text-xl"
                                    >
                                        {messages.markAllAsRead}
                                    </button>
                                )}
                            </header>

                            {items.length === 0 ? (
                                <p className="py-12 text-center text-[#ced4da]">
                                    {messages.noNotifications}
                                </p>
                            ) : (
                                <div className="grid gap-2 lg:gap-4">
                                    {items.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            data-notification-id={item.id}
                                            onClick={onNotificationOpen}
                                            className="relative flex min-h-[121px] w-full gap-3 rounded border border-[#6c757d] px-4 py-4 text-left focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:min-h-[117px] lg:gap-6 lg:px-6 lg:py-[18px]"
                                        >
                                            <Avatar
                                                className={`size-[60px] shrink-0 lg:size-20 ${item.avatarClassName}`}
                                            >
                                                <AvatarFallback className="bg-[#6c6f8e] text-base text-white lg:text-xl">
                                                    {item.actorInitials}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="min-w-0 flex-1">
                                                <strong className="block truncate text-xl leading-[30px] font-normal">
                                                    {item.actorName}
                                                </strong>
                                                <span className="mt-1 flex items-center gap-3 text-base text-[#ced4da] lg:text-xl">
                                                    {item.type === 'quote_commented' ? (
                                                        <QuoteCommentIcon className="size-6 shrink-0" />
                                                    ) : (
                                                        <QuoteHeartIcon className="h-6 w-[26px] shrink-0" />
                                                    )}
                                                    <span className="truncate">{item.action}</span>
                                                </span>
                                                <span className="mt-2 flex items-center justify-between gap-4 text-base lg:absolute lg:top-6 lg:right-6 lg:mt-0 lg:block lg:text-xl">
                                                    <span className="text-[#d9d9d9]">
                                                        {item.relativeTime}
                                                    </span>
                                                    {item.isUnread && (
                                                        <span className="text-[#198754] lg:absolute lg:top-[50px] lg:right-0">
                                                            {messages.new}
                                                        </span>
                                                    )}
                                                </span>
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </dialog>
                </>
            )}
        </div>
    );
}
