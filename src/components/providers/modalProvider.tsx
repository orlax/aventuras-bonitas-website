"use client";

import React, { useEffect, useState } from "react";
import { ContactModal } from "@/components/modals/contactModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return <></>;
  return (
    <>
      <ContactModal />
    </>
  );
};

export default ModalProvider;
