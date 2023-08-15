import React from 'react';
import img from '../../../images/about.jpg'
import img2 from '../../../images/about2.jpg'
import NavTop from '../../Shared/NavTop/NavTop';
import Footer from '../../Shared/Footer/Footer';
import Fade from 'react-reveal/Fade';
import Navigation from '../../Shared/Navigation/Navigation';

const About = () => {
    return (
        <div>
        <NavTop />
        <Navigation />
            <div className="container">
                <div className="about-content1">
                    <img className='img-fluid' src={img} alt="" />
                    <p className='fs-5'>We, Joy Land, are a unique combination of amusement park and water park, located at Malad West, Mumbai, Maharashtra. We offer the most exciting, hi-tech fun rides in amusement park for both children and adults. Aesthetically laid out flora and fauna matching in every bit to the splendour and grandeur of an exclusive haunt for fun-seekers. We invite you to experience the thrill of over a dozen breathtaking water park slides, an ideal retreat for the withered urban souls! Challenge your friends and family with the water park games or chase them down the water slides and land right into the lazy landing pools, there is something for everyone with us. </p>
                </div>
                <div className="about-content2 py-5">
                    <div className="row d-flex align-items-center">                      
                <Fade left>
                        <div className="col-lg-6">
                            <h2>Hello. Our Park has been present for <br /> over 20 years. <br /> We make the best for all !</h2>
                        </div>
                        </Fade>
                        <Fade right>
                        <div className="col-lg-6">
                            <div>
                            <img className='img-fluid' src={img2} alt="" />
                            </div>
                        </div>
                        </Fade>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;