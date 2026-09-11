export type MovieActionsProps = {
    className?: string;
    editLabel: string;
    deleteLabel: string;
    actionsLabel: string;
    deleting: boolean;
    onEdit: () => void;
    onDelete: () => void;
};
