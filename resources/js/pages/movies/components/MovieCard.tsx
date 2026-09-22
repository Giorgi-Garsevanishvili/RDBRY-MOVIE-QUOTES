import { Link } from '@inertiajs/react';
import type { MovieCardProps } from './movieCardTypes';
import ChatQuoteIcon from './ChatQuoteIcon';

export default function MovieCard({ movie }: MovieCardProps) {
    return (
        <article className="w-full min-w-0 lg:w-110">
            <Link
                href={movie.href}
                className="flex min-w-0 flex-col gap-4 rounded-xl focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
                {movie.posterUrl === null ? (
                    <div aria-hidden="true" className="aspect-[440/371] rounded-xl bg-[#11101a]" />
                ) : (
                    <img
                        src={movie.posterUrl}
                        alt=""
                        className="aspect-[440/371] w-full rounded-xl bg-[#11101a] object-cover"
                    />
                )}

                <h2 className="truncate text-2xl leading-9 font-medium lg:uppercase">
                    {movie.name} ({movie.releaseYear})
                </h2>

                <div className="flex items-center gap-3 text-xl leading-7.5 font-medium">
                    <span>{movie.quoteCount}</span>
                    <ChatQuoteIcon className="size-8 shrink-0" />
                </div>
            </Link>
        </article>
    );
}
