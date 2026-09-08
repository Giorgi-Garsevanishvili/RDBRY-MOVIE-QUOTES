export type LandingQuote = {
    quote: string;
    movie: string;
};

export type LandingMessages = {
    pageTitle: string;
    pageDescription: string;
    brand: string;
    heroTitle: string;
    getStarted: string;
    signUp: string;
    logIn: string;
    languageLabel: string;
    copyright: (year: number) => string;
    quotes: readonly [LandingQuote, LandingQuote, LandingQuote];
};
