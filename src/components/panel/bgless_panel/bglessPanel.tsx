"use client";

import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { PageAnchorText } from "@/components/text/pageAnchorText";
import { useModal } from "@/store/useModal";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

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
}: BglessPanelProps) => {
  const router = useRouter();

  const { onOpen } = useModal();

  const handleButtonClick = () =>
    redirectUrl && redirectUrl !== "/subscribe"
      ? router.push(redirectUrl)
      : onOpen("contact-form", { contactDict });

  return (
    <article
      className={`w-full grid md:grid-cols-2 xs:grid-cols-1 gap-4 ${className}`}
    >
      {!rightContent && leftContent}
      <section className="flex flex-col items-start justify-center gap-4 text-ab-black">
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
      </section>
      {!leftContent && rightContent}
    </article>
  );
};
