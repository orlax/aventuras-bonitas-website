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
            className={`flex bg-ab-black hover:opacity-50 rounded-full p-3 ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}