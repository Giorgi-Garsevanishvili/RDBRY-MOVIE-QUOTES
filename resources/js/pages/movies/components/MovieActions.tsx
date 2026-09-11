import type { MovieActionsProps } from './movieActionsTypes';
import PencilIcon from './PencilIcon';
import TrashIcon from './TrashIcon';

export default function MovieActions({
    className,
    editLabel,
    deleteLabel,
    actionsLabel,
    deleting,
    onEdit,
    onDelete,
}: MovieActionsProps) {
    return (
        <div
            role="group"
            aria-label={actionsLabel}
            className={`h-10 w-36 items-center justify-center rounded-[10px] bg-[#24222f] ${className ?? ''}`}
        >
            <button
                type="button"
                onClick={onEdit}
                aria-label={editLabel}
                title={editLabel}
                className="inline-flex h-10 w-[71px] items-center justify-center rounded-l-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
                <PencilIcon className="size-5" />
            </button>
            <span aria-hidden="true" className="h-4 w-px rotate-[15deg] bg-[#6c757d]" />
            <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                aria-label={deleteLabel}
                title={deleteLabel}
                className="inline-flex h-10 w-[71px] items-center justify-center rounded-r-[10px] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none disabled:opacity-50"
            >
                <TrashIcon className="h-5 w-[18px]" />
            </button>
        </div>
    );
}
