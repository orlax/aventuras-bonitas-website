import { getSocialNetworks } from "@/api/firebase/games";
import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import { Footer } from "@/components/footer/footer";
import { SubscribeForm } from "@/components/form/subscribeForm";
import { Header } from "@/components/header/header";
import { getDictionary, Locale } from "@/dictionaries";
import { getFooterUrls } from "@/lib";
import { promises as fs } from 'fs';

export default async function Subscribe({ params: { lang } }: { params: { lang: Locale }  }) {
    const socialNetworks = await getSocialNetworks();
    const dictionary = await getDictionary(lang);
    const file = await fs.readFile(process.cwd() + '/src/api/data.json', 'utf8');
    const data = JSON.parse(file);
    const currentYear = new Date().getFullYear();
    const footerUrls = getFooterUrls(dictionary, lang);

    return (
        <main className="block bg-ab-black">
            <Header lang={lang} dictionary={dictionary.header} socialNetworks={socialNetworks}/>
            <ContentWrapper className="min-h-screen w-full bg-gradient-to-l from-ab-light-blue from-70% to-white
                flex items-center gap-4 py-10 md:flex-row sm:flex-col xs:flex-col"
            >
                <section className="flex flex-col items-center text-center gap-4">
                    <img className="h-64 w-auto rounded-full" src="/logo/logo512.png" alt="company-logo" />
                    <h3 className="text-3xl text-ab-black">{dictionary.subscribe.title}</h3>
                </section>
                <SubscribeForm dictionary={dictionary.subscribe} />
            </ContentWrapper>
            <Footer 
                lang={lang}
                dictionary={dictionary?.footer}
                currentYear={currentYear}
                footerUrls={footerUrls}
                socialNetworks={socialNetworks}
            />
        </main>
    )
}