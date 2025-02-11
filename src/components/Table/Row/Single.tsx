import { ISingleRow } from "@interface";

export const SingleRow = ({ text }: ISingleRow) => {
    return (
        <span className={`${text.bold ? 'text-gray-900' : 'text-gray-500'}`}>
            {text.value}
        </span>
    )
}