import { IClauseVariableDTO } from '@interfaces/ClauseVariables';

interface VariableRowProps {
    variable: IClauseVariableDTO;
    index: number;
    onUpdateVariable: (index: number, field: keyof IClauseVariableDTO, value: string) => void;
    onInsertVariable: (variable: IClauseVariableDTO) => void;
}

export const VariableRow = ({ variable, index, onUpdateVariable, onInsertVariable }: VariableRowProps) => {
    return (
        <div className="flex gap-4">
            <input
                type="text"
                value={variable.Name}
                onChange={(e) => onUpdateVariable(index, 'Name', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                placeholder="Nombre"
            />
            <input
                type="text"
                value={variable.Label}
                onChange={(e) => onUpdateVariable(index, 'Label', e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:text-white sm:text-sm"
                placeholder="Etiqueta"
            />
            <button
                onClick={() => onInsertVariable(variable)}
                className="bg-primary-600 hover:bg-primary-500 px-3 py-2 rounded-md text-sm text-white"
            >
                Insertar
            </button>
        </div>
    );
};