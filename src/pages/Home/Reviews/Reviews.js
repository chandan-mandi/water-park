import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Slider from "react-slick";
import { fetchReviews } from '../../../redux/slices/BookingSlice';
import './Review.css';
import ReviewCard from './ReviewCard/ReviewCard';


const Reviews = () => {
    const [loading, setLoading] = useState(false);
    // const [reviews, setReviews] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchReviews());
    },[])
    const reviews = useSelector((state) => state.booking.reviews);
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img src="https://cdn-icons-png.flaticon.com/512/271/271218.png" alt="prevArrow" {...props} />
    );

    const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img src="https://cdn0.iconfinder.com/data/icons/feather/96/591276-arrow-right-512.png" alt="nextArrow" {...props} />
    );

    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        slide: 'div',
        cssEase: 'linear',
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1008,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
    };
    return (
        <div className="client-reviews py-5 px-3" id="reviews">
            <div className="container">
                <h2>8450+ HAPPY VISITORS</h2>
                {loading && <Spinner animation="border" variant="danger" />}
                <Slider {...settings}>
                    {
                        reviews.map((item) =>
                            <ReviewCard
                                key={item._id}
                                item={item}
                            ></ReviewCard>
                        )}
                </Slider>
                <Toaster />
            </div>
        </div>

    );
};

export default Reviews;