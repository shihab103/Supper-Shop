import Lottie from "lottie-react";
import badge from "../../../assets/Lotties/GoldenDiscount.json";

export default function DiscountBadge({ discountPercent }) {
  return (
    <div className="relative w-20 h-20">
      {/* Lottie Animation */}
      <Lottie animationData={badge} loop={true} className="w-full h-full" />

      {/* Centered Discount Text */}
      <div className="absolute  inset-0 flex items-center justify-center text-black font-bold text-[12px]">
        {discountPercent}%
      </div>
    </div>
  );
}
