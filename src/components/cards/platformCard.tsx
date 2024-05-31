'use client'

import { ReactNode } from "react";

type PlatformCardProps = {
    className?: string;
    text: string;
    Icon: ReactNode | null;
    onClick?: () => void
}

export const PlatformCard = ({
    className = '', text, Icon, onClick
}: PlatformCardProps) => (
    <button className={`flex w-full px-2 py-3 items-center justify-center capitalize gap-1 
    text-ab-black border-white/60 border rounded-lg bg-white/30 ${className}`} 
    onClick={onClick}>
        {Icon}
        <span className="text-xs font-semibold truncate">{text}</span>
    </button>
);