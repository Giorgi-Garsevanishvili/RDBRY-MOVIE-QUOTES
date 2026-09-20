import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BRAND_BUTTON_INTERACTION_CLASSES } from '@/components/ui/brandStyles';
import QuoteFormField from './QuoteFormField';
import QuoteImageField from './QuoteImageField';
import type { QuoteFormModalProps } from './quoteFormModalTypes';
import QuoteTextFields from './QuoteTextFields';
import { useQuoteFormModal } from './useQuoteFormModal';

export default function QuoteFormModal(props: QuoteFormModalProps) {
    const {
        user,
        initials,
        messages,
        title,
        submitLabel,
        isEdit,
        movies,
        movieOptions,
        fixedMovie,
        localizedMovie,
        imageUrl,
        selectedFileName,
        data,
        errors,
        processing,
        handleOpenChange,
        handleTextEnChange,
        handleTextKaChange,
        handleMovieChange,
        handleImageChange,
        handleImageDragOver,
        handleImageDrop,
        handleSubmit,
    } = useQuoteFormModal(props);

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
                            className="absolute right-8 inline-flex size-8 items-center justify-center rounded transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:bg-white/15"
                        >
                            <XIcon className="size-6" aria-hidden="true" />
                        </DialogPrimitive.Close>
                    </header>

                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="px-8.75 pt-7 pb-11 lg:px-8 lg:pb-11.75"
                    >
                        <div className="mb-7 flex items-center gap-4">
                            <Avatar className="size-10 lg:size-15">
                                <AvatarImage src={user.avatar ?? undefined} alt="" />
                                <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <strong className="text-xl leading-7.5 font-medium">
                                {user.username}
                            </strong>
                        </div>

                        {fixedMovie !== undefined && localizedMovie !== null && (
                            <section className="mb-6 grid gap-4 sm:grid-cols-[11.25rem_1fr] lg:grid-cols-[18.125rem_1fr] lg:gap-7">
                                {localizedMovie.posterUrl === null ? (
                                    <div className="h-35 rounded bg-[#24222f] lg:h-39.5" />
                                ) : (
                                    <img
                                        src={localizedMovie.posterUrl}
                                        alt={localizedMovie.name}
                                        className="h-35 w-full rounded object-cover lg:h-39.5"
                                    />
                                )}
                                <div className="self-center">
                                    <h2 className="text-xl font-medium text-brand-gold uppercase lg:text-2xl">
                                        {localizedMovie.name} ({localizedMovie.releaseYear})
                                    </h2>
                                    {localizedMovie.genres !== undefined && (
                                        <ul className="mt-3 flex flex-wrap gap-2">
                                            {localizedMovie.genres.map((genre) => (
                                                <li
                                                    key={genre.id}
                                                    className="rounded bg-[#6c757d] px-2.5 py-1 text-sm font-bold"
                                                >
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {localizedMovie.director !== undefined && (
                                        <p className="mt-3 text-base">
                                            <span className="text-[#ced4da]">
                                                {messages.director}
                                            </span>{' '}
                                            {localizedMovie.director}
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}

                        <fieldset disabled={processing} className="grid gap-4 lg:gap-6">
                            {isEdit && (
                                <QuoteImageField
                                    messages={messages}
                                    error={errors.image}
                                    isEdit
                                    imageUrl={imageUrl}
                                    selectedFileName={selectedFileName}
                                    onChange={handleImageChange}
                                    onDragOver={handleImageDragOver}
                                    onDrop={handleImageDrop}
                                />
                            )}

                            <QuoteTextFields
                                messages={messages}
                                textEn={data.text_en}
                                textKa={data.text_ka}
                                textEnError={errors.text_en}
                                textKaError={errors.text_ka}
                                autoFocus={!isEdit}
                                onTextEnChange={handleTextEnChange}
                                onTextKaChange={handleTextKaChange}
                            />

                            {!isEdit && (
                                <QuoteImageField
                                    messages={messages}
                                    error={errors.image}
                                    isEdit={false}
                                    imageUrl={null}
                                    selectedFileName={selectedFileName}
                                    onChange={handleImageChange}
                                    onDragOver={handleImageDragOver}
                                    onDrop={handleImageDrop}
                                />
                            )}

                            {fixedMovie === undefined && !isEdit && (
                                <QuoteFormField id="movie_id" error={errors.movie_id}>
                                    <label htmlFor="movie_id" className="sr-only">
                                        {messages.chooseMovie}
                                    </label>
                                    <select
                                        id="movie_id"
                                        name="movie_id"
                                        value={data.movie_id}
                                        onChange={handleMovieChange}
                                        required
                                        aria-invalid={Boolean(errors.movie_id)}
                                        aria-describedby={
                                            errors.movie_id ? 'movie_id-error' : undefined
                                        }
                                        className="h-21.5 w-full rounded-[0.25rem] border border-[#6c757d] bg-[#11101a] px-4 text-base transition-[border-color,box-shadow] outline-none focus:border-white focus:ring-2 focus:ring-white/50 aria-invalid:border-brand-red aria-invalid:ring-2 aria-invalid:ring-brand-red/30 lg:text-xl"
                                    >
                                        <option value="">{messages.chooseMovie}</option>
                                        {movieOptions.map((movie) => (
                                            <option key={movie.id} value={movie.id}>
                                                {movie.label}
                                            </option>
                                        ))}
                                    </select>
                                </QuoteFormField>
                            )}

                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    (fixedMovie === undefined && !isEdit && movies.length === 0)
                                }
                                data-processing={processing}
                                className={`mt-2 inline-flex h-12 w-full items-center justify-center rounded-[0.25rem] px-4 text-xl leading-7.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:mt-4 ${BRAND_BUTTON_INTERACTION_CLASSES}`}
                            >
                                {submitLabel}
                            </button>

                            {fixedMovie === undefined && !isEdit && movies.length === 0 && (
                                <p className="text-center text-sm text-[#ced4da]">
                                    {messages.noMovies}
                                </p>
                            )}
                        </fieldset>
                    </form>
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}
