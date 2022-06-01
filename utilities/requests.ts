import axios, {AxiosError} from "axios";

import {APP_CONFIGS} from "../resources/constants";
const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    timeout: 60000,
    // withCredentials: true,
    // params: {
    //     api_key: process.env.TMDB_API_KEY
    // },
    headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`
    }
});


// GENRE REQUESTS ----------------------------------------------------------------
export async function getMovieGenre(): Promise<any> {
    try {
        const genre = await api.get("genre/movie/list", {
            params: {
                language: APP_CONFIGS.language
            }
        });
        return genre.data;
    } catch (error) {
        return error;
    }
}

export async function getSeriesGenre(): Promise<any> {
    try {
        const genre = await api.get("genre/tv/list", {
            params: {
                language: APP_CONFIGS.language
            }
        });
        return genre.data;
    } catch (error) {
        return error;
    }
}

export async function getAllMovies(path: string): Promise<any> {
    try {        
        const allMovies = await api.get(path, {
            params: {
                language: APP_CONFIGS.language
            }
        });        
        return allMovies.data;
    } catch (error) {
        return error;
    }
}

export async function searchWords(path: string, query: string): Promise<any> {
    try {        
        const searchResult = await api.get(path, {
            params: {
                language: APP_CONFIGS.language,
                query
            }
        });        
        return searchResult.data;
    } catch (error) {
        return error;
    }
}

export async function getMedium(path: string, id: string): Promise<any> {
    try {        
        const searchResult = await api.get(path, {
            params: {
                language: APP_CONFIGS.language,
                id
            }
        });        
        return searchResult.data;
    } catch (error) {
        return error;
    }
}