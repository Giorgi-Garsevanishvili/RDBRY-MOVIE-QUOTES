export type ErrorMessage = {
    title: string;
    description: string;
};

export type ErrorMessages = {
    forbidden: ErrorMessage;
    notFound: ErrorMessage;
    returnHome: string;
};
