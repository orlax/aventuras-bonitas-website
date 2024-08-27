"use client";

import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { PageAnchorText } from "@/components/text/pageAnchorText";
import { useModal } from "@/store/useModal";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type BglessPanelProps = {
  className?: string;
  rightContent?: ReactNode | ReactNode[];
  leftContent?: ReactNode | ReactNode[];
  pageAnchor: {
    text: string;
    id?: string;
    url: string;
  };
  title: string;
  description: string;
  buttonText?: string;
  buttonClassname?: string;
  redirectUrl?: string;
  contactDict?: any;
  carousellImgs?: ReactNode;
};

export const BglessPanel = ({
  className = "",
  rightContent = null,
  leftContent = null,
  pageAnchor,
  title,
  description,
  buttonText,
  buttonClassname = "",
  redirectUrl,
  contactDict,
  carousellImgs,
}: BglessPanelProps) => {
  const router = useRouter();

  const { onOpen } = useModal();

  const handleButtonClick = () =>
    redirectUrl && redirectUrl !== "/subscribe"
      ? router.push(redirectUrl)
      : onOpen("contact-form", { contactDict });

  return (
    <article
      className={cn(
        `w-full grid md:grid-cols-2 xs:grid-cols-1 gap-4 ${className}`,
        carousellImgs && "flex flex-col"
      )}
    >
      {carousellImgs ? (
        <>
          {carousellImgs}
          <div
            className={`w-full grid md:grid-cols-2 xs:grid-cols-1 gap-4 ${className}`}
          >
            {!rightContent && leftContent}
            <motion.section
              className="flex flex-col items-start justify-center gap-4 text-ab-black"
              initial={{ opacity: 0, x: -100 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { stiffness: 300, damping: 30, type: "spring" },
              }}
            >
              <PageAnchorText {...pageAnchor} />
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="text-sm">{description}</p>
              {buttonText && (
                <PrimaryButton
                  className={`px-5 py-4 font-bold text-xs ${buttonClassname}`}
                  onClick={handleButtonClick}
                >
                  <span>{buttonText}</span>
                </PrimaryButton>
              )}
            </motion.section>
            {!leftContent && rightContent}
          </div>
        </>
      ) : (
        <>
          {!rightContent && leftContent}
          <motion.section
            className="flex flex-col items-start justify-center gap-4 text-ab-black"
            initial={{ opacity: 0, x: -100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { stiffness: 300, damping: 30, type: "spring" },
            }}
          >
            <PageAnchorText {...pageAnchor} />
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm">{description}</p>
            {buttonText && (
              <PrimaryButton
                className={`px-5 py-4 font-bold text-xs ${buttonClassname}`}
                onClick={handleButtonClick}
              >
                <span>{buttonText}</span>
              </PrimaryButton>
            )}
          </motion.section>
          {!leftContent && rightContent}
        </>
      )}
    </article>
  );
};
