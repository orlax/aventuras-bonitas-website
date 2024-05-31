import { ArrowLongRightIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type HeaderMenuButtonProps = {
    text: string;
    onClick: () => void;
}

export const HeaderMenuButton = ({
    text,
    onClick
}: HeaderMenuButtonProps) => {
    
    return (
        <button 
            className="group flex flex-1 justify-between items-center gap-3 px-3 py-4 rounded-lg 
            hover:bg-ab-light-blue-a-80 bg-transparent" 
            onClick={onClick}
        >
            <span className="text-ab-black md:text-2xl xs:text-base font-bold">
                {text}
            </span>
            <div className="md:opacity-0 md:block md:group-hover:opacity-100 xs:hidden bg-ab-black rounded-full p-3 
            transition ease-in-out delay-100 opacity-100">
                <ArrowLongRightIcon className='w-3 text-white' />
            </div>
            <div className="md:hidden xs:block">
                <ChevronRightIcon className='w-3 text-ab-black' />
            </div>
        </button>
    );
}