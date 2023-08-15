import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';

const Update = () => {
    const { id } = useParams();
    const [ride, setRide] = useState({});
    const { register, handleSubmit } = useForm();
    const history = useNavigate();                
    const onSubmit = data => {
        console.log(data)
        const url = `http://localhost:5050/rides/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Updated Successfully')
                    setRide({})
                    history('/dashboard/manageAllProduct')
                }
            })
    };
    console.log(ride);

    useEffect(() => {
        const url = `http://localhost:5050/rides/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => setRide(data))
    }, [id])

    return (
        <div className="container py-5">
            <h2>Update <span style={{ color: 'orange' }}>{ride.name}</span> ride Details</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-main" style={{ borderRadius: "15px", maxWidth: '85rem' }}>
                    <Row>
                        <Col style={{ width: '550px', margin: '0 auto' }} md={12} xs={12} className="pr-md-4">
                            <Row>
                                <Col md={6} sm={12}>
                                    <label>Ride Name</label>
                                    <input
                                        className="our-form-input"
                                        type="text"
                                        defaultValue={ride.name}
                                        {...register("name", { required: true })}
                                        placeholder="Ride Name"
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <label>Ride Code</label>
                                    <input
                                        type="text"
                                        className="our-form-input"
                                        defaultValue={ride.code}
                                        {...register("code", { required: true })}
                                        placeholder="Ride Code"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} sm={12}>
                                    <label>Ride Price</label>
                                    <input
                                        className="our-form-input"
                                        type="text"
                                        defaultValue={ride.price}
                                        {...register("price", { required: true })}
                                        placeholder="ride Price"
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <label>Ride Image</label>
                                    <input
                                        className="our-form-input"
                                        type="text"
                                        defaultValue={ride.img}
                                        {...register("img", { required: true })}
                                        placeholder="Put Ride Image Link"
                                    />
                                </Col>
                            </Row>
                            <label>Ride Details</label>
                            <textarea
                                type="textarea"
                                style={{ height: '150px' }}
                                className="our-form-input"
                                defaultValue={ride.description}
                                {...register("description")}
                                placeholder="Type Ride Details"
                            />
                            <br />
                            {/* <Button type="submit">Send</Button> */}
                        </Col>
                    </Row>
                </div>

                <div className="text-center mt-4">
                    <Button type="submit" className="btn-main" style={{ padding: ".68rem 2rem" }}>
                        Submit
                    </Button>
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default Update;