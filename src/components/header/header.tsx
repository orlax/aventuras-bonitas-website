"use client";

import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { HeaderMenuButton } from "../button";
import { usePathname, useRouter } from "next/navigation";
import { NAVIGATION } from "@/lib";
import Link from "next/link";
import { fireAppStorage, fireStorageRef } from "@/services/firebase";
import { getDownloadURL } from "firebase/storage";
import { AnimatePresence, motion } from "framer-motion";
import { HeaderMenuButtonLink } from "@/components/button/header/headerMenuButtonLink";
import { HeaderSelect } from "@/components/select/header_select/headerSelect";
import { cn } from "@/lib/utils";
import { useModal } from "@/store/useModal";
import { Locale } from "@/dictionaries";

type HeaderProps = {
  lang: Locale;
  dictionary: any;
  contactDict: any;
  socialNetworks: {
    id: string;
    name: string;
    url: string;
  }[];
};

export const Header = ({
  lang = "es",
  dictionary,
  socialNetworks,
  contactDict,
}: HeaderProps) => {
  const router = useRouter();
  const path = usePathname();

  const { onOpen } = useModal();

  const menuItems = [
    {
      text: "game",
      onClick: (main?: boolean) => {
        if (typeof main !== "boolean" && main !== true) {
          toggleMenu();
        }
        router.replace(`/${lang}/#${NAVIGATION.FEATURED_GAME}`);
      },
    },
    {
      text: "services",
      onClick: (main?: boolean) => {
        if (typeof main !== "boolean" && main !== true) {
          toggleMenu();
        }
        router.replace(`/${lang}/#${NAVIGATION.SERVICES}`);
      },
    },
    {
      text: "blog",
      onClick: (main?: boolean) => {
        if (typeof main !== "boolean" && main !== true) {
          toggleMenu();
        }
        router.replace(`/${lang}/${NAVIGATION.BLOG}`);
      },
    },
    {
      text: "about",
      onClick: (main?: boolean) => {
        if (typeof main !== "boolean" && main !== true) {
          toggleMenu();
        }
        router.replace(`/${lang}/#${NAVIGATION.ABOUT_US}`);
      },
    },
    {
      text: "contact",
      onClick: (main?: boolean) => {
        if (typeof main !== "boolean" && main !== true) {
          toggleMenu();
        }

        onOpen("contact-form", { contactDict, lang });
        //router.push(`/${lang}/subscribe`);
      },
    },
  ];
  const [menuVisible, setMenuVisible] = useState(false);
  const [blackBg, setBlackBg] = useState(false);
  const [promotionalImage, setPromotionalImage] = useState("");
  const componentLoaded = useRef(false);

  useEffect(() => {
    if (!componentLoaded.current) {
      componentLoaded.current = true;
      getPromotionalImage();
    }

    window.addEventListener("resize", (e: any) => {
      if (document.getElementById("sub-menu")) {
        if (e.currentTarget.innerWidth >= 768) {
          if (document.body.classList.contains("overflow-hidden")) {
            document.body.classList.remove("overflow-hidden");
          }
        } else {
          if (!document.body.classList.contains("overflow-hidden")) {
            document.body.classList.add("overflow-hidden");
          }
        }
      }
    });

    return window.addEventListener("resize", (e) => {});
  }, []);

  useEffect(() => {
    const splitPath = path.split("/");

    if (splitPath[2] !== undefined) {
      setBlackBg(true);
    } else {
      setBlackBg(false);
    }
  }, [path]);

  const getPromotionalImage = async () => {
    const firePromoImage = fireStorageRef(
      fireAppStorage,
      `/assets/featured_game/header_promo.${lang}.png`
    );
    const image = await getDownloadURL(firePromoImage);
    setPromotionalImage(image);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    !menuVisible && document.body.classList.add("overflow-hidden");
    menuVisible && document.body.classList.remove("overflow-hidden");
  };

  return (
    <motion.header
      className={cn("flex flex-col absolute w-full", blackBg && "bg-ab-black")}
      initial={{ top: -300 }}
      animate={{ top: 0, transition: { delay: 0.3 } }}
    >
      <div className="flex flex-1 relative w-full justify-between py-3 2xl:px-[20%] lg:px-40 md:px-20 xs:px-5 z-20">
        <div className="h-14 w-28 relative">
          <Link href={`/${lang}`} className="cursor-pointer">
            <Image
              src={`/logo/with_name_logo.${lang}.png`}
              alt="Nice Adventures Logo"
              className="object-contain w-full h-full"
              priority
              width={112}
              height={56}
            />
          </Link>
        </div>
        <button
          className="ml-4 hidden xs:flex md:hidden gap-1 items-center text-white md:-z-10 -z-10 xs:z-10"
          onClick={toggleMenu}
        >
          <label className="md:block sm:hidden xs:hidden text-sm">
            {menuVisible ? dictionary.close : dictionary.menu}
          </label>
          {menuVisible ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>

        <div className="flex xs:hidden md:flex sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] w-full">
          <ul className="flex flex-row gap-2 w-full items-center">
            {menuItems.map((item, index) => (
              <li
                className="flex flex-1 text-white"
                key={`header_menu_item_full_${index}`}
              >
                <HeaderMenuButtonLink
                  element={dictionary[item.text]}
                  onClick={item.onClick}
                />
              </li>
            ))}

            <li
              className="flex flex-1 text-white"
              key={`header_menu_item_full_lang`}
            >
              <HeaderMenuButtonLink
                element={<HeaderSelect lang={lang} />}
                onClick={() => {}}
                noButton
              />
            </li>
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            className="header-menu absolute pt-20 h-screen w-full z-10 xs:flex md:hidden"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300, opacity: 0 }}
            id="sub-menu"
          >
            <div className="bg-white w-full h-full flex 2xl:px-[30%] md:p-16 xs:py-4 xs:px-1 gap-4">
              <div className="flex-1 md:flex xs:hidden md:justify-center lg:justify-end">
                <div className="md:w-72 md:h-72 lg:w-96 rounded-lg relative">
                  {promotionalImage && (
                    <Image
                      className="h-auto w-full"
                      src={promotionalImage}
                      alt="Header Promo"
                      style={{
                        objectFit: "contain",
                      }}
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 md:justify-start xs:justify-between w-full">
                <ul className="flex flex-col gap-2">
                  {menuItems.map((item, index) => (
                    <li
                      className="flex flex-1"
                      key={`header_menu_item_${index}`}
                    >
                      <HeaderMenuButton
                        text={dictionary[item.text]}
                        onClick={item.onClick}
                      />
                    </li>
                  ))}
                  <li className="flex flex-1" key={`header_menu_item_lang`}>
                    <HeaderMenuButtonLink
                      element={
                        <HeaderSelect
                          lang={lang}
                          className="bg-gray-500 rounded-lg"
                        />
                      }
                      onClick={() => {}}
                    />
                  </li>
                </ul>
                <ul className="flex items-center gap-5 px-3 md:justify-start xs:justify-between">
                  {socialNetworks?.map((network) => (
                    <li key={`header_${network.id}`}>
                      <a
                        href={network.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="text-sm text-ab-gray hover:font-bold hover:text-ab-black">
                          {network.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
