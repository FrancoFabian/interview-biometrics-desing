import * as React from "react";
import clsx from "clsx";
import styles from "./Tabs.module.css";
import type { TabItem } from "./Tabs";

export interface TabItemButtonProps {
    tab: TabItem;
    isSelected: boolean;
    onClick: () => void;
    className?: string;
}

export const TabItemButton = React.forwardRef<HTMLButtonElement, TabItemButtonProps>(
    ({ tab, isSelected, onClick, className }, ref) => {
        return (
            <button
                ref={ref}
                role="tab"
                aria-selected={isSelected}
                aria-disabled={tab.disabled}
                disabled={tab.disabled}
                onClick={onClick}
                className={clsx(
                    styles.item,
                    tab.className,
                    className,
                    isSelected && styles.selected
                )}
                tabIndex={isSelected ? 0 : -1}
            >
                {tab.icon && <span className="tab-icon flex items-center">{tab.icon}</span>}
                <span>{tab.label}</span>
            </button>
        );
    }
);

TabItemButton.displayName = "TabItemButton";
