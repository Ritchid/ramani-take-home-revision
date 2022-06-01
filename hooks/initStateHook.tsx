import { useContext, useEffect, useState } from "react";
import GenreContext from "../contexts/genreContext";

import { IGenre } from "../models/genreModel";
import { IMedia } from "../models/mediaModel";
import { loadStates, saveStates } from "../utilities/utils";

export default function useInitState() {;
    const {movieGenres: MOVIE_GENRE, seriesGenres: SERIES_GENRE} = useContext(GenreContext);
    const [movieGenres, setMovieGenres] = useState<Array<IGenre>>([]);
    const [seriesGenres, setSeriesGenres] = useState<Array<IGenre>>([]);
    const [media, setMedia] = useState<Array<IMedia>>([]);

    useEffect(() =>{
        const initialState = loadStates();        
        setMovieGenres(initialState?.contexts?.movieGenres??[]);
        setSeriesGenres(initialState?.contexts?.seriesGenres??[]);
    }, []);

    // useEffect(() =>{
    //     console.log("triggered");
    //     console.log("Movies: ", MOVIE_GENRE.length);
        
        
        
    // }, [MOVIE_GENRE, SERIES_GENRE]);

    return {movieGenres, seriesGenres, setSeriesGenres, setMovieGenres, media, setMedia}
}