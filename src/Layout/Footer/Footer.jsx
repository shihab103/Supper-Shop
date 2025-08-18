import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#e5e7eb] text-black py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">Supper Shop</h3>
          <p className="text-gray-600 text-sm">
            Your one-stop online shop for all products. Quality products, fast delivery, and great support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-products">All Products</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <p className="text-gray-600 text-sm">Email: support@suppershop.com</p>
          <p className="text-gray-600 text-sm">Phone: +880 1234 567890</p>
          <p className="text-gray-600 text-sm">Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Supper Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
