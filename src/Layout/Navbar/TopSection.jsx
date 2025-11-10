import React, { useEffect, useState } from "react";
import ShopLogo from "../Shared/ShopLogo/ShopLogo";
import { FiUser, FiHeart, FiShoppingCart, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useCart } from "../../Pages/Cart/CartContext";

const TopSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartCount } = useCart();
  const [categories, setCategories] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get-category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="py-8 px-6 md:px-16 shadow-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <ShopLogo />
        </div>

        {/* Middle: Category + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-3xl w-full">
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="btn hover:bg-[#cfe1e5] border-[#669295] btn-outline btn-sm flex items-center gap-2"
            >
              <span>Category</span>
              <FiChevronDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-[#cfe1e5] rounded-box w-52"
            >
              {categories.map((cat) => (
                <li key={cat._id}>
                  <a href={`/category/${cat._id}`}>{cat.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <input
            type="text"
            placeholder="Search for products..."
            className="input secondary input-bordered w-full"
          />
        </div>

        {/* Right: Account, Wishlist, Cart */}
        <div className="flex items-center gap-6 text-gray-600 text-sm font-medium relative">
          <div
            onClick={() => navigate("/my-profile")}
            className="flex items-center gap-1 cursor-pointer hover:text-[#669295]"
          >
            <FiUser className="text-xl" />
            <span>Account</span>
          </div>

          <div
            onClick={() => navigate("/wishlist")}
            className="flex items-center gap-1 cursor-pointer hover:text-[#669295]"
          >
            <FiHeart className="text-xl" />
            <span>Wishlist</span>
          </div>

          {/* Cart icon with badge */}
          <div
            onClick={() => navigate("/cart")}
            className="relative flex items-center gap-1 cursor-pointer hover:text-[#669295]"
          >
            <FiShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-2 bg-[#cfe1e5] text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
            <span>Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
