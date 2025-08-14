import React from 'react';
import bannerImage from '../../../assets/Photos/BannerAndBgImage/banner.jpg';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
  return (
    <div
      className="flex items-center bg-cover bg-right bg-no-repeat"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Overlay */}
      <div className="bg-black/40 lg:max-h-[80vh] h-screen w-full flex items-center py-16 md:py-24 lg:py-32">
        {/* Text Section */}
        <div className="text-white lg:space-y-4 space-y-2 w-full md:w-1/2 px-4 md:px-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Welcome to <span className="text-yellow-400">Supper Shop</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            <span>We provide </span>
            <span className="text-green-300">
              <Typewriter
                words={['Fresh Foods', 'Daily Groceries', 'Fast Delivery', 'Best Prices']}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </h2>
          <p className="text-gray-200 max-w-lg">
            Everything your kitchen needs – fast, fresh, and at the best price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
