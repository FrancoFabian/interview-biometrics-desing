import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "success";
    size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={clsx(
                    styles.btn,
                    styles[variant],
                    styles[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";
