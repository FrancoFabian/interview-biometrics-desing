import * as React from "react";
import clsx from "clsx";
import styles from "./Tabs.module.css";

export interface TabCursorProps {
    style: React.CSSProperties;
    variant: "solid" | "bordered" | "light" | "underlined";
    className?: string;
}

const CURSOR_VARIANT_MAP: Record<TabCursorProps["variant"], string> = {
    solid: styles.cursorSolid,
    bordered: styles.cursorBordered,
    light: styles.cursorLight,
    underlined: styles.cursorUnderlined,
};

export const TabCursor: React.FC<TabCursorProps> = ({ style, variant, className }) => {
    const variantClass = CURSOR_VARIANT_MAP[variant] || styles.cursorSolid;

    return (
        <div
            className={clsx(styles.cursor, variantClass, className)}
            style={style}
        />
    );
};
