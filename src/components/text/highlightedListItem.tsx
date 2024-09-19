'use client'

import { useEffect, useState } from "react";

export const HighLightedListItem = ({
    text
}: { text: string }) => {

    const offsetList = ["-ml-1", "-ml-1.5", "-ml-2"];
    const rotationList = ["origin-bottom -rotate-[0.25deg]", "", "origin-bottom rotate-[0.25deg]"];

    const [offset, setOffset] = useState("");
    const [rotation, setRotation] = useState("");

    useEffect(() => {
        setOffset(offsetList[Math.floor(Math.random() * offsetList.length)]);
        setRotation(rotationList[Math.floor(Math.random() * rotationList.length)]);
    }, []);

    return (
        <span className="relative z-0">
            <div className={`w-full h-6 bg-ab-lilac absolute ${offset} ${rotation}`}></div>
            <p className="relative z-0">
                {text}
            </p>
        </span>
    )    
}
