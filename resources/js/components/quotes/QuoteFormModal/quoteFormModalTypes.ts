import type { MovieDetailsItem, QuoteDetailsItem, QuoteFormMovie, QuoteMovieOption } from '@/types';

export type QuoteFormData = {
    text_en: string;
    text_ka: string;
    movie_id: string;
    image: File | null;
};

type QuoteFormModalSharedProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export type CreateQuoteFormModalProps = QuoteFormModalSharedProps & {
    mode: 'create';
    movies?: readonly QuoteMovieOption[];
    fixedMovie?: MovieDetailsItem;
};

export type EditQuoteFormModalProps = QuoteFormModalSharedProps & {
    mode: 'edit';
    quote: QuoteDetailsItem;
};

export type QuoteFormModalProps = CreateQuoteFormModalProps | EditQuoteFormModalProps;

export type LocalizedQuoteFormMovie = Omit<QuoteFormMovie, 'name'> & {
    name: string;
    director?: string;
    genres?: readonly { id: number; name: string }[];
};

export type LocalizedQuoteMovieOption = {
    id: number;
    label: string;
};
