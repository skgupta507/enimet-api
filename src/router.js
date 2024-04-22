import { Router } from "express";
import {
    TrendingQuery,
    PopularQuery,
    CurrentSeasonQuery,
    NextSeasonQuery,
    FavoriteQuery,
    InfoQuery
} from "./queries.js";
import { anifetch, getEpisodes, extractGOGO } from "./utils.js";
const router = Router();

router.get("/", async (req, res) => {
    res.status(200).json({
        routes: [
            "/api/trending/:page/:per",
            "/api/popular/:page/:per",
            "/api/season/current/:page/:per",
            "/api/season/next/:page/:per",
            "/api/favorite/:page/:per",
            "/api/info/:id"
        ]
    })
});

router.get("/trending/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = [];
        const response = await (await anifetch.post("", { query: TrendingQuery(page, per) })).data
        response.data.Page.media.map(i => {
            data.push({
                id: i.id,
                title: i.title.romaji,
                cover: i.coverImage.large
            });
        });
        res.status(200).json({ pagination: {
            current: response.data.Page.pageInfo.currentPage,
            next: response.data.Page.pageInfo.hasNextPage
        }, data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/popular/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = [];
        const response = await (await anifetch.post("", { query: PopularQuery(page, per) })).data
        response.data.Page.media.map(i => {
            data.push({
                id: i.id,
                title: i.title.romaji,
                cover: i.coverImage.large
            });
        });
        res.status(200).json({ pagination: {
            current: response.data.Page.pageInfo.currentPage,
            next: response.data.Page.pageInfo.hasNextPage
        }, data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/season/current/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = [];
        const response = await (await anifetch.post("", { query: CurrentSeasonQuery(page, per) })).data
        response.data.Page.media.map(i => {
            data.push({
                id: i.id,
                title: i.title.romaji,
                cover: i.coverImage.large
            });
        });
        res.status(200).json({ pagination: {
            current: response.data.Page.pageInfo.currentPage,
            next: response.data.Page.pageInfo.hasNextPage
        }, data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/season/next/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = [];
        const response = await (await anifetch.post("", { query: NextSeasonQuery(page, per) })).data
        response.data.Page.media.map(i => {
            data.push({
                id: i.id,
                title: i.title.romaji,
                cover: i.coverImage.large
            });
        });
        res.status(200).json({ pagination: {
            current: response.data.Page.pageInfo.currentPage,
            next: response.data.Page.pageInfo.hasNextPage
        }, data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/favorite/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = [];
        const response = await (await anifetch.post("", { query: FavoriteQuery(page, per) })).data
        response.data.Page.media.map(i => {
            data.push({
                id: i.id,
                title: i.title.romaji,
                cover: i.coverImage.large
            });
        });
        res.status(200).json({ pagination: {
            current: response.data.Page.pageInfo.currentPage,
            next: response.data.Page.pageInfo.hasNextPage
        }, data });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/info/:id", async (req, res) => {
    try {
        const id = req.params.id
        const data = await (await anifetch.post("", { query: InfoQuery(id) })).data
        const recommendations = [];
        data.data.Media.recommendations.nodes.map(i => {
            if (i.mediaRecommendation) {
                recommendations.push({
                    id: i.mediaRecommendation.id,
                    title: i.mediaRecommendation.title.romaji,
                    cover: i.mediaRecommendation.coverImage.large
                });
            }
        });
        const gogoanime = await extractGOGO(id);
        res.status(200).json({
            id: data.data.Media.id,
            title: data.data.Media.title.romaji,
            cover: data.data.Media.coverImage.large,
            banner: data.data.Media.bannerImage,
            synopsis: data.data.Media.description,
            format: data.data.Media.format === "TV_SHORT"
                ? "TV Short" : data.data.Media.format === "MOVIE"
                    ? "Movie" : data.data.Media.format === "SPECIAL"
                        ? "Special" : data.data.Media.format === "MUSIC"
                            ? "Music" : data.data.Media.format,
            genres: data.data.Media.genres,
            status: data.data.Media.status === "FINISHED"
                ? "Finished" : data.data.Media.status === "RELEASING"
                    ? "Releasing" : data.data.Media.status === "NOT_YET_RELEASED"
                        ? "Not Yet Released" : data.data.Media.status === "CANCELLED"
                            ? "Cancelled" : data.data.Media.status,
            season: data.data.Media.season === "WINTER"
                ? "Winter" : data.data.Media.season === "SPRING"
                    ? "Spring" : data.data.Media.season === "SUMMER"
                        ? "Summer" : data.data.Media.season === "FALL"
                            ? "Fall" : data.data.Media.season,
            year: data.data.Media.seasonYear,
            score: data.data.Media.averageScore
                ? data.data.Media.averageScore / 10
                : data.data.Media.averageScore,
            studio: data.data.Media.studios.nodes.length > 0
                ? data.data.Media.studios.nodes[0].name : null,
            trailer: data.data.Media.trailer
                ? "https://www.youtube.com/watch?v=" + data.data.Media.trailer.id
                : data.data.Media.trailer,
            recommendations,
            episodes: await getEpisodes(gogoanime)
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router