import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import { SubscribeForm } from "@/components/form/subscribeForm";
import { getDictionary, Locale } from "@/dictionaries";
import Image from "next/image";

export default async function Subscribe({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="block bg-ab-black">
      <ContentWrapper
        className="min-h-screen w-full bg-gradient-to-l from-ab-light-blue from-70% to-white
                flex items-center gap-4 py-10 md:flex-row sm:flex-col xs:flex-col"
      >
        <section className="flex flex-col items-center text-center gap-4">
          <Image
            className="h-64 w-auto rounded-full"
            src="/logo/logo512.png"
            alt="company-logo"
            width={512}
            height={512}
          />
          <h3 className="text-3xl text-ab-black">
            {dictionary.subscribe.title}
          </h3>
        </section>
        <SubscribeForm dictionary={dictionary.subscribe} lang={lang} />
      </ContentWrapper>
    </main>
  );
}
