'use client'

import { useRouter } from 'next/navigation';
import { useFormik, FormikConfig, FormikValues, FormikErrors } from 'formik';

interface UseFormOptions<T extends { form?: string }> extends Omit<FormikConfig<T>, 'onSubmit'> {
  onSubmit: (values: T, helpers: {
    setSubmitting: (isSubmitting: boolean) => void;
    setErrors: (errors: FormikErrors<T>) => void;
    router: ReturnType<typeof useRouter>;
  }) => Promise<void>;
}

export const useForm = <T extends FormikValues>(options: UseFormOptions<T>) => {
  const router = useRouter();
  
  return useFormik<T>({
    ...options,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await options.onSubmit(values, { setSubmitting, setErrors, router });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred';
        setErrors({ form: errorMessage } as FormikErrors<T>);
      } finally {
        setSubmitting(false);
      }
    },
  });
}; 