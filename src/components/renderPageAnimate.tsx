"use client";

import React, { useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { motion } from "framer-motion";

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const frozen = useRef(context).current;

  if (!frozen) {
    return <>{props.children}</>;
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

export const RenderAnimatePage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname();
  const pageKey = path.split("/");
  const keyPage = pageKey[2] ?? "main";

  return (
    <AnimatePresence mode="popLayout" initial>
      <motion.div
        key={keyPage}
        className=""
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, transition: { duration: 0.9 } }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
};
