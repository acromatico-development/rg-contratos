"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { readOneClauseNocodb } from '@services';
import { IClause } from '@interface';

import ClauseForm from './Form';

interface SelectedClause extends IClause {
    order: number;
}

const Clause = () => {
    const { contractID } = useParams();
    const [contract, setClause] = useState<IClause | null>(null);
    const [availableClauses, setAvailableClauses] = useState<IClause[]>([]);
    const [selectedClauses, setSelectedClauses] = useState<SelectedClause[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [contractResponse] = await Promise.all([
                    readOneClauseNocodb("IDENTIFIER", contractID as string, { relations: { CreatedByUserId: { fields: ['Id', 'Name', 'Email'] } } }),
                    //readManyClausess(),
                    //readClauseClausesByClauseId(contractID as string)
                ]);

                if (contractResponse.data) {
                    console.log(contractResponse.data)
                    setClause(contractResponse.data);
                    setEditName(contractResponse.data.Name);
                    setEditDescription(contractResponse.data.Description || '');
                }

                /* if (clausesResponse.list) {
                    setAvailableClauses(clausesResponse.list);
                }

                if (contractClausesResponse.list) {
                    const orderedClauses = contractClausesResponse.list
                        .sort((a, b) => a.Order - b.Order)
                        .map(cc => ({
                            ...cc.ClauseId,
                            order: cc.Order
                        }));
                    setSelectedClauses(orderedClauses);
                } */
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (contractID) {
            fetchData();
        }
    }, [contractID]);

    const handleSubmit = async (values: { name: string; description: string }) => {
        if (!contractID) return;

        setIsSaving(true);
        try {
            /* await updateClauses(contractID as string, {
                Name: values.name,
                Description: values.description,
                IsActive: true,
                nc_yz6c___Users_id: contract?.CreatedByUserId?.Id as number
            }); */

            /* const currentClauses = await readManyClauseClauses();
            const contractClauses = currentClauses.list?.filter(
                cc => cc.ClauseId.Id === parseInt(contractID as string)
            ) || [];

            await Promise.all(selectedClauses.map(async (clause, index) => {
                const existingClause = contractClauses.find(
                    cc => cc.ClauseId.Id === clause.Id
                );

                if (existingClause) {

                    if (existingClause.Order !== index) {
                        await updateClauseClause(existingClause.Id.toString(), {
                            Name: existingClause.Name,
                            nc_yz6c__Clauses_id: existingClause.ClauseId.Id,
                            nc_yz6c___Clauses_id: existingClause.ClauseId.Id,
                            Order: index,
                            Optional: existingClause.Optional
                        });
                    }
                } else {
                    await createClauseClause({
                        Name: `CC-${contractID}-${clause.Id}-${index + 1}`,
                        nc_yz6c__Clauses_id: parseInt(contractID as string),
                        nc_yz6c___Clauses_id: clause.Id,
                        Order: index,
                        Optional: false
                    });
                }
            }));

            await Promise.all(
                contractClauses
                    .filter(cc => !selectedClauses.find(sc => sc.Id === cc.ClauseId.Id))
                    .map(cc => deleteClauseClause(cc.Id.toString()))
            );

            setClause(prev => prev ? {
                ...prev,
                Name: values.name,
                Description: values.description
            } : null);

            setIsEditing(false); */
        } catch (error) {
            console.error('Error updating contract:', error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="text-white">Cargando...</div>;
    if (!contract) return <div className="text-white">Contrato no encontrado</div>;

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* <ClauseClauses
                        availableClauses={availableClauses}
                        selectedClauses={selectedClauses}
                        onSelectedClausesChange={setSelectedClauses}
                        readOnly={!isEditing}
                    /> */}
                </div>

                <div className="lg:col-span-1">
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            {isEditing ? (
                                <ClauseForm
                                    initialValues={{
                                        name: editName,
                                        description: editDescription
                                    }}
                                    onSubmit={handleSubmit}
                                    onCancel={() => setIsEditing(false)}
                                    isSaving={isSaving}
                                />
                            ) : (
                                <>
                                    <div className="flex justify-between items-start">
                                        <h1 className="text-xl font-semibold text-white mb-2">{contract.Name}</h1>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            Editar
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-300">Descripción</h2>
                                            <p className="mt-1 text-white">{contract.Description}</p>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-300">Creado por</h2>
                                            <p className="mt-1 text-white">{contract.CreatedByUserId?.Name}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clause;