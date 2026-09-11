import { ImageIcon } from 'lucide-react';
import QuoteFormField from './QuoteFormField';
import type { QuoteImageFieldProps } from './quoteImageFieldTypes';

export default function QuoteImageField({
    messages,
    error,
    isEdit,
    imageUrl,
    selectedFileName,
    onChange,
    onDragOver,
    onDrop,
}: QuoteImageFieldProps) {
    return (
        <QuoteFormField id="image" error={error}>
            <div className={isEdit && imageUrl !== null ? 'relative' : undefined}>
                {isEdit && imageUrl !== null && (
                    <img
                        src={imageUrl}
                        alt=""
                        className="h-[302px] w-full rounded object-cover lg:h-[513px]"
                    />
                )}
                <label
                    htmlFor="image"
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    data-invalid={Boolean(error)}
                    className={
                        isEdit && imageUrl !== null
                            ? 'absolute bottom-4 left-4 flex min-h-[60px] cursor-pointer items-center gap-3 rounded-[10px] bg-[#11101a]/80 px-4 py-3 outline-none focus-within:ring-2 focus-within:ring-white data-[invalid=true]:ring-2 data-[invalid=true]:ring-brand-red lg:min-h-[84px]'
                            : 'flex min-h-[82px] cursor-pointer items-center gap-3 rounded-[4px] border border-[#6c757d] px-4 py-4 outline-none focus-within:border-white data-[invalid=true]:border-brand-red lg:min-h-[84px]'
                    }
                >
                    <ImageIcon className="size-6 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 text-base lg:text-xl">
                        <span className="lg:hidden">
                            {isEdit ? messages.changePhoto : messages.uploadImage}
                        </span>
                        <span className="hidden lg:inline">
                            {isEdit ? messages.changePhoto : messages.dragImage}
                        </span>
                        {selectedFileName !== null && (
                            <span className="block max-w-48 truncate text-sm text-[#ced4da]">
                                {messages.selectedFile}: {selectedFileName}
                            </span>
                        )}
                    </span>
                    {!isEdit && (
                        <span className="ml-auto shrink-0 rounded bg-[#9747ff] px-3 py-2 text-sm lg:text-base">
                            {messages.chooseFile}
                        </span>
                    )}
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={onChange}
                        required={!isEdit}
                        className="sr-only"
                        aria-invalid={Boolean(error)}
                        aria-describedby={error ? 'image-error' : undefined}
                    />
                </label>
            </div>
        </QuoteFormField>
    );
}
