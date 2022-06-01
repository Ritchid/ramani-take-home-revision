import React from "react";
import { Spinner } from "react-bootstrap";


function SearchLoader(): JSX.Element {
    return (
        <div className="d-flex w-100 justify-content-center align-items-center" style={{height: "inherit"}}>
            <Spinner  animation="grow" />
        </div>
    )
}

export default SearchLoader;