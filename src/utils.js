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