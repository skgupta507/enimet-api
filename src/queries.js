import { getCurrentYear, getCurrentSeason, getNextSeason } from "./utils.js";

export const TrendingQuery = (page, per) => `query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }
}`;

export const PopularQuery = (page, per) => `query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }
}`;

export const CurrentSeasonQuery = (page, per) => `query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC, season: ${getCurrentSeason()}, seasonYear: ${getCurrentYear()}) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }
}`;

export const NextSeasonQuery = (page, per) => `query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: POPULARITY_DESC, season: ${getNextSeason()}, seasonYear: ${getCurrentYear()}) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }
}`;

export const FavoriteQuery = (page, per) => `query {
    Page(page: ${page}, perPage: ${per}) {
        pageInfo {
            currentPage
            hasNextPage
        }
        media(type: ANIME, sort: [FAVOURITES_DESC, POPULARITY_DESC]) {
            id
            title {
                romaji
                english
                native
            }
            coverImage {
                extraLarge
                large
                medium
            }
        }
    }
}`;