import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import { BookCallButton, BookCallPanel } from "@/components/panel/services_panel/bookCallPanel";
import { getDictionary } from "@/dictionaries";
import { fireAppStorage, fireStorageRef } from "@/services/firebase";
import { PageProps } from "@/types/pageProps";
import { getDownloadURL } from "firebase/storage";

export default async function Services({ params: { lang } }: PageProps) {
    
    const dictionary = await getDictionary(lang);

    const firePromoVideo = fireStorageRef(
        fireAppStorage,
        "/assets/featured_game/castle.mp4"
    );
    const promoVideo = await getDownloadURL(firePromoVideo);

    return (
        <main className="block pt-[100px]">
            <video
                className="absolute top-0 w-full"
                autoPlay
                muted
                loop
                id="gameplay_video"
            >
                <source src={promoVideo} type="video/mp4" />
            </video>
            <div className="absolute h-screen w-screen backdrop-blur-sm bg-gradient-to-b from-white/10 top-0" />

            {/* Book a Call section */}
            <ContentWrapper>
                <BookCallPanel dictionary={dictionary} />
            </ContentWrapper>

            <ContentWrapper className="relative bg-white gap-6">
                {/* Game development */}
                <section className="flex flex-col items-center justify-center text-center text-black gap-2">
                    <div className="flex flex-col pt-5 font-semibold">
                        <h2 className="text-3xl">
                            {dictionary.services.page_game_service_title}
                        </h2>
                        <h2 className="text-3xl">
                            {dictionary.services.page_game_service_title_2}
                        </h2>
                    </div>

                    <p className="w-1/2">
                        {dictionary.services.page_game_service_description}
                    </p>
                </section>

                {/* Why Us */}
                <section className="flex flex-col text-black gap-2 w-full">
                    <div className="flex flex-col pt-5 font-semibold text-ab-lilac">
                        <h3 className="text-2xl">
                            {dictionary.services.page_why_us_title}
                        </h3>
                    </div>

                    <ul className="flex flex-col gap-2">
                    {dictionary.services.page_why_us_reasons.map((text, index) => (
                            <li key={`why_us_${index}`}>
                                <p className="before:content-['-_']">{text}</p>
                            </li>
                    ))} 
                    </ul>
                </section>

                {/* What we do */}
                <section className="flex flex-col text-black gap-2 w-full">
                    <div className="flex flex-col pt-5 font-semibold text-ab-lilac">
                        <h3 className="text-2xl">
                            {dictionary.services.page_stack_title}
                        </h3>
                    </div>

                    <ul className="flex flex-col gap-2">
                    {dictionary.services.page_stack_list.map((text, index) => (
                            <li key={`why_us_${index}`}>
                                <p className="before:content-['-_']">{text}</p>
                            </li>
                    ))} 
                    </ul>
                </section>

                {/* Trusted by */}
                <section className="flex flex-col text-black gap-2 w-full">
                    <div className="flex flex-col pt-5 font-semibold text-ab-lilac">
                        <h3 className="text-2xl">
                            {dictionary.services.page_trusted_by_title}
                        </h3>
                    </div>

                    <p>{dictionary.services.page_trusted_by_description}</p>

                    {/* TODO: add company images... */}
                </section>

                {/* Comments */}
                <section className="flex flex-col text-black gap-2 w-full items-start">
                    <div className="flex flex-col pt-5 font-semibold text-ab-lilac">
                        <h3 className="text-2xl">
                            {dictionary.services.page_comments_title}
                        </h3>
                    </div>

                    <p>{dictionary.services.page_comments_description}</p>

                    <BookCallButton dictionary={dictionary} className="self-center bg-ab-lilac text-white mt-3 flex px-8 py-1" />
                </section>
            </ContentWrapper>

        </main>
    )
}