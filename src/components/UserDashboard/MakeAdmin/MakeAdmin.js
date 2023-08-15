import axios from 'axios';
import React from 'react';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import swal from 'sweetalert';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const {user, admin} = useAuth();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data);
        if (user.email === "test@admin.com" || "admin@admin.com") {
            return swal("Permission restriction!", "As a test-admin, you don't have this permission.", "info");;
        }
        const loading = toast.loading('Adding...Please wait!');
        axios.put('http://localhost:5050/addAdmin', data, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('idToken')}`
            },
          })
            .then(res => {
                console.log(res);
                toast.dismiss(loading);
                if (res.data) {
                    return swal("Successfully Added", `${data.email} has been successfully added as an admin.`, "success");
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
            .catch(error => {
                toast.dismiss(loading);
                swal("Failed Not hit api!", "Something went wrong! Please try again.", "error", { dangerMode: true })
            });
    }
    return (
        <div className="d-flex justify-content-center flex-column">
            <h2 className="mb-4">Make An Admin Page</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Row>
                        <Col style={{ width: '550px', margin: '0 auto' }} md={12} xs={12} className="pr-md-4">
                            <Row>
                                <Col xs={12}>
                                    <FloatingLabel className="mb-2" controlId="floatingPassword" label="Admin Email">
                                        <Form.Control
                                            className="our-form-input"
                                            type="email"
                                            {...register("email", { required: true })}
                                            placeholder="Type Email Address"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col xs={12}>
                                    <div className="text-center mt-3">
                                        <Button type="submit" className="btn-main" style={{ padding: ".68rem 2rem" }}>
                                            Submit
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div>
            </form>
            <Toaster />
        </div>
    );
};

export default MakeAdmin;