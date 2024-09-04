import React, { useEffect, useState } from "react";
import { useModal } from "@/store/useModal";
import { motion } from "framer-motion";
import { ContentWrapper } from "../container/page_wrapper/contentWrapper";
import Image from "next/image";
import { SubscribeForm } from "../form/subscribeForm";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useOutsideClick } from "@/hooks/useClickOutside";

let timer: NodeJS.Timeout;

export const ContactModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [dismount, setDismount] = useState(true);

  const { isOpen, type, data, onClose } = useModal();
  const isModalOpen = isOpen && type === "contact-form";
  const { contactDict, lang } = data;

  const ref = useOutsideClick(() => onClose(), true);

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

  if (dismount || !lang) return <></>;

  const exitModalManual = () => {
    onClose();
  };

  return (
    <motion.div
      className="backdrop-blur-sm absolute w-full h-full bg-ab-black flex items-center justify-center z-30 bg-opacity-70"
      animate={{ top: isMounted ? 0 : -300, opacity: isMounted ? 1 : "0" }}
      initial={{ top: "-100%", opacity: 0 }}
    >
      <ContentWrapper className=" h-auto w-full  flex items-center gap-4 mx-auto max-w-[800px] bg-black/80 !p-6 rounded-md">
        <div className="flex w-full h-full" ref={ref}>
          <section className="flex flex-col items-center text-center gap-4 relative">
            <Image
              className="h-64 w-auto rounded-full mt-[-48px]"
              src="/logo/logo512.png"
              alt="company-logo"
              width={512}
              height={512}
            />
            <h3 className="text-3xl text-white">{contactDict?.title}</h3>
          </section>
          <SubscribeForm dictionary={contactDict} lang={lang} />
          <button
            onClick={() => exitModalManual()}
            className="absolute top-32 right-32"
          >
            <XCircleIcon className="text-white" width={35} height={35} />
          </button>
        </div>
      </ContentWrapper>
    </motion.div>
  );
};
