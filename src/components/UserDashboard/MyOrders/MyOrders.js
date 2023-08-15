import axios from 'axios';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';
import logo from "../../../images/logo100.png";
import paid from "../../../images/paid.png";
import signature from "../../../images/signature.png";
import "./MyOrder.css";


const MyOrders = () => {
    const { user } = useAuth();
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch(`http://localhost:5050/booking/${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyBookings(data)
                setLoading(false);
            })
    }, [user.email]);
    // HANDLE DOWNLOAD
    const handleGeneratPdf = (order) => {
        const { _id, status,packageName,razorpay_payment_id,razorpay_order_id,  name, email, phone, amount } = order;
        console.log(order);
        let doc = new jsPDF('landscape', 'px', 'a4', 'false');
        doc.addImage(logo, 'PNG', 65, 20, 120, 60)
        doc.addImage(paid, 'PNG', 450, 20, 120, 60)
        doc.addImage(signature, 'PNG', 450, 300, 120, 80)
        doc.setLineWidth(0.1);
        doc.setDrawColor(0, 0, 0);
        doc.setLineDash([2.5]);
        doc.line(60, 100, 600, 100);
        doc.setFont('IBM Plex Serif', 'bold')
        doc.text(60, 120, 'Name : ')
        doc.text(60, 140, 'Email : ')
        doc.text(60, 160, 'Mob No : ')
        doc.text(60, 180, 'Package Name : ')
        doc.text(60, 200, 'Amount : ')
        doc.text(60, 220, 'Package Id : ')
        doc.text(60, 240, 'Order Id : ')
        doc.text(60, 260, 'Payment Id : ')
        doc.text(460,120, 'Status : ')
        doc.setFont('IBM Plex Serif', 'bold')
        doc.text(160, 120, name)
        doc.text(160, 140, email)
        doc.text(160, 200, `${"$" + amount}`)
        doc.text(160, 160, phone)
        doc.text(160, 180, packageName)
        doc.text(160, 220, _id)
        doc.text(160, 240, razorpay_order_id)
        doc.text(160, 260, razorpay_payment_id)
        doc.text(500, 120, status)
        doc.setLineDash([2.5]);
        doc.line(60, 400, 600, 400);
        doc.save(`${name + "'s " + packageName}.pdf`);
    }
    // HANDLE STATUS CHANGE
    const handleStatusChange = (id, status) => {
        let modifiedBooking = [];
        myBookings.forEach(order => {
            if (order._id === id) {
                order.status = status;
            }
            modifiedBooking.push(order)
        })
        setMyBookings(modifiedBooking)

        const modifiedStatus = { id, status }

        axios.patch(`http://localhost:5050/booking/${id}`, modifiedStatus)
            .then(res => res.data && toast.success(`Set to ${status}`))
            .catch(error => alert(error.message))
    }
    // RAZORPAY CREATED BY CHANDAN
    const handlePay = (order) => {
        const strAmount = order.amount;
        const bookingId = order._id;
        const amount = parseInt(strAmount);
        const orderData = {
            "amount": amount * 100,
            "currency": "USD",
            receipt: "order_rcptid_11",
            notes: {
                key1: "value3",
                key2: "value2"
            }
        }
        axios.post('http://localhost:5050/createOrder', orderData)
            .then(res => {
                const response = res;
                const { data } = response;
                const options = {
                    key: process.env.RAZOR_PAY_TEST_KEY,
                    name: "WaterPark",
                    amount: data.amount,
                    description: "Payment",
                    order_id: data.id,
                    handler: async (response) => {
                        try {
                            const razorpay_payment_id = response.razorpay_payment_id;
                            const razorpay_order_id = response.razorpay_order_id;
                            const razorpay_signature = response.razorpay_signature;
                            const url = `http://localhost:5050/verifyOrder`;
                            const captureResponse = await axios.post(url, response);
                            console.log(captureResponse);
                            if (captureResponse.data) {
                                handleStatusChange(order._id, "On going")

                                const invoice = { razorpay_payment_id, razorpay_order_id, razorpay_signature, ...captureResponse.data };
                                console.log("inovoice", invoice);
                                axios.patch(`http://localhost:5050/bookingUpdate/${bookingId}`, invoice)
                                    .then(res => {
                                        if(res.data.modifiedCount === 1){
                                            toast.success("Booking Updated")
                                        }
                                    })
                                    .catch(error => console.log(error.message))
                                // window.location.reload(); 
                            }
                        } catch (err) {
                            console.log(err);
                        }
                    },
                    theme: {
                        color: "#00ffee",
                    },
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            })
    }

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete!",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        }).then(wantDelete => {
            if (wantDelete) {
                const loadingId = toast.loading("Deleting...");
                const url = `http://localhost:5050/booking/${id}`
                fetch(url, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        toast.success('Deleted', {
                            id: loadingId,
                        });
                        if (data.deletedCount > 0) {
                            const remaining = myBookings.filter(booking => booking?._id !== id)
                            setMyBookings(remaining);
                            return swal("Successfully Delete!", "Your order has been successfully deleted.", "success");
                        }
                    })
                    .catch(err => {
                        toast.dismiss(loading);
                        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true })
                    })
            }
        })
    }
    return (
        <div>
            <div className="cardHeader d-flex justify-content-between align-items-center">
                <h2>Recent Orders</h2>
                <Link to="" className="view-all-btn">View All</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Package Name</td>
                        <td>Price</td>
                        <td>Email</td>
                        <td>Booking Date</td>
                        <td>Payment Status</td>
                        <td>Order Detail</td>
                    </tr>
                </thead>
                {loading ? <Spinner animation="border" variant="danger" /> :
                    myBookings.map(order => (
                        <tbody>
                            <tr>
                                <td>{order.name}</td>
                                <td>{order.packageName}</td>
                                <td>${order.amount}</td>
                                <td>{order.email.slice(0, 8)}...</td>
                                <td>{order.bookingDate}</td>
                                <td>
                                    <span className={order.status === "Pending" ? "status pending" : order.status === "On going" ? "status inprogress" : order.status === "Done" ? "status delivered" : null}>{order.status}</span>
                                   
                                </td>
                                <td>
                                    {
                                        order.status !== "Pending" ?
                                            <Button onClick={() => handleGeneratPdf(order)} variant="info bg-info m-1" className='white-space-off'>Download Invoice</Button>
                                            :
                                            <div className='d-flex'>
                                            <Button onClick={() => handlePay(order)} variant="success" className='white-space-off'>Pay Now</Button>
                                            <Button onClick={() => handleDelete(order._id)} variant="danger bg-danger ms-1" className='white-space-off'>Cancel</Button>
                                            </div>
                                    }
                                </td>
                            </tr>

                        </tbody>
                    ))}
            </table>
            <Toaster />
        </div>
    );
};

export default MyOrders;