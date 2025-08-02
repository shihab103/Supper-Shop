import React from 'react';
import bannerImage from '../../../assets/Photos/BannerAndBgImage/banner.jpg';
import { Typewriter } from 'react-simple-typewriter';

const Banner = () => {
  return (
    <div
      className="min-h-[80vh] flex items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Overlay (optional for better text visibility) */}
      <div className="bg-black/40 w-full min-h-[80vh] flex items-center">
        {/* Text Section */}
        <div className="text-white space-y-6 md:w-1/2 px-4 md:px-10">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <span className="text-yellow-400">Supper Shop</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold">
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
          <p className="text-gray-200">
            Everything your kitchen needs – fast, fresh, and at the best price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
