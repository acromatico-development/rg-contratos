import Image from 'next/image'
import Link from 'next/link'
import { IIdentifierRow } from "@interface";
import { DoubleRow } from "./Double";

export const IdentifierRow = ({ imgUrl, text, subText, link }: IIdentifierRow) => {
    const TextContent = () => (
        <div>
            <DoubleRow text={text} subText={subText} />
        </div>
    )

    return (
        <div className="flex items-center">
            <div className="size-11 shrink-0">
                {imgUrl && (
                    <Image
                        alt={text.value}
                        src={imgUrl}
                        width={44}
                        height={44}
                        className="rounded-full mr-4"
                    />
                )}
            </div>
            {link ? (
                <Link href={link} className="hover:text-blue-600">
                    <TextContent />
                </Link>
            ) : (
                <TextContent />
            )}
        </div>
    )
}