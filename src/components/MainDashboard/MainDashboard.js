import { faBlogger, faFortAwesome } from '@fortawesome/free-brands-svg-icons';
import { faCartArrowDown, faCartPlus, faChargingStation, faComment, faDollarSign, faEye, faHandsHelping, faHome, faParachuteBox, faPeopleArrows, faSearch, faSignOutAlt, faToggleOff, faUser, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProfilePopper from '../../components/ProfilePopper/ProfilePopper';
import './MainDashboard.css';
import BarCharts from '../../components/UserDashboard/Charts/BarCharts';
import BookingPieChart from '../../components/UserDashboard/Charts/BookingPieChart';
import useAuth from '../../hooks/useAuth';
import Users from '../UserDashboard/Users/Users';

const MainDashboard = () => {
    const { admin } = useAuth();
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <div className="main-dashboard">
            <div className="dash-container">
                <div className={isActive ? "navigation active" : "navigation"}>
                    <ul>
                        <li>
                            <Link to="/">
                                <span className="icon">
                                    <FontAwesomeIcon className="faIcon" icon={faWater}></FontAwesomeIcon>
                                </span>
                                <span className="title"><strong>Water Kingdom</strong> </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <span className="icon">
                                    <FontAwesomeIcon className="faIcon" icon={faHome}></FontAwesomeIcon>
                                </span>
                                <span className="title">Dashboard</span>
                            </Link>
                        </li>
                        {!admin && <>
                            <li>
                                <Link to={`/dashboard/myBookings`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faPeopleArrows}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">My Bookings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/sendReview`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faChargingStation}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Add a Review</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/payment`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faHandsHelping}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Payment</span>
                                </Link>
                            </li>
                        </>}
                        {admin && <>
                            <li>
                                <Link to={`/dashboard/addRide`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faParachuteBox}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Add a Ride</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/addBlog`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faBlogger}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Add Blog</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/makeAdmin`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faUser}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Make Admin</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/manageAllBooking`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faCartPlus}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Manage All Booking</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={`/dashboard/manageAllRides`}>
                                    <span className="icon">
                                        <FontAwesomeIcon className="faIcon" icon={faFortAwesome}></FontAwesomeIcon>
                                    </span>
                                    <span className="title">Manage All Rides</span>
                                </Link>
                            </li>
                        </>}
                        <li>
                            <Link to="/">
                                <span className="icon">
                                    <FontAwesomeIcon className="faIcon" icon={faSignOutAlt}></FontAwesomeIcon>
                                </span>
                                <span className="title">Back to Home</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* main part  */}
                <div className={isActive ? "main active" : "main"}>
                    <div className="topbar">
                        <div className="toggle" onClick={handleToggle}>
                            <FontAwesomeIcon icon={faToggleOff}></FontAwesomeIcon>
                        </div>
                        <div className="search">
                            <label>
                                <input type="text" placeholder="Search here" />
                                <FontAwesomeIcon className="faIcon" icon={faSearch}></FontAwesomeIcon>
                            </label>
                        </div>
                        <div className="user">
                            {/* <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" /> */}
                            <ProfilePopper />
                        </div>
                    </div>
                    {/* cards */}
                    <div className="cardBox">
                        {admin && <>
                            <div className="dash-card">
                                <div>
                                    <div className="numbers">1,504</div>
                                    <div className="cardName">Daily Views</div>
                                </div>
                                <div className="iconBx">
                                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="dash-card">
                                <div>
                                    <div className="numbers">80</div>
                                    <div className="cardName">Sales</div>
                                </div>
                                <div className="iconBx">
                                    <FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="dash-card">
                                <div>
                                    <div className="numbers">284</div>
                                    <div className="cardName">Comments</div>
                                </div>
                                <div className="iconBx">
                                    <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                                </div>
                            </div>
                            <div className="dash-card">
                                <div>
                                    <div className="numbers">$7,842</div>
                                    <div className="cardName">Earning</div>
                                </div>
                                <div className="iconBx">
                                    <FontAwesomeIcon icon={faDollarSign}></FontAwesomeIcon>
                                </div>
                            </div>
                        </>}
                    </div>
                    {/* ADD CHARTS  */}
                    <div className="graphBox">
                        <div className="chartBox">
                            <BookingPieChart />
                        </div>
                        <div className="chartBox">
                            {/* <BarCharts /> */}
                        </div>
                    </div>
                    {/* DETAILS  */}
                    <div className="details">
                        {/*order details list  */}
                        <div className="recentOrders">
                            <div className="cardHeader">
                                <Outlet></Outlet>
                            </div>
                        </div>
                        {/* NEW CUSTOMER  */}
                        <div className="recentCustomers">
                            <Users />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;