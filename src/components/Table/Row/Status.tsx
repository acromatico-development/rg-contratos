import { IStatusRow, TStatusColor } from '@interface'
import { SingleRow } from "./Single";

const statusStyles: Record<TStatusColor, { bg: string; text: string; ring: string }> = {
    green: {
        bg: 'bg-green-50',
        text: 'text-green-700',
        ring: 'ring-green-600/20'
    },
    red: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        ring: 'ring-red-600/20'
    },
    yellow: {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        ring: 'ring-yellow-600/20'
    },
    blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        ring: 'ring-blue-600/20'
    },
    purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-700',
        ring: 'ring-purple-600/20'
    },
    pink: {
        bg: 'bg-pink-50',
        text: 'text-pink-700',
        ring: 'ring-pink-600/20'
    },
    gray: {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        ring: 'ring-gray-600/20'
    }
};

export const StatusRow = ({ text, color }: IStatusRow) => {
    const styles = statusStyles[color];
    return (
        <span className={`inline-flex items-center rounded-md ${styles.bg} px-2 py-1 text-xs font-medium ${styles.text} ring-1 ring-inset ${styles.ring}`}>
            <SingleRow text={text} />
        </span>
    )
}