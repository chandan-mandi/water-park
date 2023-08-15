import { faCheck, faTicketAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import { fetchPackages } from '../../../../redux/slices/BookingSlice';
import './EventPackage.css';

const EventPackage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { packages } = useSelector(state => state.booking);
    useEffect(() => {
        dispatch(fetchPackages())
    }, [dispatch])
    console.log('packs', packages)
    const handleOrder = (id) => {
        navigate(`/booking/${id}`)
    }
    return (
        <div className="event-package">
            <Container>
                <div className="header-text">
                    <h6>Choose your package</h6>
                    <h2>Our Events Packages</h2>
                </div>
                <Row>
                    { packages.length != 0 ? 
                        packages.map(price => <Col lg={3} md={4} sm={6} xs={12} className="package my-3">
                            <>
                                <Fade bottom duration={1000} distance="40px">
                                    <div className="pricing-card">
                                        <div className="title">
                                            <FontAwesomeIcon className="fa-icon" icon={faTicketAlt}></FontAwesomeIcon>
                                            <h2>{price.packageName}</h2>
                                        </div>
                                        <div className="price">
                                            <h4>$ <span>{price.price}</span> <span style={{ fontSize: "14px" }}>/per person</span></h4>
                                        </div>
                                        <div className="option">
                                            <ul>
                                                <li><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>{price.decoration}</li>
                                                <li><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>{price.catering}</li>
                                                <li><FontAwesomeIcon className="fa-icon" icon={price.Rides === false ? faTimes : faCheck}></FontAwesomeIcon>Riding</li>
                                                <li><FontAwesomeIcon icon={price.Boating === "Boating" ? faCheck : faTimes}></FontAwesomeIcon>Boating</li>
                                            </ul>
                                        </div>
                                        <div className="order-btn" onClick={() => handleOrder(price._id)}>Order Now</div>
                                    </div>
                                </Fade>
                            </>
                        </Col>
                        )
                    : <h1>Not Found</h1>}
                </Row>
            </Container>
        </div>
    );
};

export default EventPackage;