export type ProfileFieldProps = {
    label: string;
    value: string;
    editLabel: string;
    pendingLabel?: string;
    pendingValue?: string | null;
    onEdit?: () => void;
};
