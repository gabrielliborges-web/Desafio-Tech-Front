import type { ReactNode } from "react";

interface InputProps {
    name?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    icon?: ReactNode;
    className?: string;
}

export default function Input({
    name,
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    disabled = false,
    required = false,
    icon,
    className = "",
}: InputProps) {
    const showError = required && !value?.trim();

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {label && (
                <label
                    htmlFor={name}
                    className={`text-sm font-medium transition-colors duration-200 ${showError
                        ? "text-red-500"
                        : "text-text-secondary-light dark:text-text-secondary-dark"
                        }`}
                >
                    {label}
                </label>
            )}

            <div className="relative w-full">
                <input
                    id={name}
                    name={name}
                    type={type}
                    {...(onChange
                        ? { value: value ?? "", onChange }
                        : { defaultValue: value ?? "" })}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`
            w-full h-[48px] rounded-sm px-4 pr-10 text-[16px]
            bg-mauve-light-1 dark:bg-mauve-dark-2
            border text-text-primary-light dark:text-text-primary-dark
            placeholder:text-mauve-light-10 dark:placeholder:text-mauve-dark-10
            focus:outline-none transition-colors duration-200
            ${showError
                            ? "border-red-500 focus:border-red-500"
                            : "border-mauve-light-6 dark:border-mauve-dark-5 focus:border-primary-light-9 dark:focus:border-primary-dark-7"
                        }
          `}
                />

                {icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                        {icon}
                    </div>
                )}
            </div>

            {showError && (
                <span className="text-[13px] text-red-500 mt-1">Preencha este campo</span>
            )}
        </div>
    );
}
