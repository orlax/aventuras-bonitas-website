'use client'

import { MinusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const PageAnchorText = ({
    id,
    url,
    text,
}:
{
    id?: string,
    url: string,
    text: string,
}) => {
    return (
        <div className="flex gap-2 items-center text-ab-purple-a-90 text-sm">
            <MinusIcon className="w-5"/>
            <Link className="text-[12px] font-bold" id={id} href={url} scroll={false}>
               <span>{text}</span>
            </Link>
        </div>
    );
}