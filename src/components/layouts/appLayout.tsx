import React from "react";
import { getDictionary, Locale } from "@/dictionaries";
import { getSocialNetworks } from "@/api/firebase/games";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { getFooterUrls } from "@/lib";

interface AppLayoutProps {
  children: React.ReactNode;

  lang: Locale;
}

export const AppLayout = async ({ children, lang }: AppLayoutProps) => {
  const socialNetworks = await getSocialNetworks();
  const dictionary = await getDictionary(lang);
  const footerUrls = getFooterUrls(dictionary, lang);
  const currentYear = new Date().getFullYear();

  return (
    <div className="block relative w-full h-full overflow-y-auto overflow-x-hidden">
      <Header
        lang={lang}
        dictionary={dictionary.header}
        contactDict={dictionary.subscribe}
        socialNetworks={socialNetworks}
      />
      {children}
      <Footer
        lang={lang}
        dictionary={dictionary?.footer}
        currentYear={currentYear}
        footerUrls={footerUrls}
        contactDict={dictionary.subscribe}
        socialNetworks={socialNetworks}
      />
    </div>
  );
};
