import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/store/useModal";
import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useOutsideClick } from "@/hooks/useClickOutside";

let timer: NodeJS.Timeout;

export const VideoModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [dismount, setDismount] = useState(true);

  const ref = useOutsideClick(() => onClose());

  const { isOpen, type, data, onClose } = useModal();
  const isModalOpen = isOpen && type === "video-modal";
  const { video } = data;

  useEffect(() => {
    setIsMounted(isModalOpen);
    if (isModalOpen) {
      clearTimeout(timer);
      setDismount(false);
    }
  }, [isModalOpen]);

  if (!isMounted && !isModalOpen) {
    timer = setTimeout(() => {
      if (!isModalOpen) {
        setDismount(true);
      }
    }, 1000);
  } else {
    if (dismount) {
      setDismount(false);
    }
  }

  if (dismount || !video) return <></>;

  const exitModalManual = () => {
    onClose();
  };

  return (
    <motion.div
      className="backdrop-blur-sm absolute bg-ab-black-70 w-full h-full flex items-center justify-center z-30 bg-opacity-70"
      animate={{ top: isMounted ? 0 : -300, opacity: isMounted ? 1 : "0" }}
      initial={{ top: "-100%", opacity: 0 }}
    >
      <ContentWrapper className="h-auto flex items-center gap-4 mx-auto max-w-[90%] w-full !p-0 !rounded-none">
        <video
          className="h-[80vh] w-full"
          autoPlay
          controls
          id="gameplay_video"
          ref={ref}
        >
          <source src={video} type="video/mp4" />
        </video>

        <button
          onClick={() => exitModalManual()}
          className="absolute top-32 right-32 z-30"
        >
          <XCircleIcon width={35} height={35} />
        </button>
      </ContentWrapper>
    </motion.div>
  );
};
