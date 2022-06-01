import React, { useState } from "react";
import { AppProps } from "next/app";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/global.css";
import GenreContext, { IGenreContext } from "../contexts/genreContext";
import MediaContext, { IMediaContext } from "../contexts/mediaContext";
import { IGenre } from "../models/genreModel";
import { GENRE_TYPES } from "../resources/enums";
import useInitState from "../hooks/initStateHook";



export default function App({ Component, pageProps }: AppProps) {
  const {
    movieGenres, 
    seriesGenres, 
    media, 
    setMedia,
    setMovieGenres, 
    setSeriesGenres
  } = useInitState();

  const addGenre = (data: Array<IGenre>, type: GENRE_TYPES) =>{
    switch (type) {
      case GENRE_TYPES.MOVIE:
        setMovieGenres(data);
        break;

      case GENRE_TYPES.SERIES:
        setSeriesGenres(data);
        break;

      default:
        break;
    }
  }

  const genreContext: IGenreContext = {movieGenres, seriesGenres, addGenre};
  const mediaContext: IMediaContext = {media, setMedia};

  return (
    <GenreContext.Provider value={genreContext}>
      <MediaContext.Provider value={mediaContext}>
        <Component {...pageProps} />
      </MediaContext.Provider>
    </GenreContext.Provider>
  );
}
