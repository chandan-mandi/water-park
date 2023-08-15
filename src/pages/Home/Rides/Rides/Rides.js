import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import Footer from '../../../Shared/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRides } from '../../../../redux/slices/BookingSlice';
import Navigation from '../../../Shared/Navigation/Navigation';
import NavTop from '../../../Shared/NavTop/NavTop';
import Ride from '../Ride/Ride';

const Rides = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchRides());
    }, [])
    const { rides } = useSelector((state) => state.booking);
    return (
        <div >
            <NavTop></NavTop>
            <Navigation></Navigation>
            <Container className='py-5'>
            <h2 className='mb-5'>Our Rides Available Here</h2>
                <Row xs={1} md={3} className="g-4">
                {
                    rides.map(ride=><Ride
                        key={ride._id}
                        ride={ride} 
                        ></Ride>)
                    }

                </Row>
            </Container>
                <Footer />
        </div>
    );
};

export default Rides;