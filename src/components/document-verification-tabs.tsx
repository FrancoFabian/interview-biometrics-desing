import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./tabs.css";

// =========================================
// Tipos
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

export type DocumentVerificationTabsProps = {
    tabs: TabItem[];
    mode?: "route" | "section" | "query";
    value?: string;
    defaultValue?: string;
    onValueChange?: (key: string) => void;
    basePath?: string;
    /** Sólo para modo "query": nombre del parámetro (?tab=key) */
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

    /** Overflow UI */
    showOverflowArrows?: boolean; // flechas < >
    showRightCounter?: boolean;   // badge +N

    ariaLabel?: string;
};

// =========================================
// Iconos (SVG Puro)
// =========================================

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

// =========================================
// Utilitarios
// =========================================

const joinPath = (a?: string, b?: string) =>
    `${(a || "").replace(/\/+$/, "")}/${(b || "").replace(/^\/+/, "")}`.replace(/\/+/g, "/");

// =========================================
// Componente Principal
// =========================================

export const DocumentVerificationTabs: React.FC<DocumentVerificationTabsProps> = ({
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
    const navigate = useNavigate?.() as ReturnType<typeof useNavigate> | undefined;
    const location = useLocation?.() as ReturnType<typeof useLocation> | undefined;

    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
        defaultValue ?? tabs[0]?.key ?? ""
    );
    const selectedKey = (isControlled ? value : internalValue) || tabs[0]?.key || "";

    // Refs
    const listViewportRef = React.useRef<HTMLDivElement>(null);
    const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

    // Estado para UI
    const [isMobile, setIsMobile] = React.useState(false);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(false);
    const [rightHiddenCount, setRightHiddenCount] = React.useState(0);

    // Estado para el Cursor Animado
    const [cursorStyle, setCursorStyle] = React.useState<{ width: number; transform: string; opacity: number }>({
        width: 0,
        transform: "translateX(0)",
        opacity: 0
    });

    // Detectar Móvil
    React.useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const handleChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
        // Set initial
        setIsMobile(mq.matches);
        
        // Listener
        mq.addEventListener("change", handleChange);
        return () => mq.removeEventListener("change", handleChange);
    }, []);

    const currentIndex = React.useMemo(() => tabs.findIndex(t => t.key === selectedKey), [tabs, selectedKey]);

    const handlePrevTab = () => {
        if (currentIndex > 0) handleTabClick(tabs[currentIndex - 1].key);
    };

    const handleNextTab = () => {
        if (currentIndex < tabs.length - 1) handleTabClick(tabs[currentIndex + 1].key);
    };

    // --- Lógica de Scroll y Overflow ---

    const checkOverflow = React.useCallback(() => {
        const viewport = listViewportRef.current;
        if (!viewport) return;

        const { scrollLeft, clientWidth, scrollWidth } = viewport;
        setCanScrollLeft(scrollLeft > 0);
        // Tolerancia pequeña (1px) para evitar falsos positivos por redondeo
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);

        // Calcular ocultos a la derecha
        if (showRightCounter) {
            const viewportRight = scrollLeft + clientWidth;
            let hidden = 0;
            for (const t of tabs) {
                const btn = tabRefs.current.get(t.key);
                if (btn) {
                    const btnRight = btn.offsetLeft + btn.offsetWidth;
                    // Si el botón termina después del viewport (con pequeña tolerancia)
                    if (btnRight > viewportRight + 5) hidden++;
                }
            }
            setRightHiddenCount(hidden);
        }
    }, [tabs, showRightCounter]);

    const scrollByStep = (dir: "left" | "right") => {
        const viewport = listViewportRef.current;
        if (!viewport) return;
        const step = Math.max(150, viewport.clientWidth / 2);
        viewport.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
    };

    // Observer para redimensionamiento
    React.useEffect(() => {
        const viewport = listViewportRef.current;
        if (!viewport) return;

        const ro = new ResizeObserver(checkOverflow);
        ro.observe(viewport);

        // Check inicial
        checkOverflow();

        return () => ro.disconnect();
    }, [checkOverflow]);

    // On scroll event
    const handleScroll = React.useCallback(() => {
        checkOverflow();
    }, [checkOverflow]);

    // --- Lógica de Selección y Cursor ---

    const updateCursor = React.useCallback(() => {
        const activeTab = tabRefs.current.get(selectedKey);
        if (activeTab) {
            const { offsetLeft, offsetWidth } = activeTab;
            setCursorStyle({
                width: offsetWidth,
                transform: `translateX(${offsetLeft}px)`,
                opacity: 1
            });
        } else {
            setCursorStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [selectedKey]);

    // Actualizar cursor cuando cambia la selección o las tabs
    React.useLayoutEffect(() => {
        updateCursor();
        // Pequeño timeout para asegurar que el layout se asentó si hubo cambios de fuente/carga
        const t = setTimeout(updateCursor, 50);
        return () => clearTimeout(t);
    }, [updateCursor, tabs]);

    // Scroll into view del activo
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


    // --- Manejo de Eventos ---

    const handleTabClick = (key: string) => {
        if (!isControlled) setInternalValue(key);
        onValueChange?.(key);

        // Lógica de rutas
        if (mode === "route" && navigate) {
            const target = tabs.find(t => t.key === key)?.to ?? joinPath(basePath, key);
            if (target) navigate(target);
        } else if (mode === "query" && navigate && location) {
            const params = new URLSearchParams(location.search || "");
            params.set(queryParam, key);
            const url = `${location.pathname}?${params.toString()}`;
            navigate(url);
        }
    };

    // Sincronización con Ruta/Query externa
    React.useEffect(() => {
        if (!location) return;

        let targetKey = "";

        if (mode === "route") {
            const pathname = location.pathname.replace(/\/+$/, "");
            const found = tabs.find(t => {
                const to = t.to ?? joinPath(basePath, t.key);
                return pathname.endsWith(to.replace(/\/+$/, ""));
            });
            targetKey = found?.key || "";
        } else if (mode === "query") {
            const params = new URLSearchParams(location.search || "");
            const q = params.get(queryParam);
            targetKey = tabs.find(t => t.key === q)?.key || "";
        }

        if (targetKey && targetKey !== selectedKey && !isControlled) {
            setInternalValue(targetKey);
        }
    }, [mode, location, tabs, basePath, queryParam, isControlled, selectedKey]);


    // =========================================
    // Render
    // =========================================

    const trackVariantClass = {
        solid: "tabs-track-solid",
        bordered: "tabs-track-bordered",
        light: "tabs-track-light",
        underlined: "tabs-track-underlined"
    }[variant] || "tabs-track-solid";

    const cursorVariantClass = {
        solid: "tabs-cursor-solid",
        bordered: "tabs-cursor-bordered",
        light: "tabs-cursor-light",
        underlined: "tabs-cursor-underlined"
    }[variant] || "tabs-cursor-solid";

    const colorClass = `tabs-color-${color}`;

    return (
        <div className={`tabs-container ${theme === 'dark' ? 'dark' : ''} ${colorClass} ${className || ''}`}>

            {/* Botón Izquierdo */}
            {showOverflowArrows && (
                <button
                    type="button"
                    className={`tabs-scroll-btn ${isMobile ? "active:scale-95" : ""}`}
                    disabled={isMobile ? currentIndex <= 0 : !canScrollLeft}
                    onClick={() => isMobile ? handlePrevTab() : scrollByStep("left")}
                    aria-hidden={isMobile ? currentIndex <= 0 : !canScrollLeft}
                    style={{ 
                        opacity: (isMobile ? currentIndex > 0 : canScrollLeft) ? 1 : 0.3, 
                        pointerEvents: (isMobile ? currentIndex > 0 : canScrollLeft) ? 'auto' : 'none',
                        width: isMobile ? '48px' : undefined,
                        height: isMobile ? '48px' : undefined
                    }}
                    aria-label="Previous tab"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
            )}

            {/* Viewport */}
            <div
                ref={listViewportRef}
                className={`tabs-list-viewport ${classNames?.tabList || ''}`}
                onScroll={handleScroll}
            >
                <div
                    className={`tabs-list-track ${trackVariantClass}`}
                    role="tablist"
                    aria-label={ariaLabel}
                >
                    {/* Cursor Animado */}
                    <div
                        className={`tab-cursor ${cursorVariantClass} ${classNames?.cursor || ''}`}
                        style={cursorStyle}
                    />

                    {/* Tabs */}
                    {tabs.map((tab) => {
                        const isSelected = tab.key === selectedKey;
                        return (
                            <button
                                key={tab.key}
                                ref={(el) => {
                                    if (el) tabRefs.current.set(tab.key, el);
                                    else tabRefs.current.delete(tab.key);
                                }}
                                role="tab"
                                aria-selected={isSelected}
                                aria-disabled={tab.disabled}
                                disabled={tab.disabled}
                                onClick={() => handleTabClick(tab.key)}
                                className={`tab-item ${tab.className || ''} ${classNames?.tab || ''}`}
                                data-selected={isSelected}
                                tabIndex={isSelected ? 0 : -1}
                            >
                                {tab.icon && <span className="tab-icon flex items-center">{tab.icon}</span>}
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Botón Derecho */}
            {showOverflowArrows && (
                <button
                    type="button"
                    className={`tabs-scroll-btn ${isMobile ? "active:scale-95" : ""}`}
                    disabled={isMobile ? currentIndex >= tabs.length - 1 : !canScrollRight}
                    onClick={() => isMobile ? handleNextTab() : scrollByStep("right")}
                    aria-hidden={isMobile ? currentIndex >= tabs.length - 1 : !canScrollRight}
                    style={{ 
                        opacity: (isMobile ? currentIndex < tabs.length - 1 : canScrollRight) ? 1 : 0.3, 
                        pointerEvents: (isMobile ? currentIndex < tabs.length - 1 : canScrollRight) ? 'auto' : 'none',
                        width: isMobile ? '48px' : undefined,
                        height: isMobile ? '48px' : undefined
                    }}
                    aria-label="Next tab"
                >
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            )}

            {/* Contador */}
            {!isMobile && showRightCounter && rightHiddenCount > 0 && (
                <div className="tabs-counter-badge">
                    +{rightHiddenCount}
                </div>
            )}
        </div>
    );
};
