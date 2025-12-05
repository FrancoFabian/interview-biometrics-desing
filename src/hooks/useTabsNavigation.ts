// src/hooks/useTabsNavigation.ts
// Hook for managing tab selection and route/query synchronization

import * as React from "react";
import type { TabItem } from "../components/ui/Tabs/Tabs";

// Utility function
const joinPath = (a?: string, b?: string) =>
    `${(a || "").replace(/\/+$/, "")}/${(b || "").replace(/^\/+/, "")}`.replace(/\/+/g, "/");

interface UseTabsNavigationOptions {
    tabs: TabItem[];
    mode: "route" | "section" | "query";
    value?: string;
    defaultValue?: string;
    onValueChange?: (key: string) => void;
    basePath?: string;
    queryParam: string;
    navigate?: (path: string) => void;
    location?: { pathname: string; search?: string };
}

interface UseTabsNavigationReturn {
    selectedKey: string;
    handleTabClick: (key: string) => void;
    currentIndex: number;
    handlePrevTab: () => void;
    handleNextTab: () => void;
}

export function useTabsNavigation(options: UseTabsNavigationOptions): UseTabsNavigationReturn {
    const {
        tabs,
        mode,
        value,
        defaultValue,
        onValueChange,
        basePath,
        queryParam,
        navigate,
        location,
    } = options;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
        defaultValue ?? tabs[0]?.key ?? ""
    );
    const selectedKey = (isControlled ? value : internalValue) || tabs[0]?.key || "";

    const currentIndex = React.useMemo(
        () => tabs.findIndex((t) => t.key === selectedKey),
        [tabs, selectedKey]
    );

    const handleTabClick = React.useCallback(
        (key: string) => {
            if (!isControlled) setInternalValue(key);
            onValueChange?.(key);

            // Route mode
            if (mode === "route" && navigate) {
                const target = tabs.find((t) => t.key === key)?.to ?? joinPath(basePath, key);
                if (target) navigate(target);
            }
            // Query mode
            else if (mode === "query" && navigate && location) {
                const params = new URLSearchParams(location.search || "");
                params.set(queryParam, key);
                const url = `${location.pathname}?${params.toString()}`;
                navigate(url);
            }
        },
        [isControlled, onValueChange, mode, navigate, tabs, basePath, queryParam, location]
    );

    const handlePrevTab = React.useCallback(() => {
        if (currentIndex > 0) handleTabClick(tabs[currentIndex - 1].key);
    }, [currentIndex, handleTabClick, tabs]);

    const handleNextTab = React.useCallback(() => {
        if (currentIndex < tabs.length - 1) handleTabClick(tabs[currentIndex + 1].key);
    }, [currentIndex, handleTabClick, tabs]);

    // Sync with external route/query
    React.useEffect(() => {
        if (!location) return;

        let targetKey = "";

        if (mode === "route") {
            const pathname = location.pathname.replace(/\/+$/, "");
            const found = tabs.find((t) => {
                const to = t.to ?? joinPath(basePath, t.key);
                return pathname.endsWith(to.replace(/\/+$/, ""));
            });
            targetKey = found?.key || "";
        } else if (mode === "query") {
            const params = new URLSearchParams(location.search || "");
            const q = params.get(queryParam);
            targetKey = tabs.find((t) => t.key === q)?.key || "";
        }

        if (targetKey && targetKey !== selectedKey && !isControlled) {
            setInternalValue(targetKey);
        }
    }, [mode, location, tabs, basePath, queryParam, isControlled, selectedKey]);

    // Scroll selected tab into view
    // Note: This effect is kept simple. The viewport scrolling is handled by the component.

    return {
        selectedKey,
        handleTabClick,
        currentIndex,
        handlePrevTab,
        handleNextTab,
    };
}
