import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IClause } from '@interface';

interface Props {
    clause: IClause;
    onRemove: (clauseId: number) => void;
}

export function SortableClauseItem({ clause, onRemove }: Props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: clause.Id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-move"
            {...attributes}
        >
            <div className="flex items-center gap-3" {...listeners}>
                <svg 
                    className="w-6 h-6 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 8h16M4 16h16" 
                    />
                </svg>
                <span className="text-gray-900 dark:text-white">{clause.Name}</span>
            </div>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(clause.Id);
                }}
                className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 p-2"
            >
                <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                    />
                </svg>
            </button>
        </div>
    );
} 