import { IClauseVariableDTO } from '@interfaces/ClauseVariables';
import { VariableRow } from './VariableRow';

interface VariablesSectionProps {
    variables: IClauseVariableDTO[];
    onAddVariable: () => void;
    onUpdateVariable: (index: number, field: keyof IClauseVariableDTO, value: string) => void;
    onInsertVariable: (variable: IClauseVariableDTO) => void;
}

export const VariablesSection = ({
    variables,
    onAddVariable,
    onUpdateVariable,
    onInsertVariable
}: VariablesSectionProps) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-900 dark:text-white">Variables</label>
                <button
                    onClick={onAddVariable}
                    className="bg-primary-600 hover:bg-primary-500 px-3 py-2 rounded-md text-sm text-white"
                >
                    Añadir Variable
                </button>
            </div>

            <div className="mt-4 space-y-4">
                {variables.map((variable, index) => (
                    <VariableRow
                        key={index}
                        variable={variable}
                        index={index}
                        onUpdateVariable={onUpdateVariable}
                        onInsertVariable={onInsertVariable}
                    />
                ))}
            </div>
        </div>
    );
}; 