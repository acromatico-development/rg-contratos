'use client'

import * as Yup from 'yup';
import { Form, Input, Button } from '@components';
import { useForm } from '@hooks';
import { IContractDTO } from '@interface';

interface ContractFormProps {
  initialValues?: IContractDTO;
  onSubmit: (values: IContractDTO) => Promise<void>;
  isReadOnly?: boolean;
  isEditing?: boolean;
  loading?: boolean;
}

const ContractForm = ({ 
  initialValues, 
  onSubmit, 
  isReadOnly = false,
  isEditing = false,
  loading = false
}: ContractFormProps) => {
  const formik = useForm<IContractDTO>({
    initialValues: initialValues || {
      Identifier: '',
      Name: '',
      Description: '',
      IsActive: true,
      nc_yz6c___Users_id: ''
    },
    validationSchema: Yup.object({
      Identifier: Yup.string().required('El identificador es requerido'),
      Name: Yup.string().required('El nombre es requerido'),
      Description: Yup.string()
    }),
    onSubmit,
    enableReinitialize: true
  });

  return (
    <Form formik={formik}>
      <Input
        id="identifier"
        label="Identificador"
        type="text"
        disabled
        error={formik.errors.Identifier}
        touched={formik.touched.Identifier}
        {...formik.getFieldProps('Identifier')}
      />

      <Input
        id="name"
        label="Nombre del Contrato"
        type="text"
        disabled={isReadOnly && !isEditing}
        error={formik.errors.Name}
        touched={formik.touched.Name}
        {...formik.getFieldProps('Name')}
      />

      <Input
        id="description"
        label="Descripción"
        type="textarea"
        disabled={isReadOnly && !isEditing}
        error={formik.errors.Description}
        touched={formik.touched.Description}
        {...formik.getFieldProps('Description')}
      />

      {(!isReadOnly || isEditing) && (
        <div className="mt-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <Button
            type="submit"
            disabled={formik.isSubmitting || loading}
            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
          >
            {loading || formik.isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ContractForm; 