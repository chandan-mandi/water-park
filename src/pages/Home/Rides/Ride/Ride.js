import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Ride.css';

const Ride = ({ ride }) => {
    const { _id, img, name, price, description } = ride;
    return (
        <Col>
        <Card className='h-100'>
            <Card.Img variant="top" src={img} />
            <Card.Body>
            <Card.Title className="ride-title text-primary">{name}</Card.Title>
            <Card.Text className="text-secondary">
                {description}
            </Card.Text>
            <Card.Text>
                <div className='d-flex justify-content-between '>
                <h4 className='text-success fw-bold'>$ {price}</h4>
                <NavLink to={`/ridebooking/${_id}`}>
                <Button variant="outline-info">Book <FontAwesomeIcon icon={faArrowRight} /></Button>
                </NavLink>
                </div>
            </Card.Text>                
            </Card.Body>
        </Card>
        </Col> 
    );
};

export default Ride;