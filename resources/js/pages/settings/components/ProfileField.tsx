import type { ProfileFieldProps } from './profileFieldTypes';

export default function ProfileField({
    label,
    value,
    editLabel,
    pendingLabel,
    pendingValue,
    onEdit,
}: ProfileFieldProps) {
    return (
        <div className="border-b border-[#6c757d] pb-4 lg:border-0 lg:pb-0">
            <p className="h-6 text-base leading-6 lg:h-8 lg:text-xl lg:leading-[30px]">{label}</p>
            <div className="flex min-h-[31px] items-center gap-4 lg:min-h-12">
                <p className="min-w-0 flex-1 truncate text-lg leading-[27px] lg:h-12 lg:rounded-[5px] lg:bg-[#ced4da] lg:px-[17px] lg:py-[9px] lg:text-xl lg:leading-[30px] lg:text-[#212529]">
                    {value}
                </p>
                {onEdit !== undefined && (
                    <button
                        type="button"
                        onClick={onEdit}
                        className="shrink-0 rounded px-2 py-1 text-base leading-6 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none lg:h-12 lg:px-[17px] lg:text-xl lg:leading-[30px]"
                    >
                        {editLabel}
                    </button>
                )}
                {onEdit === undefined && (
                    <span aria-hidden="true" className="hidden h-12 w-[69px] lg:block" />
                )}
            </div>
            {pendingValue !== null && pendingValue !== undefined && (
                <p className="mt-2 text-sm leading-5 break-all text-brand-gold">
                    {pendingLabel} {pendingValue}
                </p>
            )}
        </div>
    );
}
