import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { FeedMobileSearchProps } from '../feedTypes';
import FeedBackIcon from './FeedBackIcon';

export default function FeedMobileSearch({
    open,
    messages,
    searchValue,
    onOpenChange,
    onCloseAutoFocus,
    onSearchChange,
    onSearchSubmit,
}: FeedMobileSearchProps) {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Content
                    onCloseAutoFocus={onCloseAutoFocus}
                    className="fixed inset-0 z-[60] bg-[#12101a] text-white outline-none lg:hidden"
                >
                    <DialogPrimitive.Title className="sr-only">
                        {messages.search}
                    </DialogPrimitive.Title>
                    <form onSubmit={onSearchSubmit}>
                        <div className="flex h-15.75 items-center border-b border-[#efefef]/20 px-12">
                            <DialogPrimitive.Close asChild>
                                <button
                                    type="button"
                                    aria-label={messages.closeSearch}
                                    className="inline-flex size-4 shrink-0 items-center justify-center rounded transition-colors hover:text-[#ced4da] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:text-[#a5a5ad]"
                                >
                                    <FeedBackIcon className="size-4" />
                                </button>
                            </DialogPrimitive.Close>
                            <label className="ml-2 min-w-0 flex-1">
                                <span className="sr-only">{messages.search}</span>
                                <input
                                    type="search"
                                    name="filter[search]"
                                    value={searchValue}
                                    onChange={onSearchChange}
                                    autoFocus
                                    placeholder={messages.search}
                                    className="h-12 w-full bg-transparent text-base outline-none placeholder:text-white"
                                />
                            </label>
                        </div>

                        <div className="space-y-5.5 pt-5.25 pl-18.5 text-base text-[#ced4da]">
                            <p>{messages.searchMoviesHint}</p>
                            <p>{messages.searchQuotesHint}</p>
                        </div>
                    </form>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
