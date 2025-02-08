interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Button = ({
    type = 'button',
    disabled = false,
    children,
    className = '',
    ...props
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}; 