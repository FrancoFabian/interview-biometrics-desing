import React from "react";
import clsx from "clsx";
import styles from "./Toast.module.css";

type ToastProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    variant?: "default" | "destructive";
    children?: React.ReactNode;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.viewport, className)} {...props} />
    )
);
ToastViewport.displayName = "ToastViewport";

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
    ({ open = true, onOpenChange, variant = "default", className, children, ...props }, ref) => {
        if (!open) return null;

        return (
            <div
                ref={ref}
                role="status"
                aria-live="polite"
                className={clsx(styles.toast, variant === "destructive" && styles.destructive, className)}
                {...props}
            >
                <div className={styles.body}>{children}</div>
                <ToastClose onClick={() => onOpenChange?.(false)} />
            </div>
        );
    }
);
Toast.displayName = "Toast";

const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => (
        <button ref={ref} className={clsx(styles.action, className)} {...props}>
            {children}
        </button>
    )
);
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => (
        <button ref={ref} className={clsx(styles.close, className)} aria-label="Cerrar" {...props}>
            ×
        </button>
    )
);
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.title, className)} {...props} />
    )
);
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx(styles.description, className)} {...props} />
    )
);
ToastDescription.displayName = "ToastDescription";

export {
    type ToastProps,
    type ToastActionElement,
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
    ToastAction,
};
