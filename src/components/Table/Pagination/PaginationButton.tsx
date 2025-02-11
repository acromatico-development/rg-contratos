interface PaginationButtonProps {
  onClick: () => void
  disabled?: boolean
  className: string
  children: React.ReactNode
}

export const PaginationButton = ({ onClick, disabled, className, children }: PaginationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={className}
  >
    {children}
  </button>
) 