interface LogoProps {
    className?: string
    showText?: boolean
    color?: "dark" | "light"
}

export const Logo = ({ className = '', showText = true, color = 'light' }: LogoProps) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                className="h-8 w-8 text-primary-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                />
                <path
                    d="M2 17L12 22L22 17"
                />
                <path
                    d="M2 12L12 17L22 12"
                />
            </svg>

            {showText && (
                <span className={`ml-2 text-xl font-bold ${color === 'dark' ? 'text-gray-900' : 'text-white'}`}>
                    CompanyName
                </span>
            )}
        </div>
    )
} 