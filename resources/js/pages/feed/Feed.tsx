import { Head } from '@inertiajs/react';
import { PencilIcon } from 'lucide-react';
import { QuoteFormModal } from '@/components/quotes';
import type { FeedProps } from './feedTypes';
import { useFeed } from './useFeed';

export default function Feed(props: FeedProps) {
    const { movies, messages, isQuoteFormOpen, openQuoteForm, handleQuoteFormOpenChange } =
        useFeed(props);

    return (
        <>
            <Head title={messages.writeNewQuote} />

            <section className="px-[35px] py-8 lg:pr-[70px] lg:pl-0">
                <h1 className="sr-only">{messages.writeNewQuote}</h1>
                <button
                    type="button"
                    onClick={openQuoteForm}
                    className="flex h-[52px] w-full max-w-[809px] items-center gap-4 rounded-[10px] bg-[#24222f] px-4 text-left text-base transition-colors hover:bg-[#2c2938] lg:text-xl"
                >
                    <PencilIcon className="size-6 shrink-0" aria-hidden="true" />
                    <span>{messages.writeNewQuote}</span>
                </button>
            </section>

            <QuoteFormModal
                open={isQuoteFormOpen}
                mode="create"
                movies={movies}
                onOpenChange={handleQuoteFormOpenChange}
            />
        </>
    );
}
