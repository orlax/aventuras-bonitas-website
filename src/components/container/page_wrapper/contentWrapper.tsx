"use client";

import { LegacyRef, ReactNode } from "react";

export const ContentWrapper = ({
  className = "",
  children,
  style={},
  ref,
}: {
  className?: string;
  children: ReactNode | ReactNode[];
  ref?: React.MutableRefObject<any> | undefined;
  style?:any,
}) => {
  return (
    <div
      style={style?style:{}}
      className={`md:py-9 2xl:px-[17%] lg:px-40 md:px-20 xs:px-5 xs:py-3 ${className}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
