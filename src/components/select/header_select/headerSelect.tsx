"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/useClickOutside";

const LANGS = {
  es: {
    imgPath: "/flags/es.svg",
    title: "Spanish",
    path: "es",
  },
  en: {
    imgPath: "/flags/en.svg",
    title: "English",
    path: "en",
  },
  jp: {
    imgPath: "/flags/jp.svg",
    title: "Japanese",
    path: "jp",
  },
};

interface HeaderSelectProps {
  lang: "es" | "en" | "jp";
  className?: string;
}

export const HeaderSelect = ({ lang, className }: HeaderSelectProps) => {
  const [displaySelect, setDisplaySelect] = useState(false);
  const selectedLang = LANGS[lang];

  const pathName = usePathname();

  const router = useRouter();
  const ref = useOutsideClick(() => setDisplaySelect(false));

  const changeLanguage = (path: string) => {
    const splitPath = pathName.split("/");
    let substring = "";
    for (let index = 2; index < splitPath.length; index++) {
      if (splitPath[index]) {
        substring += `/${splitPath[index]}`;
      }
    }

    const redirectPath = `/${path}${substring}`;
    setDisplaySelect(false);
    router.push(redirectPath);
  };

  return (
    <>
      <div
        id="states-button"
        data-dropdown-toggle="dropdown-states"
        className={cn(
          "flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-transparent border-0 rounded-s-lg focus:ring-none focus:outline-none focus:ring-0  !text-white dark:border-gray-600 relative",
          className
        )}
        role="button"
        onClick={() => setDisplaySelect(!displaySelect)}
      >
        <Image
          src={selectedLang.imgPath}
          width={16}
          height={12}
          alt="main-lang"
          className="mr-2"
        />
        {selectedLang.title}
        <div>
          <svg
            className={cn(
              "w-2.5 h-2.5 ms-2.5",
              displaySelect && "transform rotate-180"
            )}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </div>
        <AnimatePresence>
          {displaySelect && (
            <motion.div
              id="dropdown-states"
              className="z-10 absolute divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 top-[60px] left-0"
              initial={{ opacity: 0, y: -30 }}
              exit={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              ref={ref}
            >
              <ul
                className="py-2 text-sm text-gray-200"
                aria-labelledby="states-button"
              >
                {Object.entries(LANGS).map((langData) => {
                  return (
                    <li key={`lang_item_menu_${langData[0]}`}>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-600 hover:text-white transition-all"
                        onClick={() => changeLanguage(langData[1].path)}
                      >
                        <div className="inline-flex items-center">
                          <Image
                            src={langData[1].imgPath}
                            width={16}
                            height={12}
                            alt="main-lang"
                            className="mr-2"
                          />
                          {langData[1].title}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
