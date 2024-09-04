'use client'

import { ReactNode } from "react";

type PrimaryButtonProps = {
    children: ReactNode | ReactNode[];
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const PrimaryButton = ({
    children,
    className = '',
    disabled,
    onClick,
}: PrimaryButtonProps) => {
    return (
        <button
            style={{ backgroundColor: '#FFD700' }}
            className={`flex hover:opacity-50 rounded-full p-3 text-red-900 font-bold whitespace-nowrap  mx-auto md:mx-0 ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}