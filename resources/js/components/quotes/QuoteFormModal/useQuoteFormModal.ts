import { useForm, usePage } from '@inertiajs/react';
import type { ChangeEvent, DragEvent, FormEvent } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { QUOTE_MESSAGES } from '@/locales/quotes';
import { store, update } from '@/routes/quotes';
import type { MovieDetailsItem, QuoteFormMovie } from '@/types';
import type {
    LocalizedQuoteFormMovie,
    LocalizedQuoteMovieOption,
    QuoteFormData,
    QuoteFormModalProps,
} from './quoteFormModalTypes';

function initialFormData(props: QuoteFormModalProps): QuoteFormData {
    if (props.mode === 'edit') {
        return {
            text_en: props.quote.text.en,
            text_ka: props.quote.text.ka,
            movie_id: String(props.quote.movie.id),
            image: null,
        };
    }

    return {
        text_en: '',
        text_ka: '',
        movie_id: props.fixedMovie === undefined ? '' : String(props.fixedMovie.id),
        image: null,
    };
}

function isMovieDetails(movie: QuoteFormMovie): movie is MovieDetailsItem {
    return 'director' in movie;
}

export function useQuoteFormModal(props: QuoteFormModalProps) {
    const { locale } = useLocale();
    const user = usePage().props.auth.user;
    const getInitials = useInitials();
    const form = useForm<QuoteFormData>(initialFormData(props));
    const messages = QUOTE_MESSAGES[locale];
    const movies = props.mode === 'create' ? (props.movies ?? []) : [];
    const movieOptions: LocalizedQuoteMovieOption[] = movies.map((movie) => ({
        id: movie.id,
        label: `${movie.name[locale]} (${movie.releaseYear})`,
    }));
    const fixedMovie = props.mode === 'create' ? props.fixedMovie : undefined;
    const quote = props.mode === 'edit' ? props.quote : undefined;
    const selectedMovie: QuoteFormMovie | undefined =
        fixedMovie ??
        quote?.movie ??
        movies.find((movie) => String(movie.id) === form.data.movie_id);
    const localizedMovie: LocalizedQuoteFormMovie | null =
        selectedMovie === undefined
            ? null
            : {
                  ...selectedMovie,
                  name: selectedMovie.name[locale],
                  director: isMovieDetails(selectedMovie)
                      ? selectedMovie.director[locale]
                      : undefined,
                  genres: isMovieDetails(selectedMovie)
                      ? selectedMovie.genres.map((genre) => ({
                            id: genre.id,
                            name: genre.name[locale],
                        }))
                      : undefined,
              };

    if (user === null) {
        throw new Error('The quote form requires an authenticated user.');
    }

    function closeForm(): void {
        form.reset();
        form.clearErrors();
        props.onOpenChange(false);
    }

    function handleOpenChange(nextOpen: boolean): void {
        if (!nextOpen) {
            closeForm();
            return;
        }

        props.onOpenChange(true);
    }

    function handleTextEnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        form.clearErrors('text_en');
        form.setData('text_en', event.target.value);
    }

    function handleTextKaChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        form.clearErrors('text_ka');
        form.setData('text_ka', event.target.value);
    }

    function handleMovieChange(event: ChangeEvent<HTMLSelectElement>): void {
        form.clearErrors('movie_id');
        form.setData('movie_id', event.target.value);
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('image');
        form.setData('image', event.target.files?.[0] ?? null);
    }

    function handleImageDragOver(event: DragEvent<HTMLLabelElement>): void {
        event.preventDefault();
    }

    function handleImageDrop(event: DragEvent<HTMLLabelElement>): void {
        event.preventDefault();
        form.clearErrors('image');
        form.setData('image', event.dataTransfer.files[0] ?? null);
    }

    function handleSuccess(): void {
        form.reset();
        form.clearErrors();
        props.onOpenChange(false);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        let url = store().url;

        if (props.mode === 'edit') {
            url = update.form.patch(props.quote.id).action;
        }

        form.post(url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: handleSuccess,
        });
    }

    return {
        user,
        initials: getInitials(user.username),
        messages,
        title:
            props.mode === 'edit'
                ? messages.editQuote
                : fixedMovie === undefined
                  ? messages.writeNewQuote
                  : messages.addQuote,
        submitLabel: props.mode === 'edit' ? messages.saveChanges : messages.post,
        isEdit: props.mode === 'edit',
        movies,
        movieOptions,
        fixedMovie,
        localizedMovie,
        imageUrl: quote?.imageUrl ?? null,
        selectedFileName: form.data.image?.name ?? null,
        data: form.data,
        errors: form.errors,
        processing: form.processing,
        handleOpenChange,
        handleTextEnChange,
        handleTextKaChange,
        handleMovieChange,
        handleImageChange,
        handleImageDragOver,
        handleImageDrop,
        handleSubmit,
    };
}
