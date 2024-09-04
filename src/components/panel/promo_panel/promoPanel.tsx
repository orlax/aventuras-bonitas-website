"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { useModal } from "@/store/useModal";
import { Locale } from "@/dictionaries";

type PromoPanelProps = {
  lang: Locale;
  dictionary: any;
  contactDict: any;
  className?: string;
  title: string;
  description: string;
  promoVideoURL?: string;
  buttonLabel: string;
};

export const PromoPanel = ({
  lang,
  dictionary,
  className = "",
  title,
  description,
  contactDict,
  promoVideoURL = "/featured_game/castle.mp4",
  buttonLabel,
}: PromoPanelProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const { onOpen } = useModal();


  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleVideoPlayer = () => {
    onOpen("contact-form", { contactDict, lang });
  };

  const promotionalImage = `/featured_game/home_promo.${lang}.png`;

  if (!isMounted) return <></>;

  return (
    <>
      <article
        className={`lg:h-[364px] flex md:h-auto xs:h-auto relative rounded-lg bg-black/80 md:flex-row
                xs:flex xs:flex-col xs:gap-0 pb-0
                md:pr-9 z-0 ${className}`}
      >
        <section className="relative flex md:w-full md:justify-end xs:justify-center self-end ml-[-65px]">
          {promotionalImage && (
            <Image
              className="w-full h-auto"
              src={promotionalImage}
              alt="Featured Game Promo"
              width={640}
              height={328}
              priority
            />
          )}
          {promotionalImage && (
            <div className="md:hidden xs:flex h-[150px] overflow-y-hidden -translate-y-7">
              <Image
                className="h-[250px] w-auto 
                            xs:relative"
                src={promotionalImage}
                alt="Featured Game Promo"
                width={640}
                height={328}
                priority
              />
            </div>
          )}
        </section>
        <section
          className="flex flex-col gap-5 items-start justify-center relative z-10
                    md:mt-0 xs:-mt-12 md:w-[240px]
                    md:py-14 xs:p-3 text-ab-black"
        >
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-sm text-white">{description}</p>
          <PrimaryButton onClick={toggleVideoPlayer}>
            {buttonLabel}
          </PrimaryButton>
          <a 
            target="_blank"
            className="text-sm text-white underline pl-2 text-lg whitespace-nowrap"
            style={{color: '#FFD700'}}
            href="https://aventurasbonitas.itch.io/henders-castle">{dictionary?.cta_download}</a>
        </section>
      </article>
    </>
  );
};
