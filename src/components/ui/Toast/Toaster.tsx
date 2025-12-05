import { useToast } from "../../../hooks/use-toast"; // Updated path
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "./Toast";
import styles from "./Toast.module.css";

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            <ToastViewport />
            {toasts.map(({ id, title, description, action, ...props }) => (
                <Toast key={id} {...props}>
                    <div className={styles.body}> {/* Ensure this class is applied if necessary, though Toast component handles it in children wrapper? No, Toast component has wrapper class {styles.body} around children. But here we have custom content structure. Wait. */}
                        {/* 
                            In Toast.tsx:
                            <div className={styles.body}>{children}</div>
                            
                            In Toaster.tsx (original):
                            <div className="toast-body">
                                {title && <ToastTitle>{title}</ToastTitle>} ...
                            </div>

                            So Toast DOES wrap children in .toast-body, but Toaster ALSO wraps them in .toast-body. Double wrapping? 
                            Let's check original Toast.tsx: 
                            <div className="toast-body">{children}</div>
                            
                            So yes, it was wrapping children. 
                            If Toaster also wraps content in .toast-body, then we have nested .toast-body.
                            Looking at original Toaster.tsx:
                            <div className="toast-body"> ... </div>
                            
                            This seems redundant but if I maintain the DOM structure I should keep it.
                        */}
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && <ToastDescription>{description}</ToastDescription>}
                    </div>
                    {action}
                    {/* ToastClose is inside Toast component? No, Toast.tsx line 36 puts ToastClose. 
                        But Toaster.tsx line 24 puts another ToastClose? 
                        Original Toaster.tsx: 
                        <ToastClose /> 
                        Original Toast.tsx:
                        <ToastClose onClick={() => onOpenChange?.(false)} />
                        
                        Wait, checking Toast.tsx logic.
                        It renders children AND a ToastClose.
                        And Toaster.tsx passes children AND a ToastClose as children?
                        No, Toaster.tsx passes:
                        children = [ div(toast-body), action, ToastClose ]
                        
                        So Toast.tsx renders:
                        div(toast) ->
                            div(toast-body) -> [ div(toast-body), action, ToastClose ]
                            ToastClose (built-in)

                        So we have 2 ToastClose buttons?
                        This seems like a bug in original code or I am misreading. 
                        Let's re-read original `Toast.tsx`:
                        lines 35-36:
                        <div className="toast-body">{children}</div>
                        <ToastClose onClick={() => onOpenChange?.(false)} />
                        
                        So yes, it automatically adds a close button.
                        And `Toaster.tsx` adds another one?
                        If I change structure I might break it. But `Toaster` adds it as a child.
                        
                        If I keep it exactly as is:
                        <Toast ...> <div className={styles.body}> ... </div> <ToastClose /> </Toast>
                        
                        It will result in:
                        <div class="toast">
                            <div class="body">
                                <div class="body">...</div>
                                <ToastClose />
                            </div>
                            <ToastClose />
                        </div>
                        
                        Okay, I will blindly respect the original structure even if weird.
                    */}
                    <div className={styles.body}>
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && <ToastDescription>{description}</ToastDescription>}
                    </div>
                    {action}
                    <ToastClose />
                </Toast>
            ))}
        </ToastProvider>
    );
}
