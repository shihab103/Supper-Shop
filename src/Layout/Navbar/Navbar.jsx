import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoAnimation from "../../assets/Lotties/supper-shop-logo.json";
import { Typewriter } from "react-simple-typewriter";
import Lottie from "lottie-react";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log("🚀 ~ handleLogout ~ result:", result);
navigate('/login');
      })
      .catch((error) => {
        console.log("🚀 ~ handleLogout ~ error:", error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/add-category">Add Category</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* Navbar Start: Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center space-x-3 select-none">
          <div className="w-12 h-12">
            <Lottie animationData={logoAnimation} loop={true} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold flex items-center space-x-1">
            <span className="text-orange-500">
              <Typewriter
                words={["Supper"]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
            <span>&nbsp;</span>
            <span className="text-purple-600">
              <Typewriter
                words={["Shop"]}
                loop={1}
                cursor={false}
                typeSpeed={120}
                deleteSpeed={50}
                delaySpeed={2500}
              />
            </span>
          </h2>
        </Link>
      </div>

      {/* Navbar Center: Menu (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center gap-3">
          {links}
        </ul>
      </div>

      {/* Navbar End: Menu Button */}
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn">
            Log Out
          </button>
        ) : (
          <div className="flex gap-3">
              <NavLink className={'btn btn-primary'} to="/login">Login</NavLink>
              <NavLink className={'btn btn-primary'} to="/register">Register</NavLink>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden absolute top-full left-0 w-full">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
