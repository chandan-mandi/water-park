import React from 'react';
import './Subscriber.css'

const Subscriber = () => {
    return (
        <div className='subscriber-main'>
            <div className="container">
                <h2 className='text-center py-3'>GET NEWS, UPDATES, SPECIAL EVENT NOTICES AND MORE <br /> WHEN YOU JOIN OUR EMAIL LIST</h2>
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                    <form className="d-flex">
                        <input className="form-control me-2 p-3" type="email" placeholder="Your Email Address" aria-label="Search"/>
                        <button className="btn btn-lg btn-info text-white" type="submit">Subscribe</button>
                    </form>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            
            </div>
        </div>
    );
};

export default Subscriber;