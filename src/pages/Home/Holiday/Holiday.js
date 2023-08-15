import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Holiday.css';

const Holiday = () => {
    return (
        <div className="holiday-bg">
            <div className="holiday-overlay">
            <Container className="holiday-container">
                <Row className="mx-0 align-items-center">
                    <Col xs={12} md={6} className="text-center text-md-start text-white">
                    <h2 className="fw-bold">SPEND YOUR HOLIDAY IN WATERPARK</h2>
                    <p>Experience what the biggest and the best of wet and wild iconic Waterpark fun is - 223,000 sq ft to be exact.</p>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                    <Button variant="info" className="px-5 mb-2 text-white fw-bold">BOOK NOW</Button><br />
                    <button className="information-btn">GET INFORMATION <FontAwesomeIcon icon={faArrowRight} /></button>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
};

export default Holiday;