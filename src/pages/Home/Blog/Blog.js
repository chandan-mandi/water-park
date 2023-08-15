import { faArrowRight, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Blog = (props) => {
    const { _id, image, title, description, date } = props.blog;
    return (
        <Col>
        <Card>
            <Row>
                <Col md={6}>
                    <Card.Img variant="top" className="h-100 w-100" src={image} fluid />
                </Col>
                <Col md={6}>
                    <Card.Body className="text-start">
                        <Card.Title>{title}</Card.Title>
                        <h6 className="text-secondary"><FontAwesomeIcon icon={faClock} /> {date}</h6>
                        <Card.Text className="text-secondary">
                            {description?.slice(0, 80)}
                        </Card.Text>
                        <Link to={"/blogs/" + _id}>
                            <button className="read-more-btn text-info">READ MORE <FontAwesomeIcon icon={faArrowRight} /></button>
                        </Link>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
        </Col>
    );
};

export default Blog;