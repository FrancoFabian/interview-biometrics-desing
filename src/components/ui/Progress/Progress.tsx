import { memo } from "react";
import styles from "./Progress.module.css";

interface ProgressProps {
    value?: number;
    max?: number;
    label?: string;
    showValueLabel?: boolean;
}

export const Progress = memo(function Progress({ value = 0, max = 100, label, showValueLabel = false }: ProgressProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div
            className={styles.root}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={label || "Progress Bar"}
        >
            {(label || showValueLabel) && (
                <div className={styles.header}>
                    {label && <span className={styles.label}>{label}</span>}
                    {showValueLabel && <span className={styles.label}>{`${Math.round(percentage)}%`}</span>}
                </div>
            )}

            <div className={styles.track}>
                <div className={styles.fill} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
});
