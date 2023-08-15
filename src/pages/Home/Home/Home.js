import React from 'react';
import ImgGallery from '../Gallery/ImgGallery';
import Reviews from '../Reviews/Reviews';
import Navigation from '../../Shared/Navigation/Navigation';
import NavTop from '../../Shared/NavTop/NavTop';
import Blog from '../Blogs/Blogs';
import HappyClient from '../HappyClient/HappyClient';
import Holiday from '../Holiday/Holiday';
import Subscriber from '../Subscriber/Subscriber';
import EventPackage from '../EventPackages/EventPackage/EventPackage';
import Footer from '../../Shared/Footer/Footer';
import Banner from './../Banner/Banner';
import ChooseRide from '../ChooseRide/ChooseRide';

const Home = () => {
    return (
        <div>
            <NavTop />
            <Navigation />
            <Banner />
            <ChooseRide />
            <ImgGallery />
            <EventPackage />
            <Reviews />
            <Holiday />
            <HappyClient />
            <Blog />
            <Subscriber />
            <Footer />
        </div>
    );
};

export default Home;