import * as DialogPrimitive from '@radix-ui/react-dialog';
import { QuoteCommentIcon, QuoteHeartIcon } from '@/components/quotes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
        onOpenChange,
        onMarkAllAsRead,
        onNotificationOpen,
    } = useNotificationMenu(props);

    return (
        <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
            <DialogPrimitive.Trigger asChild>
                <button
                    type="button"
                    aria-label={props.label}
                    aria-controls="notification-menu"
                    className="relative inline-flex size-10 items-center justify-center rounded text-[#ced4da] transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                >
                    <NotificationIcon className="size-6 lg:size-8" />
                    {hasUnread && (
                        <span className="absolute top-0 right-0 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[0.6875rem] leading-none font-medium text-white lg:-top-1 lg:-right-1">
                            {badgeText}
                        </span>
                    )}
                </button>
            </DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-x-0 top-21.5 bottom-0 z-40 bg-[#11101a]/70 lg:inset-0 lg:bg-transparent" />
                <DialogPrimitive.Content
                    id="notification-menu"
                    className="fixed inset-x-0 top-16.5 z-50 m-0 w-full max-w-none bg-transparent p-0 text-white outline-none lg:inset-x-auto lg:top-17.5 lg:right-16 lg:w-[min(60.0625rem,calc(100vw-8rem))]"
                >
                    <span
                        aria-hidden="true"
                        className="absolute top-0 right-6 size-11.75 rotate-45 bg-black lg:right-56.5"
                    />
                    <div className="mt-5 max-h-[min(46.875rem,calc(100svh-5.375rem))] [scrollbar-width:none] overflow-x-hidden overflow-y-auto rounded-xl bg-black px-8.75 pb-9 lg:mt-6 lg:max-h-203 lg:px-8 [&::-webkit-scrollbar]:hidden">
                        <header className="flex min-h-19 items-center justify-between gap-4 lg:min-h-27.75 lg:items-start lg:pt-10">
                            <DialogPrimitive.Title className="text-xl leading-7.5 font-medium lg:text-[2rem] lg:leading-12">
                                {messages.title}
                            </DialogPrimitive.Title>
                            {hasUnread && (
                                <button
                                    type="button"
                                    onClick={onMarkAllAsRead}
                                    className="rounded text-right text-sm leading-5.25 underline underline-offset-4 transition-colors hover:text-[#ced4da] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:mt-2.25 lg:text-xl lg:leading-7.5"
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
                            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-2 lg:gap-4">
                                {items.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        data-notification-id={item.id}
                                        onClick={onNotificationOpen}
                                        className="group grid min-h-30.25 w-full min-w-0 grid-cols-[3.75rem_minmax(0,1fr)] grid-rows-[minmax(3.75rem,auto)_auto] gap-x-3 rounded border border-[#6c757d]/50 px-3.5 py-3.5 text-left transition-colors hover:border-[#6c757d] hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:min-h-29.25 lg:grid-cols-[5rem_minmax(0,1fr)_auto] lg:grid-rows-1 lg:gap-x-6 lg:px-5.75 lg:py-4.5"
                                    >
                                        <Avatar
                                            className={`col-start-1 row-start-1 size-15 shrink-0 lg:size-20 ${item.avatarClassName}`}
                                        >
                                            <AvatarImage
                                                src={item.actorAvatarUrl ?? undefined}
                                                alt=""
                                            />
                                            <AvatarFallback className="bg-[#6c6f8e] text-base text-white lg:text-xl">
                                                {item.actorInitials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="col-start-2 row-start-1 min-w-0 pt-0.75 lg:pt-2">
                                            <strong className="block text-xl leading-7.5 font-normal break-words">
                                                {item.actorName}
                                            </strong>
                                            <span className="flex min-w-0 items-start gap-3 text-base leading-6 text-[#ced4da] lg:text-xl lg:leading-7.5">
                                                {item.type === 'quote_commented' ? (
                                                    <QuoteCommentIcon className="size-6 shrink-0" />
                                                ) : (
                                                    <QuoteHeartIcon className="h-6 w-6.5 shrink-0" />
                                                )}
                                                <span className="min-w-0 break-words">
                                                    {item.action}
                                                </span>
                                            </span>
                                        </span>
                                        {item.isUnread && (
                                            <span className="col-start-1 row-start-2 mt-1.25 justify-self-center text-base leading-6 text-[#198754] lg:hidden">
                                                {messages.new}
                                            </span>
                                        )}
                                        <span className="col-start-2 row-start-2 mt-1.25 text-base leading-6 text-[#d9d9d9] lg:hidden">
                                            {item.relativeTime}
                                        </span>
                                        <span className="hidden text-xl leading-7.5 lg:col-start-3 lg:row-start-1 lg:mt-1.25 lg:flex lg:flex-col lg:items-end lg:gap-1.75">
                                            <span className="text-[#d9d9d9]">
                                                {item.relativeTime}
                                            </span>
                                            {item.isUnread && (
                                                <span className="text-[#198754]">
                                                    {messages.new}
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
