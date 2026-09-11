import { Head } from '@inertiajs/react';
import { MovieCard, MovieFormModal, MovieSearch, PlusSquareIcon } from './components';
import type { MovieListProps } from './movieListTypes';
import { useMovieList } from './useMovieList';

export default function MovieList(props: MovieListProps) {
    const {
        messages,
        genres,
        localizedMovies,
        searchValue,
        isCreateMovieOpen,
        openCreateMovie,
        handleCreateMovieOpenChange,
        handleSearchChange,
        handleSearchSubmit,
    } = useMovieList(props);

    return (
        <>
            <Head title={messages.listTitle} />

            <section className="px-[35px] pt-[17px] pb-8 lg:py-8 lg:pr-[70px] lg:pl-0">
                <div className="flex flex-wrap items-start justify-between gap-6">
                    <h1 className="max-w-[190px] text-2xl leading-9 font-medium lg:max-w-none">
                        <span>{messages.listTitle}</span>
                        <span className="block text-base leading-6 lg:hidden">
                            ({messages.total} {localizedMovies.length})
                        </span>
                        <span className="hidden lg:inline">
                            {' '}
                            ({messages.total} {localizedMovies.length})
                        </span>
                    </h1>

                    <div className="flex items-center gap-8">
                        <div className="hidden lg:block">
                            <MovieSearch
                                value={searchValue}
                                label={messages.searchLabel}
                                placeholder={messages.searchPlaceholder}
                                onChange={handleSearchChange}
                                onSubmit={handleSearchSubmit}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={openCreateMovie}
                            className="mt-[3px] inline-flex h-[38px] items-center gap-2 rounded bg-brand-red px-[13px] text-base leading-6 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:mt-0 lg:h-12 lg:px-4 lg:text-xl lg:leading-[30px]"
                        >
                            <PlusSquareIcon className="size-4 shrink-0" />
                            {messages.addMovie}
                        </button>
                    </div>
                </div>

                <div className="mt-[34px] grid grid-cols-1 justify-between gap-y-[60px] min-[1300px]:grid-cols-[repeat(2,minmax(0,440px))] min-[1800px]:grid-cols-[repeat(3,440px)] lg:mt-[66px]">
                    {localizedMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>

            <MovieFormModal
                open={isCreateMovieOpen}
                mode="create"
                genres={genres}
                onOpenChange={handleCreateMovieOpenChange}
            />
        </>
    );
}
