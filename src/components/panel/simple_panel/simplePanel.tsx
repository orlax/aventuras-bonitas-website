"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type SimplePanelProps = {
  className?: string;
  children: ReactNode;
};

export const SimplePanel = ({ className = "", children }: SimplePanelProps) => {
  return (
    <motion.div
      className={`grid md:grid-cols-2 xs:grid-cols-1 gap-4 p-8 rounded-lg ${className}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          delay: 0.3,
          stiffness: 300,
          damping: 30,
          type: "spring",
        },
      }}
    >
      {children}
    </motion.div>
  );
};
