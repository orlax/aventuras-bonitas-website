'use client'

import { ReactNode } from "react";

type PrimaryButtonProps = {
    children: ReactNode | ReactNode[];
    backgroundClass?: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const PrimaryButton = ({
    children,
    backgroundClass = 'bg-ab-yellow', 
    className = '',
    disabled,
    onClick,
}: PrimaryButtonProps) => {
    return (
        <button
            className={`flex hover:opacity-50 rounded-full p-3 text-red-900 font-bold whitespace-nowrap  mx-auto md:mx-0 ${className} ${backgroundClass}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}