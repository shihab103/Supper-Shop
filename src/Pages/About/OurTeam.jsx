import React from "react";
import member1 from "../../assets/Photos/about/member1.jpg";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";

const OurTeam = () => {
  const memberData = [
    {
      name: "MD Shihab Uddin",
      role: "Admin",
      description: "I am a MERN STACK Web Developer",
      image: member1,
      social: {
        facebook: "https://www.facebook.com/csei52s2",
        linkedin: "https://www.linkedin.com/in/shihab-web-dev/",
        twitter: "https://x.com/shihab_web_dev?s=21",
      },
    },
    {
      name: "Jane Doe",
      role: "Designer",
      description: "Creative UI/UX Designer",
      image: member1,
      social: { facebook: "#", linkedin: "#", twitter: "#" },
    },
    {
      name: "Jane Doe",
      role: "Designer",
      description: "Creative UI/UX Designer",
      image: member1,
      social: { facebook: "#", linkedin: "#", twitter: "#" },
    },
    {
      name: "Jane Doe",
      role: "Designer",
      description: "Creative UI/UX Designer",
      image: member1,
      social: { facebook: "#", linkedin: "#", twitter: "#" },
    },
    {
      name: "John Smith",
      role: "Developer",
      description: "Fullstack Developer",
      image: member1,
      social: { facebook: "#", linkedin: "#", twitter: "#" },
    },
    // আরও member add করতে পারেন
  ];

  return (
    <div className="bg-white py-16 px-6 lg:px-20 mt-20 rounded-3xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Creative Team
      </h2>

      <Swiper
        slidesPerView={3} // সবসময় 3 card
        spaceBetween={30} // card এর মধ্যে gap
        loop={true} // infinite loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        slideToClickedSlide={true} // click করলে center এ আসবে
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        centeredSlides={false} // extra card দেখা যাবে না
      >
        {memberData.map((member, index) => (
          <SwiperSlide
            key={index}
            className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 object-cover rounded-full mb-4 shadow-lg"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-500 mb-1">{member.role}</p>
            <p className="text-gray-600 text-sm mb-3">{member.description}</p>
            <div className="flex gap-3">
              {member.social.facebook && (
                <a
                  href={member.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-lg"
                >
                  <FaFacebookF />
                </a>
              )}
              {member.social.linkedin && (
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 text-lg"
                >
                  <FaLinkedinIn />
                </a>
              )}
              {member.social.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 text-lg"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurTeam;
