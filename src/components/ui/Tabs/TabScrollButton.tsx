import * as React from "react";
import clsx from "clsx";
import styles from "./Tabs.module.css";

const ChevronLeftIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export interface TabScrollButtonProps {
    direction: "left" | "right";
    disabled: boolean;
    onClick: () => void;
    isMobile?: boolean;
    ariaLabel?: string;
}

export const TabScrollButton: React.FC<TabScrollButtonProps> = ({
    direction,
    disabled,
    onClick,
    isMobile = false,
    ariaLabel,
}) => {
    const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;
    const label = ariaLabel || (direction === "left" ? "Previous tab" : "Next tab");

    return (
        <button
            type="button"
            className={clsx(styles.scrollBtn, isMobile && "active:scale-95")}
            disabled={disabled}
            onClick={onClick}
            aria-hidden={disabled}
            style={{
                opacity: disabled ? 0.3 : 1,
                pointerEvents: disabled ? "none" : "auto",
                width: isMobile ? "48px" : undefined,
                height: isMobile ? "48px" : undefined,
            }}
            aria-label={label}
        >
            <Icon className="w-5 h-5" />
        </button>
    );
};
