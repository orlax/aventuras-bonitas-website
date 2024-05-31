import { fireChild, fireDBRef, fireGet } from "@/services/firebase";

type ABGame = {
    description: { [key: string]: string },
    featured: boolean,
    name: { [key: string]: string },
    platforms: { name: string, slug: string }[],
    promotional: { [key: string]: { title: string, description: string } },
    release_date: string,
    slug: string,
}

export const getFeaturedGame = async (lang: string) => {
    const response = await fireGet(fireChild(fireDBRef, 'games'));
    let featuredGame: ABGame = {
        description: { [lang]: "" },
        featured: false,
        name: { [lang]: "" },
        platforms: [],
        promotional: { [lang]: { title: "", description: "" } },
        release_date: "",
        slug: "",
    };

    response.val().forEach((game: ABGame) => {
        if(game?.featured) {
            featuredGame = game;
        }
    });

    return featuredGame;
}

type SocialNetwork = {
    id: string,
    name: string,
    url: string,
}

export const getSocialNetworks = async () => {
    const response = await fireGet(fireChild(fireDBRef, 'social_networks'));
    const socialNetworks: SocialNetwork[] = response.val();    
    return socialNetworks;
}