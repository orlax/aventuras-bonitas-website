import React, { useEffect, useState } from "react";
import { useModal } from "@/store/useModal";
import { motion } from "framer-motion";
import { ContentWrapper } from "../container/page_wrapper/contentWrapper";
import Image from "next/image";
import { SubscribeForm } from "../form/subscribeForm";
import { getDictionary } from "@/dictionaries";
import { XCircleIcon } from "@heroicons/react/24/solid";

export const ContactModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [dismount, setDismount] = useState(true);

  const { isOpen, type, data, onClose } = useModal();
  const isModalOpen = isOpen && type === "contact-form";
  const { contactDict } = data;

  useEffect(() => {
    setIsMounted(isModalOpen);
    window.scrollTo({ top: 0, left: 0 });
    if (isModalOpen) {
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      } else {
        document.body.classList.add("overflow-hidden");
      }
      setDismount(false);
    } else {
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [isModalOpen]);

  if (!isMounted && !isModalOpen) {
    setTimeout(() => {
      setDismount(true);
      if (document.body.classList.contains("overflow-hidden")) {
        document.body.classList.remove("overflow-hidden");
      }
    }, 300);
  }

  if (dismount) return <></>;

  const exitModalManual = () => {
    onClose();
  };

  return (
    <motion.div
      className="absolute w-full h-full bg-ab-black flex items-center justify-center z-30 bg-opacity-70"
      animate={{ top: isMounted ? 0 : -300, opacity: isMounted ? 1 : "0" }}
      initial={{ top: "-100%", opacity: 0 }}
    >
      <ContentWrapper className=" h-auto w-full  flex items-center gap-4 mx-auto max-w-[800px] bg-white !p-6 rounded-md">
        <section className="flex flex-col items-center text-center gap-4 relative">
          <Image
            className="h-64 w-auto rounded-full"
            src="/logo/logo512.png"
            alt="company-logo"
            width={512}
            height={512}
          />
          <h3 className="text-3xl text-ab-black">{contactDict?.title}</h3>
        </section>
        <SubscribeForm dictionary={contactDict} />
        <button
          onClick={() => exitModalManual()}
          className="absolute top-32 right-32"
        >
          <XCircleIcon width={35} height={35} />
        </button>
      </ContentWrapper>
    </motion.div>
  );
};
