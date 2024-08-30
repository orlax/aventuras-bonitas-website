"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SimpleBackdrop } from "@/components/backdrop/simpleBackdrop";
import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { fireAppStorage, fireStorageRef } from "@/services/firebase";
import { getDownloadURL } from "firebase/storage";

type PromoPanelProps = {
  lang: any;
  className?: string;
  title: string;
  description: string;
  promoVideoURL?: string;
  buttonLabel: string;
};

export const PromoPanel = ({
  lang,
  className = "",
  title,
  description,
  promoVideoURL = "/featured_game/gameplay_video.mp4",
  buttonLabel,
}: PromoPanelProps) => {
  const [videoPlayerVisible, setVideoPlayerVisible] = useState(false);
  const [promotionalImage, setPromotionalImage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    getPromotionalImage();
  }, []);

  const getPromotionalImage = async () => {
    const firePromoImage = fireStorageRef(
      fireAppStorage,
      `/assets/featured_game/home_promo.${lang}.png`
    );
    const image = await getDownloadURL(firePromoImage);
    setPromotionalImage(image);
  };

  const toggleVideoPlayer = () => {
    window.scrollTo({ top: 0, left: 0 });
    setVideoPlayerVisible(!videoPlayerVisible);
    !videoPlayerVisible && document.body.classList.add("overflow-hidden");
    videoPlayerVisible && document.body.classList.remove("overflow-hidden");
  };

  if (!isMounted) return <></>;

  return (
    <>
      <article
        className={`lg:h-[400px] md:h-auto xs:h-auto relative rounded-lg bg-ab-white-a-80 md:grid md:grid-cols-2 md:gap-3
                xs:flex xs:flex-col xs:gap-0
                md:pr-9 md:pb-1 xs:p-0 z-0 ${className}`}
      >
        <section className="relative flex md:justify-end xs:justify-center">
          {promotionalImage && (
            <Image
              className="lg:h-[450px] md:h-[365px] md:block xs:hidden w-auto z-0 
                        md:absolute md:top-0 xs:relative
                        md:-translate-y-9 md:translate-x-6
                        xs:-translate-y-5
                        transition delay-500 opacity-100"
              src={promotionalImage}
              alt="Featured Game Promo"
              width={640}
              height={905}
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
                height={905}
                priority
              />
            </div>
          )}
        </section>
        <section
          className="flex flex-col gap-5 items-start justify-center relative z-10
                    md:mt-0 xs:-mt-12
                    md:py-14 xs:p-3 text-ab-black"
        >
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm">{description}</p>
          <PrimaryButton onClick={toggleVideoPlayer}>
            <p className="text-white font-semibold text-xs">{buttonLabel}</p>
          </PrimaryButton>
        </section>
      </article>
      {videoPlayerVisible && (
        <SimpleBackdrop onClickOutside={toggleVideoPlayer}>
          <video className="h-[80vh]" autoPlay controls id="gameplay_video">
            <source src={promoVideoURL} type="video/mp4" />
          </video>
        </SimpleBackdrop>
      )}
    </>
  );
};
