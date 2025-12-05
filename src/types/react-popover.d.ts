import 'react';

declare module 'react' {
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    popoverTarget?: string;
    popoverTargetAction?: 'hide' | 'show' | 'toggle';
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    popover?: "auto" | "manual" | boolean;
  }
}