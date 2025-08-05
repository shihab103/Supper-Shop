import React from 'react';
import { Link } from 'react-router';
import logoAnimation from '../../../assets/Lotties/supper-shop-logo.json';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter';

const ShopLogo = () => {
    return (
        <div>
            <Link to="/" className="flex items-center space-x-2 select-none">
          <div className="w-12 h-12">
            <Lottie animationData={logoAnimation} loop={true} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center space-x-1">
            <span className="text-orange-500">
              <Typewriter
                words={["Supper"]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <span className="text-purple-600">
              <Typewriter
                words={["Shop"]}
                loop={1}
                cursor={false}
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={2500}
              />
            </span>
          </h2>
        </Link>
        </div>
    );
};

export default ShopLogo;