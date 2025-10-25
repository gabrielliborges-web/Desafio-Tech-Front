import type { ReactNode } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
    title?: string;
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
}

export default function Modal({
    title,
    open,
    onClose,
    children,
    footer,
    className = "",
}: ModalProps) {
    return (
        <div
            data-open={open}
            className={clsx(
                "fixed inset-0 z-50 flex items-center justify-center",
                "transition-all duration-500 ease-in-out",
                "bg-black/0 opacity-0 pointer-events-none",
                "data-[open=true]:bg-black/60 data-[open=true]:opacity-100 data-[open=true]:pointer-events-auto"
            )}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                data-open={open}
                className={clsx(
                    "w-[95%] max-w-lg rounded-md shadow-lg overflow-hidden",
                    "bg-mauve-dark-1 dark:bg-mauve-dark-2",
                    "transform transition-all duration-500 ease-in-out",
                    "scale-95 opacity-0 translate-y-3",
                    "data-[open=true]:scale-100 data-[open=true]:opacity-100 data-[open=true]:translate-y-0",
                    className
                )}
            >
                <div className="flex items-center justify-between border-b border-border-subtle/20 px-5 py-4">
                    <h2 className="text-lg font-semibold text-text-primary-dark">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-text-secondary-dark hover:text-text-primary-dark transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-5 py-4 text-text-secondary-dark">{children}</div>

                {footer && (
                    <div className="flex justify-end gap-3 px-5 py-4 border-t border-border-subtle/20">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
