import React from "react";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";
import clsx from "clsx";

import styles from "../styles/header.module.css"
import {CAROUSEL_IMGS} from "../resources/constants";


interface IHeader {
    navbar?: boolean;
}

function Header({navbar=true}: IHeader): JSX.Element {
 
    return (
        <header className={clsx(styles.header, "bg-current")}>
            <Carousel fade controls={false} className="h-100 w-100">
                {CAROUSEL_IMGS.map((carouselItem, index) => (
                    <Carousel.Item key={index} className="w-100 h-100">
                        <Image
                            className={clsx("d-block", "w-100", styles.carouselImg)}
                            src={carouselItem.url}
                            alt={carouselItem.title}
                            layout="fill"
                            priority
                        />
                    </Carousel.Item>
                ))}
            </Carousel> 

            <div className={clsx("text-center", "w-100", "position-absolute", styles.scrollBtn)}>
                <a className="d-inline-flex align-items-center justify-content-center text-decoration-none m-3" href="#main">
                    <span className="btn btn-icon rounded-circle border-light border-4 flex-shrink-0 px-2 py-2 text-light" >
                        <i className="bi bi-chevron-down h4 fs-5"/>
                    </span>
                </a>
            </div>
        </header>
    )
};

export default Header;