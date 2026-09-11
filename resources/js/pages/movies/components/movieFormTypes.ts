import type { MovieDetailsItem, MovieGenre } from '@/types';

export type MovieFormMode = 'create' | 'edit';

export type MovieFormData = {
    name_en: string;
    name_ka: string;
    director_en: string;
    director_ka: string;
    description_en: string;
    description_ka: string;
    release_year: string;
    genres: number[];
    poster: File | null;
};

export type MovieFormModalProps = {
    open: boolean;
    mode: MovieFormMode;
    genres: readonly MovieGenre[];
    movie?: MovieDetailsItem;
    onOpenChange: (open: boolean) => void;
};

export type MovieGenreOptionView = {
    id: number;
    label: string;
    selected: boolean;
};
