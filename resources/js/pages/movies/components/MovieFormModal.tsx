import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CloseIcon from './CloseIcon';
import MovieFormField from './MovieFormField';
import type { MovieFormModalProps } from './movieFormTypes';
import PhotoIcon from './PhotoIcon';
import { useMovieForm } from './useMovieForm';

export default function MovieFormModal(props: MovieFormModalProps) {
    const {
        user,
        initials,
        messages,
        title,
        submitLabel,
        posterPrompt,
        currentPosterUrl,
        selectedGenres,
        selectedFileName,
        genreOptions,
        genreError,
        maximumReleaseYear,
        data,
        errors,
        processing,
        handleOpenChange,
        handleNameEnChange,
        handleNameKaChange,
        handleDirectorEnChange,
        handleDirectorKaChange,
        handleDescriptionEnChange,
        handleDescriptionKaChange,
        handleReleaseYearChange,
        handleGenreChange,
        handlePosterChange,
        handlePosterDragOver,
        handlePosterDrop,
        handleSubmit,
    } = useMovieForm(props);

    return (
        <DialogPrimitive.Root open={props.open} onOpenChange={handleOpenChange}>
            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[#11101a]/70" />
                <DialogPrimitive.Content className="fixed top-0 left-1/2 z-50 max-h-svh w-full -translate-x-1/2 overflow-y-auto bg-[#11101a] text-white outline-none lg:top-28.75 lg:max-h-[calc(100svh-8.125rem)] lg:w-240.25 lg:rounded-xl">
                    <header className="relative flex h-23.25 items-center justify-center border-b border-[#efefef]/20">
                        <DialogPrimitive.Title className="text-xl leading-7.5 font-medium lg:text-2xl lg:leading-9">
                            {title}
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Close
                            aria-label={messages.close}
                            className="absolute right-8 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                        >
                            <CloseIcon className="size-8 text-white" />
                        </DialogPrimitive.Close>
                    </header>

                    <form onSubmit={handleSubmit} className="px-8 pt-7.25 pb-11 lg:pb-11.75">
                        <div className="mb-7 flex items-center gap-4 lg:mb-7">
                            <Avatar className="size-10 lg:size-15">
                                <AvatarImage src={user.avatar ?? undefined} alt="" />
                                <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <strong className="self-center text-xl leading-7.5 font-medium">
                                {user.username}
                            </strong>
                        </div>

                        <fieldset disabled={processing} className="grid gap-4 lg:gap-6">
                            <MovieFormField id="name_en" error={errors.name_en}>
                                <div className="relative">
                                    <label htmlFor="name_en" className="sr-only">
                                        {messages.movieNameEn}
                                    </label>
                                    <input
                                        id="name_en"
                                        name="name_en"
                                        value={data.name_en}
                                        onChange={handleNameEnChange}
                                        placeholder={messages.movieNameEn}
                                        maxLength={255}
                                        required
                                        autoFocus
                                        aria-invalid={Boolean(errors.name_en)}
                                        aria-describedby={
                                            errors.name_en ? 'name_en-error' : undefined
                                        }
                                        className="h-12 w-full rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 pr-16 text-base outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-base lg:text-xl">
                                        {messages.english}
                                    </span>
                                </div>
                            </MovieFormField>

                            <MovieFormField id="name_ka" error={errors.name_ka}>
                                <div className="relative">
                                    <label htmlFor="name_ka" className="sr-only">
                                        {messages.movieNameKa}
                                    </label>
                                    <input
                                        id="name_ka"
                                        name="name_ka"
                                        value={data.name_ka}
                                        onChange={handleNameKaChange}
                                        placeholder={messages.movieNameKa}
                                        maxLength={255}
                                        required
                                        aria-invalid={Boolean(errors.name_ka)}
                                        aria-describedby={
                                            errors.name_ka ? 'name_ka-error' : undefined
                                        }
                                        className="h-12 w-full rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 pr-16 text-base outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-base lg:text-xl">
                                        {messages.georgian}
                                    </span>
                                </div>
                            </MovieFormField>

                            <MovieFormField id="genres" error={genreError}>
                                <details className="relative [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        aria-invalid={Boolean(genreError)}
                                        aria-describedby={genreError ? 'genres-error' : undefined}
                                        className="flex h-12 cursor-pointer list-none items-center rounded-[0.25rem] border border-[#6c757d] px-4 text-base outline-none focus-visible:border-white aria-invalid:border-brand-red lg:text-xl"
                                    >
                                        <span className="truncate">{selectedGenres}</span>
                                        <span aria-hidden="true" className="ml-auto text-[#6c757d]">
                                            ⌄
                                        </span>
                                    </summary>
                                    <div className="absolute inset-x-0 top-13 z-10 grid max-h-48 gap-2 overflow-y-auto rounded bg-[#24222f] p-3 shadow-xl">
                                        {genreOptions.map((genre) => (
                                            <label
                                                key={genre.id}
                                                className="flex items-center gap-3 text-base"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="genres[]"
                                                    value={genre.id}
                                                    checked={genre.selected}
                                                    onChange={handleGenreChange}
                                                    className="size-4 accent-brand-red"
                                                />
                                                <span>{genre.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </details>
                            </MovieFormField>

                            <MovieFormField id="release_year" error={errors.release_year}>
                                <label htmlFor="release_year" className="sr-only">
                                    {messages.releaseYear}
                                </label>
                                <input
                                    id="release_year"
                                    name="release_year"
                                    type="number"
                                    min="1888"
                                    max={maximumReleaseYear}
                                    value={data.release_year}
                                    onChange={handleReleaseYearChange}
                                    placeholder={messages.releaseYear}
                                    required
                                    aria-invalid={Boolean(errors.release_year)}
                                    aria-describedby={
                                        errors.release_year ? 'release_year-error' : undefined
                                    }
                                    className="h-12 w-full rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 text-base outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                />
                            </MovieFormField>

                            <MovieFormField id="director_en" error={errors.director_en}>
                                <div className="relative">
                                    <label htmlFor="director_en" className="sr-only">
                                        {messages.directorEn}
                                    </label>
                                    <input
                                        id="director_en"
                                        name="director_en"
                                        value={data.director_en}
                                        onChange={handleDirectorEnChange}
                                        placeholder={messages.directorEn}
                                        maxLength={255}
                                        required
                                        aria-invalid={Boolean(errors.director_en)}
                                        aria-describedby={
                                            errors.director_en ? 'director_en-error' : undefined
                                        }
                                        className="h-12 w-full rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 pr-16 text-base outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-base lg:text-xl">
                                        {messages.english}
                                    </span>
                                </div>
                            </MovieFormField>

                            <MovieFormField id="director_ka" error={errors.director_ka}>
                                <div className="relative">
                                    <label htmlFor="director_ka" className="sr-only">
                                        {messages.directorKa}
                                    </label>
                                    <input
                                        id="director_ka"
                                        name="director_ka"
                                        value={data.director_ka}
                                        onChange={handleDirectorKaChange}
                                        placeholder={messages.directorKa}
                                        maxLength={255}
                                        required
                                        aria-invalid={Boolean(errors.director_ka)}
                                        aria-describedby={
                                            errors.director_ka ? 'director_ka-error' : undefined
                                        }
                                        className="h-12 w-full rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 pr-16 text-base outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-base lg:text-xl">
                                        {messages.georgian}
                                    </span>
                                </div>
                            </MovieFormField>

                            <MovieFormField id="description_en" error={errors.description_en}>
                                <div className="relative">
                                    <label htmlFor="description_en" className="sr-only">
                                        {messages.descriptionEn}
                                    </label>
                                    <textarea
                                        id="description_en"
                                        name="description_en"
                                        value={data.description_en}
                                        onChange={handleDescriptionEnChange}
                                        placeholder={messages.descriptionEn}
                                        maxLength={2000}
                                        required
                                        aria-invalid={Boolean(errors.description_en)}
                                        aria-describedby={
                                            errors.description_en
                                                ? 'description_en-error'
                                                : undefined
                                        }
                                        className="h-21.5 w-full resize-none rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 py-2 pr-16 text-base [overflow-wrap:anywhere] outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                    />
                                    <span className="pointer-events-none absolute top-2 right-4 text-base lg:text-xl">
                                        {messages.english}
                                    </span>
                                </div>
                            </MovieFormField>

                            <MovieFormField id="description_ka" error={errors.description_ka}>
                                <div className="relative">
                                    <label htmlFor="description_ka" className="sr-only">
                                        {messages.descriptionKa}
                                    </label>
                                    <textarea
                                        id="description_ka"
                                        name="description_ka"
                                        value={data.description_ka}
                                        onChange={handleDescriptionKaChange}
                                        placeholder={messages.descriptionKa}
                                        maxLength={2000}
                                        required
                                        aria-invalid={Boolean(errors.description_ka)}
                                        aria-describedby={
                                            errors.description_ka
                                                ? 'description_ka-error'
                                                : undefined
                                        }
                                        className="h-21.5 w-full resize-none rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 py-2 pr-16 text-base [overflow-wrap:anywhere] outline-none placeholder:text-[#6c757d] focus:border-white aria-invalid:border-brand-red lg:text-xl"
                                    />
                                    <span className="pointer-events-none absolute top-2 right-4 text-base lg:text-xl">
                                        {messages.georgian}
                                    </span>
                                </div>
                            </MovieFormField>

                            <MovieFormField id="poster" error={errors.poster}>
                                <label
                                    htmlFor="poster"
                                    onDragOver={handlePosterDragOver}
                                    onDrop={handlePosterDrop}
                                    className="flex min-h-20.5 cursor-pointer items-center gap-3 rounded-[0.25rem] border border-[#6c757d] px-4 py-4 outline-none focus-within:border-white aria-invalid:border-brand-red lg:min-h-21"
                                >
                                    {currentPosterUrl === null ? (
                                        <>
                                            <PhotoIcon className="size-6 shrink-0 text-white" />
                                            <span className="min-w-0 text-base lg:text-xl">
                                                <span className="block truncate">
                                                    {posterPrompt}
                                                </span>
                                                {selectedFileName !== null && (
                                                    <span className="block truncate text-sm text-[#ced4da]">
                                                        {messages.selectedFile}: {selectedFileName}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="ml-auto shrink-0 rounded bg-[#9747ff] px-3 py-2 text-sm lg:text-base">
                                                {messages.chooseFile}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src={currentPosterUrl}
                                                alt=""
                                                className="h-27.5 w-44.25 shrink-0 rounded object-cover lg:h-36.75 lg:w-108.25"
                                            />
                                            <span className="grid min-w-0 gap-2 text-base lg:text-xl">
                                                <span className="truncate">{posterPrompt}</span>
                                                {selectedFileName !== null && (
                                                    <span className="truncate text-sm text-[#ced4da]">
                                                        {messages.selectedFile}: {selectedFileName}
                                                    </span>
                                                )}
                                                <span className="w-fit rounded bg-[#9747ff] px-3 py-2 text-sm lg:text-base">
                                                    {messages.chooseFile}
                                                </span>
                                            </span>
                                        </>
                                    )}
                                    <input
                                        id="poster"
                                        name="poster"
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handlePosterChange}
                                        required={props.mode === 'create'}
                                        className="sr-only"
                                        aria-invalid={Boolean(errors.poster)}
                                        aria-describedby={
                                            errors.poster ? 'poster-error' : undefined
                                        }
                                    />
                                </label>
                            </MovieFormField>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-[0.25rem] bg-brand-red px-4 text-xl leading-7.5 font-normal transition-opacity hover:opacity-90 disabled:opacity-60 lg:mt-4"
                            >
                                {submitLabel}
                            </button>
                        </fieldset>
                    </form>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
