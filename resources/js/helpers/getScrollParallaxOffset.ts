const CONTENT_SPEED = 1.2;

export function getScrollParallaxOffset(
    sectionBottom: number,
    sectionHeight: number,
    viewportHeight: number,
): number {
    const exitOffset = sectionBottom - viewportHeight;
    const isExiting = exitOffset < 0 && Math.abs(exitOffset) <= sectionHeight;

    return isExiting ? exitOffset * CONTENT_SPEED : 0;
}
