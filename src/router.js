import { Router } from "express";
import axios from "axios";
import {
    TrendingQuery,
    PopularQuery,
    CurrentSeasonQuery,
    NextSeasonQuery,
    FavoriteQuery
} from "./queries.js";
const router = Router();

const anifetch = axios.create({
    baseURL: "https://graphql.anilist.co",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

router.get("/", async (req, res) => {
    res.status(200).json({
        routes: [
            "/api/trending/:page/:per",
            "/api/popular/:page/:per",
            "/api/season/current/:page/:per",
            "/api/season/next/:page/:per",
            "/api/favorite/:page/:per"
        ]
    })
});

router.get("/trending/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = await (await anifetch.post("", { query: TrendingQuery(page, per) })).data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/popular/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = await (await anifetch.post("", { query: PopularQuery(page, per) })).data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/season/current/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = await (await anifetch.post("", { query: CurrentSeasonQuery(page, per) })).data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/season/next/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = await (await anifetch.post("", { query: NextSeasonQuery(page, per) })).data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get("/favorite/:page?/:per?", async (req, res) => {
    try {
        const page = req.params.page || 1
        const per = req.params.per || 20
        const data = await (await anifetch.post("", { query: FavoriteQuery(page, per) })).data
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router