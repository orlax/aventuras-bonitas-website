"use client";

import { LegacyRef, ReactNode } from "react";

export const ContentWrapper = ({
  className = "",
  children,
  ref,
}: {
  className?: string;
  children: ReactNode | ReactNode[];
  ref?: LegacyRef<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      className={`md:py-9 2xl:px-[20%] lg:px-40 md:px-20 xs:px-5 xs:py-3 ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
