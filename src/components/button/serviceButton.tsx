'use client'

import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

type ServiceButtonProps = {
    className?: string;
    title: string;
    description: string;
    disabled?: boolean;
    Logo?: ReactNode;
    onClick?: () => void;
}

export const ServiceButton = ({
    className = '', title, description, Logo, disabled, onClick
}: ServiceButtonProps) => {
    return (
        <button 
            className={`flex flex-col gap-2 justify-start py-3 px-2 group rounded-lg border border-white/60
            bg-ab-white-a-50 hover:bg-white
            ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            <div className="flex w-full gap-2 items-center justify-between">
                <h3 className="text-start text-xl leading-5 font-semibold">{title}</h3>
                {Logo &&
                <span className="p-2">
                    {Logo}
                </span>}
            </div>
            <p className="text-start text-sm">{description}</p>
        </button>
    )
}