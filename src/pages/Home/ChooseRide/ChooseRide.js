import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "./ChooseRide.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useNavigate } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from "swiper";
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';



const ChooseRide = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5050/rides`)
            .then((res) => {
                // setBlogs(res.data.blogs)
                setBlogs(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])
    console.log('rides', blogs);
    const handleRideBook = (id) => {
        navigate(`/ridebooking/${id}`)
    }
    return (
        <>
            <div className="container md:mx-auto px-4  ChooseRide">
                
                <Swiper
                    slidesPerView={6}
                    spaceBetween={30}
                    slidesPerGroup={3}
                    breakpoints={{
                        // when window width is >= 640px
                        360: {
                          width: 360,
                          slidesPerView: 2,
                          slidesPerGroup: 1
                        },
                        640: {
                          width: 640,
                          slidesPerView: 3,
                          slidesPerGroup: 2
                        },
                      }}
                    autoplay={{
                      delay: 3500,
                      disableOnInteraction: false,
                    }}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper container md:mx-auto px-8"
                >
                    { loading ? <LoadingSpinner /> :

                        blogs.map(blog => {
                            return <SwiperSlide
                                key={blog._id}
                                style={{
                                    backgroundImage: `url(${blog.img})`
                                }}
                                className='rounded overflow-hidden cursor'
                                onClick={() => handleRideBook(blog._id)}
                            >
                                <span id="blackOverlay" className="" >
                                    <div className="content">
                                        <h1 style={{fontSize : "22px", color : "#FFA902"}} className="text-xl capitalize text-white font-semibold">
                                            <span style={{color: '#fff'}}>{blog.name}</span>
                                        </h1>
                                    </div>
                                </span>
                            </SwiperSlide>
                        })}
                </Swiper>
            </div>
        </>
    );
};

export default ChooseRide;