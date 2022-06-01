import { MEDIA_TYPES } from "../resources/enums";

interface IMedaiResponseTypes {
    media_type: string;
    name?: string;
    original_name?: string;
    title?: string;
    original_title?: string;
    id: number;
    backdrop_path?: string;
    first_air_date: string;
    genre_ids: Array<number> | null; 
    overview: string;
    popularity: number;
    poster_path?: string;
}

export interface IMedia {
    mediaType: MEDIA_TYPES;
    title: string;
    id: number;
    coverImg?: string;
    publishedOn: Date | null;
    relatedGenres: Array<number>;
    overview: string;
    popularity: number;
    posterImg?: string;
}

class Media {
    mediaType: MEDIA_TYPES;
    title: string;
    id: number;
    coverImg?: string;
    publishedOn: Date | null;
    relatedGenres: Array<number>;
    overview: string;
    popularity: number;
    posterImg?: string;

    constructor(data: IMedaiResponseTypes) {
        this.mediaType = data.media_type=="tv"? MEDIA_TYPES.SERIES : MEDIA_TYPES.MOVIE;
        this.title = data?.name || data?.original_name || data?.title || data?.original_title || "No title";
        this.id = data.id;
        this.coverImg = data.backdrop_path;
        this.publishedOn = new Date(data.first_air_date)??null;
        this.relatedGenres = data.genre_ids??[];
        this.overview = data.overview;
        this.popularity = data.popularity;
        this.posterImg = data.poster_path;
    }
}

export default Media;