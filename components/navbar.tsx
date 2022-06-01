import React from "react";
import Container from "react-bootstrap/Container";

import styles from "../styles/navbar.module.css";

function Navbar(): JSX.Element {

    return (
        <Container>
            <nav className={styles.navbar}>
                Navbar
            </nav>
        </Container>
    )
}

export default Navbar;