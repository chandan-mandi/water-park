import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { deleteOrder, fetchAllOrders, removeFromAllOrders } from '../../../redux/slices/BookingSlice';

const ManageAllBooking = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const booking = useSelector((state) => state.booking.allOrders)
    console.log(booking);
    const headers = {
        headers: {
            authorization: `Bearer ${localStorage.getItem('idToken')}`
        }
      };
    useEffect(() => {
        dispatch(fetchAllOrders(headers))
        setLoading(false)
    }, [])

    // ORDER DETELE HANDLER
    const handleDelete = (id) => {
        // const proceed = window.confirm('Are You sure to Cancel the Booking?')
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete!",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        }).then(wantDelete => {
            if (wantDelete) {
                dispatch(deleteOrder(id))
                .then(res =>{
                    if(res.meta.requestStatus === "fulfilled"){
                        dispatch(removeFromAllOrders(id))
                    }
                })
            }
        })
    }
    // HANDLE STATUS CHANGE
    const handleStatusChange = (id, status) => {
        const modifiedStatus = { id, status }

        axios.patch(`http://localhost:5050/booking/${id}`, modifiedStatus)
            .then(res => res.data && toast.success(`Set to ${status}`))
            .catch(error => alert(error.message))
    }
    return (
        <div className="px-3 manage-booking">
            <div className="d-flex justify-content-between">
                <h2>Recent Orders</h2>
                <h2>Total Booking {booking.length}</h2>
                <Link to="" className="view-all-btn d-flex align-items-center">View All</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>SL NO</td>
                        <td>Customer Name</td>
                        <td>Package Name</td>
                        <td>Price</td>
                        <td>Email</td>
                        <td>Booking Date</td>
                        <td>Status</td>
                        <td>Cancel Order</td>
                    </tr>
                </thead>
                {loading ? <Spinner animation="border" variant="success" /> :
                    booking.map((order, index) => (
                        <tbody>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{order?.name?.toUpperCase()}</td>
                                <td>{order?.packageName}</td>
                                <td>${order?.amount}</td>
                                <td>{order?.email?.slice(0,8)}...</td>
                                <td>{order?.orderTime}</td>
                                <td>
                                    <select
                                        className={order.status === "Pending" ? "btn btn-danger" : order.status === "Done" ? "btn btn-success" : order.status === "On going" && "btn btn-info"}
                                        defaultValue={order.status}
                                        onChange={e => handleStatusChange(order._id, e.target.value)}>
                                        <option className="bg-white text-muted">Pending</option>
                                        <option className="bg-white text-muted">On going</option>
                                        <option className="bg-white text-muted">Done</option>
                                    </select>
                                    <Toaster />
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(order._id)} variant="danger bg-danger m-1">CANCEL</Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
            </table>
        </div>

    );
};

export default ManageAllBooking;