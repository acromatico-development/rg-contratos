import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableClauseItem } from './SortableClauseItem';
import { IClause } from '@interface';

interface SelectedClause extends IClause {
    order: number;
}

interface ContractClausesEditorProps {
    availableClauses: IClause[];
    selectedClauses: SelectedClause[];
    onSelectedClausesChange: (clauses: SelectedClause[]) => void;
    readOnly?: boolean;
}

const ContractClausesEditor = ({
    availableClauses,
    selectedClauses,
    onSelectedClausesChange,
    readOnly = false
}: ContractClausesEditorProps) => {
    const [selectedClauseId, setSelectedClauseId] = useState<string>('');

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const filteredAvailableClauses = availableClauses.filter(
        clause => !selectedClauses.some(selected => selected.Id === clause.Id)
    );

    const handleAddClause = () => {
        const clauseToAdd = availableClauses.find(clause => clause.Id.toString() === selectedClauseId);
        if (clauseToAdd) {
            onSelectedClausesChange([
                ...selectedClauses,
                { ...clauseToAdd, order: selectedClauses.length }
            ]);
            setSelectedClauseId('');
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const items = selectedClauses;
            const oldIndex = items.findIndex((item) => item.Id === active.id);
            const newIndex = items.findIndex((item) => item.Id === over.id);

            const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({
                ...item,
                order: index
            }));

            onSelectedClausesChange(newItems);
        }
    };

    const handleRemoveClause = (clauseId: number) => {
        const updatedClauses = selectedClauses
            .filter(clause => clause.Id !== clauseId)
            .map((clause, index) => ({
                ...clause,
                order: index
            }));
        
        onSelectedClausesChange(updatedClauses);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Cláusulas del Contrato
            </h2>

            {readOnly ? (
                <div className="space-y-4">
                    {selectedClauses.map((clause) => (
                        <div
                            key={clause.Id}
                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-gray-900 dark:text-white">{clause.Name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="flex gap-4 mb-6">
                        <select
                            value={selectedClauseId}
                            onChange={(e) => setSelectedClauseId(e.target.value)}
                            className="flex-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg p-2 border border-gray-300 dark:border-gray-600"
                        >
                            <option value="">Seleccionar cláusula...</option>
                            {filteredAvailableClauses.map((clause) => (
                                <option key={clause.Id} value={clause.Id}>
                                    {clause.Name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={handleAddClause}
                            disabled={!selectedClauseId}
                            className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                        >
                            Agregar
                        </button>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={selectedClauses.map(clause => clause.Id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="space-y-4">
                                {selectedClauses.map((clause) => (
                                    <SortableClauseItem
                                        key={clause.Id}
                                        clause={clause}
                                        onRemove={handleRemoveClause}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </>
            )}
        </div>
    );
}

export default ContractClausesEditor;