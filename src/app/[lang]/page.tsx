import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import { Header } from "@/components/header/header";
import {
  SpringCarousel,
  SpringCarouselImage,
} from "@/components/images/spring_carousel/springCarousel";
import { BglessPanel } from "@/components/panel/bgless_panel/bglessPanel";
import { PlatformPanel } from "@/components/panel/featured_game/platformPanel";
import { PromoPanel } from "@/components/panel/promo_panel/promoPanel";
import { getFooterUrls, NAVIGATION } from "@/lib";
import { getDictionary, Locale } from "../../dictionaries";
import { promises as fs } from "fs";
import { ServicesPanel } from "@/components/panel/services_panel/servicesPanel";
import { Footer } from "@/components/footer/footer";
import { getFeaturedGame, getSocialNetworks } from "@/api/firebase/games";
import { fireAppStorage, fireStorageRef } from "@/services/firebase";
import { getDownloadURL } from "firebase/storage";

type HomeProps = {
  params: {
    lang: Locale;
  };
};

export default async function Home({ params: { lang } }: HomeProps) {
  const featuredGame = await getFeaturedGame(lang);

  const dictionary = await getDictionary(lang);
  const file = await fs.readFile(process.cwd() + "/src/api/data.json", "utf8");
  const data = JSON.parse(file);

  const firePromoVideo = fireStorageRef(
    fireAppStorage,
    "/assets/featured_game/gameplay_video.mp4"
  );
  const promoVideo = await getDownloadURL(firePromoVideo);

  const slides = data?.gallery.map((slide: SpringCarouselImage) => ({
    content: (
      <img
        src={slide?.url}
        alt={slide.name}
        className="h-auto w-[200px] rounded-lg
          transition ease-in-out delay-150 hover:scale-150 duration-300
        "
      />
    ),
    ...slide,
  }));

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

      {/* Featured Game */}
      <ContentWrapper>
        <PromoPanel
          lang={lang}
          title={featuredGame?.promotional[lang]?.title}
          description={featuredGame?.promotional[lang]?.description}
          promoVideoURL={promoVideo}
          buttonLabel={dictionary.promo_panel.button_label}
        />
      </ContentWrapper>

      {/* Gallery */}
      <div className="relative w-full pt-12 bg-gradient-to-t from-white from-80% z-0">
        <ContentWrapper className="flex flex-col gap-4">
          <BglessPanel
            title={featuredGame.name[lang]}
            description={featuredGame.description[lang]}
            pageAnchor={{
              id: NAVIGATION.FEATURED_GAME,
              text: dictionary?.featured_game?.page_anchor,
              url: `#${NAVIGATION.FEATURED_GAME}`,
            }}
            rightContent={<SpringCarousel slides={slides} />}
            buttonClassname="bg-ab-orange"
            buttonText={dictionary?.featured_game.button}
            redirectUrl={"/subscribe"}
            contactDict={dictionary?.subscribe}
          />

          <PlatformPanel
            dictionary={dictionary?.platform}
            release_date={featuredGame.release_date}
            platforms={featuredGame.platforms}
          />
        </ContentWrapper>
      </div>
      <div className="relative w-full bg-white z-0">
        {/* About Us */}
        <ContentWrapper className="flex flex-col bg-gradient-to-t from-white/90 from-5% via-ab-light-blue via-90% gap-8">
          <BglessPanel
            leftContent={
              <div className="xl:h-[500px] md:h-72 xs:56 w-full overflow-hidden rounded-lg flex justify-center items-center">
                <img
                  className="h-auto w-full"
                  src="/about/the_team.jpg"
                  alt="About Us"
                />
              </div>
            }
            title={dictionary?.about.title}
            description={dictionary?.about.description}
            pageAnchor={{
              id: NAVIGATION.ABOUT_US,
              text: dictionary?.about?.page_anchor,
              url: `#${NAVIGATION.ABOUT_US}`,
            }}
            buttonClassname="text-white"
          />

          {/* Our Services */}
          <ServicesPanel dictionary={dictionary?.services} />
        </ContentWrapper>
      </div>
    </main>
  );
}
