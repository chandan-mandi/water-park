import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addNewRide } from '../../../redux/slices/BookingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();
    const onSubmit = async data => {
        if (!data.img[0]) {
            return toast.error('Please upload an image!');
        }
        console.log('img', data.img);
        const loading = toast.loading('Uploading...Please wait!')
        let imageURL = "";
        console.log(data)
        if(data.img[0]){
            const imageData = new FormData();
            imageData.set('key', 'acb2d4c7a68ef1bf06d396d73adb600a')
            imageData.append('image', data.img[0]);
            try {
                const res = await axios.post("https://api.imgbb.com/1/upload", imageData);
                console.log(res)
                imageURL = res.data.data.display_url;
                toast.dismiss(loading);
            } catch (error) {
                toast.dismiss(loading);
                return toast.error('Failed to upload the image!');
            }
        }
        const serviceInfo = {
            name: data.name,
            code: data.code,
            price: data.price,
            img: imageURL,
            description: data.description
        }
        dispatch(addNewRide(serviceInfo))
        reset();
    }
    return (
        <div>
            <h2>Add a Ride Details</h2>
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
                                        {...register("name", { required: true })}
                                        placeholder="Ride Name"
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <label>Ride Code</label>
                                    <input
                                        type="text"
                                        className="our-form-input"
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
                                        {...register("price", { required: true })}
                                        placeholder="Ride Price"
                                    />
                                </Col>
                                <Col md={6} sm={12}>
                                    <label>Ride Image</label>
                                    <Button
                                        as={"label"}
                                        htmlFor="upload"
                                        variant="outline-primary"
                                        className="d-block p-2 mt-1 upload-btn">
                                        <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />Upload Image
                                    </Button>
                                    <input
                                        className="our-form-input"
                                        type="file"
                                        id="upload"
                                        hidden="hidden"
                                        {...register("img")}
                                        placeholder="Upload Photo"
                                    />
                                </Col>
                            </Row>
                            <label>Ride Description</label>
                            <textarea
                                type="textarea"
                                style={{ height: '150px' }}
                                className="our-form-input"
                                defaultValue=""
                                {...register("description", { required: true })}
                                placeholder="Type Ride Description"
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

export default AddProduct;