import React from "react";
import { range } from "lodash";
import { Card, Col, Placeholder, Row } from "react-bootstrap";

interface IMediaLoader {
    loaders?: number;
}

function MediaLoader({loaders = 5}: IMediaLoader): JSX.Element {
    const loadersList = range(loaders);
    return (
        <Row>
            {loadersList.map((loader) =>(
                <Col key={loader} className="mb-3" xs={12} sm={6} md={4}>
                    <Card>
                        <Placeholder as={Card.Img} style={{height: 200}}/>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> 
                                <Placeholder xs={4} /> 
                                <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> 
                                <Placeholder xs={8} />
                            </Placeholder>
                            {/* <Placeholder.Button variant="primary" xs={6} /> */}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default MediaLoader;