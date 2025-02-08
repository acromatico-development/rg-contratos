import { FormikProps } from 'formik';

interface FormProps<T> extends React.FormHTMLAttributes<HTMLFormElement> {
    formik: FormikProps<T>;
    className?: string;
}

export const Form = <T,>({ children, formik, className = '', ...props }: FormProps<T>) => {
    return (
        <form onSubmit={formik.handleSubmit} className={`space-y-6 ${className}`} {...props}>
            {children}
            {formik.status && (
                <div className="text-sm text-red-600">{formik.status}</div>
            )}
        </form>
    );
}; 