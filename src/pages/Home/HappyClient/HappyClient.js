import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faUserNurse, faUsers, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './HappyClient.css';
import CountUp from 'react-countup';
import { Fade } from 'react-reveal';

const HappyClient = () => {
    return (
        <Fade bottom>
            <Container className="bg-info client-container text-white">
                <Row className="py-5">
                    <Col xs={6} md={3}>
                        <h1><FontAwesomeIcon icon={faUsers} /></h1>
                        <h1><span className="number"><CountUp
                            separator=","
                            start={1000}
                            end={8450}
                            duration={2}
                            delay={0}
                            startOnMount={false}
                        /></span> +</h1>
                        <p className="fw-bold">Happy Visitors</p>
                    </Col>
                    <Col xs={6} md={3}>
                        <h1><FontAwesomeIcon icon={faWater} /></h1>
                        <h1><span className="number"><CountUp start={0} end={30} duration={2} delay={0} /></span> +</h1>
                        <p className="fw-bold">World Class Rides</p>
                    </Col>
                    <Col xs={6} md={3}>
                        <h1><FontAwesomeIcon icon={faThumbsUp} /></h1>
                        <h1><span className="number"><CountUp start={0} end={15} duration={2} delay={0} /></span> +</h1>
                        <p className="fw-bold">Years Of Experience</p>
                    </Col>
                    <Col xs={6} md={3}>
                        <h1><FontAwesomeIcon icon={faUserNurse} /></h1>
                        <h1><span className="number"><CountUp start={0} end={40} duration={2} delay={0} /></span> +</h1>
                        <p className="fw-bold">Certified Lifeguard</p>
                    </Col>
                </Row>
            </Container>
        </Fade>
    );
};

export default HappyClient;