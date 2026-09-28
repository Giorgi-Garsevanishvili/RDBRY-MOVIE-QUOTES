import type { FeedToolbarProps } from '../feedTypes';
import FeedPencilIcon from './FeedPencilIcon';
import FeedSearchIcon from './FeedSearchIcon';

export default function FeedToolbar({
    writeNewQuote,
    searchBy,
    search,
    searchInstructions,
    searchValue,
    isSearchActive,
    mobileSearchTriggerRef,
    onWriteQuote,
    onOpenSearch,
    onSearchChange,
    onSearchSubmit,
}: FeedToolbarProps) {
    return (
        <div className="flex w-full justify-between lg:gap-8">
            <button
                type="button"
                onClick={onWriteQuote}
                className="flex h-6 items-center gap-3 text-left text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:h-13 lg:min-w-54.5 lg:shrink-0 lg:gap-4 lg:rounded-lg lg:bg-[#24222f] lg:px-4 lg:text-xl lg:transition-colors lg:hover:bg-[#2c2938]"
            >
                <FeedPencilIcon className="size-6 shrink-0" />
                <span className="shrink-0">{writeNewQuote}</span>
            </button>

            <button
                ref={mobileSearchTriggerRef}
                type="button"
                onClick={onOpenSearch}
                aria-label={search}
                className="fixed top-5.75 right-17.75 z-50 inline-flex size-10 items-center justify-center rounded text-[#ced4da] transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:hidden"
            >
                <FeedSearchIcon className="size-6" />
            </button>

            {isSearchActive ? (
                <form onSubmit={onSearchSubmit} className="hidden min-w-0 flex-1 lg:block">
                    <label className="flex h-14.75 items-center gap-4 border-b border-[#efefef]/30 text-[#ced4da]">
                        <span className="sr-only">{search}</span>
                        <FeedSearchIcon className="size-5 shrink-0" />
                        <input
                            type="search"
                            name="filter[search]"
                            value={searchValue}
                            onChange={onSearchChange}
                            autoFocus
                            placeholder={searchInstructions}
                            className="min-w-0 flex-1 bg-transparent text-xl text-white outline-none placeholder:text-[#ced4da]"
                        />
                    </label>
                </form>
            ) : (
                <button
                    type="button"
                    onClick={onOpenSearch}
                    className="ml-auto hidden h-13 items-center gap-4 text-xl text-[#ced4da] transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:flex"
                >
                    <FeedSearchIcon className="size-5" />
                    <span>{searchBy}</span>
                </button>
            )}
        </div>
    );
}
