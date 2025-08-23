import React from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import About from '../../About/About';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedCategories/>
            <About/>
        </div>
    );
};

export default Home;