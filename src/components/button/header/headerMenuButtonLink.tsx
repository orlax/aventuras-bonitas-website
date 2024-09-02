import React from "react";

type HeaderMenuButtonLinkProps = {
  element: string | React.ReactNode;
  noButton?: boolean;
  onClick: (main?: boolean, newLang?: string) => void;
};

export const HeaderMenuButtonLink = ({
  element,
  noButton = false,
  onClick,
}: HeaderMenuButtonLinkProps) => {
  const ElementNode = noButton ? "div" : "button";

  return (
    <div className="flex-1 text-center">
      <ElementNode
        className="group md:text-[14px] lg:text-[16px] text-white"
        onClick={() => onClick(true)}
      >
        {element}
        <div className="h-[1px] w-0 bg-white group-hover:w-full transition-all" />
      </ElementNode>
    </div>
  );
};
