import { ChevronDownIcon } from '@heroicons/react/16/solid'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string;
    label: string;
    options: { value: string; label: string; }[];
    error?: string;
    touched?: boolean;
}

export const Select = ({
    id,
    label,
    options,
    error,
    touched,
    className = '',
    ...props
}: SelectProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="mt-2 grid grid-cols-1">
                <select
                    id={id}
                    className={`col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${className}`}
                    {...props}
                >
                    <option value="">Seleccione una opción</option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
                {touched && error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </div>
        </div>
    );
}; 