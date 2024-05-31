import { useOutsideClick } from "@/hooks/useClickOutside";
import { ReactNode } from "react";

export const SimpleBackdrop = ({
    onClickOutside,
    children
}: {
    onClickOutside: () => void;
    children: ReactNode | ReactNode[]
}) => {
    const ref = useOutsideClick(onClickOutside);

    return (
        <div id="ab-video-backdrop"
            className="backdrop-blur-sm absolute bg-ab-black-70 flex justify-center p-12 z-20 w-screen h-screen
            items-center
            top-0 left-0"
        >
            <div ref={ref} className="flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}