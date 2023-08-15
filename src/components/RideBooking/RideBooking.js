import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import slider from '../../images/28361 [Converted].png';
import '../../pages/PackageBooking/PackageBooking.css';
import Footer from '../../pages/Shared/Footer/Footer';
import Navigation from '../../pages/Shared/Navigation/Navigation';
import NavTop from '../../pages/Shared/NavTop/NavTop';

const RideBooking = () => {
    const { id } = useParams();
    const { user } = useFirebase();
    const navigate = useNavigate();
    const [specificDetail, setSpecificDetail] = useState({});
    const { name, price } = specificDetail;
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const url = `http://localhost:5050/rides/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setSpecificDetail(data))
    }, [])
    // const amount = specificDetail.price;

    const onSubmit = data => {
        data.packageId = id;
        data.amount = price;
        data.status = "Pending";
        data.orderTime = new Date().toLocaleDateString('en-GB');
        axios.post('http://localhost:5050/booking', data)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Booking Succesful')
                    reset();
                    navigate('/rides')
                }
            })
    }
    return (
        <>
            <NavTop />
            <Navigation />
            <div className="car-booking">
                <Container className="py-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                            <Row>
                                <Col md={6} xs={12} className="pr-md-4">
                                    <h2 className="text-center py-2 booking-title">Ride Booking Confirmation</h2>
                                    <div className='text-start'>
                                        <label className='fw-bold'>Ride Name</label>
                                        <input
                                            className="our-form-input"
                                            type="text"
                                            {...register("packageName", { required: true })}
                                            defaultValue={name} />
                                    </div>
                                    <div className='text-start'>
                                        <label className='fw-bold'>Name</label>
                                        <input
                                            className="our-form-input"
                                            type="text"
                                            defaultValue={user.displayName}
                                            {...register("name", { required: true })}
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className='text-start'>
                                        <label className='fw-bold'>Email</label>
                                        <input
                                            type="email"
                                            className="our-form-input"
                                            defaultValue={user.email}
                                            {...register("email", { required: true })}
                                            placeholder="Your Email"
                                        />
                                    </div>
                                    <div className='text-start'>
                                        <label className='fw-bold'>Your Phone Number</label>
                                        <input
                                            type="number"
                                            className="our-form-input"
                                            defaultValue=""
                                            {...register("phone", { required: true })}
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    <div className='text-start'>
                                        <label className='fw-bold'>Test Drive Date</label>
                                        <input
                                            type="date"
                                            date="{{date}}" timezone="[[timezone]]"
                                            className="our-form-input"
                                            defaultValue=""
                                            {...register("bookingDate", { required: true })}
                                            placeholder="Booking Date"
                                        />
                                    </div>
                                    <br />
                                    {/* <Button type="submit">Send</Button> */}
                                    <div className="text-center mt-2">
                                        <Button type="submit" className="btn-main" style={{ padding: ".68rem 2rem" }}>
                                            Confirm Booking
                                        </Button>
                                    </div>
                                </Col>
                                <Col md={6} xs={12} className="pr-md-4 mt-3">
                                    <Image src={slider} alt="" fluid />
                                </Col>
                            </Row>
                        </div>
                    </form>
                    <Toaster />
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default RideBooking;