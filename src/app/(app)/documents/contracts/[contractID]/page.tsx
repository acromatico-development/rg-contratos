"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { readOneContractNocodb } from '@services';
import { IContract } from '@interface';
import ContractManager from '../ContractManager';
import { useNotification } from '@hooks';

const ContractDetail = () => {
  const { contractID } = useParams();
  const [contract, setContract] = useState<IContract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setIsLoading(true);
        const response = await readOneContractNocodb(
          "IDENTIFIER", 
          contractID as string,
          {
            relations: {
              ContractClausesId: {
                fields: ['Id', 'Order', 'ClauseId'],
              }
            }
          }
        );
        
        if (response.code === 200 && response.data) {
          setContract(response.data);
        } else {
          showNotification({
            type: 'error',
            message: 'Error al cargar el contrato'
          });
        }
      } catch (error) {
        showNotification({
          type: 'error',
          message: 'Error al cargar el contrato'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (contractID) {
      fetchContract();
    }
  }, [contractID, showNotification]);

  if (isLoading) return <div>Cargando...</div>;
  if (!contract) return <div>Contrato no encontrado</div>;

  return (
    <div className="p-6">
      <ContractManager
        initialContract={contract}
        isReadOnly
      />
    </div>
  );
};

export default ContractDetail;