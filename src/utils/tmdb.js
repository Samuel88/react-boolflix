const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const baseQueryParams = {
    include_adult: false,
    language: 'it-IT',
};

const getImageUrl = (path, size = 'original') => {
    if (path) {
        return `https://image.tmdb.org/t/p/${size}${path}`;
    } else {
        return 'https://placehold.co/600x400?text=Non+Disponibile';
    }
};

// Maps TMDb ISO 639-1 language codes to ISO 3166-1 country codes
const languageToCountry = {
    en: 'US', // English -> United States flag
    ja: 'JP', // Japanese -> Japan flag
    es: 'ES', // Spanish -> Spain flag
    fr: 'FR', // French -> France flag
    zh: 'CN', // Chinese -> China flag
    ko: 'KR', // Korean -> South Korea flag
    it: 'IT', // Italian -> Italy flag
    hi: 'IN', // Hindi -> India flag
    de: 'DE', // German -> Germany flag
};

const normalizeFlagCode = (iso6391) => {
    return languageToCountry[iso6391] || iso6391;
};

const normalizeRating = (voteAverage) => {
    return Math.round((voteAverage / 10) * 5 * 2) / 2; // Normalizza su scala 0-5 con step di 0.5
};

const DESCRIPTION_MAX_LENGTH = 100;

const normalizeDescription = (description) => {
    if (description.length > DESCRIPTION_MAX_LENGTH) {
        return description.slice(0, DESCRIPTION_MAX_LENGTH) + '...';
    } else {
        return description;
    }
}

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

/*

Esempio di risultati

{
    "page": 1,
    "results": [
        {
        "adult": false,
        "backdrop_path": "/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
        "genre_ids": [
            18,
            53,
            35
        ],
        "id": 550,
        "original_language": "en",
        "original_title": "Fight Club",
        "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
        "popularity": 73.433,
        "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        "release_date": "1999-10-15",
        "title": "Fight Club",
        "video": false,
        "vote_average": 8.433,
        "vote_count": 26279
        },
        ...
    ],
    "total_pages": 2,
    "total_results": 39
}
*/
const extractMovieData = (movie) => {
    return {
        id: movie.id,
        type: 'movie',
        title: movie.title || movie.original_title,
        description: normalizeDescription(movie.overview),
        image: getImageUrl(movie.poster_path),
        release_date: movie.release_date,
        score: normalizeRating(movie.vote_average),
        original_language: normalizeFlagCode(movie.original_language),
        genres: movie.genre_ids,
    };
};


const searchMovies = (query) => {
    const params = new URLSearchParams({
        ...baseQueryParams,
        query,
    });

    return fetchFromTMDB(`/search/movie?${params}`)
        .then(data => {
            const movieResults = data.results;
            return movieResults.map(extractMovieData);
        });
};

/*
{
    "page": 1,
    "results": [
        {
        "adult": false,
        "backdrop_path": "/bsNm9z2TJfe0WO3RedPGWQ8mG1X.jpg",
        "genre_ids": [
            18,
            80
        ],
        "id": 1396,
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_name": "Breaking Bad",
        "overview": "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
        "popularity": 298.884,
        "poster_path": "/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        "first_air_date": "2008-01-20",
        "name": "Breaking Bad",
        "vote_average": 8.879,
        "vote_count": 11536
        }
    ],
    "total_pages": 1,
    "total_results": 1
}
*/
const extractTvShowData = (tvShow) => {
    return {
        id: tvShow.id,
        type: 'tv',
        title: tvShow.name,
        description: normalizeDescription(tvShow.overview),
        image: getImageUrl(tvShow.poster_path),
        release_date: tvShow.first_air_date,
        score: normalizeRating(tvShow.vote_average),
        original_language: normalizeFlagCode(tvShow.original_language),
        genres: tvShow.genre_ids,
    };
};

const searchTvShows = (query) => {
    const params = new URLSearchParams({
        ...baseQueryParams,
        query,
    });

    return fetchFromTMDB(`/search/tv?${params}`)
        .then(data => {
            const tvResults = data.results;
            return tvResults.map(extractTvShowData);
        });
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