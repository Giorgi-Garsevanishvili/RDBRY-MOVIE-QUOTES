import { useEcho } from '@laravel/echo-react';
import { useState } from 'react';
import {
    QUOTE_INTERACTIONS_CHANNEL,
    QUOTE_INTERACTIONS_EVENT,
} from '@/helpers/quoteInteractionBroadcast';
import type { QuoteInteractionBroadcastPayload } from '@/types';
import type { QuoteCardProps, QuoteCardRealtimeCounts, UseQuoteCardResult } from './quoteCardTypes';

export function useQuoteCard({ quote }: QuoteCardProps): UseQuoteCardResult {
    const [realtime, setRealtime] = useState<QuoteCardRealtimeCounts | null>(null);
    const currentRealtime = realtime?.quoteId === quote.id ? realtime : null;

    useEcho<QuoteInteractionBroadcastPayload>(
        QUOTE_INTERACTIONS_CHANNEL,
        `.${QUOTE_INTERACTIONS_EVENT}`,
        onRealtimeInteraction,
        [quote.id],
    );

    function onRealtimeInteraction(payload: QuoteInteractionBroadcastPayload): void {
        if (payload.quoteId !== quote.id) {
            return;
        }

        setRealtime({
            quoteId: quote.id,
            commentCount: payload.commentCount,
            likeCount: payload.likeCount,
        });
    }

    return {
        commentCount: currentRealtime?.commentCount ?? quote.commentCount,
        likeCount: currentRealtime?.likeCount ?? quote.likeCount,
    };
}
