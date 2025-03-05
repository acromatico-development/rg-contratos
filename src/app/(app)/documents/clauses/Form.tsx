'use client'

import { useState } from 'react';
import * as Yup from 'yup';
import { Form, Input, Button } from '@components';
import { useForm, useNotification } from '@hooks';
import { IClauseDTO, IClauseVariableDTO } from '@interface';
import { createClauseNocodb, createClauseVariableNocodb } from '@services';
import { VariablesSection } from './VariablesSection';

interface CreateClauseFormProps {
  onSuccess: () => void;
  userId?: number;
}

const CreateClauseForm = ({ onSuccess, userId }: CreateClauseFormProps) => {
  const [variables, setVariables] = useState<IClauseVariableDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const formik = useForm<IClauseDTO>({
    initialValues: {
      Name: '',
      Description: '',
      Content: '',
      IsTemplate: false,
      nc_yz6c___Users_id: userId || 0
    },
    validationSchema: Yup.object({
      Name: Yup.string().required('El nombre es requerido'),
      Description: Yup.string(),
      Content: Yup.string().required('El contenido es requerido')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        
        const clauseResponse = await createClauseNocodb(values);
        
        if (!clauseResponse.data?.Id) {
          throw new Error('Error al crear la cláusula: No se recibió ID');
        }

        await Promise.all(
          variables.map(variable =>
            createClauseVariableNocodb({
              ...variable,
              nc_yz6c___Clauses_id: clauseResponse.data?.Id || 0
            })
          )
        );

        showNotification({
          type: 'success',
          message: 'Cláusula creada exitosamente'
        });

        onSuccess();
      } catch (error) {
        showNotification({
          type: 'error',
          message: `Error al crear la cláusula: ${error instanceof Error ? error.message : 'Error desconocido'}`
        });
      } finally {
        setLoading(false);
      }
    }
  });

  /* const handleAddVariable = () => {
    setVariables(prev => [...prev, {
      Name: '',
      Label: '',
      nc_yz6c___Clauses_id: 0
    }]);
  }; */

  const handleUpdateVariable = (index: number, field: keyof IClauseVariableDTO, value: string) => {
    setVariables(prev => prev.map((variable, i) => 
      i === index ? { ...variable, [field]: value } : variable
    ));
  };

  const handleInsertVariable = (variable: IClauseVariableDTO) => {
    const content = formik.values.Content || '';
    const variableTag = `{{${variable.Name}}}`;
    formik.setFieldValue('Content', content + variableTag);
  };

  return (
    <Form formik={formik}>
      <Input
        id="name"
        label="Nombre"
        type="text"
        error={formik.errors.Name}
        touched={formik.touched.Name}
        {...formik.getFieldProps('Name')}
      />

      <Input
        id="description"
        label="Descripción"
        type="textarea"
        error={formik.errors.Description}
        touched={formik.touched.Description}
        {...formik.getFieldProps('Description')}
      />

      {/* <VariablesSection
        variables={variables}
        onAddVariable={handleAddVariable}
        onUpdateVariable={handleUpdateVariable}
        onInsertVariable={handleInsertVariable}
      /> */}

      <Input
        id="content"
        label="Contenido"
        type="tiny"
        error={formik.errors.Content}
        touched={formik.touched.Content}
        {...formik.getFieldProps('Content')}
      />

      <div className="mt-5 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <Button
          type="submit"
          disabled={formik.isSubmitting || loading}
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
        >
          {loading || formik.isSubmitting ? 'Guardando...' : 'Crear'}
        </Button>
      </div>
    </Form>
  );
};

export default CreateClauseForm;