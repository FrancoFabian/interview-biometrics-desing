// src/hooks/usePopoverPosition.ts
// Hook for managing popover positioning (shared between Navbar and ModernSelect)

import * as React from "react";

interface UsePopoverPositionOptions {
    /** Minimum width for the popover (defaults to trigger width) */
    minWidth?: number;
    /** Maximum width constraint */
    maxWidth?: number;
    /** Offset from trigger bottom in pixels */
    offsetY?: number;
}

interface UsePopoverPositionReturn {
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    popoverRef: React.RefObject<HTMLDivElement | null>;
    updatePosition: () => void;
}

export function usePopoverPosition(
    options: UsePopoverPositionOptions = {}
): UsePopoverPositionReturn {
    const { minWidth, maxWidth, offsetY = 5 } = options;

    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const popoverRef = React.useRef<HTMLDivElement>(null);

    const updatePosition = React.useCallback(() => {
        const popover = popoverRef.current;
        const trigger = triggerRef.current;
        if (!popover || !trigger) return;

        const rect = trigger.getBoundingClientRect();
        const vw = window.innerWidth;

        // Calculate width: prefer trigger width, respect min/max constraints
        let width = rect.width;
        if (minWidth && width < minWidth) width = minWidth;
        if (maxWidth && width > maxWidth) width = maxWidth;
        width = Math.min(width, vw - 20); // Never exceed viewport - 20px margin

        // Calculate left position, ensure it doesn't overflow
        let left = rect.left;
        const maxRight = vw - 10;
        if (left + width > maxRight) {
            left = Math.max(10, maxRight - width);
        }

        popover.style.top = `${rect.bottom + offsetY}px`;
        popover.style.left = `${left}px`;
        popover.style.width = `${width}px`;
        popover.style.maxWidth = `calc(100vw - 20px)`;
    }, [minWidth, maxWidth, offsetY]);

    // Setup popover toggle event listeners
    React.useEffect(() => {
        const popover = popoverRef.current;
        const trigger = triggerRef.current;
        if (!popover || !trigger) return;

        const handleToggle = (event: Event) => {
            const e = event as ToggleEvent;
            if (e.newState === "open") {
                updatePosition();
                window.addEventListener("resize", updatePosition);
                window.addEventListener("scroll", updatePosition, { capture: true });
            } else {
                window.removeEventListener("resize", updatePosition);
                window.removeEventListener("scroll", updatePosition, { capture: true });
            }
        };

        popover.addEventListener("toggle", handleToggle);
        return () => {
            popover.removeEventListener("toggle", handleToggle);
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, { capture: true });
        };
    }, [updatePosition]);

    return {
        triggerRef,
        popoverRef,
        updatePosition,
    };
}
