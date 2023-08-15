import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import useFirebase from '../../hooks/useFirebase';
import slider from '../../images/clipart2684187.png';
import Footer from '../Shared/Footer/Footer';
import Navigation from '../Shared/Navigation/Navigation';
import NavTop from '../Shared/NavTop/NavTop';
import './PackageBooking.css';

const PackageBooking = () => {
    const { id } = useParams();
    const { user } = useFirebase();
    const history = useNavigate();
    const { email } = user;
    const [specificDetail, setSpecificDetail] = useState({});
    const { packageName, price } = specificDetail;
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const url = `http://localhost:5050/packages/${id}`
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
                    toast.success('Booking Successful')
                    reset();
                    history('/')
                }
            })
    }
    return (
        <div>
            <NavTop />
            <Navigation />
            <Container className="py-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                        <Row>
                            <Col md={6} xs={12} className="pr-md-4">
                                <h2 className="text-center mb-4 booking-title">Booking <span className="text-info">Confirmation</span></h2>
                                <input
                                    className="our-form-input"
                                    type="text"
                                    {...register("packageName", { required: true })}
                                    defaultValue={packageName} />
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
                                    <label className='fw-bold'>Date</label>
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
                            <Col></Col>
                            <Col xs={12} md={5} className='mt-4'>
                                <Image src={slider} alt="" fluid />
                            </Col>
                        </Row>
                    </div>
                </form>
                <Toaster />
            </Container>
            <Footer />
        </div>
    );
};

export default PackageBooking;