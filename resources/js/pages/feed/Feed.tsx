import { Head, InfiniteScroll } from '@inertiajs/react';
import { QuoteFormModal } from '@/components/quotes';
import { FeedMobileSearch, FeedQuoteCard, FeedToolbar } from './components';
import type { FeedProps } from './feedTypes';
import { useFeed } from './useFeed';

export default function Feed(props: FeedProps) {
    const {
        movies,
        feedMessages,
        quoteMessages,
        quoteCards,
        emptyMessage,
        searchValue,
        isQuoteFormOpen,
        isSearchOpen,
        isDesktopSearchActive,
        openQuoteForm,
        handleQuoteFormOpenChange,
        openSearch,
        closeSearch,
        handleSearchChange,
        handleSearchSubmit,
    } = useFeed(props);

    return (
        <>
            <Head title={feedMessages.title} />

            <section className="px-[35px] py-8 lg:px-0 lg:pr-[70px] lg:pl-[100px]">
                <h1 className="sr-only">{feedMessages.title}</h1>

                <FeedToolbar
                    writeNewQuote={quoteMessages.writeNewQuote}
                    searchBy={feedMessages.searchBy}
                    search={feedMessages.search}
                    searchInstructions={feedMessages.searchInstructions}
                    searchValue={searchValue}
                    isSearchActive={isDesktopSearchActive}
                    onWriteQuote={openQuoteForm}
                    onOpenSearch={openSearch}
                    onSearchChange={handleSearchChange}
                    onSearchSubmit={handleSearchSubmit}
                />

                <InfiniteScroll
                    data="quotes"
                    onlyNext
                    preserveUrl={false}
                    buffer={600}
                    className="-mx-[35px] mt-10 grid gap-8 lg:mx-0 lg:max-w-[938px]"
                    loading={
                        <p className="py-6 text-center text-[#ced4da]">
                            {feedMessages.loadingMore}
                        </p>
                    }
                >
                    {quoteCards.length === 0 ? (
                        <p className="px-[35px] py-16 text-center text-[#ced4da] lg:px-0">
                            {emptyMessage}
                        </p>
                    ) : (
                        quoteCards.map((quote) => (
                            <FeedQuoteCard
                                key={quote.id}
                                quote={quote}
                                feedMessages={feedMessages}
                                quoteMessages={quoteMessages}
                            />
                        ))
                    )}
                </InfiniteScroll>
            </section>

            <FeedMobileSearch
                open={isSearchOpen}
                messages={feedMessages}
                searchValue={searchValue}
                onClose={closeSearch}
                onSearchChange={handleSearchChange}
                onSearchSubmit={handleSearchSubmit}
            />

            <QuoteFormModal
                open={isQuoteFormOpen}
                mode="create"
                movies={movies}
                onOpenChange={handleQuoteFormOpenChange}
            />
        </>
    );
}
