// src/hooks/useTabsCursor.ts
// Hook for managing the animated cursor position in tabs

import * as React from "react";

interface CursorStyle {
    width: number;
    transform: string;
    opacity: number;
}

interface UseTabsCursorReturn {
    cursorStyle: CursorStyle;
    updateCursor: () => void;
}

export function useTabsCursor(
    selectedKey: string,
    tabRefs: React.MutableRefObject<Map<string, HTMLButtonElement>>,
    tabs: { key: string }[]
): UseTabsCursorReturn {
    const [cursorStyle, setCursorStyle] = React.useState<CursorStyle>({
        width: 0,
        transform: "translateX(0)",
        opacity: 0,
    });

    const updateCursor = React.useCallback(() => {
        if (!tabRefs.current) return;
        const activeTab = tabRefs.current.get(selectedKey);
        if (activeTab) {
            const { offsetLeft, offsetWidth } = activeTab;
            setCursorStyle({
                width: offsetWidth,
                transform: `translateX(${offsetLeft}px)`,
                opacity: 1,
            });
        } else {
            setCursorStyle((prev) => ({ ...prev, opacity: 0 }));
        }
    }, [selectedKey, tabRefs]);

    // Update cursor when selection or tabs change
    React.useLayoutEffect(() => {
        updateCursor();
        // Small timeout to ensure layout has settled
        const t = setTimeout(updateCursor, 50);
        return () => clearTimeout(t);
    }, [updateCursor, tabs]);

    return { cursorStyle, updateCursor };
}
