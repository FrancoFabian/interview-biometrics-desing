import React, {
    useMemo,
    useState,
    useId,
    useEffect,
    useRef,
} from "react";
import styles from "./ModernSelect.module.css";

type Selection = Set<string>;
export type SelectWidth = "sm" | "md" | "lg" | "xl" | "2xl";

export interface SelectItemProps {
    keyId: string;
    label: string;
}

export interface ModernSelectProps {
    items: SelectItemProps[];
    multiple?: boolean;
    width?: SelectWidth;
    name?: string;
    id?: string;
    placeholder?: string;
    defaultSelectedKeys?: string[];
    onSelectionChange?: (selectedKeys: string[]) => void;
}

const WIDTH_MAP: Record<SelectWidth, string> = {
    sm: "120px",
    md: "200px",
    lg: "260px",
    xl: "320px",
    "2xl": "400px",
};

export function ModernSelect({
    items,
    multiple = false,
    width = "md",
    name,
    id,
    placeholder = "Select an option",
    defaultSelectedKeys = [],
    onSelectionChange,
}: ModernSelectProps) {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(
        () => new Set(defaultSelectedKeys)
    );
    const [animatingKey, setAnimatingKey] = useState<string | null>(null);

    // 🔁 sincronizar cuando cambie defaultSelectedKeys
    useEffect(() => {
        if (defaultSelectedKeys.length !== selectedKeys.size ||
            defaultSelectedKeys.some(k => !selectedKeys.has(k))) {
            // defer state update to next tick to avoid cascading renders
            queueMicrotask(() => setSelectedKeys(new Set(defaultSelectedKeys)));
        }
    }, [defaultSelectedKeys, selectedKeys]);

    const reactId = useId();

    const baseId = id ?? `select-${reactId}`;
    const triggerId = baseId;
    const popoverId = `${baseId}-popover`;

    const triggerRef = useRef<HTMLButtonElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const popover = popoverRef.current;
        const trigger = triggerRef.current;
        if (!popover || !trigger) return;

        const updatePosition = () => {
            const rect = trigger.getBoundingClientRect();
            popover.style.top = `${rect.bottom + 5}px`;
            popover.style.left = `${rect.left}px`;
            popover.style.width = `${rect.width}px`;
        };

        const handleToggle = (event: Event) => {
            const e = event as ToggleEvent;
            if (e.newState === "open") {
                updatePosition();
                window.addEventListener("resize", updatePosition);
                window.addEventListener("scroll", updatePosition, { capture: true });
            } else {
                setAnimatingKey(null); // Reset animation state on close
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
    }, []);

    const selectedValue = useMemo(() => {
        if (selectedKeys.size === 0) return placeholder;

        return Array.from(selectedKeys)
            .map((key) => items.find((item) => item.keyId === key)?.label)
            .filter(Boolean)
            .join(", ");
    }, [selectedKeys, items, placeholder]);

    const handleSelect = (key: string) => {
        if (multiple) {
            const next = new Set(selectedKeys);

            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
                setAnimatingKey(key); // Trigger animation for new selection
            }

            if (next.size > 0) {
                setSelectedKeys(next);
                onSelectionChange?.(Array.from(next));
            }
        } else {
            const next = new Set([key]);
            // Only animate if it wasn't already selected
            if (!selectedKeys.has(key)) {
                setAnimatingKey(key);
            }
            setSelectedKeys(next);
            onSelectionChange?.(Array.from(next));

            // 👀 NO cerramos el popover aquí
        }
    };

    const isSelected = (key: string) => selectedKeys.has(key);

    return (
        <div
            className={styles.wrapper}
            style={
                {
                    "--trigger-width": WIDTH_MAP[width],
                } as React.CSSProperties
            }
        >
            <button
                ref={triggerRef}
                id={triggerId}
                type="button"
                className={styles.trigger}
                aria-haspopup="listbox"
                aria-controls={popoverId}

                popoverTarget={popoverId}
            >
                <span className={styles.valueText}>
                    {selectedValue}
                </span>

                <svg
                    className={styles.chevron}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            <div
                ref={popoverRef}
                id={popoverId}
                className={styles.menu}

                popover="auto"
                role="listbox"
                aria-multiselectable={multiple || undefined}
            >
                <ul className={styles.list}>
                    {items.map((item) => {
                        const selected = isSelected(item.keyId);

                        return (
                            <li
                                key={item.keyId}
                                className={styles.item}
                                data-selected={selected}
                                onClick={() => handleSelect(item.keyId)}
                                role="option"
                                aria-selected={selected}
                            >
                                <span className={styles.label}>
                                    {item.label}
                                </span>

                                {selected && (
                                    <svg
                                        className={`${styles.checkIcon} ${item.keyId === animatingKey ? styles.animateIn : ""}`}
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="4 12 9 17 20 6" />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {name &&
                Array.from(selectedKeys).map((key) => (
                    <input key={key} type="hidden" name={name} value={key} />
                ))}
        </div>
    );
}
