import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Head } from '@inertiajs/react';
import { PencilIcon, TrashIcon, XIcon } from 'lucide-react';
import { QuoteFormModal, QuoteInteractions } from '@/components/quotes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { QuoteDetailsProps } from './quoteDetailsTypes';
import { useQuoteDetails } from './useQuoteDetails';

export default function QuoteDetails(props: QuoteDetailsProps) {
    const {
        quote,
        localizedQuote,
        authorInitials,
        viewerId,
        viewerUsername,
        viewerAvatarUrl,
        messages,
        isEditQuoteOpen,
        isDeleting,
        handleQuoteOpenChange,
        openEditQuote,
        handleEditQuoteOpenChange,
        deleteQuote,
    } = useQuoteDetails(props);

    return (
        <>
            <Head title={messages.viewQuote} />

            <DialogPrimitive.Root open onOpenChange={handleQuoteOpenChange}>
                <DialogPrimitive.Portal>
                    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-[#11101a]/70" />
                    <DialogPrimitive.Content className="fixed top-0 left-1/2 z-40 max-h-svh w-full -translate-x-1/2 overflow-y-auto bg-[#11101a] text-white outline-none lg:top-28.75 lg:max-h-[calc(100svh-8.125rem)] lg:w-240.25 lg:rounded-xl">
                        <header className="relative flex h-23.25 items-center justify-center border-b border-[#efefef]/20">
                            <DialogPrimitive.Title className="text-xl leading-7.5 font-medium lg:text-2xl lg:leading-9">
                                {messages.viewQuote}
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Close
                                aria-label={messages.close}
                                className="absolute right-8 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                            >
                                <XIcon className="size-6" aria-hidden="true" />
                            </DialogPrimitive.Close>
                        </header>

                        <div className="px-8.75 pt-7 pb-11 lg:px-8 lg:pb-12">
                            {quote.canManage && (
                                <div
                                    role="group"
                                    aria-label={messages.actions}
                                    className="mb-7 flex h-10 w-36 items-center justify-center rounded-lg bg-[#24222f]"
                                >
                                    <button
                                        type="button"
                                        onClick={openEditQuote}
                                        aria-label={messages.edit}
                                        title={messages.edit}
                                        className="inline-flex h-10 w-17.75 items-center justify-center rounded-l-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                                    >
                                        <PencilIcon className="size-5" aria-hidden="true" />
                                    </button>
                                    <span
                                        aria-hidden="true"
                                        className="h-4 w-px rotate-[15deg] bg-[#6c757d]"
                                    />
                                    <button
                                        type="button"
                                        onClick={deleteQuote}
                                        disabled={isDeleting}
                                        aria-label={messages.delete}
                                        title={messages.delete}
                                        className="inline-flex h-10 w-17.75 items-center justify-center rounded-r-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-50"
                                    >
                                        <TrashIcon className="size-5" aria-hidden="true" />
                                    </button>
                                </div>
                            )}

                            <div className="mb-7 flex min-w-0 items-center gap-4">
                                <Avatar className="size-10 lg:size-15">
                                    <AvatarImage src={quote.author.avatar ?? undefined} alt="" />
                                    <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                                        {authorInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <strong className="min-w-0 text-xl leading-7.5 font-medium [overflow-wrap:anywhere]">
                                    {quote.author.username}
                                </strong>
                            </div>

                            <h2 className="mb-6 text-xl font-medium [overflow-wrap:anywhere] text-brand-gold uppercase lg:text-2xl">
                                {localizedQuote.movie.name} ({localizedQuote.movie.releaseYear})
                            </h2>

                            <div className="grid gap-4 lg:gap-6">
                                <p
                                    lang="en"
                                    className="min-h-13.25 rounded-[0.25rem] border border-[#6c757d] px-4 py-2 pr-16 text-xl leading-7.5 [overflow-wrap:anywhere] italic"
                                >
                                    “{quote.text.en}”
                                </p>
                                <p
                                    lang="ka"
                                    className="min-h-13.25 rounded-[0.25rem] border border-[#6c757d] px-4 py-2 pr-16 text-xl leading-7.5 [overflow-wrap:anywhere] italic"
                                >
                                    “{quote.text.ka}”
                                </p>

                                {quote.imageUrl === null ? (
                                    <div className="h-75.5 rounded bg-[#24222f] lg:h-128.25" />
                                ) : (
                                    <img
                                        src={quote.imageUrl}
                                        alt={localizedQuote.movie.name}
                                        className="h-75.5 w-full rounded object-cover lg:h-128.25"
                                    />
                                )}
                            </div>

                            <QuoteInteractions
                                quote={quote}
                                messages={messages}
                                viewerId={viewerId}
                                viewerUsername={viewerUsername}
                                viewerAvatarUrl={viewerAvatarUrl}
                            />
                        </div>
                    </DialogPrimitive.Content>
                </DialogPrimitive.Portal>
            </DialogPrimitive.Root>

            {quote.canManage && (
                <QuoteFormModal
                    open={isEditQuoteOpen}
                    mode="edit"
                    quote={quote}
                    onOpenChange={handleEditQuoteOpenChange}
                />
            )}
        </>
    );
}
