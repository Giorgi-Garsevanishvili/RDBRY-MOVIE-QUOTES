import type { QuoteDetailsItem } from '@/types';

export type QuoteDetailsProps = {
    quote: QuoteDetailsItem;
};

export type LocalizedQuoteDetails = Omit<QuoteDetailsItem, 'movie'> & {
    movie: Omit<QuoteDetailsItem['movie'], 'name'> & {
        name: string;
    };
};
