import { NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      
      <li>
        <NavLink to="/all-products">All Product</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">ContactUs</NavLink>
      </li>
      {
        user && (
          <>
          <li>
            <NavLink to={'/dashboard'}>Dashboard</NavLink>
          </li>
          </>
        )
      }
    </>
  );

  return (
    <div className="navbar text-white primary shadow-sm px-4">
      {/* Navbar Start */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile Dropdown Button */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn p-0 btn-ghost">
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
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow secondary text-black rounded-box w-52">
            {links}
          </ul>
        </div>

      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center gap-3">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn secondary shadow-none">
            Log Out
          </button>
        ) : (
          <div className="flex gap-3">
            <NavLink className="btn secondary" to="/login">
              Login
            </NavLink>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
