"use client";

import { ReactNode } from "react";

export const ContentWrapper = ({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <div
      className={`md:py-9 2xl:px-[20%] lg:px-40 md:px-20 xs:px-5 xs:py-3 ${className}`}
    >
      {children}
    </div>
  );
};
