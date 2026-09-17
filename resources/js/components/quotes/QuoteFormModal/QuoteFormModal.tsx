import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
                <DialogPrimitive.Content className="fixed top-0 left-1/2 z-50 max-h-svh w-full -translate-x-1/2 overflow-y-auto bg-[#11101a] text-white outline-none lg:top-[115px] lg:max-h-[calc(100svh-130px)] lg:w-[961px] lg:rounded-xl">
                    <header className="relative flex h-[93px] items-center justify-center border-b border-[#efefef]/20">
                        <DialogPrimitive.Title className="text-xl leading-[30px] font-medium lg:text-2xl lg:leading-9">
                            {title}
                        </DialogPrimitive.Title>
                        <DialogPrimitive.Close
                            aria-label={messages.close}
                            className="absolute right-8 inline-flex size-8 items-center justify-center rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                        >
                            <XIcon className="size-6" aria-hidden="true" />
                        </DialogPrimitive.Close>
                    </header>

                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="px-[35px] pt-7 pb-11 lg:px-8 lg:pb-[47px]"
                    >
                        <div className="mb-7 flex items-center gap-4">
                            <Avatar className="size-10 lg:size-[60px]">
                                <AvatarImage src={user.avatar} alt="" />
                                <AvatarFallback className="bg-[#6c6f8e] text-sm text-white">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <strong className="text-xl leading-[30px] font-medium">
                                {user.username}
                            </strong>
                        </div>

                        {fixedMovie !== undefined && localizedMovie !== null && (
                            <section className="mb-6 grid gap-4 sm:grid-cols-[180px_1fr] lg:grid-cols-[290px_1fr] lg:gap-7">
                                {localizedMovie.posterUrl === null ? (
                                    <div className="h-[140px] rounded bg-[#24222f] lg:h-[158px]" />
                                ) : (
                                    <img
                                        src={localizedMovie.posterUrl}
                                        alt={localizedMovie.name}
                                        className="h-[140px] w-full rounded object-cover lg:h-[158px]"
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
                                        className="h-[86px] w-full rounded-[4px] border border-[#6c757d] bg-[#11101a] px-4 text-base outline-none focus:border-white aria-invalid:border-brand-red lg:text-xl"
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
                                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-[4px] bg-brand-red px-4 text-xl leading-[30px] transition-opacity hover:opacity-90 disabled:opacity-60 lg:mt-4"
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
