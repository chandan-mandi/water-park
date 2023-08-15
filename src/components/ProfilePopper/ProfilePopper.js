import React from 'react';
import { Image, Nav, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useFirebase from '../../hooks/useFirebase';
// import useAuth from '../hooks/useAuth';
import "./ProfilePopper.css";

const ProfilePopper = () => {
    const { user, logOut, admin } = useAuth();
    const { displayName: name, photoURL: img } = user;
    const signOut = () => {
        logOut()
        toast.error('Logged Out')
        window.location.reload();
    }
    return (
        <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
                <Popover id="popover-basic">
                    <Popover.Body>
                        <div className="d-flex justify-content-center mt-1">
                            <Image style={{ maxWidth: "60px" }} src={img || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} roundedCircle />
                        </div>
                        <strong className="text-center d-block">{name}</strong>
                        <div className="d-flex justify-content-center mt-1">
                            <Button onClick={signOut}
                                variant="outline-danger"
                                className="py-0 px-1"
                                size="sm"> Logout
                            </Button>
                        </div>
                        <hr />
                        {
                            admin ?
                                <>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/makeAdmin`}>Make Admin</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/manageAllBooking`}>Manage All Booking</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/addBlog`}>Add Blog</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/manageAllRides`}>Manage All Rides</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/addRide`}>Add A Ride</Link>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/myBookings`}>My Booking</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/sendReview`}>Add Review</Link>
                                    </div>
                                    <div className="dropdown-item">
                                        <Link to={`/dashboard/payment`}>Payment</Link>
                                    </div>
                                </>
                        }


                    </Popover.Body>
                </Popover>
            }>
            <Nav.Link className="p-0">
                <Image
                    src={img || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                    width="45"
                    height="45"
                    roundedCircle
                    className="d-inline-block align-top"
                    alt="Profile"
                />
            </Nav.Link>

        </OverlayTrigger>
    );
};

export default ProfilePopper;