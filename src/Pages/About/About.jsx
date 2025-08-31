import { motion } from "framer-motion";
import img1 from "../../assets/Photos/about/about1.jpg";
import img2 from "../../assets/Photos/about/about2.jpg";
import { FaShippingFast, FaDollarSign, FaHeadset } from "react-icons/fa";
import OurTeam from "./OurTeam";
import Testimonials from "./testimonials";

const About = () => {
  const services = [
    {
      icon: <FaShippingFast className="text-4xl text-white" />,
      title: "Fast Delivery",
      description:
        "We ensure your orders are delivered quickly and safely to your doorstep.",
      bgColor: "bg-blue-500",
    },
    {
      icon: <FaDollarSign className="text-4xl text-white" />,
      title: "Affordable Prices",
      description:
        "Get the best deals and discounts on a wide range of quality products.",
      bgColor: "bg-green-500",
    },
    {
      icon: <FaHeadset className="text-4xl text-white" />,
      title: "24/7 Support",
      description:
        "Our dedicated support team is available anytime to help you.",
      bgColor: "bg-red-500",
    },
  ];

  return (
    <div className="bg py-12 px-6 lg:px-20">
      {/* ------------------ About Us Section ------------------ */}
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        About Us
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative w-full flex justify-center mt-25 lg:mt-0 order-1 lg:order-1">
          <motion.img
            src={img1}
            alt="About Left"
            className="absolute -top-5 left-1/4 rounded-br-3xl shadow-lg w-48 md:w-64 lg:w-72 h-48 object-cover z-10"
            initial={{ x: -40 }}
            animate={{ x: [-40, 40, -40] }}
            transition={{ duration: 5, repeat: Infinity }}
          />

          <motion.img
            src={img2}
            alt="About Right"
            className="absolute -bottom-20 right-1/4 rounded-tl-3xl shadow-lg w-48 md:w-64 lg:w-72 h-48 object-cover z-0"
            initial={{ x: 40 }}
            animate={{ x: [40, -40, 40] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <div className="order-2 lg:order-2 mt-42 lg:mt-0">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Welcome to Supper Shop
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Supper Shop is your one-stop online marketplace where you can
            discover the best deals on groceries, household items, fashion, and
            more. Our goal is to provide a seamless shopping experience with
            trusted quality and affordable prices. <br />
            <br />
            We ensure fast delivery, secure payment options, and dedicated
            customer service to make your shopping hassle-free and enjoyable.
          </p>
        </div>
      </div>

      {/* ------------------ We Are Trusted by Clients ------------------ */}
      <div className=" py-16 px-6 lg:px-20 mt-20 rounded-3xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          We are Trusted by Clients
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 secondary rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`p-5 rounded-full mb-5 ${service.bgColor} flex items-center justify-center`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <OurTeam />
      <Testimonials/>
    </div>
  );
};

export default About;
