import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import MediaContext from "../contexts/mediaContext";
import { IMedia } from "../models/mediaModel";
import { isEmpty, startCase } from "lodash";
import MainLayout from "../layouts/layout";
import styles from "../styles/mediumPage.module.css";
import clsx from "clsx";
import { TMDB_IMG_BASEURL } from "../resources/constants";
import Image from "next/image";
import { Badge, Col, Container, Row } from "react-bootstrap";
import GenreContext from "../contexts/genreContext";
import { MEDIA_TYPES } from "../resources/enums";


function MediaPage(): JSX.Element {
  const router = useRouter();
  const {media_ref} = router.query;
  const {media: MEDIA} = useContext(MediaContext);
  const {movieGenres: MOVIE_GENRE, seriesGenres: SERIES_GENRE} = useContext(GenreContext);
  const [mediumData, setMediumData] = useState<IMedia>();
  

  useEffect(() =>{
    if(media_ref) {
      const mediaId = Number(media_ref);
      const medium = MEDIA.filter((medium) => medium.id === mediaId)[0];
      
      if(!isEmpty(medium)) {
        setMediumData(medium);
      } else {
        
      }
    } else {
      router.push("/");
    }
  })

  return (
    <MainLayout pageTitle={mediumData?.title??"title"}>
      <>
        <div className={clsx(styles.hero, "bg-primary")}>
          <Image
            src={`${TMDB_IMG_BASEURL}${mediumData?.coverImg??mediumData?.posterImg}`}
            layout="fill"
            priority
            loading="eager"
          />
          <h1 className="text-shadow">{mediumData?.title}</h1>
        </div>

        <section className="py-5">
              <Container fluid="md">
                <Row>
                  <p className={clsx("text-justify fw-light", styles.description)}>{mediumData?.overview}</p>
                </Row>

                <Row>
                  <Col xs={12} sm={6} md={3} className="d-flex align-items-center">
                    <h5 className="text-muted">Released Data: </h5>
                    <h4 className="px-2">{mediumData?.publishedOn?.toDateString()}</h4>
                  </Col>
                  <Col xs={12} sm={6} md={3} className="d-flex align-items-center">
                    <h5 className="text-muted">Media Type: </h5>
                    <h4 className="px-2">{startCase(mediumData?.mediaType)}</h4>
                  </Col>
                  <Col xs={12} sm={6} md={3} className="d-flex align-items-center">
                    <h5 className="text-muted">Popularity: </h5>
                    <h4 className="px-2">{mediumData?.popularity}</h4>
                  </Col>
                  <Col xs={12} sm={6} md={3} className="d-flex align-items-center">
                    
                  </Col>
                  <Col xs={12} sm={12} md={6}>
                    <h5 className="text-muted">Genre Tags: </h5>
                    <div>
                      {mediumData?.relatedGenres.map((genre) =>(
                        <Badge className="mx-2 my-1" style={{fontSize: 16}}>
                          {mediumData?.mediaType == MEDIA_TYPES.MOVIE? (
                            startCase(MOVIE_GENRE.find((value) => value.id == genre)?.name)
                          ): (
                            startCase(SERIES_GENRE.find((value) => value.id == genre)?.name)
                          )}
                        </Badge>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Container>
          </section>
      </>
    </MainLayout>
  )
}

export default MediaPage;
