import React from "react";
import clsx from "clsx";

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
        <div ref={ref} className={clsx("toast-viewport", className)} {...props} />
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
                className={clsx("toast", variant === "destructive" && "toast-destructive", className)}
                {...props}
            >
                <div className="toast-body">{children}</div>
                <ToastClose onClick={() => onOpenChange?.(false)} />
            </div>
        );
    }
);
Toast.displayName = "Toast";

const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => (
        <button ref={ref} className={clsx("toast-action", className)} {...props}>
            {children}
        </button>
    )
);
ToastAction.displayName = "ToastAction";

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, ...props }, ref) => (
        <button ref={ref} className={clsx("toast-close", className)} aria-label="Cerrar" {...props}>
            ×
        </button>
    )
);
ToastClose.displayName = "ToastClose";

const ToastTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx("toast-title", className)} {...props} />
    )
);
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx("toast-description", className)} {...props} />
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
