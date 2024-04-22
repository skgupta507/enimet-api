import axios from "axios";
import { load } from "cheerio";

export const anifetch = axios.create({
    baseURL: "https://graphql.anilist.co",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export const getCurrentYear = () => {
    return new Date().getFullYear();
}

export const getCurrentSeason = () => {
    const now = new Date();
    const month = now.getMonth() + 1
    switch (true) {
        case month >= 3 && month <= 5:
            return "SPRING"
        case month >= 6 && month <= 8:
            return "SUMMER"
        case month >= 9 && month <= 11:
            return "AUTUMN"
        default:
            return "WINTER"
    }
}

export const getNextSeason = () => {
    const now = new Date();
    const month = now.getMonth() + 1
    switch (true) {
        case month >= 3 && month <= 5:
            return "SUMMER"
        case month >= 6 && month <= 8:
            return "AUTUMN"
        case month >= 9 && month <= 11:
            return "WINTER"
        default:
            return "SPRING"
    }
}

export const getEpisodes = async (id) => {
    try {
        const data = await (await axios.get(`https://anitaku.so/category/${id}`)).data
        const $ = load(data);
        const start = $("#episode_page > li").first().find("a").attr("ep_start");
        const end = $("#episode_page > li").last().find("a").attr("ep_end");
        const movie = $("#movie_id").attr("value");
        const alias = $("#alias_anime").attr("value");
        const epurl = "https://ajax.gogocdn.net/ajax/load-list-episode"
        const eps = (await axios.get(`${epurl}?ep_start=${start}&ep_end=${end}&id=${movie}&default_ep=${0}&alias=${alias}`))
            .data
        const $$ = load(eps);
        const episodes = [];
        $$("#episode_related > li").each((i, e) => {
            episodes.push({
                id: $(e).find("a").attr("href").split("/")[1],
                episode: $(e).find("div.name").text().replace("EP ", "")
            });
        });
        return episodes
    } catch (error) {
        return []
    }
}

export const extractGOGO = async (id) => {
    try {
        const url = `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/anilist/anime/${id}.json`;
        const response = await axios.get(url);
        const gogoanime = response.data.Sites.Gogoanime
        const key = Object.keys(gogoanime)[0];
        const identifier = gogoanime[key].identifier
        return identifier
    } catch (error) {
        return null
    }
}