import React, { Dispatch, useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {capitalize} from "lodash";

import styles from "../styles/actionbar.module.css";
import { GENRE_TYPES, MEDIA_TYPES } from "../resources/enums";
import GenreContext from "../contexts/genreContext";
import { IGenre } from "../models/genreModel";
import useModal from "../hooks/components/modalHook";
import ModalSeach from "./searchContent";
import MediaContext from "../contexts/mediaContext";


interface IActionBarProps {
    mediaNumber?: number;
    onFilter: (selected: any) => void;
}

function ActionBar({mediaNumber=0, onFilter}: IActionBarProps): JSX.Element {
    const {movieGenres: MOVIE_GENRE, seriesGenres: SERIES_GENRE} = useContext(GenreContext);
    const {media: MEDIA} = useContext(MediaContext);
    const {ModalComponent, showModal} = useModal();
    const [mediaType, setMediaType] = useState<GENRE_TYPES>(-1);
    const [genreList, setGenreList] = useState<Array<IGenre>>([]);
    const [selectedGenre, setSelectedGenre] = useState("");

    const handleFilter = (val?: GENRE_TYPES) =>{
        const genreType = val??mediaType;
        switch (genreType) {
            case GENRE_TYPES.MOVIE:
                const selected = MEDIA.filter((medium)=> medium.mediaType == MEDIA_TYPES.MOVIE);
                onFilter(selected);
                break;
            case GENRE_TYPES.SERIES:
                const selectedItems = MEDIA.filter((medium)=> medium.mediaType == MEDIA_TYPES.SERIES);
                onFilter(selectedItems);
                break;
                
            default:
                onFilter(MEDIA);
                break;
        }
    }

    const _handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = Number(e.currentTarget.value);
        setMediaType(val);
        if(val === GENRE_TYPES.MOVIE) setGenreList(MOVIE_GENRE);
        else if(val === GENRE_TYPES.SERIES) setGenreList(SERIES_GENRE);
        setSelectedGenre("");
        handleFilter(val);
    }

    const _handleGenreTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.currentTarget.value;
        const genreList = mediaType == GENRE_TYPES.MOVIE? MOVIE_GENRE : SERIES_GENRE;
        const genre = genreList.find((genre) => genre.name == val);

        const _mediaType = mediaType == GENRE_TYPES.MOVIE? MEDIA_TYPES.MOVIE : MEDIA_TYPES.SERIES;
        const list = MEDIA.filter((medium)=> medium.mediaType == _mediaType);

        let selectedList = [];
        if(genre) {
            selectedList = list.filter((medium)=> 
                medium.mediaType == _mediaType && medium.relatedGenres.includes(genre.id)
            );
            onFilter(selectedList);
            setSelectedGenre(genre.name);
        } else {
            handleFilter();
            setSelectedGenre("");
        }

    }

    const _showSearchModal = () =>{
        showModal({
            fullscreen: true,
            scrollable: true,
            title: "Search",
            content: (<ModalSeach />)
        })
    }

    return (
        <div className="mb-4">
            <Container fluid="md">
                <Row className={styles.actionbar}>
                    <Col xs={6} sm={5} md={3}>
                        <Form.Select aria-label="Filter" value={mediaType} onChange={_handleMediaTypeChange}>
                            <option>Select Type</option>
                            <option value={GENRE_TYPES.MOVIE}>Movies</option>
                            <option value={GENRE_TYPES.SERIES}>TV Series</option>
                        </Form.Select>
                    </Col>

                    <Col xs={6} sm={5} md={3}>
                        {mediaType>= 0? (
                            <Form.Select aria-label="Genres" value={selectedGenre} onChange={_handleGenreTypeChange}>
                                <option>Select Genre</option>
                                {genreList.map((genre) =>(
                                    <option key={genre.id} value={genre.name}>{genre.name}</option>
                                ))}
                            </Form.Select>
                        ) : null}
                    </Col>
                    <Col className="text-end" xs={12} sm={2} md={6}>
                        <span className="btn btn-icon rounded-circle" onClick={_showSearchModal}>
                            <i className="bi bi-search h4 fs-5"/>
                        </span>
                    </Col>
                </Row>

                <Row className="border-bottom">
                    <div className="d-flex align-items-base">
                        <span className="fw-lighter h3">{capitalize(GENRE_TYPES[mediaType]?.toString()??"All")}</span>
                        {mediaType>= 0 && selectedGenre && (
                            <>
                                <span className="fw-lighter fs-4 mx-1">&gt;</span>
                                <span className="fw-lighter h5 fw-bold" style={{alignSelf: "center"}}>{capitalize(selectedGenre)}</span>
                            </>
                        )}

                        <div className="flex-grow-1" />
                        <h5>{mediaNumber>0 && mediaNumber}</h5>
                    </div>
                </Row>
            </Container>

            {ModalComponent}
        </div>
    )
}

export default ActionBar;