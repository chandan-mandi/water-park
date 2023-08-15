import React from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '../../Shared/Navigation/Navigation';
import NavTop from '../../Shared/NavTop/NavTop';
import Footer from '../../Shared/Footer/Footer';
import './Contact.css'

const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    };
    return (
        <div>
            <NavTop />
            <Navigation />
            <div className="cotact-banner">
                <div className="contact-overlay">
                    <h2 className='text-white'>Please Contact With Us</h2>
                </div>
            </div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="touch-contact text-center text-md-start">
                            <h6 className='text-info touch-title'>Get In Touch</h6>
                            <h1 className='fw-bold my-4'>CONTACT US TO GET BETTER INFORMATION</h1>
                            <p className="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. incididunt ut labore et dolore magna aliqua</p>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="contact-box h-100 d-flex flex-column justify-content-center" data-aos="zoom-in-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <span><i className="fas fa-phone-volume"></i></span>
                                    <h2>Phone</h2>
                                    <p>+88 01756104126</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-box h-100 d-flex flex-column justify-content-center" data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <span><i className="fas fa-envelope"></i></span>
                                    <h2>Email</h2>
                                    <p>water@gmail.com</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="contact-box d-flex flex-column justify-content-center" data-aos="zoom-in-right"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <span><i className="fas fa-map-marker-alt"></i></span>
                                    <h2>Address</h2>
                                    <p>Mymensingh, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                                <h4 className='mt-2'>Official Social Media: </h4>
                            <div className="social-menu d-flex list-unstyled justify-content-center align-items-center">
                                <li><i className="fab fa-facebook-square"></i></li>
                                <li><i className="fab fa-twitter-square"></i></li>
                                <li><i className="fab fa-instagram-square"></i></li>
                                <li><i className="fab fa-linkedin"></i></li>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                    <div className="col-lg-5">
                        <div className="contact-form text-white " data-aos="fade-down"
                            data-aos-easing="linear"
                            data-aos-duration="1500">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input
                                    {...register("user")}
                                    className="p-3 my-2 w-100"
                                    placeholder='name'
                                />
                                <input
                                    {...register("email")}
                                    className="p-3 my-2 w-100"
                                    placeholder='email'
                                />
                                <br />
                                <input
                                    {...register("subject")}
                                    className="p-3 my-2 w-100"
                                    placeholder='subject'
                                />
                                <br />

                                <textarea
                                    {...register("comments")}
                                    placeholder="comments"
                                    className="p-3 my-2 w-100"
                                />
                                <br />

                                {errors.exampleRequired && <span>This field is required</span>}

                                <input
                                    type="submit"
                                    value="Send Message"
                                    className="btn btn-primary w-50"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;