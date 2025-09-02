import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import Home from "../Pages/HomePage/Home/Home";
import AddCategory from "../Component/Dashboard/Admin/AddCategory/AddCategory";
import AddProduct from "../Component/Dashboard/Admin/AddProduct/AddProduct";
import AllProducts from "../Component/Dashboard/Admin/AllProducts/AllProducts";
import CategoryProducts from "../Pages/HomePage/CategoryProducts/CategoryProducts";
import ProductDetails from "../Pages/HomePage/ProductDetails/ProductDetails";
import WishList from "../Pages/WishList/WishList";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Account from "../Pages/Account/Account";
import MyProfile from "../Pages/Account/MyProfile";
import AllReview from "../Component/Dashboard/Admin/AllReview/AllReview";
import Cart from "../Pages/cart/Cart";
import About from "../Pages/About/About";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AdminDashboardHome from "../Component/Dashboard/Admin/AdminDashboardHome/AdminDashboardHome";
import AllUser from "../Component/Dashboard/Admin/AllUser/AllUser";
import AllOrders from "../Component/Dashboard/Admin/AllOrders/AllOrders";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "/my-profile", Component: MyProfile },
      { path: "/about", Component: About },
      { path: "/contact", Component: ContactUs },
      { path: "/all-products", Component: AllProducts },
      { path: "/category/:categoryName", Component: CategoryProducts },
      {
        path: "/product/:id",
        Component: ProductDetails,
      },
      {
        path: "/wishlist",
        Component: WishList,
      },
      {
        path: "/cart",
        Component: Cart,
      },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/account", Component: Account },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {index: true,Component: AdminDashboardHome},
      { path: "add-product", Component: AddProduct },
      { path: "add-category", Component: AddCategory },
      { path: "all-review", Component: AllReview },
      { path: "all-user", Component: AllUser },
      { path: "all-orders", Component: AllOrders },
    ],
  },
]);

export default MainRoute;
