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
        className={`lg:h-[364px] xl:max-w-[1424px] xl:mt-[96px] 2xl:mt-[128px] xl:mx-auto flex md:h-auto xs:h-auto relative rounded-lg bg-black/80 md:flex-row
                xs:flex xs:flex-col xs:gap-0 pb-0
                md:pr-9 z-0 ${className}`}
      >
        <section className="relative flex w-full md:justify-end xs:justify-center 
                            self-end lg:ml-[-65px]  relative 
                            right-0 md:right-[-122px] lg:right-0 
                            ml-0 md:ml-[-244px]
                            w-[120%] right-[-10%]">
          {promotionalImage && (
            <Image
              className="w-full h-auto hidden md:block"
              src={promotionalImage}
              alt="Featured Game Promo"
              width={1024}
              height={525}
              priority
            />
          )}
          {promotionalImage && (
            <div className="md:hidden xs:flex w-full">
              <Image
                className="w-full h-auto 
                            xs:relative"
                src={promotionalImage}
                alt="Featured Game Promo"
                width={1024}
                height={525}
                priority
              />
            </div>
          )}
        </section>
        <section
          className="flex flex-col gap-5 items-start justify-center relative z-10
                    mt-6 px-24 text-center
                    md:mt-0 md:w-[240px]
                    md:px-4 md:text-left
                    md:py-14 xs:p-3 text-ab-black
                    md:bg-black/80
                    lg:bg-transparent
                    "
        >
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="text-sm text-white">{description}</p>
          <PrimaryButton onClick={toggleVideoPlayer}>
            {buttonLabel}
          </PrimaryButton>
          <a 
            target="_blank"
            className="text-sm text-white underline pl-2 text-lg whitespace-nowrap mx-auto md:mx-0"
            style={{color: '#FFD700'}}
            href="https://aventurasbonitas.itch.io/henders-castle">{dictionary?.cta_download}</a>
        </section>
      </article>
    </>
  );
};
