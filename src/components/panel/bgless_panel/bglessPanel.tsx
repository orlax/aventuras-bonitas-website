"use client";

import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { PageAnchorText } from "@/components/text/pageAnchorText";
import { useModal } from "@/store/useModal";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Locale } from "@/dictionaries";

type BglessPanelProps = {
  className?: string;
  dictionary: any;
  rightContent?: ReactNode | ReactNode[];
  leftContent?: ReactNode | ReactNode[];
  bullets: string[];
  final:string;
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
  lang?: Locale;
};

export const BglessPanel = ({
  dictionary,
  className = "",
  rightContent = null,
  leftContent = null,
  pageAnchor,
  title,
  description,
  bullets, 
  final,
  buttonText,
  buttonClassname = "",
  redirectUrl,
  contactDict,
  carousellImgs,
  lang,
}: BglessPanelProps) => {
  const router = useRouter();

  const { onOpen } = useModal();

  const handleButtonClick = () =>
    redirectUrl && redirectUrl !== "/subscribe"
      ? router.push(redirectUrl)
      : lang
      ? onOpen("contact-form", { contactDict, lang })
      : null;

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
              <h2 className="text-3xl font-bold max-w-[270px]">{title}</h2>
              <p className="text-md">{description}</p>
              <ul className="list-disc max-w-[256px]">
                {bullets.map((bullet, index) => (
                  <li key={index} className="text-sm mb-4">
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="text-md">{final}</p>
              {buttonText && (
                <PrimaryButton
                  className={`px-5 py-4 font-bold text-xs ${buttonClassname}`}
                  onClick={handleButtonClick}
                >
                  <span>{buttonText}</span>
                </PrimaryButton>
              )}
              <a 
              target="_blank"
              className="text-sm text-white underline pl-2 text-lg whitespace-nowrap mx-auto md:mx-0"
              style={{color: '#FFD700'}}
              href="https://aventurasbonitas.itch.io/henders-castle">{dictionary?.cta_download}</a>
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
