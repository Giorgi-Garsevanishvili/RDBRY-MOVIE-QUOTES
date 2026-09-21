export type QuoteCardItem = {
    id: number;
    text: string;
    imageUrl: string | null;
    commentCount: number;
    likeCount: number;
    href: string;
};

export type QuoteCardProps = {
    quote: QuoteCardItem;
    viewLabel: string;
    commentsLabel: string;
    likesLabel: string;
};

export type QuoteCardRealtimeCounts = {
    quoteId: number;
    commentCount: number;
    likeCount: number;
};

export type UseQuoteCardResult = {
    commentCount: number;
    likeCount: number;
};
