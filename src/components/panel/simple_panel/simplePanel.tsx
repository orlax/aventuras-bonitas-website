'use client'

import { ReactNode } from "react";

type SimplePanelProps = {
    className?: string;
    children: ReactNode;
}

export const SimplePanel = ({
    className = '',
    children,
}: SimplePanelProps) => {

    return (
        <div className={`grid md:grid-cols-2 xs:grid-cols-1 gap-4 p-8 rounded-lg ${className}`}>
            {children}
        </div>
    );
}