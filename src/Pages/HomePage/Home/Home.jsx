import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import About from '../../About/About';
import ContactUs from '../../ContactUs/ContactUs';
import HomeProduct from '../../HomeProduct/HomeProduct';
import Discount from '../Discount/Discount';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeaturedCategories/>
            <Discount/>
            <HomeProduct/>
            <About/>
            <ContactUs/>
        </div>
    );
};

export default Home;