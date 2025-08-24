import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import About from '../../About/About';
import ContactUs from '../../ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedCategories/>
            <About/>
            <ContactUs/>
        </div>
    );
};

export default Home;