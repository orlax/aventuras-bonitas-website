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
        style={{
          backgroundImage: "url(/storage/gameplay_05.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="min-h-screen w-full flex items-center flex-col p-24"
      >
        <section className="flex flex-col items-center text-left max-w-[524px] mx-auto bg-black/80 rounded-xl text-white mt-24" >
          <Image
            className="h-64 w-auto rounded-full mt-[-24px]"
            src="/logo/logo512.png"
            alt="company-logo"
            width={512}
            height={512}
          />
          <h3 className="text-3xl text-center text-white max-w-[324px] mx-[24px]">
            {dictionary.subscribe.title}
          </h3>
          <SubscribeForm dictionary={dictionary.subscribe} lang={lang} />
        </section>
        
      </ContentWrapper>
    </main>
  );
}
