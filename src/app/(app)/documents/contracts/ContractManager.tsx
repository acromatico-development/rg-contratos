'use client'

import { useState, useEffect } from 'react';
import { IContract, IClause, IContractDTO, IContractClauseDTO } from '@interface';
import { 
  createContractNocodb, 
  createContractClauseNocodb, 
  readManyClausesNocodb,
  readContractClauseByContractId,
  updateContractNocodb,
  deleteContractClauseNocodb,
  getNextContractIdentifier
} from '@services';
import { useNotification } from '@hooks';
import ContractForm from './ContractForm';
import ContractClauses from './ContractClauses';

interface SelectedClause extends IClause {
  order: number;
}

interface ContractManagerProps {
  initialContract?: IContract;
  isReadOnly?: boolean;
  onSuccess?: () => void;
  userId?: string | number;
}

const ContractManager = ({ 
  initialContract, 
  isReadOnly = false,
  onSuccess,
  userId
}: ContractManagerProps) => {
  const [contractId, setContractId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [availableClauses, setAvailableClauses] = useState<IClause[]>([]);
  const [selectedClauses, setSelectedClauses] = useState<SelectedClause[]>([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();
  const [nextIdentifier, setNextIdentifier] = useState<string>('');

  useEffect(() => {
    if (initialContract?.Id) {
      setContractId(initialContract.Id.toString());
      loadContractClauses(initialContract.Id.toString());
    }
  }, [initialContract]);

  useEffect(() => {
    loadAvailableClauses();
  }, []);

  useEffect(() => {
    if (!initialContract) {
      loadNextIdentifier();
    }
  }, [initialContract]);

  const loadAvailableClauses = async () => {
    try {
      const response = await readManyClausesNocodb();
      if (response.data?.contracts) {
        setAvailableClauses(response.data.contracts);
      }
    } catch (error) {
      showNotification({ 
        type: 'error', 
        message: 'Error al cargar las cláusulas disponibles' 
      });
    }
  };

  const loadContractClauses = async (contractId: string) => {
    try {
      const response = await readContractClauseByContractId(contractId);
      if (response.data) {
        setSelectedClauses(response.data.map(clause => ({
          ...clause.ClauseId,
          Name: clause.ClauseId.Name,
          order: clause.Order
        })));
      }
    } catch (error) {
      showNotification({ 
        type: 'error', 
        message: 'Error al cargar las cláusulas del contrato' 
      });
    }
  };

  const loadNextIdentifier = async () => {
    try {
      const response = await getNextContractIdentifier();
      if (response.data) {
        setNextIdentifier(response.data);
      }
    } catch (error) {
      showNotification({
        type: 'error',
        message: 'Error al obtener el siguiente identificador'
      });
    }
  };

  const handleSubmit = async (values: IContractDTO) => {
    try {
      setLoading(true);
      let newContractId = contractId;

      const contractData = {
        ...values,
        nc_yz6c___Users_id: userId?.toString() || ''
      };

      // Crear o actualizar contrato
      if (!contractId) {
        const contractResponse = await createContractNocodb(contractData);
        if (contractResponse.code !== 200) throw new Error('Error al crear el contrato');
        newContractId = contractResponse.data?.Id?.toString() || '';
        setContractId(newContractId);
      } else {
        await updateContractNocodb(contractId, contractData);
      }

      const contractNumber = values.Identifier?.split('-')[2] || '000';

      await Promise.all(
        selectedClauses.map((clause, index) =>
          createContractClauseNocodb({
            Identifier: `CC-${contractNumber}-${index}`,
            nc_yz6c__Contracts_id: Number(newContractId),
            nc_yz6c___Clauses_id: clause.Id,
            Order: index,
            Optional: false
          })
        )
      );

      showNotification({ 
        type: 'success', 
        message: `Contrato ${contractId ? 'actualizado' : 'creado'} exitosamente` 
      });
      
      if (onSuccess) onSuccess();
      if (isEditing) setIsEditing(false);
    } catch (error) {
      showNotification({ 
        type: 'error', 
        message: `Error al ${contractId ? 'actualizar' : 'crear'} el contrato` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {isReadOnly && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-0 right-0 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Editar
        </button>
      )}

      {isEditing && (
        <button
          onClick={() => setIsEditing(false)}
          className="absolute top-0 right-32 px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md"
        >
          Cancelar
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="space-y-6">
          <ContractForm
            initialValues={initialContract ? {
              Identifier: initialContract.Identifier,
              Name: initialContract.Name,
              Description: initialContract.Description,
              IsActive: initialContract.IsActive,
              nc_yz6c___Users_id: initialContract.CreatedByUserId?.Id?.toString() || ''
            } : {
              Identifier: nextIdentifier,
              Name: '',
              Description: '',
              IsActive: true,
              nc_yz6c___Users_id: ''
            }}
            onSubmit={handleSubmit}
            isReadOnly={isReadOnly}
            isEditing={isEditing}
            loading={loading}
          />
        </div>

        <div className="space-y-6">
          <ContractClauses
            availableClauses={availableClauses.filter(
              clause => !selectedClauses.some(selected => selected.Id === clause.Id)
            )}
            selectedClauses={selectedClauses}
            onSelectedClausesChange={setSelectedClauses}
            readOnly={isReadOnly && !isEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractManager; 