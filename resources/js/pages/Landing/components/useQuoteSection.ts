import { useEffect, useRef } from 'react';
import { getScrollParallaxOffset } from '@/helpers/getScrollParallaxOffset';

const MOBILE_MEDIA_QUERY = '(max-width: 40.625rem)';
const REDUCED_MOTION_MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

export function useQuoteSection(image: string, imagePosition: string) {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) {
            return;
        }

        const mobileQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
        const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY);
        let animationFrame: number | null = null;

        function updatePosition(): void {
            animationFrame = null;

            if (!section || !content) {
                return;
            }

            if (mobileQuery.matches || reducedMotionQuery.matches) {
                content.style.removeProperty('transform');

                return;
            }

            const sectionBounds = section.getBoundingClientRect();
            const translateY = getScrollParallaxOffset(
                sectionBounds.bottom,
                sectionBounds.height,
                window.innerHeight,
            );
            const rootFontSize = Number.parseFloat(
                window.getComputedStyle(document.documentElement).fontSize,
            );
            const translateYRem = translateY / rootFontSize;

            content.style.transform = `translate3d(0, ${translateYRem}rem, 0)`;
        }

        function scheduleUpdate(): void {
            if (animationFrame !== null) {
                return;
            }

            animationFrame = window.requestAnimationFrame(updatePosition);
        }

        scheduleUpdate();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        mobileQuery.addEventListener('change', scheduleUpdate);
        reducedMotionQuery.addEventListener('change', scheduleUpdate);

        return () => {
            if (animationFrame !== null) {
                window.cancelAnimationFrame(animationFrame);
            }

            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            mobileQuery.removeEventListener('change', scheduleUpdate);
            reducedMotionQuery.removeEventListener('change', scheduleUpdate);
        };
    }, []);

    return {
        sectionRef,
        contentRef,
        backdropStyle: {
            backgroundImage: `url(${image})`,
            backgroundPosition: imagePosition,
        },
    };
}
