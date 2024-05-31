'use client'

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export const ScrollToHash = () => {
    const router = useRouter();
    const componentLoaded = useRef(false);
    useEffect(() => {
        if(window && !componentLoaded.current) {
            componentLoaded.current = true;
            router.push(`/${window.location.hash}`);
        }
    }, []);

    return (
        <></>
    )
}