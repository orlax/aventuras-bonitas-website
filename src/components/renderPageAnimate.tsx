"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100, transition: { duration: 0.2 } },
};


export const RenderAnimatePage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const path = usePathname();
  const keySplit = path.split("/");

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={keySplit[2]}
        initial={keySplit.length > 3 ? false : "hidden"}
        animate={keySplit.length > 3 ? false : "enter"}
        exit={keySplit.length > 3 ? undefined : "exit"}
        variants={keySplit.length > 3 ? undefined : variants}
        transition={
          keySplit.length > 3
            ? undefined
            : { ease: "easeInOut", duration: 0.75 }
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
