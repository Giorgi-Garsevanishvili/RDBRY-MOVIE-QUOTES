import { BRAND_BUTTON_INTERACTION_CLASSES } from '@/components/ui/brandStyles';

export const AUTH_INPUT_CLASSES =
    'h-12 rounded border-[#ced4da] bg-white px-3 pr-10 text-base text-[#212529] shadow-none transition-[border-color,box-shadow] placeholder:text-[#6c757d] focus-visible:border-[#86b7fe] focus-visible:ring-[0.2rem] focus-visible:ring-[#0d6efd]/25 disabled:cursor-not-allowed disabled:bg-[#e9ecef] disabled:text-[#6c757d] disabled:opacity-100 aria-invalid:border-brand-red aria-invalid:ring-[0.2rem] aria-invalid:ring-brand-red/25';

export const AUTH_PASSWORD_INPUT_CLASSES = `${AUTH_INPUT_CLASSES} pr-16`;

export const AUTH_PRIMARY_BUTTON_CLASSES = `h-12 rounded text-base font-normal text-white shadow-none focus-visible:ring-white/70 ${BRAND_BUTTON_INTERACTION_CLASSES}`;

export const AUTH_TEXT_LINK_CLASSES =
    'text-[#6ea8fe] underline-offset-4 hover:text-[#9ec5fe] hover:underline';
