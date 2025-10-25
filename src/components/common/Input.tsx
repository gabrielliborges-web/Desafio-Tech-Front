import { useState } from "react";

interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
}

export default function Input({
    label,
    placeholder,
    value,
    onChange,
    type = "text",
    disabled = false,
    required = false,
    className = "",
}: InputProps) {
    const [touched, setTouched] = useState(false);

    const showError = required && touched && !value;

    return (
        <div className={`flex flex-col gap-1 w-full ${className}`}>
            {label && (
                <label
                    className={`text-sm font-medium transition-colors duration-200 ${showError
                        ? "text-red-500"
                        : "text-text-secondary-light dark:text-text-secondary-dark"
                        }`}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={() => setTouched(true)}
                disabled={disabled}
                placeholder={placeholder}
                className={`
          w-full rounded-sm px-4 py-2 text-[16px]
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

            {showError && (
                <span className="text-[13px] text-red-500 mt-1">Preencha este campo</span>
            )}
        </div>
    );
}
