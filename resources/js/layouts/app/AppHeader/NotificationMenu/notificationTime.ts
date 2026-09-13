import type { Locale } from '@/types';

const SECOND_IN_MILLISECONDS = 1_000;
const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;
const MONTH_IN_SECONDS = 30 * DAY_IN_SECONDS;
const YEAR_IN_SECONDS = 365 * DAY_IN_SECONDS;

type RelativeTimeUnit = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

type RelativeTimeValue = {
    value: number;
    unit: RelativeTimeUnit;
};

const GEORGIAN_TIME_UNITS: Record<RelativeTimeUnit, string> = {
    second: 'წამის',
    minute: 'წუთის',
    hour: 'საათის',
    day: 'დღის',
    month: 'თვის',
    year: 'წლის',
};

function relativeTimeValue(secondsAgo: number): RelativeTimeValue {
    if (secondsAgo < MINUTE_IN_SECONDS) {
        return { value: secondsAgo, unit: 'second' };
    }

    if (secondsAgo < HOUR_IN_SECONDS) {
        return { value: Math.floor(secondsAgo / MINUTE_IN_SECONDS), unit: 'minute' };
    }

    if (secondsAgo < DAY_IN_SECONDS) {
        return { value: Math.floor(secondsAgo / HOUR_IN_SECONDS), unit: 'hour' };
    }

    if (secondsAgo < MONTH_IN_SECONDS) {
        return { value: Math.floor(secondsAgo / DAY_IN_SECONDS), unit: 'day' };
    }

    if (secondsAgo < YEAR_IN_SECONDS) {
        return { value: Math.floor(secondsAgo / MONTH_IN_SECONDS), unit: 'month' };
    }

    return { value: Math.floor(secondsAgo / YEAR_IN_SECONDS), unit: 'year' };
}

function englishRelativeTime(value: number, unit: RelativeTimeUnit): string {
    if (value === 0) {
        return 'just now';
    }

    const suffix = value === 1 ? '' : 's';

    return `${value} ${unit}${suffix} ago`;
}

function georgianRelativeTime(value: number, unit: RelativeTimeUnit): string {
    if (value === 0) {
        return 'ახლახან';
    }

    return `${value} ${GEORGIAN_TIME_UNITS[unit]} წინ`;
}

export function formatNotificationTime(createdAt: string, locale: Locale): string {
    const createdTimestamp = Date.parse(createdAt);

    if (Number.isNaN(createdTimestamp)) {
        return '';
    }

    const elapsedMilliseconds = Math.max(0, Date.now() - createdTimestamp);
    const secondsAgo = Math.floor(elapsedMilliseconds / SECOND_IN_MILLISECONDS);
    const { value, unit } = relativeTimeValue(secondsAgo);

    return locale === 'ka' ? georgianRelativeTime(value, unit) : englishRelativeTime(value, unit);
}
