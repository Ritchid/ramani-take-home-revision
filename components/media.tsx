import clsx from "clsx";
import { startCase, take, truncate } from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";

import GenreContext from "../contexts/genreContext";
import { IMedia } from "../models/mediaModel";
import { TMDB_IMG_BASEURL } from "../resources/constants";
import { MEDIA_TYPES } from "../resources/enums";
import styles from "../styles/media.module.css";


interface IMediaProps {
    data: Array<IMedia>
}

interface IMediumProps {
    mediumData: IMedia
}

const Medium = ({mediumData}: IMediumProps): JSX.Element =>{
    const {movieGenres: MOVIE_GENRE, seriesGenres: SERIES_GENRE} = useContext(GenreContext);
    
    return (
        <Col xs={12} md={6} lg={3} className="mb-3">
            <Link href={`/${encodeURIComponent(mediumData.id)}`} >
                <Card className={styles.card}>
                    <div className={clsx("bg-primary", styles.cardImgWrapper)}>
                        <Image 
                            src={`${TMDB_IMG_BASEURL}${mediumData?.posterImg}`}
                            alt={mediumData.title}
                            loading="lazy"
                            layout="fill"
                        />
                    </div>
                    <Card.ImgOverlay>
                        <div className="d-flex">
                            <div>
                                <Badge pill bg="primary" className="border">{startCase(mediumData.mediaType)}</Badge>
                            </div>
                            <div className="flex-grow-1"/>
                            <div>
                                {take(mediumData.relatedGenres, 4).map((genreId, index) =>(
                                    <Badge key={index} pill bg="primary" className="border d-block">
                                        {mediumData.mediaType == MEDIA_TYPES.MOVIE? (
                                            startCase(MOVIE_GENRE.find((value) => value.id == genreId)?.name)
                                        ): (
                                            startCase(SERIES_GENRE.find((value) => value.id == genreId)?.name)
                                        )}
                                    </Badge>
                                ))}
                                {mediumData.relatedGenres.length>4 && <Badge pill bg="primary" className="border d-block">...</Badge>}
                            </div>
                        </div>
                    </Card.ImgOverlay>

                    <Card.Body style={{minHeight: 160}}>
                        <Card.Title>{mediumData.title}</Card.Title>
                        <Card.Text className="text-dark" style={{fontSize: 14}}>{truncate(mediumData.overview, {length: 150})}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}

function Media({data}: IMediaProps): JSX.Element{

    return (
        <div className="p-3">
            {data.length<1? (
                <div className="text-center">
                    <h3 className="text-muted fs-4">No Media Available</h3>
                </div>
            ): (
                <Row>
                    {data.map((mediumData) =>(
                        <Medium key={mediumData.id} mediumData={mediumData}/>
                    ))}
                </Row>
            )}
        </div>
    )
}

export default React.memo(Media);