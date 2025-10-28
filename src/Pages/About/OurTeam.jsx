import React from "react";
import member1 from "../../assets/Photos/about/member1.jpg";
import omar from "../../assets/Photos/about/omar.jpg";
import tripty from "../../assets/Photos/about/tripty.jpg";
import sumaiya from "../../assets/Photos/about/sumaiya.jpg";
import asura from "../../assets/Photos/about/asura.jpg";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

// modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const OurTeam = () => {
  const memberData = [
    {
      name: "MD Shihab Uddin",
      role: "Team Leader",
      description: "Develops scalable web apps with the MERN stack.",
      image: member1,
      social: {
        facebook: "https://www.facebook.com/csei52s2",
        linkedin: "https://www.linkedin.com/in/shihab-web-dev/",
        twitter: "https://x.com/shihab_web_dev?s=21",
      },
    },
    {
      name: "Afrina Tripty",
      role: "Co-Leader",
      description: "Creative UI/UX Designer",
      image: tripty,
      social: {
        facebook: "https://www.facebook.com/tania.tonu.52459",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Suraiya Rahman",
      role: "Support Member",
      description: "Creative UI/UX Designer",
      image: sumaiya,
      social: {
        facebook: "https://web.facebook.com/suriaya.rahman.338#",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Asura Mollah",
      role: "Support Member",
      description: "Creative UI/UX Designer",
      image: asura,
      social: {
        facebook: "https://www.facebook.com/asura.mollah.2024",
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Omar Faruk",
      role: "System Analyst",
      description: "Creative UI/UX Designer",
      image: omar,
      social: {
        facebook: "https://www.facebook.com/omar.faruk.791335",
        linkedin: "#",
        twitter: "#",
      },
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-20 -mt-10 rounded-3xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Creative Team
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper max-w-[1100px] mx-auto"
        slidesPerView={3} // ✅ Fixed: auto → 3 for stable card layout
        spaceBetween={30}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {memberData.map((member, index) => (
          <SwiperSlide
            key={index}
            className="bg-white mb-10 mx-auto rounded-2xl p-6 flex flex-col items-center text-center shadow-lg w-full max-w-[300px]"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-28 mx-auto h-28 object-cover rounded-full mb-4 shadow-lg"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-500 mb-1">{member.role}</p>
            <p className="text-gray-600 text-sm mb-3">{member.description}</p>
            <div className="flex justify-center gap-3">
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
