import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./Tabs.module.css";

// Subcomponents
import { TabScrollButton } from "./TabScrollButton";
import { TabCursor } from "./TabCursor";
import { TabItemButton } from "./TabItemButton";
import { TabCounterBadge } from "./TabCounterBadge";

// Hooks
import { useTabsOverflow } from "../../../hooks/useTabsOverflow";
import { useTabsCursor } from "../../../hooks/useTabsCursor";
import { useTabsNavigation } from "../../../hooks/useTabsNavigation";
import { useIsMobile } from "../../../hooks/use-mobile";

// =========================================
// Types (PUBLIC API - DO NOT CHANGE)
// =========================================

export type TabItem = {
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    to?: string;
    disabled?: boolean;
    className?: string;
    "aria-label"?: string;
};

export type TabsProps = {
    tabs: TabItem[];
    mode?: "route" | "section" | "query";
    value?: string;
    defaultValue?: string;
    onValueChange?: (key: string) => void;
    basePath?: string;
    queryParam?: string;
    theme?: "dark" | "light";
    variant?: "solid" | "bordered" | "light" | "underlined";
    color?: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
    className?: string;
    classNames?: {
        tabList?: string;
        cursor?: string;
        tab?: string;
    };
    showOverflowArrows?: boolean;
    showRightCounter?: boolean;
    ariaLabel?: string;
};

// =========================================
// Variant Mappings
// =========================================

const TRACK_VARIANT_MAP: Record<string, string> = {
    solid: styles.trackSolid,
    bordered: styles.trackBordered,
    light: styles.trackLight,
    underlined: styles.trackUnderlined,
};

const COLOR_MAP: Record<string, string> = {
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    success: "",
    warning: "",
    danger: "",
    default: "",
};

// =========================================
// Main Component
// =========================================

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    mode = "section",
    value,
    defaultValue,
    onValueChange,
    basePath,
    queryParam = "tab",
    theme = "light",
    variant = "solid",
    color = "primary",
    className,
    classNames,
    showOverflowArrows = true,
    showRightCounter = true,
    ariaLabel = "Module Tabs",
}) => {
    // Router hooks (safely optional)
    const navigate = useNavigate?.() as ReturnType<typeof useNavigate> | undefined;
    const location = useLocation?.() as ReturnType<typeof useLocation> | undefined;

    // Refs
    const listViewportRef = React.useRef<HTMLDivElement>(null);
    const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    // Mobile detection
    const isMobile = useIsMobile();

    // Navigation hook
    const {
        selectedKey,
        handleTabClick,
        currentIndex,
        handlePrevTab,
        handleNextTab,
    } = useTabsNavigation({
        tabs,
        mode,
        value,
        defaultValue,
        onValueChange,
        basePath,
        queryParam,
        navigate,
        location,
    });

    // Overflow hook
    const {
        canScrollLeft,
        canScrollRight,
        rightHiddenCount,
        scrollByStep,
        handleScroll,
    } = useTabsOverflow(listViewportRef, tabRefs, {
        tabs,
        showRightCounter,
    });

    // Cursor hook
    const { cursorStyle } = useTabsCursor(selectedKey, tabRefs, tabs);

    // Scroll selected tab into view
    React.useEffect(() => {
        const activeTab = tabRefs.current.get(selectedKey);
        const viewport = listViewportRef.current;
        if (activeTab && viewport) {
            const { offsetLeft, offsetWidth } = activeTab;
            const { scrollLeft, clientWidth } = viewport;
            const tabLeft = offsetLeft;
            const tabRight = offsetLeft + offsetWidth;

            if (tabLeft < scrollLeft) {
                viewport.scrollTo({ left: tabLeft, behavior: "smooth" });
            } else if (tabRight > scrollLeft + clientWidth) {
                viewport.scrollTo({ left: tabRight - clientWidth, behavior: "smooth" });
            }
        }
    }, [selectedKey]);

    // Variant classes
    const trackVariantClass = TRACK_VARIANT_MAP[variant] || styles.trackSolid;
    const colorClass = COLOR_MAP[color] || styles.colorPrimary;

    // Computed button states
    const leftDisabled = isMobile ? currentIndex <= 0 : !canScrollLeft;
    const rightDisabled = isMobile ? currentIndex >= tabs.length - 1 : !canScrollRight;

    return (
        <div className={clsx(styles.container, theme === "dark" && "dark", colorClass, className)}>
            {/* Left Scroll Button */}
            {showOverflowArrows && (
                <TabScrollButton
                    direction="left"
                    disabled={leftDisabled}
                    onClick={() => (isMobile ? handlePrevTab() : scrollByStep("left"))}
                    isMobile={isMobile}
                />
            )}

            {/* Viewport */}
            <div
                ref={listViewportRef}
                className={clsx(styles.viewport, classNames?.tabList)}
                onScroll={handleScroll}
            >
                <div
                    className={clsx(styles.track, trackVariantClass)}
                    role="tablist"
                    aria-label={ariaLabel}
                >
                    {/* Animated Cursor */}
                    <TabCursor
                        style={cursorStyle}
                        variant={variant}
                        className={classNames?.cursor}
                    />

                    {/* Tab Items */}
                    {tabs.map((tab) => (
                        <TabItemButton
                            key={tab.key}
                            ref={(el) => {
                                if (el) tabRefs.current.set(tab.key, el);
                                else tabRefs.current.delete(tab.key);
                            }}
                            tab={tab}
                            isSelected={tab.key === selectedKey}
                            onClick={() => handleTabClick(tab.key)}
                            className={classNames?.tab}
                        />
                    ))}
                </div>
            </div>

            {/* Right Scroll Button */}
            {showOverflowArrows && (
                <TabScrollButton
                    direction="right"
                    disabled={rightDisabled}
                    onClick={() => (isMobile ? handleNextTab() : scrollByStep("right"))}
                    isMobile={isMobile}
                />
            )}

            {/* Counter Badge */}
            {!isMobile && showRightCounter && (
                <TabCounterBadge count={rightHiddenCount} />
            )}
        </div>
    );
};
