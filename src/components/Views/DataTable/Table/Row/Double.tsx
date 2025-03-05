import { IDoubleRow } from "@interface";
import { SingleRow } from './Single';

export const DoubleRow = ({ text, subText }: IDoubleRow) => {
    return (
        <>
            <SingleRow text={text} />
            <span className="block mt-1">
                <SingleRow text={{ value: subText || '', bold: false }} />
            </span>
        </>
    )
}