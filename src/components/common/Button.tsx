interface ButtonProps {
    variant?: "primary" | "secondary" | "icon";
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export default function Button({
    variant = "primary",
    children,
    onClick,
    disabled = false,
    className = "",
}: ButtonProps) {
    const base =
        "font-montserrat rounded-sm transition-colors duration-200 flex items-center justify-center text-[16px] px-5 py-3 disabled:cursor-not-allowed disabled:opacity-70";

    const variants = {
        primary: `
      bg-primary-light-9 hover:bg-primary-light-10 active:bg-primary-light-8 text-white
      dark:bg-primary-dark-7 dark:hover:bg-primary-dark-8 dark:active:bg-primary-dark-6 dark:text-white
      disabled:bg-mauve-light-7 dark:disabled:bg-mauve-dark-9
    `,
        secondary: `
      bg-mauve-light-9 hover:bg-mauve-light-10 active:bg-mauve-light-8 text-text-primary-light
      dark:bg-mauve-dark-2 dark:hover:bg-mauve-dark-3 dark:active:bg-mauve-dark-4 dark:text-white
      disabled:bg-mauve-light-6 dark:disabled:bg-mauve-dark-5
    `,
        icon: `
      bg-mauve-light-10 hover:bg-mauve-light-11 active:bg-mauve-light-12 text-white
      dark:bg-mauve-dark-2 dark:hover:bg-mauve-dark-3 dark:active:bg-mauve-dark-4 dark:text-white
      dark:disabled:bg-mauve-dark-6 disabled:bg-mauve-light-8
      w-[44px] h-[44px] flex items-center justify-center
    `,
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
}
