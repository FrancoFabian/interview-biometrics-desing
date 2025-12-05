import * as React from "react";
import styles from "./Tabs.module.css";

export interface TabCounterBadgeProps {
    count: number;
}

export const TabCounterBadge: React.FC<TabCounterBadgeProps> = ({ count }) => {
    if (count <= 0) return null;

    return (
        <div className={styles.counterBadge}>
            +{count}
        </div>
    );
};
