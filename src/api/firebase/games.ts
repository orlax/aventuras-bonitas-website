import { Locale } from "@/dictionaries";

type ABGame = {
  description: { [key: string]: string };
  featured: boolean;
  name: { [key: string]: string };
  platforms: { name: string; slug: string }[];
  promotional: { [key: string]: { title: string; description: string } };
  release_date: string;
  slug: string;
  final: {[key: string]: string};
  bullets: { [key: string]: string[] };
};

export const getFeaturedGame = async (lang: Locale) => {
  const { games } = await import("@/api/data.json").then(
    (module) => module.default
  );

  let featuredGame: ABGame = {
    description: { [lang]: "" },
    featured: false,
    bullets:{ [lang]: [] },
    final:{ [lang]: "" },
    name: { [lang]: "" },
    platforms: [],
    promotional: { [lang]: { title: "", description: "" } },
    release_date: "",
    slug: "",
  };

  /* 
  Remove firebase
  const response = await fireGet(fireChild(fireDBRef, "games"));
  response.val().forEach((game: ABGame) => {
    if (game?.featured) {
      featuredGame = game;
    }
  }); 
  */

  games.forEach((game: any) => {
    if (game?.featured) {
      featuredGame = game;
    }
  });

  return featuredGame;
};

type SocialNetwork = {
  id: string;
  name: string;
  url: string;
};

export const getSocialNetworks = async () => {
  /* 
  remove firebase
  const response = await fireGet(fireChild(fireDBRef, "social_networks"));
  const socialNetworks: SocialNetwork[] = response.val(); 
  */

  const { social_networks } = await import("@/api/data.json").then(
    (module) => module.default
  );
  return social_networks;
};
