import React from "react";

type HeaderMenuButtonLinkProps = {
  element: string | React.ReactNode;
  onClick: (main?: boolean, newLang?: string) => void;
};

export const HeaderMenuButtonLink = ({
  element,
  onClick,
}: HeaderMenuButtonLinkProps) => {
  return (
    <div className="flex-1 text-center">
      <button className="group" onClick={() => onClick(true)}>
        {element}
        <div className="h-[1px] w-0 group-hover:w-full bg-white transition-all" />
      </button>
    </div>
  );
};
