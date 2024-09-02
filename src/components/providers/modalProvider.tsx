"use client";

import React, { useEffect, useState } from "react";
import { ContactModal } from "@/components/modals/contactModal";
import { ImageModal } from "@/components/modals/imageModal";
import { VideoModal } from "@/components/modals/videoModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return <></>;
  return (
    <>
      <ContactModal />
      <ImageModal />
      <VideoModal />
    </>
  );
};

export default ModalProvider;
