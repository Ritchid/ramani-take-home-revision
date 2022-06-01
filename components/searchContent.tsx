import clsx from "clsx";
import { debounce, isEmpty } from "lodash";
import React, { useState,  } from "react";
import { Container, Form, Row } from "react-bootstrap";

import { TIMERS } from "../resources/constants";
import { useSeachMedia } from "../hooks/mediaHook";
import styles from "../styles/search.module.css"
import SearchLoader from "./loaders/searchLoader";
import Media from "./media";


function ModalSeach(): JSX.Element{
    const {searchMedia, isSearchLoading, searchResults} = useSeachMedia();
    const [searchWord, setSearchWord] = useState("");

    const _onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        let val = e.currentTarget.value;
        setSearchWord(val);
        let debounce_search = debounce(function () {searchMedia(val)}, TIMERS.wait_time.search, {maxWait: 1500});
        debounce_search();
    }



    return (
        <div className="px-md-5 px-sm-3 px-xs-1 py-3">
            <Form.Control size="lg" type="search" placeholder="Enter keywords ..." onChange={_onSearch}/>
            <div className={clsx("fw-light text-muted py-1 px-3", styles.subtitle)}>
                Search for any movie or tv series by name or title 
            </div>
            <hr />

            <div style={{minHeight: "50vh"}}>
                {isSearchLoading? (<SearchLoader />) : (
                    <div>
                        {(isEmpty(searchResults) && searchWord.length > 2)? (
                            <div className="d-flex justify-content-center align-items-center fw-bold fs-3 text-mute" style={{height: "inherit"}}>
                                No Movie or TV Series found
                            </div>
                        ) : (
                            <div>
                                <Container>
                                    <Media data={searchResults}/>
                                </Container>
                            </div>
                        )}
                    </div>
                )}
                
            </div>
        </div>
    )
};

export default ModalSeach;