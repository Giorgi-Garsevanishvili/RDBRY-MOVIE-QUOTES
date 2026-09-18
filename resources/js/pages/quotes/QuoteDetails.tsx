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
                    <DialogPrimitive.Content className="fixed top-0 left-1/2 z-40 max-h-svh w-full -translate-x-1/2 overflow-y-auto bg-[#11101a] text-white outline-none lg:top-[115px] lg:max-h-[calc(100svh-130px)] lg:w-[961px] lg:rounded-xl">
                        <header className="relative flex h-[93px] items-center justify-center border-b border-[#efefef]/20">
                            <DialogPrimitive.Title className="text-xl leading-[30px] font-medium lg:text-2xl lg:leading-9">
                                {messages.viewQuote}
                            </DialogPrimitive.Title>
                            <DialogPrimitive.Close
                                aria-label={messages.close}
                                className="absolute right-8 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                            >
                                <XIcon className="size-6" aria-hidden="true" />
                            </DialogPrimitive.Close>
                        </header>

                        <div className="px-[35px] pt-7 pb-11 lg:px-8 lg:pb-12">
                            {quote.canManage && (
                                <div
                                    role="group"
                                    aria-label={messages.actions}
                                    className="mb-7 flex h-10 w-36 items-center justify-center rounded-[10px] bg-[#24222f]"
                                >
                                    <button
                                        type="button"
                                        onClick={openEditQuote}
                                        aria-label={messages.edit}
                                        title={messages.edit}
                                        className="inline-flex h-10 w-[71px] items-center justify-center rounded-l-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
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
                                        className="inline-flex h-10 w-[71px] items-center justify-center rounded-r-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-50"
                                    >
                                        <TrashIcon className="size-5" aria-hidden="true" />
                                    </button>
                                </div>
                            )}

                            <div className="mb-7 flex items-center gap-4">
                                <Avatar className="size-10 lg:size-[60px]">
                                    <AvatarImage src={quote.author.avatar ?? undefined} alt="" />
                                    <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                                        {authorInitials}
                                    </AvatarFallback>
                                </Avatar>
                                <strong className="text-xl leading-[30px] font-medium">
                                    {quote.author.username}
                                </strong>
                            </div>

                            <h2 className="mb-6 text-xl font-medium text-brand-gold uppercase lg:text-2xl">
                                {localizedQuote.movie.name} ({localizedQuote.movie.releaseYear})
                            </h2>

                            <div className="grid gap-4 lg:gap-6">
                                <p
                                    lang="en"
                                    className="min-h-[53px] rounded-[4px] border border-[#6c757d] px-4 py-2 pr-16 text-xl leading-[30px] italic"
                                >
                                    “{quote.text.en}”
                                </p>
                                <p
                                    lang="ka"
                                    className="min-h-[53px] rounded-[4px] border border-[#6c757d] px-4 py-2 pr-16 text-xl leading-[30px] italic"
                                >
                                    “{quote.text.ka}”
                                </p>

                                {quote.imageUrl === null ? (
                                    <div className="h-[302px] rounded bg-[#24222f] lg:h-[513px]" />
                                ) : (
                                    <img
                                        src={quote.imageUrl}
                                        alt={localizedQuote.movie.name}
                                        className="h-[302px] w-full rounded object-cover lg:h-[513px]"
                                    />
                                )}
                            </div>

                            <QuoteInteractions
                                quote={quote}
                                messages={messages}
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
