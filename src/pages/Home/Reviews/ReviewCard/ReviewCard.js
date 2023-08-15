import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';
import useFirebase from '../../../../hooks/useFirebase';
import './ReviewCard.css';

const ReviewCard = ({ item }) => {
    return (
        <div className="py-5">
            <div className="box">
                <div className="imgBox">
                    <img className="img-fluid" src={item?.image || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} alt="" />
                </div>
                <p>{item.comment}</p>
                <Rating
                    emptySymbol="far fa-star star-color"
                    fullSymbol="fas fa-star star-color"
                    initialRating={item.rating}
                    readonly>RAte</Rating>
                <h4>{item.name} <br /> <span>{item.address || 'Dhaka, Bangladesh'}</span></h4>
            </div>
        </div>
    );
};

export default ReviewCard;