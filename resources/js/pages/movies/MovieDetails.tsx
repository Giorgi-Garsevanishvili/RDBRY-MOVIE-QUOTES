import { Head } from '@inertiajs/react';
import { PlusSquareIcon } from 'lucide-react';
import { QuoteFormModal } from '@/components/quotes';
import { MovieActions, MovieFormModal, QuoteCard } from './components';
import type { MovieDetailsProps } from './movieDetailsTypes';
import { useMovieDetails } from './useMovieDetails';

export default function MovieDetails(props: MovieDetailsProps) {
    const {
        movie,
        genres,
        localizedMovie,
        messages,
        quoteMessages,
        quoteCards,
        isEditMovieOpen,
        isAddQuoteOpen,
        isDeleting,
        openEditMovie,
        handleEditMovieOpenChange,
        openAddQuote,
        handleAddQuoteOpenChange,
        deleteMovie,
    } = useMovieDetails(props);

    return (
        <>
            <Head title={localizedMovie.name} />

            <section className="px-8.75 py-8 lg:pr-17.5 lg:pl-0">
                <h1 className="hidden text-2xl leading-9 font-medium lg:block">
                    {messages.movieDescription}
                </h1>

                <article className="mt-1.75 grid max-w-355 gap-6 lg:mt-8.25 lg:grid-cols-[minmax(0,50.5625rem)_minmax(0,36.875rem)] lg:gap-5.25">
                    {localizedMovie.posterUrl === null ? (
                        <div className="h-75.5 rounded-xl bg-[#11101a] lg:h-110.25" />
                    ) : (
                        <img
                            src={localizedMovie.posterUrl}
                            alt={localizedMovie.name}
                            className="h-75.5 w-full rounded-xl bg-[#11101a] object-cover lg:h-110.25"
                        />
                    )}

                    <div className="relative min-w-0">
                        <h2 className="text-2xl leading-9 font-medium text-brand-gold uppercase lg:pr-40">
                            {localizedMovie.name} ({localizedMovie.releaseYear})
                        </h2>

                        <ul className="mt-4 flex flex-wrap gap-2.5">
                            {localizedMovie.genres.map((genre) => (
                                <li
                                    key={genre.id}
                                    className="rounded bg-[#6c757d] px-3 py-1 text-base font-bold"
                                >
                                    {genre.name}
                                </li>
                            ))}
                        </ul>

                        <p className="mt-5 text-lg leading-6.75 uppercase">
                            <span className="text-[#ced4da]">{messages.director}</span>{' '}
                            <strong className="font-medium">{localizedMovie.director}</strong>
                        </p>

                        <div className="mt-5 grid gap-4 text-lg leading-6.75 text-[#ced4da] lg:text-xl lg:leading-7.5">
                            <p lang="en">{movie.description.en}</p>
                            <p lang="ka">{movie.description.ka}</p>
                        </div>

                        <MovieActions
                            className="mt-5 flex lg:absolute lg:top-0 lg:right-0 lg:mt-0"
                            editLabel={messages.edit}
                            deleteLabel={messages.delete}
                            actionsLabel={messages.actions}
                            deleting={isDeleting}
                            onEdit={openEditMovie}
                            onDelete={deleteMovie}
                        />
                    </div>
                </article>

                <section className="mt-8 max-w-202.25 border-t border-white/20 pt-8 lg:mt-10">
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        <h2 className="text-2xl leading-9 font-medium">
                            <span className="lg:hidden">{messages.allQuotes}</span>
                            <span className="hidden lg:inline">{messages.quotes}</span> (
                            {messages.total} {localizedMovie.quoteCount})
                        </h2>
                        <button
                            type="button"
                            onClick={openAddQuote}
                            className="inline-flex h-12 items-center gap-2 rounded-[0.25rem] bg-brand-red px-4 text-base transition-opacity hover:opacity-90 lg:text-xl"
                        >
                            <PlusSquareIcon className="size-4" aria-hidden="true" />
                            {quoteMessages.addQuote}
                        </button>
                    </div>

                    <div className="mt-8 grid gap-10">
                        {quoteCards.map((quote) => (
                            <QuoteCard
                                key={quote.id}
                                quote={quote}
                                viewLabel={quoteMessages.viewQuote}
                                commentsLabel={quoteMessages.comments}
                                likesLabel={quoteMessages.likes}
                            />
                        ))}
                    </div>
                </section>
            </section>

            <MovieFormModal
                open={isEditMovieOpen}
                mode="edit"
                genres={genres}
                movie={movie}
                onOpenChange={handleEditMovieOpenChange}
            />
            <QuoteFormModal
                open={isAddQuoteOpen}
                mode="create"
                fixedMovie={movie}
                onOpenChange={handleAddQuoteOpenChange}
            />
        </>
    );
}
