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
            }
            coverImage {
                large
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
            }
            coverImage {
                large
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
            }
            coverImage {
                large
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
            }
            coverImage {
                large
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
            }
            coverImage {
                large
            }
        }
    }
}`;

export const InfoQuery = (id) => `query {
    Media (id: ${id}, type: ANIME) {
        id
        title {
            romaji
        }
        coverImage {
            large
        }
        bannerImage
        description
        format
        genres
        status
        season
        seasonYear
        averageScore
        trailer {
            id
            site
            thumbnail
        }
        studios(isMain: true) {
            nodes {
                name
            }
        }
        recommendations {
            nodes {
                mediaRecommendation {
                    id
                    title {
                        romaji
                    }
                    coverImage {
                        large
                    }
                }
            }
        }
    }
}`;