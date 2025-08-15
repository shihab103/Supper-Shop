import { NavLink, Outlet } from "react-router";
import ShopLogo from "../Shared/ShopLogo/ShopLogo";
import useRole from "../../utils/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar for small devices */}
        <div className="navbar bg-base-300 lg:hidden w-full">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Dashboard</div>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <ShopLogo />
          <li>
            <NavLink className="mt-5 font-semibold" to="/dashboard">
              Dashboard Home
            </NavLink>
          </li>
          {/* admin menu */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  className={"font-semibold"}
                  to="/dashboard/add-category"
                >
                  Add Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={"font-semibold"}
                  to={"/dashboard/add-product"}
                >
                  Add Product
                </NavLink>
              </li>
            </>
          )}
          {role === "customer" && (
            <>
              <li>
                <NavLink
                  className={"font-semibold"}
                  to={"/dashboard/add-product"}
                >
                  Add Product
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
