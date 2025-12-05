// src/hooks/useTabsOverflow.ts
// Hook for managing tabs overflow (scroll detection, hidden count)

import * as React from "react";
import type { TabItem } from "../components/ui/Tabs/Tabs";

interface UseTabsOverflowOptions {
    tabs: TabItem[];
    showRightCounter?: boolean;
}

interface UseTabsOverflowReturn {
    canScrollLeft: boolean;
    canScrollRight: boolean;
    rightHiddenCount: number;
    scrollByStep: (dir: "left" | "right") => void;
    handleScroll: () => void;
    checkOverflow: () => void;
}

export function useTabsOverflow(
    viewportRef: React.RefObject<HTMLDivElement | null>,
    tabRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>,
    options: UseTabsOverflowOptions
): UseTabsOverflowReturn {
    const { tabs, showRightCounter = true } = options;

    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);
    const [rightHiddenCount, setRightHiddenCount] = React.useState(0);

    const checkOverflow = React.useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const { scrollLeft, clientWidth, scrollWidth } = viewport;
        setCanScrollLeft(scrollLeft > 0);
        // Tolerance for rounding
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);

        // Calculate hidden tabs on the right
        if (showRightCounter && tabRefs.current) {
            const viewportRight = scrollLeft + clientWidth;
            let hidden = 0;
            for (const t of tabs) {
                const btn = tabRefs.current.get(t.key);
                if (btn) {
                    const btnRight = btn.offsetLeft + btn.offsetWidth;
                    if (btnRight > viewportRight + 5) hidden++;
                }
            }
            setRightHiddenCount(hidden);
        }
    }, [tabs, showRightCounter, viewportRef, tabRefs]);

    const scrollByStep = React.useCallback((dir: "left" | "right") => {
        const viewport = viewportRef.current;
        if (!viewport) return;
        const step = Math.max(150, viewport.clientWidth / 2);
        viewport.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
    }, [viewportRef]);

    const handleScroll = React.useCallback(() => {
        checkOverflow();
    }, [checkOverflow]);

    // ResizeObserver for viewport
    React.useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const ro = new ResizeObserver(checkOverflow);
        ro.observe(viewport);
        checkOverflow();

        return () => ro.disconnect();
    }, [checkOverflow, viewportRef]);

    return {
        canScrollLeft,
        canScrollRight,
        rightHiddenCount,
        scrollByStep,
        handleScroll,
        checkOverflow,
    };
}
