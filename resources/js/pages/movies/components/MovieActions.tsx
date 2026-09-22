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
            className={`flex h-10 w-36 items-center justify-center rounded-lg bg-[#24222f] ${className ?? ''}`}
        >
            <button
                type="button"
                onClick={onEdit}
                aria-label={editLabel}
                title={editLabel}
                className="inline-flex h-10 w-17.75 items-center justify-center rounded-l-lg transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:bg-white/15"
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
                className="inline-flex h-10 w-17.75 items-center justify-center rounded-r-lg transition-colors hover:bg-white/10 hover:text-brand-red focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:bg-white/15 disabled:opacity-50"
            >
                <TrashIcon className="h-5 w-4.5" />
            </button>
        </div>
    );
}
