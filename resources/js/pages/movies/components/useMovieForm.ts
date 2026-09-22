import { useForm, usePage } from '@inertiajs/react';
import type { ChangeEvent, DragEvent, FormEvent } from 'react';
import { useInitials } from '@/hooks/use-initials';
import { useLocale } from '@/hooks/useLocale';
import { MOVIE_MESSAGES } from '@/locales/movies';
import { store, update } from '@/routes/movies';
import type { MovieDetailsItem } from '@/types';
import type { MovieFormData, MovieFormModalProps, MovieGenreOptionView } from './movieFormTypes';

function initialFormData(movie?: MovieDetailsItem): MovieFormData {
    return {
        name_en: movie?.name.en ?? '',
        name_ka: movie?.name.ka ?? '',
        director_en: movie?.director.en ?? '',
        director_ka: movie?.director.ka ?? '',
        description_en: movie?.description.en ?? '',
        description_ka: movie?.description.ka ?? '',
        release_year: movie === undefined ? '' : String(movie.releaseYear),
        genres: movie?.genres.map((genre) => genre.id) ?? [],
        poster: null,
    };
}

export function useMovieForm({ mode, genres, movie, onOpenChange }: MovieFormModalProps) {
    const { locale } = useLocale();
    const getInitials = useInitials();
    const user = usePage().props.auth.user;
    const form = useForm<MovieFormData>(initialFormData(movie));
    const messages = MOVIE_MESSAGES[locale];
    const selectedGenreNames = genres
        .filter((genre) => form.data.genres.includes(genre.id))
        .map((genre) => genre.name[locale]);
    const genreOptions: MovieGenreOptionView[] = genres.map((genre) => ({
        id: genre.id,
        label: genre.name[locale],
        selected: form.data.genres.includes(genre.id),
    }));

    if (user === null) {
        throw new Error('The movie form requires an authenticated user.');
    }

    if (mode === 'edit' && movie === undefined) {
        throw new Error('Edit mode requires a movie.');
    }

    const genreError = Object.entries(form.errors).find(([field]) =>
        field.startsWith('genres'),
    )?.[1];

    function closeForm(): void {
        form.reset();
        form.clearErrors();
        onOpenChange(false);
    }

    function handleOpenChange(nextOpen: boolean): void {
        if (!nextOpen) {
            closeForm();
            return;
        }

        onOpenChange(true);
    }

    function handleNameEnChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('name_en');
        form.setData('name_en', event.target.value);
    }

    function handleNameKaChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('name_ka');
        form.setData('name_ka', event.target.value);
    }

    function handleDirectorEnChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('director_en');
        form.setData('director_en', event.target.value);
    }

    function handleDirectorKaChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('director_ka');
        form.setData('director_ka', event.target.value);
    }

    function handleDescriptionEnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        form.clearErrors('description_en');
        form.setData('description_en', event.target.value);
    }

    function handleDescriptionKaChange(event: ChangeEvent<HTMLTextAreaElement>): void {
        form.clearErrors('description_ka');
        form.setData('description_ka', event.target.value);
    }

    function handleReleaseYearChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('release_year');
        form.setData('release_year', event.target.value);
    }

    function handleGenreChange(event: ChangeEvent<HTMLInputElement>): void {
        const genreId = Number(event.target.value);
        const nextGenres = event.target.checked
            ? [...form.data.genres, genreId]
            : form.data.genres.filter((selectedGenreId) => selectedGenreId !== genreId);

        form.clearErrors('genres');
        form.setData('genres', nextGenres);
    }

    function handlePosterChange(event: ChangeEvent<HTMLInputElement>): void {
        form.clearErrors('poster');
        form.setData('poster', event.target.files?.[0] ?? null);
    }

    function handlePosterDragOver(event: DragEvent<HTMLLabelElement>): void {
        event.preventDefault();
    }

    function handlePosterDrop(event: DragEvent<HTMLLabelElement>): void {
        event.preventDefault();
        form.clearErrors('poster');
        form.setData('poster', event.dataTransfer.files[0] ?? null);
    }

    function handleSuccess(): void {
        form.clearErrors();

        if (mode === 'create') {
            form.reset();
        }

        onOpenChange(false);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        let url = store().url;

        if (mode === 'edit' && movie !== undefined) {
            url = update.form.patch(movie.id).action;
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
        title: mode === 'create' ? messages.addMovie : messages.editMovie,
        submitLabel: mode === 'create' ? messages.addMovie : messages.editMovie,
        posterPrompt: mode === 'edit' ? messages.replacePhoto : messages.dragImage,
        currentPosterUrl: movie?.posterUrl ?? null,
        selectedGenres: selectedGenreNames.join(', ') || messages.selectGenres,
        selectedFileName: form.data.poster?.name ?? null,
        genreOptions,
        genreError,
        maximumReleaseYear: new Date().getFullYear(),
        data: form.data,
        errors: form.errors,
        processing: form.processing,
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
    };
}
