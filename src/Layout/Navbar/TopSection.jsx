import React, { useEffect, useState } from "react";
import ShopLogo from "../Shared/ShopLogo/ShopLogo";
import { FiUser, FiHeart, FiShoppingCart, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router";

const TopSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

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
    <div className="bg-white py-8 px-6 md:px-16 shadow-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <ShopLogo />
        </div>

        {/* Middle: Category + Search */}
        <div className="flex items-center gap-4 flex-1 max-w-3xl w-full">
          {/* Category Dropdown */}
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              <span>Category</span>
              <FiChevronDown />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {categories.map((cat) => (
                <li key={cat._id}>
                  <a href={`/category/${cat._id}`}>{cat.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search for products..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Right: Account, Wishlist, Cart */}
        <div className="flex items-center gap-6 text-gray-600 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <FiUser className="text-xl" />
            <span>Account</span>
          </div>
          <div onClick={()=>navigate('/wishlist')} className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <FiHeart className="text-xl" />
            <span>Wishlist</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
            <FiShoppingCart className="text-xl" />
            <span>Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
