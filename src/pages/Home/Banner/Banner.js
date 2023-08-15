import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { postPackageBooking } from '../../../redux/slices/BookingSlice';
// import { postPackageBooking } from '../../redux/slices/BookingSlice';
import './Banner.css';
import Fade from 'react-reveal/Fade';
import { Button, Modal } from 'react-bootstrap';
import intro from '../../../video/production ID_4929174.mp4';
import useAuth from "../../../hooks/useAuth";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className="text-center">
                <video className="w-100" controls loop autoPlay>
                    <source src={intro} type="video/mp4" />
                </video>
            </Modal.Body>
        </Modal>
    );
}

const Banner = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const {user} = useAuth();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        data.status = "Pending";
        data.phone = "8918308609";
        console.log(data);
        dispatch(postPackageBooking(data))
        reset();
    };
    return (
        <div className='banner-main text-white'>
            <div className="banner-overlay">
                <div className="container">
                    <div className="row">
                        <Fade left>
                            <div className="col-lg-6">
                                <div className="banner-content text-center text-md-start">
                                    <h6>Welcome To WaterKingdom</h6>
                                    <h1>THE GREATEST WATER AND AMUSEMENT PARK IN THE WORLD</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</p>

                                    <Button variant="info" onClick={() => setModalShow(true)} className='rounded-pill mt-2' >
                                        <h5 className='mb-0 px-3 py-2'><i className="far fa-play-circle text-danger"></i> Watch Intro</h5>
                                    </Button>
                                    <MyVerticallyCenteredModal
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </div>
                            </div>
                        </Fade>
                        <div className="col-lg-2"></div>
                        <Fade right>
                            <div className="col-lg-4">
                                {/* <div className="book-form text-white " data-aos="fade-down"
                                    data-aos-easing="linear"
                                    data-aos-duration="1500">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            {...register("name", { required: true })}
                                            className="p-3 my-2 w-100 book-form-input"
                                            placeholder='name'
                                        />
                                        <input
                                            {...register("email", { required: true })}
                                            className="p-3 my-2 w-100 book-form-input"
                                            defaultValue={user?.email}
                                            placeholder='email'
                                        />
                                        <input
                                            {...register("packageName", { required: true })}
                                            className="p-3 my-2 w-100 book-form-input"
                                            value='Family Package'
                                            readOnly
                                        />
                                        <input
                                            {...register("amount", { required: true })}
                                            className="p-3 my-2 w-100 book-form-input"
                                            placeholder='$50'
                                            value="50"
                                            readOnly
                                        />
                                        <input
                                            {...register("bookingDate", { required: true })}
                                            type="date"
                                            className="p-3 my-2 w-100 book-form-input"
                                        />
                                        <br />
                                        <textarea
                                            {...register("comments")}
                                            placeholder="comments"
                                            className="p-3 my-2 w-100 book-form-input"
                                        />
                                        <br />

                                        {errors.exampleRequired && <span>This field is required</span>}

                                        <input
                                            type="submit"
                                            value="Booking"
                                            className="btn btn-info w-50 text-white"
                                        />
                                    </form>
                                </div> */}
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Banner;