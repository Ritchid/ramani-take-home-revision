import React, { useCallback, useContext, useEffect } from "react";
import {isEmpty, map} from "lodash";

import MainLayout from "../layouts/layout";
import ActionBar from "../components/actionbar";
import {getMovieGenre, getSeriesGenre} from "../utilities/requests";
import {TIMERS} from "../resources/constants";
import { IGenre } from "../models/genreModel";
import GenreContext from "../contexts/genreContext";
import { GENRE_TYPES } from "../resources/enums";
import Media from "../components/media";
import useMedia from "../hooks/mediaHook";
import MediaLoader from "../components/loaders/mediaLoader";
import { Container } from "react-bootstrap";
import { IMedia } from "../models/mediaModel";
import { saveStates } from "../utilities/utils";


interface IHomeProps {
    movieGenreList: Array<IGenre>;
    seriesGenreList: Array<IGenre>;
}

function Home({movieGenreList, seriesGenreList}: IHomeProps) {
    const {addGenre} = useContext(GenreContext);
    const {isLoading, displayedMedia, setDisplayedMedia} = useMedia();
    

    useEffect(() =>{
        if(movieGenreList) {
            addGenre(movieGenreList, GENRE_TYPES.MOVIE);
        }

        if(seriesGenreList) {
            addGenre(seriesGenreList, GENRE_TYPES.SERIES);
        }

        return () =>{
            if(!isEmpty(movieGenreList) && !isEmpty(seriesGenreList))
                saveStates({
                    contexts: {
                        movieGenres: movieGenreList, 
                        seriesGenres: seriesGenreList
                    }
                });
        }
    }, []);

    const _onFilter = useCallback((list: Array<IMedia>): void =>{
        setDisplayedMedia(list);
    }, []);

    
    return (
        <MainLayout pageTitle="Home" header id="main">
            <>
                <ActionBar mediaNumber={displayedMedia.length} onFilter={_onFilter}/>

                <section style={{minHeight: "50vh"}}>
                    <Container fluid="md">
                        {isLoading? (
                            <MediaLoader/>
                        ) : (
                            <Media data={displayedMedia}/>
                        )}
                    </Container>
                </section>
            </>
        </MainLayout>
    );
}


export async function getStaticProps() {
    const movieGenreResult = await getMovieGenre();
    const seriesGenreResult = await getSeriesGenre();

    const movieGenreList: Array<IGenre> = [];
    const seriesGenreList: Array<IGenre> = [];

    if(!isEmpty(movieGenreResult?.genres)){
        map(movieGenreResult.genres, (genre: IGenre) => {
            movieGenreList.push(genre);
        });
    }

    if(!isEmpty(seriesGenreResult?.genres)){
        map(seriesGenreResult.genres, (genre: IGenre) => {
            seriesGenreList.push(genre);
        });
    }

    return {
        props: {
            movieGenreList,
            seriesGenreList
        },
        revalidate: TIMERS.revalidation.genre
    }
}
  

export default Home;