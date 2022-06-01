import React from "react";
import Container from "react-bootstrap/Container";


function Footer(): JSX.Element{
 
    return (
        <footer className="bg-primary text-light">
            <Container fluid="md">
                <div className="mx-auto w-100 text-center py-4">
                    <p className="fw-bold fs-3 mb-0">Ramani Studios</p>
                    <p className="small">All Rights Reserved&copy;{new Date().getFullYear()}</p>
                </div>
            </Container>
        </footer>
    )
};

export default Footer;