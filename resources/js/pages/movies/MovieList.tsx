import { Head } from '@inertiajs/react';
import { MovieCard, MovieSearch } from './components';
import type { MovieListProps } from './movieListTypes';
import { useMovieList } from './useMovieList';

export default function MovieList(props: MovieListProps) {
    const { messages, localizedMovies, searchValue, handleSearchChange, handleSearchSubmit } =
        useMovieList(props);

    return (
        <>
            <Head title={messages.listTitle} />

            <section className="px-6 py-8 lg:pr-[70px] lg:pl-0">
                <div className="flex items-start justify-between gap-8">
                    <h1 className="text-2xl leading-9 font-medium">
                        {messages.listTitle} ({messages.total} {localizedMovies.length})
                    </h1>

                    <MovieSearch
                        value={searchValue}
                        label={messages.searchLabel}
                        placeholder={messages.searchPlaceholder}
                        onChange={handleSearchChange}
                        onSubmit={handleSearchSubmit}
                    />
                </div>

                <div className="mt-[66px] grid grid-cols-1 justify-between gap-y-[60px] min-[1300px]:grid-cols-[repeat(2,minmax(0,440px))] min-[1800px]:grid-cols-[repeat(3,440px)]">
                    {localizedMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </>
    );
}
