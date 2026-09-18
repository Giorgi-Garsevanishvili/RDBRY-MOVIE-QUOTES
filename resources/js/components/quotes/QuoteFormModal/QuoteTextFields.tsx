import QuoteFormField from './QuoteFormField';
import type { QuoteTextFieldsProps } from './quoteTextFieldsTypes';

export default function QuoteTextFields({
    messages,
    textEn,
    textKa,
    textEnError,
    textKaError,
    autoFocus,
    onTextEnChange,
    onTextKaChange,
}: QuoteTextFieldsProps) {
    return (
        <>
            <QuoteFormField id="text_en" error={textEnError}>
                <div className="relative">
                    <label htmlFor="text_en" className="sr-only">
                        {messages.quoteEn}
                    </label>
                    <textarea
                        id="text_en"
                        name="text_en"
                        lang="en"
                        value={textEn}
                        onChange={onTextEnChange}
                        placeholder={messages.quoteEn}
                        required
                        autoFocus={autoFocus}
                        aria-invalid={Boolean(textEnError)}
                        aria-describedby={textEnError ? 'text_en-error' : undefined}
                        className="h-21.5 w-full resize-none rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 py-2 pr-16 text-base outline-none placeholder:text-[#6c757d] placeholder:italic focus:border-white aria-invalid:border-brand-red lg:text-xl"
                    />
                    <span className="pointer-events-none absolute top-2 right-4 text-base lg:text-xl">
                        {messages.english}
                    </span>
                </div>
            </QuoteFormField>

            <QuoteFormField id="text_ka" error={textKaError}>
                <div className="relative">
                    <label htmlFor="text_ka" className="sr-only">
                        {messages.quoteKa}
                    </label>
                    <textarea
                        id="text_ka"
                        name="text_ka"
                        lang="ka"
                        value={textKa}
                        onChange={onTextKaChange}
                        placeholder={messages.quoteKa}
                        required
                        aria-invalid={Boolean(textKaError)}
                        aria-describedby={textKaError ? 'text_ka-error' : undefined}
                        className="h-21.5 w-full resize-none rounded-[0.25rem] border border-[#6c757d] bg-transparent px-4 py-2 pr-16 text-base outline-none placeholder:text-[#6c757d] placeholder:italic focus:border-white aria-invalid:border-brand-red lg:text-xl"
                    />
                    <span className="pointer-events-none absolute top-2 right-4 text-base lg:text-xl">
                        {messages.georgian}
                    </span>
                </div>
            </QuoteFormField>
        </>
    );
}
