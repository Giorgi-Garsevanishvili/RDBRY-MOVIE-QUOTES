import type { FeedMobileSearchProps } from '../feedTypes';
import FeedBackIcon from './FeedBackIcon';

export default function FeedMobileSearch({
    open,
    messages,
    searchValue,
    onClose,
    onSearchChange,
    onSearchSubmit,
}: FeedMobileSearchProps) {
    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[60] bg-[#12101a] text-white lg:hidden">
            <form onSubmit={onSearchSubmit}>
                <div className="flex h-[63px] items-center border-b border-[#efefef]/20 px-12">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label={messages.closeSearch}
                        className="inline-flex size-4 shrink-0 items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    >
                        <FeedBackIcon className="size-4" />
                    </button>
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

                <div className="space-y-[22px] pt-[21px] pl-[74px] text-base text-[#ced4da]">
                    <p>{messages.searchMoviesHint}</p>
                    <p>{messages.searchQuotesHint}</p>
                </div>
            </form>
        </div>
    );
}
