import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import { BookCallButton, BookCallPanel } from "@/components/panel/services_panel/bookCallPanel";
import { getDictionary } from "@/dictionaries";
import { getDifferenceInDays } from "@/lib/utils";
import { fireChild, fireDBRef, fireGet } from "@/services/firebase";
import { PageProps } from "@/types/pageProps";
import { unstable_cache } from "next/cache";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

export default async function Services({ params: { lang } }: PageProps) {
    
    const dictionary = await getDictionary(lang);

    // ============================================================================
    // GET REMAINIG DAYS FROM FIREBASE
    // ============================================================================
    const getProjectOfferEndDate = async () => {
        const response = await fireGet(fireChild(fireDBRef, "offers/projects"));
        if(!response.exists()) {
            return "";
        }

        return response.val();
    }
    const getProjectOfferEndDateCachingData = unstable_cache(
        getProjectOfferEndDate,
        ["offers/projects"],
        {
            tags: ["offers/projects"],
            revalidate: 60 * 60 * 24, // cache the response for a day
        }
    );
    const offer = await getProjectOfferEndDateCachingData();
    const remainingDays = getDifferenceInDays(new Date(), new Date(offer));
    // ============================================================================
    
    return (
        <main className="block pt-[100px]">
            <video
                className="absolute top-0 w-full"
                autoPlay
                muted
                loop
                id="gameplay_video"
            >
                <source src="/featured_game/castle.mp4" type="video/mp4" />
            </video>
            <div className="absolute h-screen w-screen backdrop-blur-sm bg-gradient-to-b from-white/10 top-0" />

            {/* Book a Call section */}
            <ContentWrapper>
                <BookCallPanel dictionary={dictionary} remainingDays={remainingDays} />
            </ContentWrapper>

            <ContentWrapper className="relative bg-white gap-6 px-12">
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

                    <BookCallButton dictionary={dictionary} className="self-center text-white mt-3 flex px-8 py-1" backgroundClass="bg-ab-lilac" />
                </section>
            </ContentWrapper>

        </main>
    )
}