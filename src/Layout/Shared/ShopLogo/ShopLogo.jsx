import { Link } from "react-router";
import logoAnimation from "../../../assets/Lotties/supper-shop-logo.json";
import Lottie from "lottie-react";

const ShopLogo = () => {
  return (
    <div>
      <Link
        to="/"
        className="flex items-center space-x-2 select-none transition-transform duration-300"
      >
        {/* First Letter S */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-orange-500">
          S
        </h2>

        {/* Logo Animation */}
        <div className="w-12 h-12 -mr-3 -ml-5 md:w-16 md:h-16">
          <Lottie animationData={logoAnimation} loop={true} />
        </div>

        {/* Second Letter S */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-purple-600">
          S
        </h2>
      </Link>
    </div>
  );
};

export default ShopLogo;
