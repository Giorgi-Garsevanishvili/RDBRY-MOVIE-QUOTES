import type { MovieSearchProps } from './movieSearchTypes';
import SearchIcon from './SearchIcon';

export default function MovieSearch({
    value,
    label,
    placeholder,
    onChange,
    onSubmit,
}: MovieSearchProps) {
    return (
        <form onSubmit={onSubmit} role="search" className="flex items-center gap-4">
            <SearchIcon className="size-5 shrink-0" />
            <label className="sr-only" htmlFor="movie-search">
                {label}
            </label>
            <input
                id="movie-search"
                type="search"
                name="search"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
                className="w-24.5 bg-transparent text-xl leading-7.5 text-white outline-none placeholder:text-[#ced4da] focus:w-64 focus:border-b focus:border-white"
            />
        </form>
    );
}
