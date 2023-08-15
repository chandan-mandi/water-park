import { faCcMastercard, faCcPaypal, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { faChevronRight, faClock, faEnvelope, faMapMarkerAlt, faTint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../../images/268400530_373968071167259_3189583390863392829_n.png';
import '../../Home/Holiday/Holiday.css';

const Footer = () => {
    return (
        <div style={{ backgroundColor: '#01173C' }} className='footer'>
            <Container className="pt-5 pb-2 text-start">
                <Row>
                    <Col md={3} className="text-white">
                        <Link to="/">
                            <h3 className="text-center text-md-start"><img style={{ height: '55px' }} className='img-fluid' src={logo} alt="" />Water <span className="text-info">Kingdom</span></h3>
                        </Link>
                        <p className="text-light text-center text-md-start">Experience what the biggest and the best of wet and wild iconic Waterpark</p>
                        <p><FontAwesomeIcon className="text-info" icon={faMapMarkerAlt} /> Mirpur, Dhaka-1216</p>
                        <p><FontAwesomeIcon className="text-info" icon={faEnvelope} /> support@domain.com</p>
                        <p><FontAwesomeIcon className="text-info" icon={faEnvelope} /> (+880)1962 123345</p>
                    </Col>
                    <Col md={2} className="text-white">
                        <h4 className="text-center text-md-start mb-3">Quick Links</h4>
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> About Us</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Services</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Booking</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Packages</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Contact</button>
                    </Col>
                    <Col md={3} className="text-white">
                        <h4 className="text-center text-md-start mb-3">Useful Links</h4>
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Privacy Policy</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Terms and Conditions</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Disclaimer</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> Support</button><br />
                        <button className="information-btn"><FontAwesomeIcon className="text-info" icon={faChevronRight} /> FAQ</button>
                    </Col>
                    <Col md={4} className="text-white">
                        <h4 className="text-center text-md-start mb-3">Opening Hours</h4>
                        <Row>
                            <Col>
                                <p>Monday - Friday</p>
                            </Col>
                            <Col className="ps-0">
                                <p><FontAwesomeIcon className="text-info" icon={faClock} /> 11:00 AM - 16:00 PM</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Saturday - Sunday</p>
                            </Col>
                            <Col className="ps-0">
                                <p><FontAwesomeIcon className="text-info" icon={faClock} /> 11:00 AM - 16:00 PM</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>Holiday</p>
                            </Col>
                            <Col className="ps-0">
                                <p><FontAwesomeIcon className="text-info" icon={faClock} /> 11:00 AM - 16:00 PM</p>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col className="pe-0">
                                <p><FontAwesomeIcon className="text-info" icon={faCcMastercard} /> MasterCard</p>
                            </Col>
                            <Col>
                                <p><FontAwesomeIcon className="text-info" icon={faCcPaypal} /> PayPal</p>
                            </Col>
                            <Col>
                                <p><FontAwesomeIcon className="text-info" icon={faCcVisa} /> Visa</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <hr className="text-white" />
                <p className="text-white text-center">Copyright &copy; 2021. All rights reserved.</p>
            </Container>
        </div>
    );
};

export default Footer;