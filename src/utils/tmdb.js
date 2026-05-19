const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const baseQueryParams = {
    include_adult: false,
    language: 'it-IT',
};

const getImageUrl = (path, size = 'original') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

const fetchFromTMDB = (endpoint) => {
    const url = `${TMDB_BASE_URL}${endpoint}`;
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
            'Content-Type': 'application/json;charset=utf-8',
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error(`TMDB API error: ${response.statusText}`);
        }
        return response.json();
    });
};

const searchMovies = (query) => {
    const params = new URLSearchParams({
        ...baseQueryParams,
        query,
    });

    return fetchFromTMDB(`/search/movie?${params}`);
};

const searchTvShows = (query) => {
    const params = new URLSearchParams({
        ...baseQueryParams,
        query,
    });

    return fetchFromTMDB(`/search/tv?${params}`);
};

const getGenres = (type) => {
    const param = new URLSearchParams({
        language: 'it',
    });
    return fetchFromTMDB(`/genre/${type}/list?${param}`);
};

export {
    searchMovies,
    searchTvShows,
    getGenres,
    getImageUrl,
};